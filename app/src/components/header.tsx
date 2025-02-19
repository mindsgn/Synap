import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";

const width = Dimensions.get("window").width;

interface HeaderProps {
  title?: string;
  status?: string;
}

export default function Header({ title = "Available Courses", status }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      {status === "loading" && (
        <ActivityIndicator size="small" color="#fff" style={styles.spinner} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    padding: 16,
    backgroundColor: "#6200ea", // Change to your desired background color
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  spinner: {
    marginLeft: 8,
  },
});