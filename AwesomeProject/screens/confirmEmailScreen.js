import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/customInput/custumInput'
import CustomButton from '../components/customButton/customButton'
import { useNavigation } from '@react-navigation/native'

export default function ConfirmEmailScreen() {
    const [code, setCode] = useState('');
    const navigation = useNavigation();

    const onConfirmPressed = () => {
        console.warn("onConfirmPressed");
    };

    const onSignInPressed = () => {
        navigation.navigate("login");
    };

    const onResendPress = () => {
        console.warn("onResendPressed");
    };

    return (
        <ScrollView>
            <View style={[styles.root]}>
                <Text style={styles.title}>Confirm your email</Text>

                <CustomInput
                    placeholder="Enter your confirmation code"
                    value={code}
                    setValue={setCode}
                />

                <CustomButton text="Confirm" onPress={onConfirmPressed} />

                <CustomButton
                    text="Resend code"
                    onPress={onResendPress}
                    type="SECONDARY"
                />

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