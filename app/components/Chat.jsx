import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, Text, ActivityIndicator } from "react-native";
import { ChatResponse } from "../helpers/chat";
import user from "../helpers/user";
import { globalStyles } from "../styles/default";

const Chat = (props) => {
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState();

    const getProfilePicture = async () => {
        try{
            setLoading(true);
            setProfilePicture(await user.getUserPhoto(props.chat.last_message.author?.user_id ?? props.chat.creator.user_id));
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getProfilePicture();
    }, []);
    
    return(
        <TouchableOpacity style={globalStyles.chatContainer} onPress={props.showChat}>
            { !loading ? <Image source={{uri: profilePicture}} style={globalStyles.mini_pfp}/> : <ActivityIndicator size="small" color="#36942b" /> }
            <View style={{width: '100%', flexDirection: 'column'}}>
                <Text style={{marginLeft: 25, fontWeight: "bold"}}>{props.chat.name}</Text>
                <View style={{width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[{marginLeft: 25, fontWeight: 'bold', marginTop: 2, color: '#808080'}]} numberOfLines={1}>{props.chat.last_message.message ?? '----'}</Text>
                    <Text style={[{marginTop: 2, fontWeight: 'bold', color: '#808080'}]}>{props.chat.last_message.timestamp ? new Intl.DateTimeFormat('en-GB', {
                            timeStyle: 'medium',
                            timeZone: 'UTC'
                        }).format(props.chat.last_message.timestamp) :  '----'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Chat;
