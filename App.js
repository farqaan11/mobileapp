import { NavigationContainer } from "@react-navigation/native"
import { UserContextProvider } from "./context/UserCont.js"
import drafts from "./helpers/drafts"
import Tabs from "./app/navi/TabNav.jsx"

const App = () => {
  let date = new Date()
  let seconds = date.getSeconds()
  setTimeout(() => {
    setInterval(() => {
      drafts.pollForTimedDrafts()
    }, 60 * 1000)
  }, (60 - sec) * 1000)

  return (
    <UserContextProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </UserContextProvider>
  )
}


export default App
