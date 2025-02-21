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
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "expo-router";
import { updateCourse } from "../database/courses";
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
    if (status === "unprocessed" || status === "processed"||status === "successful") {
      getCourse();
    }
  }, [status]);

  useEffect(() => {
    if (status === "unsuccessful") {
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
        })
        //await db.runAsync(
        //  `UPDATE courses SET status = ?, title = ?, author = ?, category = ?, total_points = ? WHERE uuid = ?`,
        //  [data.status, title, authorName, category, totalPoints, _id]
        //);

        /*
        for (const segment of data.segments) {
          const segmentUUID = uuidv4();
          const { summary, transcription, questions } = segment;
          const segmentStatement = await db.prepareAsync(
            `INSERT INTO modules (uuid, summary, transcription, course_uuid) VALUES (?,?,?,?)`
          );

          await segmentStatement.executeAsync([segmentUUID, summary, transcription, _id]);

          for (const question of questions) {
            const {correctAnswer, options, explanation, points, question: _question} = question
            const questionUUID = uuidv4();
            const questionStatement = await db.prepareAsync(
              `INSERT INTO questions (uuid, modules_uuid, correct_answer, question, explanation, points) VALUES (?,?,?,?,?,?)`
            );

            await questionStatement.executeAsync([questionUUID, segmentUUID, options[parseInt(`${correctAnswer}`)], _question, explanation, points]);
          
            for (const option of options) {
              const optionUUID = uuidv4();
              const optionStatement = await db.prepareAsync(
                `INSERT INTO options (uuid, questions_uuid, option ) VALUES (?,?,?)`
              );

              await optionStatement.executeAsync([ optionUUID, questionUUID, option ]);
            }
          }
        }

        const allRows = await db.getAllAsync("SELECT * FROM courses");
        setCourses(allRows);
        */
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
      const row = await db.getFirstAsync(
        "SELECT courses.title, courses.author FROM courses WHERE courses.uuid = ?",
        [_id]
      );
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
