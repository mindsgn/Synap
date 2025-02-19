import React, { useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  View,
  ActivityIndicator,
} from "react-native";
import { CourseData, useQuestion } from "../context/question";
const width = Dimensions.get("window").width;

interface InterfacCard {
  status: string
  _id: string
}

export default function Card({status, _id}: InterfacCard) {
  const { updateCourse } = useQuestion()

  const getCourse = async() => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API}/upload?id=${_id}`)
    const data: CourseData = await response.json()

    const { status: updateStatus } = data;
    if (updateStatus === "successful"){
      updateCourse(data);
    }
  }

  if (status === "unprocessed") {
    getCourse()
    return (
      <TouchableOpacity style={[styles.container, styles.processing]}>
        <ActivityIndicator size="small" color="#000" style={styles.indicator} />
        <Text style={styles.text}>Please wait. Processing Course...</Text>
      </TouchableOpacity>
    );
  } else if (status === "successful") {
    return (
      <TouchableOpacity style={[styles.container, styles.done]}>
        <Text style={styles.text}>Course Completed</Text>
      </TouchableOpacity>
    );
  }

  // Fallback view: you might use this for other statuses
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>Course Status Unknown</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 10,
    height: 60,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  processing: {
    backgroundColor: "#f1f1f1", 
  },
  done: {
    backgroundColor: "#d4edda",
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  },
  indicator: {
    marginRight: 10,
  },
});
