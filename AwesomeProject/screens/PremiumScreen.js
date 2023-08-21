import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Video } from 'expo-av'; // Import Expo Video component
import client from '../client';

export default function PremiumScreen() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "premium"] {
          name,
          vidUrl,
          "pic": pic.asset->url,
        }`
      )
      .then((data) => {
        // Filter videos with pic only
        const movieData = data.filter((item) => item.pic);
        setMovies(movieData);
      });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Video
          source={{ uri: item.pic }}
          resizeMode="cover"
          style={{ height: 200, borderRadius: 20 }}
          useNativeControls
        />
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View>
      {movies.length > 0 && (
        <Carousel
          data={movies}
          renderItem={renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={300} // Adjust this width as needed
        />
      )}
    </View>
  );
}
