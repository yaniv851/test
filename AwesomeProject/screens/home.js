import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Animated, Image, ScrollView, Dimensions, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from 'expo-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Carousel from 'react-native-snap-carousel';
import { Video } from 'expo-av';
import client from '../client';
import 'react-native-url-polyfill/auto';
import YoutubePlayer from 'react-native-youtube-iframe';
import PremiumButton from '../components/PremiumButton';


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
  const [sentence, setSentence] = useState();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    client.fetch(
      `*[_type == "vids"] {
        name,
        vidUrl,
        "pic": pic.asset->url,
      }`
    ).then((data) => {
      // Separate videos with pic and videos with vidUrl
      const movieData = data.filter((item) => item.pic);
      const linkData = data.filter((item) => item.vidUrl && !item.pic);

      setMovies(movieData);
      setLinks(linkData);
    })
  }, []);

  useEffect(() => {
    client.fetch(
      `*[_type == "sent"] {
        name,
        txt,
      }`
    ).then((data) => {
      setSentence(data);
    })
  }, []);

  console.log(sentence)

  function extractYouTubeVideoId(url) {
    const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:shorts\/)?(?:embed\/|v\/|watch\?v=|watch\?.+&v=|embed\/videoseries\?list=))([^\s?&/]+)/;
    const match = url.match(pattern);

    if (match && match[1]) {
      const videoId = match[1];
      console.log("YouTube Video ID:", videoId);

      // Check if the link is a YouTube Short
      const isShortsLink = url.includes("/shorts");
      if (isShortsLink) {
        console.log("This is a YouTube Short!");
      }

      return videoId;
    } else {
      console.log("Invalid YouTube URL");
      return null;
    }
  }

  const [currentlyPlayingVideo, setCurrentlyPlayingVideo] = useState(null);


  const CustomVideoPlayer = ({ source, name, pic, vidUrl }) => {
    const video = React.useRef(null);


    // Function to pause the currently playing video
    const pauseCurrentVideo = async () => {
      if (currentlyPlayingVideo) {
        const status = await currentlyPlayingVideo.getStatusAsync();
        if (status.isPlaying) {
          await currentlyPlayingVideo.pauseAsync();
        }
      }
    };

    // Function to handle video play
    const handlePlay = async () => {
      // Pause the currently playing video (if any)
      pauseCurrentVideo();
      // Set the currently playing video to the current video
      setCurrentlyPlayingVideo(video.current);
      // Play the current video
      if (video.current) {
        await video.current.playAsync();
        console.log("Video is now playing:", name); // Log when the video starts playing
      }
    };

    return (
      <View>
        <Video
          ref={video}
          source={{ uri: pic }}
          resizeMode="cover"
          style={{ height: 200, borderRadius: 20 }}
          useNativeControls // This will use the default video player controls
          onPlaybackStatusUpdate={(status) => {
            // When the video playback status updates, check if it has finished playing
            // and reset the currentlyPlayingVideo if it has.
            if (status.didJustFinish) {
              pauseCurrentVideo();
              setCurrentlyPlayingVideo(null);
            }
          }}
        />
        <Text>{name}</Text>
      </View >
    );
  };

  const CustomLinkPlayer = ({ source, name, vidUrl }) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});


    const youtubeVideoId = vidUrl ? extractYouTubeVideoId(vidUrl) : null;
    console.log(youtubeVideoId)

    return (
      <View>
        <YoutubePlayer
          height={300}
          width={300}
          play={false}
          videoId={youtubeVideoId}
        />
        <Text>{name}</Text>
      </View >
    );
  };


  // Modify your renderItem function
  const renderItem = ({ item }) => {
    // If pic exists, render the CustomVideoPlayer
    if (item.pic) {
      return (
        <CustomVideoPlayer
          source={{ uri: item.pic }}
          name={item.name}
          pic={item.pic}
        />
      );
    }

    return null; // If pic doesn't exist, don't render anything
  };


  // Modify your renderItem1 function
  const renderItem1 = ({ item }) => {
    // If vidUrl exists and pic doesn't exist, render the CustomLinkPlayer
    if (item.vidUrl && !item.pic) {
      return (
        <View style={{ flex: 1 }}>
          <CustomLinkPlayer
            source={{ uri: item.vidUrl }}
            name={item.name}
            vidUrl={item.vidUrl}
          />
        </View>
      );
    }

    return null; // If either vidUrl doesn't exist or pic exists, don't render anything
  };

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
        {sentence && sentence.length > 0 && (
          <View style={{ marginBottom: 40 }}>
            <Text style={{fontWeight: 900, color: '#56A309'}} >{sentence[0].name}</Text>
            <Text >{sentence[0].txt}</Text>
          </View>
        )}
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
      {movies.length > 0 && (
        <View style={{ marginTop: 50 }}>
          <Carousel
            data={movies}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={300}
            windowSize={2}
            bounces={false}
            enableSnap={false}
          />
        </View>
      )}

      {/* Render the carousel only if there are links to display */}
      {links.length > 0 && (
        <View style={{ marginTop: 50 }}>
          <Carousel
            data={links}
            renderItem={renderItem1}
            sliderWidth={screenWidth}
            itemWidth={300}
            windowSize={2}
            bounces={false}
            enableSnap={false}
          />
        </View>
      )}

      {/* <TouchableOpacity>קבלו גישה לסרטוני פרימיום</TouchableOpacity> */}

      <PremiumButton />
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