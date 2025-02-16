import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  View,
  ActivityIndicator,
} from "react-native";

const width = Dimensions.get("window").width;

interface interfaceButton {
  onPress: () => void;
  title: string;
  background?: string;
  processing: boolean;
}

export default function Button({
  onPress,
  title,
  background = "black",
  processing = false,
}: interfaceButton) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: background }]}
      disabled={processing}
    >
      {processing ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ActivityIndicator color="white" />
          <Text style={styles.text}>{"PROCESSING"}</Text>
        </View>
      ) : (
        <Text style={styles.text}>{`${title}`.toLocaleUpperCase()}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "black",
    width: width - 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
