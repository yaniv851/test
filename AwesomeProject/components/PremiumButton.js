import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function PremiumButton() {
    const navigation = useNavigation(); // Get the navigation prop

    function navigateToCheckPayment() {
        navigation.navigate('checkpay'); // Navigate to the Checkpayment page
    }

    return (
        <View>
            <Button
                onPress={navigateToCheckPayment}
                title="לקורס דיגיטלי"
                color="#841584"
                accessibilityLabel="קבלו גישה למגוון סרטונים שיכינו אתכם בצורה הטובה ביותר לעולם היזמות!"
            />
        </View>
    );
}
