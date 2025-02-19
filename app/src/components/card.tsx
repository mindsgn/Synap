import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  View,
  ActivityIndicator,
} from "react-native";
import { CourseData, useQuestion } from "../context/question";
import { useSQLiteContext } from 'expo-sqlite';
const width = Dimensions.get("window").width;


interface InterfacCard {
  status: string
  _id: string
}

export default function Card({status, _id}: InterfacCard) {
  const { setCourses } = useQuestion()
  const [ details, setDetails] = useState({title: null, author: null})
  const db = useSQLiteContext();

  const getCourse = async() => {
    try{
      const response = await fetch(`${process.env.EXPO_PUBLIC_API}/upload?id=${_id}`)
      const data: CourseData = await response.json()
      
      const { status: updateStatus, segments } = data;
      if (updateStatus === "successful"){
        const {authorName, category, title, totalPoints } = segments[0];
          await db.runAsync(`
          UPDATE courses SET status = ?, title = ?, author = ?, category = ?, totalPoints = ?  WHERE uuid = ?`, 
          ["unprocessed", title, authorName, category, totalPoints,  _id]
        );

        const allRows = await db.getAllAsync('SELECT * FROM courses');
        setCourses(allRows)
      }else{
        setTimeout(getCourse, 60000);
      }
    }catch(error){
      console.log(error)
    }
  }

  const getDetails = async() => {
    const row =  await db.getFirstAsync('SELECT title, author FROM courses WHERE uuid = ?', [_id]);
    setDetails({ ...row });
  }

  if (status === "unprocessed" || status === "processed" ) {
    getCourse()
    return (
      <TouchableOpacity style={[styles.container, styles.processing]}>
        <ActivityIndicator size="small" color="#000" style={styles.indicator} />
        <Text style={styles.text}>Please wait. Processing Course...</Text>
      </TouchableOpacity>
    );
  } else if (status === "successful") {
    getDetails()
    return (
      <TouchableOpacity style={[styles.container, styles.done]}>
        <Text style={styles.title}>{details.title}</Text>
        <Text style={styles.text}>by: {details.author}</Text>
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
    alignSelf: "center"
  },
  processing: {
    backgroundColor: "#f1f1f1", 
  },
  done: {
    backgroundColor: "#d4edda",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold"
  },
  indicator: {
    marginRight: 10,
  },
});
