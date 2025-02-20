import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Quiz } from '@/src/components/quizComponents';
import { Points } from '@/src/components/pointsComponent';
import { useLocalSearchParams }  from 'expo-router';
import { useSQLiteContext } from "expo-sqlite";

export default function QuestionsScreen() {
  const [ready,] = useState(false)
  const { uuid } = useLocalSearchParams() as { uuid: string };
  const db = useSQLiteContext();
  
  const getQuestions = async() => {
    const row = await db.getAllAsync(
      `SELECT 
          c.title AS course_title,
          c.author AS course_author,
          m.uuid AS module_uuid,
          q.uuid AS question_uuid,
          q.correct_answer,
          q.explanation,
          q.points,
          o.uuid AS option_uuid,
          o.option AS option_text
        FROM courses c
        LEFT JOIN modules m ON c.uuid = m.course_uuid
        LEFT JOIN questions q ON m.uuid = q.modules_uuid
        LEFT JOIN options o ON q.uuid = o.questions_uuid
        WHERE c.uuid = ?;`,
      [uuid]
    );

    console.log(row[0])
  }

  useEffect(() => {
    getQuestions()
  }, [uuid])

  if(!ready){
    return ( 
      <View style={styles.scrollViewContainer}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Points />
        <Quiz />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 16
  },
  stepContainer: {
    marginBottom: 16,
    paddingHorizontal: 16
  },
  reactLogo: {
    height: 178,
    width: 290,
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  quizContainer: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  completionContainer: {
    padding: 16,
    alignItems: 'center'
  },
  scrollViewContainer: {
    flex:1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
    
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center'
  },
  question: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center'
  },
  optionButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 8
  },
  optionText: {
    fontSize: 16
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'center',
    marginVertical: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  feedbackContainer: {
    marginVertical: 12,
    alignItems: 'center'
  },
  feedbackText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center'
  },
  scoreContainer: {
    marginTop: 12,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  }
});
