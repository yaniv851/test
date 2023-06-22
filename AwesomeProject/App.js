import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/home';
import { Ionicons } from 'expo-vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import Chat from './screens/chat';
import About from './screens/about';
import Nearhamamot from './screens/nearhamamot';
import SignIn from './screens/signIn';
import SignUp from './screens/signUp';
import ForgotPasswordScreen from './screens/forgotPasswordScreen';
import NewPasswordScreen from './screens/newPasswordScreen';
import ConfirmEmailScreen from './screens/confirmEmailScreen';
import ProfileScreen from './screens/profileScreen';
import Successfull from './screens/successfull';
import MentorsChat from './screens/mentorsChat';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';

// Define your image source and style
const splashScreenImage = require('./assets/images/3.png');
const splashAnimation = require('./assets/145450-mobile-ui-creation.json');
const splashScreenImageStyle = { width: 50, height: 100 };

function Loading() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

function OnboardingScreen() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value !== null) {
        setViewedOnboarding(true)
      }
    } catch (err) {
      console.log('Error @checkOnboarding: ', err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? <Loading /> : viewedOnboarding ? <HomeScreen /> : <Onboarding />}
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
      <Text>חממות קרובות</Text>
    </View>
  );
}

// function ProfileScreen() {
//   return (
//     <SafeAreaView>

//     </SafeAreaView>
//   )
// }

const Stack = createNativeStackNavigator();

// function OnboardingStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   );
// }

const Tab = createBottomTabNavigator();



function NestedStackNavigator() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='nestedH' component={HomeScreen} />
      <Stack.Screen name='success' component={Successfull} />
      <Stack.Screen name='login' component={SignIn} />
      <Stack.Screen name='sign up' component={SignUp} />
      <Stack.Screen name='פרופיל' component={ProfileScreen} />
      <Stack.Screen name="chat" component={Chat} />
      <Stack.Screen name="אודות" options={{ headerShown: true }} component={About} />
      <Stack.Screen name="near" component={Nearhamamot} />
      <Stack.Screen name='forgot password' component={ForgotPasswordScreen} />
      <Stack.Screen name='new password' component={NewPasswordScreen} />
      <Stack.Screen name='confirm' component={ConfirmEmailScreen} />
      <Stack.Screen name='mentors' component={MentorsChat} />
    </Stack.Navigator>
  )
}

function MainTabNavigator({ route }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const prop2 = route?.params?.prop2 ?? null;

  useEffect(() => {
    const checkSignInStatus = async () => {
      const value = await AsyncStorage.getItem("@is_logged_in");
      setIsSignedIn(value);
    };

    checkSignInStatus();
  }, []);

  const handleSignOut = async () => {
    // perform sign out logic
    // ...

    // set @is_logged_in to 'false' in AsyncStorage
    await AsyncStorage.setItem("@is_logged_in", 'false');

    // update isSignedIn state to false
    setIsSignedIn(false);
  };



  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name == "דף הבית") {
            iconName = "md-home";
          }
          else if (route.name == "חממות קרובות") {
            iconName = "md-search";
          }
          else if (route.name == "פרופיל") {
            iconName = "md-person";
          }
          else if (route.name == 'התחברות') {
            iconName = "md-person";
          }
          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
      tabBarOptions={{
        activeTintColor: "#D36B0D",
        inactiveTintColor: "#898989"
      }}
    >
      <Tab.Screen name="דף הבית" component={NestedStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="חממות קרובות" component={SettingsScreen} options={{ headerShown: false }} />
      {isSignedIn && (
        <Tab.Screen name="פרופיל" component={ProfileScreen} options={{ headerShown: false }} />
      )}
      {!isSignedIn && (
        <Tab.Screen name="התחברות" component={SignIn} options={{ headerShown: false }} />
      )}
    </Tab.Navigator>
  );
}


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate a delay of 5 seconds (adjust as needed)
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
  
    prepare();
  }, []);
  

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (err) {
      console.log('Error @checkOnboarding: ', err);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);


  useEffect(() => {
    const hideSplashScreen = async () => {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    };
  
    hideSplashScreen();
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LottieView style={splashScreenImageStyle} source={splashAnimation} autoPlay loop />
      </View>
    );
  }
  
  return (
    <NavigationContainer>
      {viewedOnboarding ? (
        <MainTabNavigator />
      ) : (
        <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={MainTabNavigator} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen
            name='SignIn'
            component={SignIn}
            options={{ headerShown: false, tabBarVisible: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
