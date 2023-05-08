import React, { useContext, useState, useMemo } from "react"
import { View, Text, TextInput, Button } from "react-native"
import { Link } from "@react-navigation/native"
import { UserContext } from "../context/UserContext"
import auth from "../helpers/auth"
import Auth from "../components/Auth"
import { globalStyles } from "../styles/global"

const Login = props => {
  const { user, setUser } = useContext(UserContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [postError, setPostError] = useState(undefined)

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
      email.length !== 0 &&
      validEmail &&
      password.length !== 0 && validPassword,
    [email, password]
  )

  async function handleLogin() {
    setPostError(undefined)
    try {
      const response = await auth.login(email, password)
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
      <Auth navigation={props.navigation} currentPage={"Login"} />
      <Text style={globalStyles.title}>Login</Text>
      <TextInput
        style={globalStyles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        showSoftInputOnFocus={!validEmail}
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
        showSoftInputOnFocus={!validPassword}
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
        title="Login"
        onPress={handleLogin}
        color="#36942b"
        disabled={!validForm}
      />
      <Text style={globalStyles.link}>
        <Link to={{ screen: "Register" }}>Don't have an account?</Link>
      </Text>
    </View>
  )
}

export default Login
