import { View, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Login from "../screens/Login"
import Register from "../screens/Register"
import Settings from "../screens/Settings"
import ShowCamera from "../screens/ShowCamera"
import Search from "../screens/Search"
import Contacts from "../screens/Contacts"
import Blocked from "../screens/Blocked"
import Chats from "../screens/Chats"
import Drafts from "../screens/DraftMessages"

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: "#cbf7d3",
          borderRadius: 15,
          height: 90,
          ...styles.shadow
        }
      }}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIconStyle: { display: "none" },
          tabBarButton: () => null
        }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIconStyle: { display: "none" },
          tabBarButton: () => null
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10
                }}
              >
                <Icon
                  name="chatbubble"
                  size={25}
                  color={focused ? "#36942b" : "#808080"}
                />
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10
                }}
              >
                <Icon
                  name="people"
                  size={25}
                  color={focused ? "#36942b" : "#808080"}
                />
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10
                }}
              >
                <Icon
                  name="search"
                  size={25}
                  color={focused ? "#36942b" : "#808080"}
                />
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10
                }}
              >
                <Icon
                  name="settings"
                  size={25}
                  color={focused ? "#36942b" : "#808080"}
                />
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="Camera"
        component={ShowCamera}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIconStyle: { display: "none" },
          tabBarButton: () => null
        }}
      />
      <Tab.Screen
        name="Blocked"
        component={Blocked}
        options={{
          tabBarButton: () => null
        }}
      />
      <Tab.Screen
        name="Drafts"
        component={Drafts}
        options={{
          tabBarButton: () => null
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})

export default Tabs
