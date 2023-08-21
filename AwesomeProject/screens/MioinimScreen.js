import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const MioinimScreen = () => {
  return (
    <View style={styles.container}>
      {/* Banner Image */}
      <Image
        source={require("../assets/splash.png")} // Replace with your image source
        style={styles.banner}
      />

      {/* Channel Title */}
      <Text style={styles.title}>My YouTube Channel</Text>

      {/* Channel Description */}
      <Text style={styles.description}>
        Welcome to my YouTube channel! Here you'll find a variety of videos on
        different topics, from tutorials to entertainment. Don't forget to
        subscribe and hit the notification bell to stay updated with my latest
        uploads.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  banner: {
    width: "100%",
    height: 200, // Adjust the height as needed
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
});

export default MioinimScreen;
