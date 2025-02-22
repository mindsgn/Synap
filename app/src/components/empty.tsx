import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from "react-native";

interface EmptyCardProps {
  onPress: () => void;
}

export default function Empty({ onPress }: EmptyCardProps) {
  return (
    <TouchableOpacity style={styles.emptyCard} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.text}>Click on "ADD COURSE" to add new course</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  emptyCard: {
    height: Dimensions.get("screen").height - 250,
    margin: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "#666",
  },
});