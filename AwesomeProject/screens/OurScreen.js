import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import client from "../client";

export default function OurScreen() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blog data from your API
    client
      .fetch(
        `*[_type == "blog"] {
            name,
            txt,
            insta,
          }`
      )
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  const renderItem = ({ item }) => (                                                                   
    <View style={styles.blogItem}>
      <Text style={styles.blogTitle}>{item.name}</Text>
      <Text style={styles.blogContent}>{item.txt}</Text>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(`${item.insta}`)
        }
      >
        <Text style={styles.blogAuthor}>By {item.insta}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>בלוגים</Text>
      <FlatList
        data={blogs}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  blogItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  blogContent: {
    fontSize: 16,
    marginBottom: 5,
  },
  blogAuthor: {
    fontSize: 14,
    color: "#666",
  },
});
