import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack’;
import { NavigationContainer } from '@react-navigation/native';
import { UserContextProvider } from './context/UserContext';
import Tabs from './app/navigation/tabs';

const App = () => {
    let date = new Date();
    let seconds = date.getSeconds();
    setTimeout(() => {
        setInterval(() => {
            drafts.pollForTimedDrafts();
        }, 60 * 1000);
    }, (60 - seconds) * 1000);

    return (
        <UserContextProvider>
            <NavigationContainer>
                <Tabs />
            </NavigationContainer>
        </UserContextProvider>
    );
};

export default App;

