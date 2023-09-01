import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";

const UsersScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  const handleClearStorage = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      console.log("AsyncStorage data cleared");
    } catch (error) {
      console.log("Error clearing AsyncStorage data:", error);
    }
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold", color: 'orange' }}>Swift Chat</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <MaterialIcons
            onPress={() => navigation.navigate("Friend requests")}
            name="people"
            size={24}
            color="orange"
          />
          <MaterialIcons
            onPress={() => navigation.navigate("Chats")}
            name="chat"
            size={24}
            color="orange"
          />
          <MaterialIcons
            onPress={() => navigation.navigate("Home")}
            name="home"
            size={24}
            color="orange"
          />
        </View>
      ),
    });
  }, []);


  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`https://hostingtohamamaapp3.onrender.com/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
          setLoading(false); // Update loading state after data fetch
        })
        .catch((error) => {
          console.log("error retrieving users", error);
          setLoading(false); // Update loading state in case of error
        });
    };

    fetchUsers();
  }, []);

  console.log("users", users);
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {loading ? ( // Display loading screen if loading is true
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="orange" />
          <Text>טוען...</Text>
        </View>
      ) : (
        // Display user list if loading is false
        <View>
          <ScrollView>
            {/* Display each user using the User component */}
            <View style={{ padding: 10 }}>
              {users.map((item, index) => (
                <User key={index} item={item} />
              ))}
            </View>
          </ScrollView>

          <Pressable
            onPress={handleClearStorage}
            style={{
              marginTop: 15,
              backgroundColor: "red",
              padding: 10,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
              Clear AsyncStorage Data
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
