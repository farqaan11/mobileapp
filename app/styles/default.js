import { StyleSheet } from "react-native"

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 20,
    width: "100%",
    height: "100%",
    marginBottom: "35%"
  },
  userSearchContainer: {
    marginTop: 10,
    padding: 9,
    backgroundColor: "#cbf7d3",
    fontSize: 24,
    width: "100%",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 35,
    cursor: "pointer"
  },
  contactsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 20,
    width: "100%",
    height: "100%"
  },
  contactContainer: {
    marginTop: 10,
    padding: 9,
    backgroundColor: "#cbf7d3",
    fontSize: 24,
    width: "100%",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 35,
    cursor: "pointer"
  },
  chatContainer: {
    marginTop: 10,
    padding: 9,
    backgroundColor: "#cbf7d3",
    fontSize: 24,
    width: "100%",
    height: 55,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 35,
    cursor: "pointer"
  },
  settingsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingTop: 130
  },
  updateUserContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    borderColor: "#36942b",
    marginHorizontal: "20%",
    alignSelf: "stretch",
    textAlign: "center",
    marginTop: 25
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#36942b",
    marginBottom: 20
  },
  link: {
    paddingTop: 10,
    fontWeight: "bold",
    color: "#808080"
  },
  input: {
    width: "80%",
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#36942b",
    borderRadius: 5
  },
  updateUserInput: {
    width: "100%",
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#36942b",
    borderRadius: 5
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#36942b"
  },
  error: {
    alignSelf: "center",
    textAlign: "center",
    paddingBottom: 10,
    fontWeight: "bold",
    color: "red"
  },
  postError: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
    color: "red"
  },
  postSuccess: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
    color: "#36942b"
  },
  island: {
    position: "absolute",
    top: 25,
    left: 20,
    right: 20,
    backgroundColor: "#cbf7d3",
    borderRadius: 15,
    height: 90,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
    gap: 30
  },
  island_header: {
    fontWeight: "bold",
    color: "#36942b",
    fontSize: 20,
    marginTop: 15,
    marginLeft: 5
  },
  island_mini_header: {
    fontWeight: "bold",
    color: "#666464",
    fontSize: 10,
    marginTop: 15,
    marginLeft: 5
  },
  pfp: {
    width: 90,
    height: 90,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#36942b",
    marginLeft: 10
  },
  mini_pfp: {
    width: 40,
    height: 40,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#36942b",
    marginLeft: 10
  },
  camera: {
    flex: 1,
    alignSelf: "stretch",
    textAlign: "center",
    elevation: 100
  },
  customButton: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    paddingHorizontal: 50
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#f1f1f1",
    marginLeft: 10
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})
