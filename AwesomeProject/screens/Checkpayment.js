import { View, Text, TextInput, TouchableHighlight, Linking, Button } from 'react-native';
import React, { useState } from 'react';

export default function Checkpayment() {
  const [inputText, setInputText] = useState('');

  const websiteUrl = 'https://hahamama.netlify.app/'; // Replace with your website URL

  const handleWebsiteLinkPress = () => {
    Linking.openURL(websiteUrl);
  };

  const handleSubmit = () => {
    // You can perform your submission logic here
    console.log('Submitted:', inputText);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8, marginTop: 30 }}>
      <TouchableHighlight onPress={handleWebsiteLinkPress}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline', marginBottom: 10 }}>
          למעבר לאתר - לחץ כאן
        </Text>
      </TouchableHighlight>

      <TextInput
        placeholder="הזינו את מספר ההזמנה המופיע באתר למעלה"
        value={inputText}
        onChangeText={setInputText}
        style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
      />

      <Button
        title="שלח"
        onPress={handleSubmit}
        color="#841584"
        accessibilityLabel="שלח טופס"
      />
    </View>
  );
}
