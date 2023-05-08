import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/default';
import Icon from 'react-native-vector-icons/Ionicons';

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[globalStyles.customButton, {backgroundColor: props.backgroundColor ? props.backgroundColor : '#fff', marginHorizontal: props?.margin ? props.margin : 0, width: props?.width ? props.width :'100%'}]}>
            <Icon name={props.icon} size={22} color={ props.color ? props.color : '#f1f1f1'} />
            <Text style={[globalStyles.text, {color: props.color ? props.color : '#f1f1f1'}]}>{props?.title ?? ''}</Text>
        </TouchableOpacity>
    )
}

export default Button;
