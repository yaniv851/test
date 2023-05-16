import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { NativeModules } from "react-native";

export default function ProfileScreen({ isSignedIn }) {
    const [fullName, setFullName] = useState('');
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchFullName() {
            try {
                // Retrieve the user's full name from the AsyncStorage
                const fullName = await AsyncStorage.getItem('@user_fullName');
                if (fullName) {
                    // Fetch the user's data from the API using their email
                    const response = await axios.get(`http://192.168.251.2:3002/api/users/${fullName}`);
                    setFullName(response.data.fullName);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchFullName();

        // Add an event listener to update the online status
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOnline(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const clearUserData = async () => {
        try {
            // Remove the user's email from the AsyncStorage
            await AsyncStorage.removeItem('@is_logged_in');
            // Reset the navigation stack and navigate to the login screen
            NativeModules.DevSettings.reload();

            navigation.navigate('login'); // Navigate to the login screen after the user logs out
            // Reset the fullName state
            setFullName('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{fullName.charAt(0)}</Text>
                </View>
                <View style={styles.userInfoContainer}>
                    <Text style={styles.nameText}>{fullName}</Text>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>
                            הרשמה למיונים
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>{isOnline ? "Online" : "Offline"}</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={clearUserData}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    avatarContainer: {
        backgroundColor: "#C4C4C4",
        borderRadius: 50,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center"
    },
    avatarText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff"
    },
    userInfoContainer: {
        marginLeft: 20
    },
    nameText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    editButton: {
        backgroundColor: "#FFA500",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10
    },
    editButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 20,
    }
})