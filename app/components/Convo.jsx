import { useEffect, useState } from "react"
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Modal,
  FlatList
} from "react-native"
import chat from "../helpers/chat"
import user from "../helpers/user"
import { globalStyles } from "../styles/default"
import Button from "./Button"
import ChatBubble from "./ChatBubble"
import Icon from "react-native-vector-icons/Ionicons"
import UserProfilePicture from "./ProfilePic"
import contact from "../helpers/contact"
import Contact from "./Contact"
import drafts from "../helpers/drafts"

const MESSAGE_LIMIT = 5

const Conversation = props => {
  const [userProfiles, setUserProfiles] = useState()
  const [chatName, setChatName] = useState(props.chat.name)
  const [currentMessage, setCurrentMessage] = useState("")
  const [conversationResponse, setConversationResponse] = useState()
  const [editChatMode, setEditChatMode] = useState(false)
  const [chatEdit, setChatEdit] = useState("")
  const [showAddUsersModal, setShowAddUsersModal] = useState(false)
  const [contacts, setContacts] = useState()
  const [loggedInUser, setLoggedInUser] = useState()
  const [offset, setOffset] = useState(0)

  const getLoggedInUser = async () => {
    setLoggedInUser(await user.getLoggedInUser())
  }

  const getConversation = async (limit, offset) => {
    setConversationResponse(
      await chat.viewChat(props.chat.chat_id, limit, offset)
    )
  }

  const onSendMessage = async () => {
    if (currentMessage === "") return
    await chat.sendMessage(props.chat.chat_id, currentMessage)
    setCurrentMessage("")
    getConversation(MESSAGE_LIMIT, offset)
  }

  const onChatNameChange = async () => {
    await chat.updateChat(props.chat.chat_id, chatEdit)
    setEditChatMode(false)
    setChatName(chatEdit)
  }

  const getContacts = async () => {
    setContacts(await contact.viewContacts())
  }

  const validateDraft = async () => {
    if (currentMessage !== "") {
      await drafts.saveDraft({
        chat_id: props.chat.chat_id,
        user_id: Number(loggedInUser?.id),
        chat_name: props.chat.name,
        message: currentMessage
      })
    }
  }

  useEffect(() => {
    getConversation(MESSAGE_LIMIT, offset)
    getLoggedInUser()
    const subscribe = props.navigation.addListener("focus", () => {
      getConversation(MESSAGE_LIMIT, offset)
    })

    let date = new Date()
    let sec = date.getSeconds()
    setTimeout(() => {
      setInterval(() => {
        getConversation(MESSAGE_LIMIT, offset)
      }, 60 * 1000)
    }, (60 - sec) * 1000)

    return subscribe
  }, [])

  useEffect(() => {
    setUserProfiles(conversationResponse?.members)
  }, [conversationResponse])

  useEffect(() => {
    if (showAddUsersModal) {
      getContacts()
    } else {
      getConversation(MESSAGE_LIMIT, offset)
    }
  }, [showAddUsersModal])

  function containsMember(contact) {
    return (
      userProfiles?.find(profile => profile.user_id === contact.user_id) !==
      undefined
    )
  }

  const fetchMoreMessages = () => {
    setOffset(offset + 1)
    getConversation()
  }

  return (
    <View style={{ flexDirection: "column", width: "100%", height: "100%" }}>
      <View style={{ flexDirection: "column", height: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            marginBottom: 10,
            backgroundColor: "#bbbdbf",
            width: "100%"
          }}
        >
          <Icon
            style={{ width: "25%" }}
            name="caret-back"
            size={25}
            color="black"
            onPress={props.closeConversation}
          />
          {!editChatMode ? (
            <View
              style={{
                flexDirection: "row",
                width: "25%",
                justifyContent: "space-between",
                paddingHorizontal: 5
              }}
            >
              <Text
                style={{ fontWeight: "bold", paddingTop: 10 }}
                numberOfLines={1}
              >
                {chatName}
              </Text>
              <Icon
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  textAlign: "center"
                }}
                name="pencil"
                size={15}
                color="#36942b"
                onPress={() => setEditChatMode(!editChatMode)}
              />
            </View>
          ) : (
            <TextInput
              style={[
                globalStyles.input,
                {
                  width: "25%",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  alignContent: "center",
                  height: 20,
                  marginTop: 15,
                  backgroundColor: "#fff"
                }
              ]}
              onChangeText={setChatEdit}
              value={chatEdit}
              placeholder="edit chat name"
              keyboardType="default"
              autoCapitalize="none"
              onBlur={() => setEditChatMode(false)}
              onSubmitEditing={onChatNameChange}
            />
          )}
          <ScrollView
            style={{ flexDirection: "column", width: "25%", borderRadius: 30 }}
            scrollEnabled={true}
            horizontal={true}
          >
            {userProfiles?.map(profile => (
              <UserProfilePicture
                isCreator={props.chat.creator.user_id === profile.user_id}
                member={profile}
                key={profile.user_id}
                chat={props.chat}
                refresh={getConversation}
                closeModal={props.closeConversation}
              />
            ))}
          </ScrollView>
          <Icon
            style={{
              width: "25%",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
              textAlign: "center"
            }}
            name="person-add"
            size={25}
            color="#36942b"
            onPress={() => setShowAddUsersModal(true)}
          />
        </View>
        <FlatList
          style={{
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#e8e6e6",
            marginHorizontal: 10,
            borderRadius: 20,
            marginBottom: 20,
            padding: 20
          }}
          data={conversationResponse?.messages}
          renderItem={({ item }) => (
            <ChatBubble
              message={item}
              key={item.message_id}
              chatResponse={props.chat}
              refresh={getConversation}
            />
          )}
          keyExtractor={item => item.message_id.toString()}
          inverted={true}
        />
        {showAddUsersModal ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showAddUsersModal}
            onRequestClose={() => setShowAddUsersModal(false)}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#000000AA",
                justifyContent: "flex-start"
              }}
              onPress={() => setShowAddUsersModal(false)}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  paddingHorizontal: 10,
                  height: "35%",
                  flexDirection: "column",
                  padding: 10,
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    fontWeight: "bold"
                  }}
                >
                  Add contacts to chat
                </Text>
                <ScrollView>
                  {contacts
                    ?.filter(contact => !containsMember(contact))
                    ?.map(contact => (
                      <Contact
                        contact={contact}
                        key={contact.user_id}
                        showAddContactToChat={true}
                        chat={props.chat}
                        refresh={getConversation}
                      />
                    ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>
        ) : null}
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TextInput
            style={[
              globalStyles.input,
              {
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginTop: 10
              }
            ]}
            onChangeText={setCurrentMessage}
            value={currentMessage}
            placeholder="Enter message"
            keyboardType="default"
            autoCapitalize="none"
            onSubmitEditing={onSendMessage}
            onBlur={validateDraft}
          />
          <Button
            icon="send"
            color="#36942b"
            backgroundColor="#cbf7d3"
            margin={25}
            onPress={onSendMessage}
            width="15%"
          />
        </View>
      </View>
    </View>
  )
}

export default Convo
