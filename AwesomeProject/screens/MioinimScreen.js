import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";
import { Button, Card } from "react-native-paper";

const MioinimScreen = () => {
  const [newsData, setNewsData] = useState([]);
  const imageBuilder = imageUrlBuilder(client);

  useEffect(() => {
    // Fetch blog data from your API
    client
      .fetch(
        `*[_type == "mioon"] {
          name,
          txt,
          banner
        }`
      )
      .then((data) => {
        setNewsData(data);
      });
  }, []);

  // Assuming you have only one item in the newsData array
  const item = newsData[0];

  const handleOpenWebsite = () => {
    Linking.openURL("https://www.imkforms.com/forms/zform_87931690115107"); // Open the website URL
  };

  return (
    <View style={styles.container}>
      {/* Banner Image */}
      {item && (
        <Image source={{ uri: item.banner }} style={styles.banner} />
      )}

      <Card style={styles.card}>
        <Card.Content>
          {/* Channel Title */}
          {item && <Text style={styles.title}>{item.name}</Text>}

          {/* Channel Description */}
          {item && (
            <Text style={styles.description}>{item.txt}</Text>
          )}

          {/* Button to open the website */}
          <Button
            mode="contained"
            onPress={handleOpenWebsite}
            style={styles.button}
          >
            הרשמה למיונים
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Light gray background color
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    width: "100%",
    height: 200,
    resizeMode: "cover", // Make the image cover its container
    marginBottom: 20,
    borderRadius: 8, // Rounded corners
  },
  card: {
    width: "90%",
    borderRadius: 8,
    elevation: 4, // Add elevation for a card-like effect
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333", // Dark gray text color
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#D36B0D", // Blue button background color
    paddingVertical: 10,
    borderRadius: 8,
  },
});

export default MioinimScreen;
