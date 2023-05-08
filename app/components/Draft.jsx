import { TouchableOpacity, View, Text, Button } from "react-native"
import drafts from "../helpers/drafts"
import { globalStyles } from "../styles/default"
import Icon from "react-native-vector-icons/Ionicons"
import { useState } from "react"
import { TextInput } from "react-native"
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates"
import CustomModal from "./CustomModal"

const Draft = ({ draft, refresh }) => {
  const [editDraftMode, setEditDraftMode] = useState(false)
  const [editDraftMessage, setEditDraftMessage] = useState(draft.message)
  const [showModal, setShowModal] = useState(false)
  const [showDate, setDateModal] = useState(false)
  const [showTime, setTimeModal] = useState(false)
  const [date, setDate] = useState(
    draft.post_date ? draft.post_date : new Date()
  )

  const onSendDraft = async () => {
    await drafts.sendDraft(draft.draft_id)
    await refresh()
  }

  const onDeleteDraft = async () => {
    await drafts.deleteDraft(draft.draft_id)
    await refresh()
  }

  const onUpdateDraftMessage = async () => {
    await drafts.updateDraft({
      draft_id: draft.draft_id,
      message: editDraftMessage
    })
    setEditDraftMode(false)
    await refresh()
  }

  const onUpdateDraftTime = async emptyTime => {
    const newPostDate = emptyTime ? undefined : date
    await drafts.updateDraft({
      draft_id: draft.draft_id,
      post_date: newPostDate,
      update_post_date: true
    })
    await refresh()
  }

  const onDateSelection = () => {
    setDateModal(true)
    setShowModal(false)
  }

  const onTimeSelection = () => {
    setTimeModal(true)
    setShowModal(false)
  }

  const onDateDismissed = () => {
    setDateModal(false)
    setShowModal(true)
  }

  const onTimeDismissed = () => {
    setTimeModal(false)
    setShowModal(true)
  }

  const onDateSelected = e => {
    if (e.date) setDate(e.date)

    onDateDismissed()
  }

  const onTimeSelected = e => {
    let newDate = date
    newDate.setHours(e.hours)
    newDate.setMinutes(e.minutes)
    setDate(newDate)
    onTimeDismissed()
  }

  const onTrash = () => {
    onUpdateDraftTime(true)
    setShowModal(false)
  }

  const onClose = () => {
    setShowModal(false)
  }

  const onSubmit = () => {
    onUpdateDraftTime(false)
    setShowModal(false)
  }

  const showOptions = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "column",
          gap: 10,
          padding: 10,
          columnGap: 20
        }}
      >
        <Text
          style={[
            {
              fontWeight: "bold",
              color: "green",
              alignContent: "center",
              alignSelf: "center"
            }
          ]}
        >
          {date
            ? `${new Date(date).toLocaleDateString("en-GB")} ${new Date(
                date
              ).toLocaleTimeString()}`
            : "No date & time selected: ----"}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            color="green"
            title="Show Date Picker"
            onPress={() => onDateSelection()}
          ></Button>
          <Button
            color="green"
            title="Show Time Picker"
            onPress={() => onTimeSelection()}
          ></Button>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Icon name="trash" size={22} color="gray" onPress={onTrash} />
          <Icon name="close" size={22} color="gray" onPress={onClose} />
          <Icon name="checkmark" size={22} color="green" onPress={onSubmit} />
        </View>
      </View>
    )
  }

  return (
    <TouchableOpacity
      style={[
        globalStyles.chatContainer,
        { height: 120, borderColor: "green", borderWidth: 2 }
      ]}
    >
      <View style={{ width: "100%", flexDirection: "column" }}>
        <Text
          style={{ marginLeft: 2, fontWeight: "bold" }}
        >{`Chat name: ${draft.chat_name}`}</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
            maxHeight: 20,
            marginTop: 10
          }}
        >
          {!editDraftMode ? (
            <Text
              style={[
                {
                  width: 290,
                  marginLeft: 2,
                  fontWeight: "bold",
                  marginTop: 2,
                  color: "#808080"
                }
              ]}
              numberOfLines={1}
            >{`Message: ${draft.message}`}</Text>
          ) : (
            <TextInput
              style={[
                globalStyles.input,
                {
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  height: 20,
                  backgroundColor: "#fff"
                }
              ]}
              onChangeText={setEditDraftMessage}
              value={editDraftMessage}
              placeholder="Edit message"
              keyboardType="default"
              autoCapitalize="none"
              onSubmitEditing={onUpdateDraftMessage}
              onBlur={() => setEditDraftMode(false)}
            />
          )}
          <Icon
            name="pencil"
            size={22}
            color="black"
            onPress={() => setEditDraftMode(!editDraftMode)}
          />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Icon
              name="alarm"
              size={22}
              color="orange"
              onPress={() => setShowModal(!showModal)}
            />
            <Text
              style={[{ marginTop: 2, fontWeight: "bold", color: "#808080" }]}
            >
              {draft.post_date
                ? `${new Date(draft.post_date).toLocaleDateString(
                    "en-GB"
                  )} ${new Date(draft.post_date).toLocaleTimeString()}`
                : "----"}
            </Text>
          </View>
          <Icon name="send" size={22} color="green" onPress={onSendDraft} />
          <Icon name="trash" size={22} color="red" onPress={onDeleteDraft} />
        </View>
      </View>
      {!showModal ? null : (
        <CustomModal
          children={showOptions}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
      <DatePickerModal
        locale="en"
        mode="single"
        visible={showDate}
        onDismiss={() => onDateDismissed()}
        date={date}
        onConfirm={e => onDateSelected(e)}
      />
      <TimePickerModal
        visible={showTime}
        onDismiss={() => onTimeDismissed()}
        onConfirm={e => onTimeSelected(e)}
        hours={12}
        minutes={14}
      />
    </TouchableOpacity>
  )
}

export default Draft
