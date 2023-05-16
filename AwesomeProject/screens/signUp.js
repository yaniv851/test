import { View, Text, StyleSheet, ScrollView, NativeModules, useWindowDimensions, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../components/customInput/custumInput';
import CustomButton from '../components/customButton/customButton';
import SocialSignInButtons from '../components/socialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';

export default function SignUp() {
    const navigation = useNavigation();
    const [checked, setChecked] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const validateForm = () => {
        if (!fullName.trim() || !password.trim() || !passwordRepeat.trim()) {
            setError("All fields are required.");
            return false;
        }
        if (password !== passwordRepeat) {
            setError("Passwords do not match.");
            return false;
        }
        return true;
    };
    // const onSignUpPressed = () => {
    //     navigation.navigate("confirm");
    // };

    const onSignUpPressed = () => {
        if (!validateForm()) return;
        setLoading(true);
        axios
            .post(`http://192.168.251.2:3002/api/users`, {
                fullName: fullName,
                password: password,
                isMentor: checked,
            })
            .then((response) => {
                console.log(response.data);
                setLoading(false);
                // Store the login status in AsyncStorage
                AsyncStorage.setItem("@is_logged_in", "true");
                // Store the user's full name in AsyncStorage
                AsyncStorage.setItem('@user_fullName', fullName);
                // Store the user's isMentor in AsyncStorage
                AsyncStorage.setItem('@is_mentor', JSON.stringify(checked));
                // Navigate to the confirmation screen
                navigation.navigate("פרופיל");
                NativeModules.DevSettings.reload();

            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                setError("An error occurred. Please try again later.");
            });
    };

    const onSignInPressed = () => {
        navigation.navigate("login");
    };

    const onTermsOfUsePressed = () => {
        console.warn("onTermsOfUsePressed");
    };

    const onPrivacyPressed = () => {
        console.warn("onPrivacyPressed");
    };

    return (
        <SafeAreaView style={[styles.contis]}>
            <View style={[styles.root]}>
                <Text style={styles.title}>צרו חשבון</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}

                <CustomInput
                    placeholder="שם מלא"
                    value={fullName}
                    setValue={setFullName}
                />
                <CustomInput
                    placeholder="סיסמה"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />
                <CustomInput
                    placeholder="חזרו על הסיסמה"
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry
                />

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <RadioButton
                        style={{ color: 'green' }}
                        value="mentor"
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(true)}
                    />
                    <Text>אני מנטור</Text>
                </View>

                <CustomButton text="הירשמו" onPress={onSignUpPressed} />

                <Text style={styles.text}>
                    By registering, you confirm that you accept our{''}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}> Terms of Use</Text> and{''}
                    <Text style={styles.link} onPress={onPrivacyPressed}> Privacy Policy</Text>
                </Text>

                {/* <SocialSignInButtons /> */}

                <CustomButton
                    text="Have an account? Sign in"
                    onPress={onSignInPressed}
                    type="TERTIARY"
                />

            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    contis: {
        flex: 1,
        justifyContent: 'center',
    },
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F9FBFC',
        height: '100%',
        flex: 1,
        justifyContent: 'center'
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
    },
    error: {
        color: 'red'
    }
});