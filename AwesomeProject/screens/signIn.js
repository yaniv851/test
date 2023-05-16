import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Logo from '../assets/images/4.png';
import CustomInput from '../components/customInput/custumInput';
import CustomButton from '../components/customButton/customButton';
import { useNavigation } from '@react-navigation/native';
import SocialSignInButtons from '../components/socialSignInButtons/SocialSignInButtons';
import axios from 'axios';

export default function SignIn() {
    const [fullName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const { height } = useWindowDimensions();

    const onSignInPressed = () => {
        const credentials = {
            fullName: fullName,
            password: password
        };

        axios.post('/api/users/login', { credentials })
            .then(response => {
                const user = response.data;
                console.log(user)
                if (user) {
                    // Navigate to the profile screen of the user
                    navigation.navigate('פרופיל', { user });
                } else {
                    // Handle invalid credentials
                }
            })
            .catch(error => {
                // Handle login error
            });

    }
    const onForgotPasswordPressed = () => {
        navigation.navigate("forgot password")
    }

    const onSignUpPressed = () => {
        navigation.navigate("sign up")
    }

    return (
        <ScrollView style={{ height: '100%', backgroundColor: '#F9FBFC', }}>
            <View style={[styles.root]}>
                <Image source={Logo} style={[styles.logo, { height: height * 0.3, resizeMode: "contain" }]} />


                <CustomInput
                    placeholder="שם משתמש"
                    value={fullName}
                    setValue={setUsername}
                />

                <CustomInput
                    placeholder="סיסמה"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />

                <CustomButton text="התחבר" onPress={onSignInPressed} />

                <CustomButton
                    text="שכחת סיסמה?"
                    onPress={onForgotPasswordPressed}
                    type="TERTIARY"
                />

                <CustomButton
                    text="התחבר כמדריך"
                    onPress={onForgotPasswordPressed}
                    type="PRIMARY"
                    style={{ backgroundColor: "red" }}
                />


                <CustomButton
                    text="אין לך חשבון? צור אחד"
                    onPress={onSignUpPressed}
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
        backgroundColor: '#F9FBFC'
    },
    logo: {
        width: '70%',
        maxWidth: 200,
        maxHeight: 200,
    },
});