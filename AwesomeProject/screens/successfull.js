import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Successfull() {
    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate("פרופיל");
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>תודה שנרשמתם אלינו!</Text>
            <TouchableOpacity onPress={handleClick}>
                <Text>
                    קחו אותי לפרופיל שלי
                </Text>
            </TouchableOpacity>
        </View>
    )
}