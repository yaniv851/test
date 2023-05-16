import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

export default function Chat({ route }) {
  const { mentor } = route.params;
  const [messages, setMessages] = useState([]);
  const [isMentor, setIsMentor] = useState(false);
  const [fullName, setFullName] = useState('');

  useEffect(() => {

    async function fetchFullName() {
      try {
        // Retrieve the user's email from the AsyncStorage
        const fullName = await AsyncStorage.getItem('@user_fullName');
        const isMentor = await AsyncStorage.getItem('@is_mentor');

        if (fullName) {
          // Fetch the user's data from the API using their email
          const response = await axios.get(`http://10.100.102.23:3002/api/users/${fullName}`);
          setFullName(response.data.fullName);
        }

        if (isMentor == 'true') {
          setIsMentor(true);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchFullName();
  }, []);

  console.log(isMentor);

  async function onSend(newMessages = []) {
    if (isMentor == false) {
      const message = {
        text: newMessages[0].text,
        sender: fullName,
        recipient: mentor.fullName,
      };

      try {
        await axios.post(`http://10.100.102.23:3002/api/chats`, message);
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
      } catch (error) {
        console.log(error);
      }
    }

    if (isMentor == true) {
      const message = {
        text: newMessages[0].text,
        sender: mentor.fullName,
        recipient: fullName,
      };

      try {
        await axios.post(`http://10.100.102.23:3002/api/chats`, message);
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
      } catch (error) {
        console.log(error);
      }
    }
  }


  if (isMentor == false) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
          <Text>Chat with {mentor.fullName}</Text>
        </View>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            name: fullName, // replace with actual user name
          }}
        />
      </View>
    );
  }

  else if (isMentor == true) {
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
          <Text>Chat with {fullName}</Text>
        </View>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            name: mentor.fullName, // replace with actual user name
          }}
        />
      </View>
    );
  }
}
