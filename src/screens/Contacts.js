import { useEffect, useState } from "react"
import { View, ScrollView, Text } from "react-native"
import Auth from "../components/Auth"
import Contact from "../components/Contact"
import contact from "../helpers/contact"
import { globalStyles } from "../styles/global"

const Contacts = props => {
  const [contacts, setContacts] = useState([])

  const getContacts = async () => {
    return setContacts(await contact.viewContacts())
  }

  useEffect(() => {
    getContacts()

    const subscribe = props.navigation.addListener("focus", () => {
      getContacts()
    })

    return subscribe
  }, [])

  return (
    <View style={[globalStyles.container, { paddingTop: 40 }]}>
      <Auth navigation={props.navigation} currentPage={"Contacts"} />
      <ScrollView style={globalStyles.contactsContainer}>
        {contacts.length < 1 ? (
          <Text
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            No contact available, search for users{" "}
            <Text
              style={{ color: "#1c85ed" }}
              onPress={() => props.navigation.navigate("Search")}
            >
              here
            </Text>
          </Text>
        ) : (
          contacts?.map(contact => (
            <Contact
              contact={contact}
              key={contact.user_id}
              showAddContact={false}
              showRemoveContact={true}
              showBlockContact={true}
              showUnblockContact={false}
              refresh={getContacts}
            />
          ))
        )}
      </ScrollView>
    </View>
  )
}

export default Contacts
