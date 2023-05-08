import React, { useContext, useState, useMemo } from "react"
import { View, Text, TextInput, Button } from "react-native"
import { Link } from "@react-navigation/native"
import auth from "../helpers/auth"
import { UserContext } from "../context/UserContext"
import Auth from "../components/Auth"
import { globalStyles } from "../styles/global"

const Register = props => {
  const { user, setUser } = useContext(UserContext)
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
  const validPassword = useMemo(
    () => password.length < 1 || auth.isValidPassword(password),
    [password]
  )
  const validForm = useMemo(
    () =>
      firstName.length !== 0 &&
      validFirstName &&
      lastName.length !== 0 && validLastName &&
      email.length !== 0 && validEmail &&
      password.length !== 0 && validPassword,
    [firstName, lastName, email, password]
  )

  async function handleRegister() {
    try {
      const response = await auth.register(firstName, lastName, email, password)
      setUser(response)
      props.navigation.navigate("Chats")
    } catch (e) {
      if (e instanceof Error) {
        setPostError(e.message)
      }
      setUser({})
    }
  }

  return (
    <View style={globalStyles.container}>
      <Auth navigation={props.navigation} currentPage={"Register"} />
      <Text style={globalStyles.title}>Register</Text>
      <TextInput
        style={globalStyles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
        keyboardType="default"
        autoCapitalize="words"
      />
      {!validFirstName ? (
        <Text style={globalStyles.error}>
          First name can only contain letters (a-z | A-Z).
        </Text>
      ) : null}
      <TextInput
        style={globalStyles.input}
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
        style={globalStyles.input}
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
        style={globalStyles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
      />
      {!validPassword ? (
        <Text style={globalStyles.error}>
          Password must be greater than 8 characters (including: one uppercase,
          one number and one special)
        </Text>
      ) : null}
      {postError !== undefined ? (
        <Text style={globalStyles.postError}>{postError}</Text>
      ) : null}
      <Button
        title="Register"
        onPress={handleRegister}
        color="#36942b"
        disabled={!validForm}
      />
      <Text style={globalStyles.link}>
        <Link to={{ screen: "Login" }}>Already have an account?</Link>
      </Text>
    </View>
  )
}

export default Register
