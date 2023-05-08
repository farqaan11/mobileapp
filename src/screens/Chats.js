import { useEffect, useState } from "react"
import { View, ScrollView, Text, Modal, TextInput } from "react-native"
import Auth from "../components/Auth"
import { globalStyles } from "../styles/global"
import chat from "../helpers/chat"
import Chat from "../components/Chat"
import Button from "../components/Button"
import Conversation from "../components/Conversation"

const Chats = props => {
  const [chats, setChats] = useState([])
  const [showStartConversationModal, setShowStartConversationModal] = useState(
    false
  )
  const [newConversationName, setNewConversationName] = useState("")
  const [showChatModal, setShowChatModal] = useState(undefined)

  const getChats = async () => {
    setChats(await chat.viewChats())
  }

  useEffect(() => {
    getChats()

    const subscribe = props.navigation.addListener("focus", () => {
      getChats()
    })

    return subscribe
  }, [])

  useEffect(() => {
    if (!showChatModal) getChats()
  }, [showChatModal])

  const createConversation = async () => {
    await chat.createConversation(newConversationName)
    setNewConversationName("")
    setShowStartConversationModal(false)
    getChats()
  }

  const closeModal = () => {
    setNewConversationName("")
    setShowStartConversationModal(false)
  }

  return (
    <View style={globalStyles.container}>
      <Auth navigation={props.navigation} currentPage={"Chats"} />
      {showChatModal === undefined ? (
        <ScrollView style={globalStyles.contactsContainer}>
          {
            <Modal
              animationType="fade"
              transparent={false}
              visible={showStartConversationModal}
              onRequestClose={() => setShowStartConversationModal(false)}
            >
              <View style={globalStyles.centeredView}>
                <View style={globalStyles.modalView}>
                  <Text style={globalStyles.modalText}>Enter a chat name</Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={setNewConversationName}
                    value={newConversationName}
                    placeholder="I.e. Awesome Chat!"
                    keyboardType="default"
                    autoCapitalize="none"
                  />
                  <View style={{ flexDirection: "column", gap: 20 }}>
                    <Button
                      icon="add"
                      title="Confirm"
                      color="#36942b"
                      backgroundColor="#b7f7c8"
                      width="100%"
                      onPress={createConversation}
                    />
                    <Button
                      icon="close"
                      title="Close"
                      color="red"
                      backgroundColor="#fca2a2"
                      width="100%"
                      onPress={closeModal}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          }
          {
            <Text
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              Start a conversation{" "}
              <Text
                style={{ color: "#1c85ed" }}
                onPress={() => setShowStartConversationModal(true)}
              >
                here
              </Text>
            </Text>
          }
          {chats?.map(chat => (
            <Chat
              chat={chat}
              key={chat.chat_id}
              refresh={getChats}
              showChat={() => setShowChatModal(chat)}
            />
          ))}
        </ScrollView>
      ) : (
        <Modal
          animationType="slide"
          transparent={false}
          visible={showChatModal !== undefined}
          onRequestClose={() => setShowChatModal(undefined)}
        >
          <Conversation
            chat={showChatModal}
            closeConversation={() => setShowChatModal(undefined)}
            key={showChatModal.chat_id}
            navigation={props.navigation}
          />
        </Modal>
      )}
    </View>
  )
}

export default Chats
