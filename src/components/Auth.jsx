import { useEffect } from "react"
import auth from "../helpers/auth"

const Auth = props => {
  useEffect(() => {
    const authenticateUser = async () => {
      const isAuthenticated = await auth.isAuthenticatedUser()
      if (!isAuthenticated) {
        props.navigation.navigate("Login")
      } else {
        props.navigation.navigate(
          props.currentPage === "Login" || props.currentPage === "Register"
            ? "Chats"
            : props.currentPage
        )
      }
    }

    authenticateUser()
  }, [])

  return <></>
}

export default Auth
