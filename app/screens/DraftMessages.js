import { useEffect, useState } from "react"
import { View, ScrollView, Text } from "react-native"
import Auth from "../components/Auth.jsx"
import Draft from "../components/Draft.jsx"
import draft from "../helpers/drafts"
import { globalStyles } from "../styles/default"

const Drafts = props => {
  const [drafts, setDrafts] = useState([])

  const getDrafts = async () => {
    setDrafts(await draft.getDrafts())
  }

  useEffect(() => {
    getDrafts()
    const subscribe = props.navigation.addListener("focus", () => {
      getDrafts()
    })
    return subscribe
  }, [])

  let date = new Date()
  let sec = date.getSeconds()
  setTimeout(() => {
    setInterval(() => {
      getDrafts()
    }, 60 * 1000)
  }, (60 - sec) * 1000)

  return (
    <View style={[globalStyles.container, { paddingTop: 40 }]}>
      <Auth navigation={props.navigation} currentPage={"Drafts"} />
      <ScrollView style={globalStyles.contactsContainer}>
        <Text style={{ fontSize: 45, alignSelf: "center", color: "#808080" }}>
          Drafts
        </Text>
        {drafts.length < 1 ? (
          <Text
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            No drafts
          </Text>
        ) : (
          drafts?.map(draft => (
            <Draft draft={draft} key={draft.draft_id} refresh={getDrafts} />
          ))
        )}
      </ScrollView>
    </View>
  )
}

export default Drafts
