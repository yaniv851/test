import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/customInput/custumInput'
import CustomButton from '../components/customButton/customButton'
import { useNavigation } from '@react-navigation/native'

export default function NewPasswordScreen() {
    const navigation = useNavigation();
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const onSubmitPressed = () => {
        console.warn("onSubmitPressed");
    };

    const onSignInPressed = () => {
        navigation.navigate("login")
    };


    return (
        <ScrollView>
            <View style={[styles.root]}>
                <Text style={styles.title}>Reset your password</Text>


                <CustomInput
                    placeholder="Code"
                    value={code}
                    setValue={setCode}
                />

                <CustomInput
                    placeholder="Enter your new password"
                    value={newPassword}
                    setValue={setNewPassword}
                />

                <CustomButton text="Submit" onPress={onSubmitPressed} />

                <CustomButton
                    text="back to Sign in"
                    onPress={onSignInPressed}
                    type="TERTIARY"
                />

            </View>
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