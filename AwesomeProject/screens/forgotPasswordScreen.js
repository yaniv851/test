import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/customInput/custumInput'
import CustomButton from '../components/customButton/customButton'
import { useNavigation } from '@react-navigation/native'

export default function ForgotPasswordScreen() {
    const [username, setUsername] = useState('');
    const navigation = useNavigation();

    const onSendPressed = () => {
        navigation.navigate("new password")
    };

    const onSignInPressed = () => {
        navigation.navigate("login");
    };

    return (
        <ScrollView>
            <SafeAreaView style={[styles.root]}>
                <Text style={styles.title}>Reset your password</Text>


                <CustomInput
                    placeholder="Enter your username"
                    value={username}
                    setValue={setUsername}
                />

                <CustomButton text="Send" onPress={onSendPressed} />

                <CustomButton
                    text="back to Sign in"
                    onPress={onSignInPressed}
                    type="TERTIARY"
                />

            </SafeAreaView>
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F9FBFC',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075'
    }
});