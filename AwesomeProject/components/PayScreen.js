import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert, DevSettings } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const PayPalPaymentScreen = () => {
  const [transactionId, setTransactionId] = useState('');
  const [isValidTransaction, setIsValidTransaction] = useState(false);
  const [csvData, setCsvData] = useState([]);

  const navigation = useNavigation(); // Initialize the useNavigation hook

  const fetchTransactionId = async () => {
    try {
      const response = await axios.get('https://hahamama-payments.onrender.com/payments/csv');
  
      if (Array.isArray(response.data)) {
        setCsvData(response.data);
        
        // Extract transaction IDs from CSV data
        const extractedTransactionIds = response.data.map(item => item['Transaction ID']);
  
        // Check if the provided transactionId exists in the extracted IDs
        setIsValidTransaction(extractedTransactionIds.includes(transactionId));
      } else {
        console.error('Invalid CSV data format.');
      }
    } catch (error) {
      console.error('Error fetching transactionId:', error);
    }
  };

  const handleCheckTransaction = () => {
    if (transactionId.trim() === '') {
      Alert.alert('Error', 'Please enter a transactionId.');
      return;
    }

    fetchTransactionId();
  };

  useEffect(() => {
    // Save to AsyncStorage if isValidTransaction is true
    if (isValidTransaction) {
      AsyncStorage.setItem('hasPaid', 'true')
        .then(() => {
          console.log('hasPaid set to true in AsyncStorage');
          DevSettings.reload()
        })
        .catch(error => {
          console.error('Error setting hasPaid in AsyncStorage:', error);
        });
    }
  }, [isValidTransaction]);

  return (
    <View style={{marginTop: 55}}>
      <Text>הזן מספר הזמנה:</Text>
      <TextInput
        style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={transactionId}
        onChangeText={text => setTransactionId(text)}
      />
      <Button title="בדוק מספר הזמנה" onPress={handleCheckTransaction} />

      {isValidTransaction ? (
        <Text style={{ color: 'green', marginTop: 10 }}>Transaction ID is valid!</Text>
      ) : (
        <Text style={{ color: 'red', marginTop: 10 }}>Transaction ID is invalid.</Text>
      )}
    </View>
  );
};

export default PayPalPaymentScreen;