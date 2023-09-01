import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url"; // Import the image URL builder
import Carousel from "react-native-snap-carousel"; // Import Carousel component

export default function NewsFeed() {
  const [newsData, setNewsData] = useState([]);
  const [nearData, setNearData] = useState([]);
  const imageBuilder = imageUrlBuilder(client);

  useEffect(() => {
    // Fetch blog data from your API
    client
      .fetch(
        `*[_type == "gale"] {
            name,
            pic,
            insta
          }`
      )
      .then((data) => {
        setNewsData(data);
      });
  }, []);

  useEffect(() => {
    // Fetch blog data from your API
    client
      .fetch(
        `*[_type == "near"] {
            ti,
            txt,
            pict,
            inst
          }`
      )
      .then((data) => {
        setNearData(data);
      });
  }, []);

  // Function to build image URLs
  const buildImageUrl = (image) => {
    return imageBuilder.image(image).url();
  };

  const handleNewsItemPress = (insta) => {
    if (insta) {
      Linking.openURL(insta);
    }
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => handleNewsItemPress(item.insta)}
    >
      <Image
        source={{ uri: buildImageUrl(item.pic) }}
        style={styles.newsImage}
      />
      <View style={styles.newsText}>
        <Text style={styles.newsTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderNearItem = ({ item }) => (
    <TouchableOpacity
      style={styles.nearItem}
      onPress={() => handleNewsItemPress(item.inst)}
    >
      <Image
        source={{ uri: buildImageUrl(item.pict) }}
        style={styles.nearImage}
      />
      <View style={styles.newsText}>
        <Text style={styles.newsTitle}>{item.ti}</Text>
        <Text style={styles.description}>{item.txt}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Carousel
        data={nearData} // Pass the data to the Carousel
        renderItem={renderNearItem} // Render each item
        sliderWidth={400} // Adjust the width as needed
        sliderHeight={600} // Adjust the width as needed
        itemWidth={300} // Adjust the width as needed
        itemHeight={550}
      />
      <Text
        style={{
          marginTop: 20,
          marginBottom: 20,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        גלריית המיזמים שלנו
      </Text>
      <Carousel
        data={newsData} // Pass the data to the Carousel
        renderItem={renderNewsItem} // Render each item
        sliderWidth={400} // Adjust the width as needed
        itemWidth={300} // Adjust the width as needed
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  newsList: {
    padding: 16,
  },
  newsItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "column",
  },
  nearItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    height: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "column",
  },
  newsImage: {
    width: "100%",
    height: 200, // Set the desired height for the image
    resizeMode: "cover",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  nearImage: {
    width: "100%",
    height: 300, // Set the desired height for the image
    resizeMode: "cover",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  newsText: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  newsContent: {
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    color: "#333", // Dark gray text color
    marginBottom: 20,
  },
});
