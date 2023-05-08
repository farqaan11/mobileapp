import { View } from "react-native"
import Auth from "../components/Auth.jsx"
import { globalStyles } from "../styles/default"

const Home = props => {
  return (
    <View style={globalStyles.container}>
      <Auth navigation={props.navigation} currentPage={"Home"} />
    </View>
  )
}

export default Home
