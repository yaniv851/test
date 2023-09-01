import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { Ionicons } from "expo-vector-icons";
import HomeScreen from "./screens/HomeScreen";
import FriendsScreen from "./screens/FriendsScreen";
import ChatsScreen from "./screens/ChatsScreen";
import ChatMessagesScreen from "./screens/ChatMessagesScreen";
import UsersScreen from "./screens/UsersScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Nearhamamot from "./screens/nearhamamot";
import MioinimScreen from "./screens/MioinimScreen";
import OurScreen from "./screens/OurScreen";
import About from "./screens/about";
import PremiumScreen from "./screens/PremiumScreen";

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name == "דף הבית") {
            iconName = "md-home";
          } else if (route.name == "חממות קרובות") {
            iconName = "md-search";
          } else if (route.name == "מיונים") {
            iconName = "md-create";
          } else if (route.name == "התחברות") {
            iconName = "md-person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#D36B0D",
        inactiveTintColor: "#898989",
      }}
    >
      <Tab.Screen name="דף הבית" component={HomeScreen} />
      <Tab.Screen name="חממות קרובות" component={Nearhamamot} />
      <Tab.Screen name="מיונים" component={MioinimScreen} />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomeTabs} options={{headerShown: false}} />
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="קורס דיגיטלי" component={PremiumScreen} />

        <Stack.Screen name="Friend requests" component={FriendsScreen} />
        <Stack.Screen name="אודות" options={{ headerShown: true }} component={About} />

        <Stack.Screen name="Chats" component={ChatsScreen} />
        <Stack.Screen name="החממות שלנו" component={OurScreen} />

        <Stack.Screen name="Messages" component={ChatMessagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
