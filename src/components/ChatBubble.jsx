import { useEffect, useMemo, useState } from "react"
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  TextInput
} from "react-native"
import chat from "../helpers/chat"
import user from "../helpers/user"
import { globalStyles } from "../styles/global"
import Icon from "react-native-vector-icons/Ionicons"
import Button from "./Button"

const ChatBubble = props => {
  const [perspective, setPerspective] = useState()
  const [profilePicture, setProfilePicture] = useState()
  const [showOptionsPanels, setShowOptionsPanels] = useState(false)
  const [editMessageMode, setEditMessageMode] = useState(false)
  const [editMessage, setEditMessage] = useState("")

  const isSender = useMemo(
    () => perspective?.id === props.message.author.user_id,
    [perspective]
  )

  const getPerspective = async () => {
    setPerspective(await user.getLoggedInUser())
  }

  const getProfilePicture = async () => {
    setProfilePicture(await user.getUserPhoto(props.message.author.user_id))
  }

  const onEditMessage = () => {
    setEditMessageMode(!editMessageMode)
    setShowOptionsPanels(false)
  }

  const editMessageSubmitted = async () => {
    await chat.updateMessage(
      props.chatResponse.chat_id,
      props.message.message_id,
      editMessage
    )
    setEditMessageMode(false)
    props.refresh()
    setShowOptionsPanels(false)
  }

  const deleteMessage = async () => {
    await chat.deleteMessage(
      props.chatResponse.chat_id,
      props.message.message_id
    )
    props.refresh()
    setShowOptionsPanels(false)
  }

  useEffect(() => {
    getProfilePicture()
    getPerspective()
  }, [])

  return (
    <View>
      {showOptionsPanels ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={showOptionsPanels}
          onRequestClose={() => setShowOptionsPanels(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#000000AA",
              justifyContent: "flex-end"
            }}
            onPress={() => setShowOptionsPanels(false)}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "100%",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                paddingHorizontal: 10,
                height: "15%",
                flexDirection: "column",
                padding: 10,
                justifyContent: "space-between"
              }}
            >
              <Button
                icon="create"
                title="Edit"
                color="black"
                backgroundColor="orange"
                margin={100}
                onPress={onEditMessage}
                width="50%"
              />
              <Button
                icon="close"
                title="Delete"
                color="black"
                backgroundColor="#db4242"
                margin={100}
                onPress={deleteMessage}
                width="50%"
              />
            </View>
          </TouchableOpacity>
        </Modal>
      ) : null}
      {!isSender ? (
        <Text
          style={{
            marginRight: "35%",
            paddingRight: 10,
            color: "#808080",
            fontSize: 10
          }}
        >
          {props.message.author.first_name} {props.message.author.last_name}
        </Text>
      ) : null}
      <View
        style={[
          {
            width: "65%",
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between"
          },
          isSender
            ? { backgroundColor: "#cbf7d3", marginLeft: "35%" }
            : { backgroundColor: "#fff", marginRight: "35%" }
        ]}
      >
        <Image
          source={{ uri: profilePicture }}
          style={[globalStyles.mini_pfp, { justifyContent: "flex-start" }]}
        />
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            flexShrink: 1
          }}
        >
          {!editMessageMode ? (
            <Text
              style={{
                fontWeight: "bold",
                flexWrap: "wrap",
                textAlign: "center",
                marginTop: 10,
                justifyContent: "flex-start"
              }}
            >
              {props.message.message}
            </Text>
          ) : (
            <TextInput
              style={[
                globalStyles.input,
                {
                  width: "75%",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: 20,
                  height: 30,
                  backgroundColor: "#fff"
                }
              ]}
              onChangeText={setEditMessage}
              value={editMessage}
              placeholder="Edit message"
              keyboardType="default"
              autoCapitalize="none"
              onSubmitEditing={editMessageSubmitted}
              onBlur={() => setEditMessageMode(false)}
            />
          )}
          {!editMessageMode ? (
            <Text
              style={{
                alignSelf: "flex-end",
                marginRight: 10,
                marginVertical: 5,
                color: "#808080"
              }}
            >
              {new Intl.DateTimeFormat("en-GB", {
                timeStyle: "medium",
                timeZone: "UTC"
              }).format(props.message.timestamp)}
            </Text>
          ) : null}
        </View>
      </View>
      {isSender ? (
        <Icon
          style={{ alignSelf: "flex-end" }}
          name="ellipsis-horizontal"
          size={28}
          color="#808080"
          onPress={() => setShowOptionsPanels(!showOptionsPanels)}
        />
      ) : null}
    </View>
  )
}

export default ChatBubble
