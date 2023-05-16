import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Animated, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from 'expo-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Carousel from 'react-native-snap-carousel';
import { Video } from 'expo-av';
import client from '../client';
import 'react-native-url-polyfill/auto';



// const movies = [
//   {
//     image: require('../assets/logo.png'),
//   },
//   {
//     image: require('../assets/logo.png'),
//   },
//   {
//     image: require('../assets/logo.png'),
//   },
// ];

function HomeScreen() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const [showView1, setShowView1] = useState(false);
  const [showView2, setShowView2] = useState(false);
  const [showView3, setShowView3] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    client.fetch(
      `*[_type == "vids"] {
        name,
        vidUrl,
        "pic": pic.asset->url,
      }`
    ).then((data) => {
      setMovies(data);
    })
  }, []);

  console.log(movies)

  const CustomVideoPlayer = ({ source, name }) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const handlePlayPause = () => {
      if (status.isPlaying) {
        video.current.pauseAsync();
      } else {
        video.current.playAsync();
      }
    };

    return (
      <View>
        <TouchableOpacity onPress={handlePlayPause} style={{alignItems: 'center'}}>
          <Video
            ref={video}
            source={source}
            resizeMode="cover"
            style={{ width: '100%', height: 300, borderRadius: 20 }}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 20,
              padding: 10,
            }}
          >
            <AntDesign
              name={status.isPlaying ? 'pause' : 'play'}
              size={24}
              color="white"
            />
          </View>
          <Text>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };


  // Modify your renderItem function
  const renderItem = ({ item }) => (
    <CustomVideoPlayer
      source={item.pic ? { uri: item.pic } : { uri: item.vidUrl }}
      name={item.name}
    />
  );

  const handleTouchableOpacityClick = () => {
    setShowView1(true);
    setShowView2(true);
    setShowView3(true);
  };

  const chatnavi = () => {
    navigation.navigate("mentors")
  }

  const [loaded] = useFonts({
    DanaYadAlefAlefAlef: require("../assets/fonts/DanaYadAlefAlefAlef-Normal.ttf"),
  })

  if (!loaded) {
    return null;
  }

  const animatedValue = new Animated.Value(0);

  const opacityAnimation = Animated.timing(animatedValue, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  });

  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();

  const handleodotpress = () => {
    navigation.navigate("אודות");
  }

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding');
    } catch (err) {
      console.log('Error @clearOnboarding', err)
    }
  }



  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1, position: "relative" }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8, marginTop: 30 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 40, color: '#56A309' }}>הידעת? קטשופ שימש לראשונה כתרופה</Text>
        <TouchableOpacity style={{
          borderRadius: 150,
          width: 250,
          height: 250,
          backgroundColor: '#D36B0D',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 10,
          shadowColor: '#000',
          shadowRadius: 100,
          shadowOffset: { width: 20, height: 20 },
        }}
          onPress={handleTouchableOpacityClick}>
          {/* <Text style={{  }}> */}
          <Text style={{ fontSize: 40, textAlign: 'center', justifyContent: 'center', color: 'white', fontFamily: 'DanaYadAlefAlefAlef' }}>
            החממה -
          </Text>
          <Text style={{ fontSize: 25, textAlign: 'center', justifyContent: 'center', color: 'white', fontFamily: 'DanaYadAlefAlefAlef' }}>
            רשת חברתית
          </Text>
          <Text style={{ fontSize: 25, textAlign: 'center', justifyContent: 'center', color: 'white', fontFamily: 'DanaYadAlefAlefAlef' }}>
            ליזמות חברתית
          </Text>
          {/* </Text> */}
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', justifyContent: 'center', marginTop: 20, }}>
          {showView1 &&
            <Animated.View style={{ width: 70, marginRight: 20, height: 50, position: 'relative', opacity: animatedValue }}>
              <Text onPress={handleodotpress}>מי אנחנו?</Text>
            </Animated.View>
          }
          {showView2 &&
            <Animated.View style={{ width: 90, marginRight: 20, height: 50, position: 'relative', opacity: animatedValue }} >
              <Text>החממות שלנו</Text>
            </Animated.View>
          }
          {showView3 &&
            <Animated.View style={{ width: 90, height: 50, position: 'relative', opacity: animatedValue }} >
              <Text onPress={chatnavi}>הפנייה לצ'אט</Text>
            </Animated.View>
          }

          {/* how can I add here a netflix movie slider */}
        </View>
      </View>
      {/* <Text>Home</Text> */}
      {/* <TouchableOpacity onPress={clearOnboarding}>
          <Text>clear</Text>
        </TouchableOpacity> */}
      <Text style={{ color: '#62656b', marginLeft: 30, fontFamily: 'DanaYadAlefAlefAlef', fontSize: 20 }}>תתחילו ליזום!</Text>
      <View style={{ marginTop: 50 }}>
        <Carousel
          data={movies}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={200}
          windowSize={2}
          bounces={false}
          enableSnap={false}
        />
      </View>


    </ScrollView>
  );
}


// const VideoItem = ({ item }) => {

//   return (
//     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//       <Video
//         source={{ uri: movie }}
//         rate={1.0}
//         volume={1.0}
//         isMuted={false}
//         resizeMode="cover"
//         shouldPlay={false}
//         style={{ width: '100%', height: 200 }}
//       />
//       <Text>{item.name}</Text>
//     </View>
//   );
// };


export default HomeScreen;