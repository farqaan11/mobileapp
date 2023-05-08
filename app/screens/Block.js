import { useEffect, useState } from "react"
import { View, ScrollView, Text } from "react-native"
import Auth from "../components/Auth.jsx"
import Contact from "../components/Contact.jsx"
import contact from "../helpers/contact"
import { globalStyles } from "../styles/default"

const Blocked = props => {
  const [blockedContacts, setBlockedContacts] = useState([])

  const getBlockedContacts = async () => {
    setBlockedContacts(await contact.viewBlocked())
  }

  useEffect(() => {
    getBlockedContacts()

    const subscribe = props.navigation.addListener("focus", () => {
      getBlockedContacts()
    })

    return subscribe
  }, [])

  return (
    <View style={[globalStyles.container, { paddingTop: 40 }]}>
      <Auth navigation={props.navigation} currentPage={"Blocked"} />
      <Text style={{ fontSize: 45, alignSelf: "center", color: "#808080" }}>
        Blocked
      </Text>
      <ScrollView style={globalStyles.contactsContainer}>
        {blockedContacts.length < 1 ? (
          <Text
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            No blocked contacts
          </Text>
        ) : (
          blockedContacts?.map(contact => (
            <Contact
              contact={contact}
              key={contact.user_id}
              showAddContact={false}
              showRemoveContact={false}
              showBlockContact={false}
              showUnblockContact={true}
              refresh={getBlockedContacts}
            />
          ))
        )}
      </ScrollView>
    </View>
  )
}

export default Blocked
