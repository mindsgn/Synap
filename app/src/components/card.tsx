import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { CourseData, useQuestion } from "../context/question";
import { useSQLiteContext } from "expo-sqlite";
import { useRouter } from "expo-router";
import { updateCourse, getCourse as getCourseUUID } from "../database/courses";
import { drizzle } from 'drizzle-orm/expo-sqlite';
const width = Dimensions.get("window").width;

interface InterfaceCard {
  status: string;
  _id: string;
}

export default function Card({ status, _id }: InterfaceCard) {
  const router = useRouter()
  const db = useSQLiteContext();
  const database = drizzle(db);

  const { setCourses } = useQuestion();
  const [details, setDetails] = useState<{ title: string | null; author: string | null }>({
    title: null,
    author: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unprocessed" || status === "processed") {
      getCourse();
    }
  }, [status]);

  useEffect(() => {
    if (status === "successful") {
      getDetails();
    }
  }, [status]);

  const getCourse = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API}/upload?id=${_id}`);
      const data: CourseData = await response.json();
      if (data.status === "successful") {
        const { authorName, category, title, totalPoints } = data.segments[0];
        updateCourse({
          db: database,
          status: data.status,
          title,
          authorName,
          category,
          totalPoints,
          uuid: _id,
          segments:  data.segments,
        });
      } else {
        setTimeout(getCourse, 60000);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDetails = async () => {
    try {
      const row = await getCourseUUID({
        db: database,
        uuid: _id
      })
      //@ts-expect-error
      if (row) setDetails(row);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  if (status === "unprocessed" || status === "processed" ) {
    return (
      <TouchableOpacity style={[styles.container, styles.processing]}>
        <ActivityIndicator size="small" color="#000" style={styles.indicator} />
        <Text style={styles.text}>Please wait. Processing Course...</Text>
      </TouchableOpacity>
    );
  }

  if (status === "successful") {
    return (
      <TouchableOpacity style={[styles.container, styles.done]} onPress={() => {
        router.push({
          pathname: "/questions",
          params: { uuid: _id },
        });
      }}>
        <Text style={styles.title}>{details.title || "Unknown Title"}</Text>
        <Text style={styles.text}>by: {details.author || "Unknown Author"}</Text>
      </TouchableOpacity>
    );
  }

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
    alignSelf: "center",
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
    fontWeight: "bold",
  },
  indicator: {
    marginRight: 10,
  },
});
