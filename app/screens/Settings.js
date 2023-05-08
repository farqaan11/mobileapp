import { useEffect, useState, useMemo } from "react"
import { View, Image, Text, TextInput, ScrollView, Button } from "react-native"
import Auth from "../components/Auth.jsx"
import { globalStyles } from "../styles/defaukt"
import user from "../helpers/user"
import auth from "../helpers/auth"

const Settings = props => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    first_name: "",
    last_name: "",
    user_id: 0
  })
  const [userPhoto, setUserPhoto] = useState("")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [postError, setPostError] = useState(undefined)

  const validFirstName = useMemo(
    () => firstName.length < 1 || auth.isValidName(firstName),
    [firstName]
  )
  const validLastName = useMemo(
    () => lastName.length < 1 || auth.isValidName(lastName),
    [lastName]
  )
  const validEmail = useMemo(
    () => email.length < 1 || auth.isValidEmail(email),
    [email]
  )
  const validPassword = useMemo(() => auth.isValidPassword(password), [
    password
  ])

  const getDetails = async () => {
    setUserDetails(await user.getUserDetails())
    setUserPhoto(await user.getUserPhoto())
  }

  useEffect(() => {
    getDetails()

    const subscribe = props.navigation.addListener("focus", () => {
      getDetails()
    })

    return subscribe
  }, [])

  const logout = async () => {
    await auth.logout()
    props.navigation.navigate("Login")
  }

  const update = async () => {
    setPostError(undefined)
    try {
      const req = {
        email: email.length > 0 && validEmail ? email : userDetails.email,
        first_name:
          firstName.length > 0 && validFirstName
            ? firstName
            : userDetails.first_name,
        last_name:
          lastName.length > 0 && validLastName
            ? lastName
            : userDetails.last_name,
        password: password
      }

      await user.updateUser(req)

      setPostError("success")
      getDetails()
    } catch (e) {
      if (e instanceof Error) {
        setPostError(e.message)
      }
    }
    props.navigation.navigate("Settings")
  }

  return (
    <View style={globalStyles.settingsContainer}>
      <Auth navigation={props.navigation} currentPage={"Settings"} />
      <View style={globalStyles.island}>
        <Image source={{ uri: userPhoto }} style={globalStyles.pfp} />
        <View>
          <Text style={globalStyles.island_header}>
            {userDetails.first_name} {userDetails.last_name}
          </Text>
          <Text
            style={globalStyles.island_mini_header}
            onPress={() => props.navigation.navigate("Camera")}
          >
            Change Profile Picture
          </Text>
        </View>
      </View>
      <ScrollView style={globalStyles.updateUserContainer}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button
            title="View Drafts"
            color="green"
            onPress={() => props.navigation.navigate("Drafts")}
          />
          <Button
            title="View blocked"
            color="orange"
            onPress={() => props.navigation.navigate("Blocked")}
          />
        </View>
        <Text style={[globalStyles.title, { fontSize: 16, marginTop: 10 }]}>
          Update user info
        </Text>
        <TextInput
          style={globalStyles.updateUserInput}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="First Name"
          keyboardType="default"
          autoCapitalize="none"
          showSoftInputOnFocus={!validFirstName}
        />
        {!validFirstName ? (
          <Text style={globalStyles.error}>
            First name can only contain letters (a-z | A-Z).
          </Text>
        ) : null}
        <TextInput
          style={globalStyles.updateUserInput}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Last Name"
          keyboardType="default"
          autoCapitalize="words"
        />
        {!validLastName ? (
          <Text style={globalStyles.error}>
            Last name can only contain letters (a-z | A-Z).
          </Text>
        ) : null}
        <TextInput
          style={globalStyles.updateUserInput}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {!validEmail ? (
          <Text style={globalStyles.error}>Email must be valid</Text>
        ) : null}
        <TextInput
          style={globalStyles.updateUserInput}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
        />
        {!validPassword ? (
          <Text style={[globalStyles.error, { color: "orange" }]}>
            Please enter your password to change details.
          </Text>
        ) : null}
        {postError === undefined ? null : postError === "success" ? (
          <Text style={globalStyles.postSuccess}>Success</Text>
        ) : (
          <Text style={globalStyles.postError}>{postError}</Text>
        )}
        <View style={{ flexDirection: "column", gap: 20 }}>
          <Button title="Update" color="#36942b" onPress={update} />
          <Button title="Logout" color="red" onPress={logout} />
        </View>
      </ScrollView>
    </View>
  )
}

export default Settings
