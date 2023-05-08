import { useEffect, useMemo, useState } from "react"
import { View, Image, ActivityIndicator } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import user from "../helpers/user"
import chat from "../helpers/chat"

const UserProfilePicture = props => {
  const [loading, setLoading] = useState(false)
  const [profilePicture, setProfilePicture] = useState()
  const [loggedInUser, setLoggedInUser] = useState()

  const getUser = async () => {
    setLoggedInUser(await user.getLoggedInUser())
  }

  const isSelf = useMemo(() => props.member.user_id === loggedInUser?.id, [
    loggedInUser
  ])

  const getProfilePicture = async () => {
    try {
      setLoading(true)
      setProfilePicture(await user.getUserPhoto(props.member.user_id))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfilePicture()
    getUser()
  }, [])

  const onRemoveUser = async () => {
    await chat.removeUserFromChat(props.chat.chat_id, props.member.user_id)

    if (props.member.user_id === (await (await user.getLoggedInUser()).id)) {
      props.closeModal()
    }

    props.refresh()
  }

  return (
    <View>
      {!loading ? (
        <Image
          source={{ uri: profilePicture }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 35,
            borderWidth: 2,
            borderColor: "#36942b",
            marginLeft: 10
          }}
        />
      ) : (
        <ActivityIndicator size="small" color="#36942b" />
      )}
      {props.isCreator ? null : (
        <Icon
          size={18}
          name="close"
          color="black"
          style={{
            position: "absolute",
            backgroundColor: "red",
            borderRadius: 100,
            alignSelf: "flex-end"
          }}
          onPress={onRemoveUser}
        />
      )}
    </View>
  )
}

export default UserProfilePicture
