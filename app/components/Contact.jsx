import { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import chat, { ChatResponse } from "../helpers/chat";
import contact, { ContactResponse } from "../helpers/contact";
import user from "../helpers/user";
import { globalStyles } from "../styles/default";

const Contact = (props) => {
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState();

    const getProfilePicture = async () => {
        try{
            setLoading(true);
            setProfilePicture(await user.getUserPhoto(props.contact.user_id));
        }
        finally{
            setLoading(false);
        }
    }

    const onAddContact = async () => {
        await contact.addContact(props.contact.user_id);
        await props.refresh();
    }

    const onRemoveContact = async () => {
        await contact.removeContact(props.contact.user_id);
        await props.refresh();
    }

    const onBlock = async () => {
        await contact.blockContact(props.contact.user_id);
        await props.refresh();
    }

    const onUnblock = async () => {
        await contact.unblockContact(props.contact.user_id);
        await props.refresh();
    }

    const onAddUserToChat = async () => {
        await chat.addUserToChat(props?.chat?.chat_id, props.contact.user_id);
        await props.refresh();
    }

    useEffect(() => {
        getProfilePicture();
    }, []);

    return (
        <View style={globalStyles.contactContainer}>
            { !loading ? <Image source={{uri: profilePicture}} style={globalStyles.mini_pfp}/> : <ActivityIndicator size="small" color="#36942b" /> }
            <Text style={[{fontWeight: 'bold', marginTop: 10, color: '#36942b'}]}>{props.contact.first_name} {props.contact.last_name}</Text>
            { props?.showAddContact === true ? <Icon style={{marginTop: 5}} name="person-add" size={25} color='#36942b' onPress={onAddContact} /> : null }
            { props?.showRemoveContact === true ? <Icon style={{marginTop: 5}} name="person-remove" size={25} color='#36942b' onPress={onRemoveContact} /> : null }
            { props?.showBlockContact === true ? <Icon style={{marginTop: 5}} name="eye-off" size={25} color='red' onPress={onBlock}/> : null }
            { props?.showUnblockContact === true ? <Icon style={{marginTop: 5}} name="eye" size={25} color='#808080' onPress={onUnblock}/> : null }
            { props?.showAddContactToChat === true ? <Icon style={{marginTop: 5}} name="chatbubbles" size={25} color='#808080' onPress={onAddUserToChat}/> : null }
        </View>
    )
}

export default Contact;
