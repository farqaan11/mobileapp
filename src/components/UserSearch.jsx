import { useEffect, useState } from "react"
import { View, Image, ActivityIndicator, Text } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import contact from "../helpers/contact"
import user from "../helpers/user"
import { globalStyles } from "../styles/global"

const UserSearch = props => {
  const [loading, setLoading] = useState(false)
  const [profilePicture, setProfilePicture] = useState()

  const getProfilePicture = async () => {
    try {
      setLoading(true)
      setProfilePicture(await user.getUserPhoto(props.user.user_id))
    } finally {
      setLoading(false)
    }
  }

  const addContact = async userId => {
    await contact.addContact(userId)
    await props.refresh()
  }

  useEffect(() => {
    getProfilePicture()
  }, [])

  return (
    <View style={globalStyles.userSearchContainer}>
      {!loading ? (
        <Image source={{ uri: profilePicture }} style={globalStyles.mini_pfp} />
      ) : (
        <ActivityIndicator size="small" color="#36942b" />
      )}
      <Text style={[{ fontWeight: "bold", marginTop: 10, color: "#36942b" }]}>
        {props.user.given_name} {props.user.family_name}
      </Text>
      {!props.alreadyHasUser ? (
        <Icon
          style={{ marginTop: 5 }}
          name="person-add"
          size={25}
          color="#808080"
          onPress={() => addContact(props.user.user_id)}
        />
      ) : (
        <Icon style={{ marginTop: 5 }} name="happy" size={25} color="#36942b" />
      )}
    </View>
  )
}

export default UserSearch
