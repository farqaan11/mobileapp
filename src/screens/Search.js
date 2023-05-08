import { useEffect, useState } from "react"
import { Text } from "react-native"
import {
  TextInput,
  View,
  ActivityIndicator,
  ScrollView,
  Switch
} from "react-native"
import Auth from "../components/Auth"
import UserSearch from "../components/UserSearch"
import contact from "../helpers/contact"
import user from "../helpers/user"
import { globalStyles } from "../styles/global"

const Search = props => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searching, setSearching] = useState(false)
  const [profiles, setProfiles] = useState([])
  const [contacts, setContacts] = useState([])
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled)
  }

  useEffect(() => {
    search("all", 20)
    getContacts()
  }, [])

  useEffect(() => {
    search()
  }, [isEnabled])

  const getContacts = async () => {
    setContacts(await contact.viewContacts())
  }

  function alreadyHasUser(user) {
    return (
      contacts.find(contact => contact.user_id === user.user_id) !== undefined
    )
  }

  const search = async (searchIn, limit) => {
    setSearching(true)
    try {
      if (searchIn && limit) {
        setProfiles(await user.searchUsers(searchTerm, searchIn, limit))
        return
      }
      setProfiles(
        await user.searchUsers(searchTerm, isEnabled ? "contacts" : "all")
      )
    } finally {
      setSearching(false)
    }
  }

  return (
    <View style={[globalStyles.container, { paddingTop: 40 }]}>
      <Auth navigation={props.navigation} currentPage={"Search"} />
      <TextInput
        style={globalStyles.input}
        onChangeText={setSearchTerm}
        value={searchTerm}
        placeholder="Search"
        keyboardType="default"
        autoCapitalize="none"
        onSubmitEditing={() => search()}
      />
      <View
        style={{
          flexDirection: "row",
          marginBottom: 7,
          justifyContent: "space-between",
          gap: 10
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Show contacts only</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <ScrollView style={globalStyles.searchContainer}>
        {searching ? (
          <ActivityIndicator size="large" color="#36942b" />
        ) : (
          profiles?.map(profile => (
            <UserSearch
              user={profile}
              key={profile.user_id}
              alreadyHasUser={alreadyHasUser(profile)}
              refresh={getContacts}
            />
          ))
        )}
      </ScrollView>
    </View>
  )
}

export default Search
