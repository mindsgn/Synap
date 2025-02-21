import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Quiz } from '@/src/components/quizComponents';
import { Points } from '@/src/components/pointsComponent';
import { useLocalSearchParams }  from 'expo-router';
import { useSQLiteContext } from "expo-sqlite";

export default function QuestionsScreen() {
  const [ready, setReady] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const { uuid } = useLocalSearchParams() as { uuid: string };
  const db = useSQLiteContext();
  
  const removeDuplicateQuestions = (response: any[]): any[] => {
    const uniqueQuestions = new Map();
  
    for (const row of response) {
      const questionUuid = row.question_uuid;
  
      if (!uniqueQuestions.has(questionUuid)) {
        uniqueQuestions.set(questionUuid, row);
      } 
    }
  
    return Array.from(uniqueQuestions.values());
  };

  const getQuestions = async() => {
    try{
      const response: any[] = await db.getAllAsync(
        `SELECT DISTINCT
            c.title AS course_title,
            c.author AS course_author,
            m.uuid AS module_uuid,
            q.uuid AS question_uuid,
            q.question,
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


      const uniqueQuestions = removeDuplicateQuestions(response);
      setQuestions(uniqueQuestions)
      setReady(true);
    } catch(error){
      console.error('Error fetching questions:', error);
    }
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
      <View style={styles.quizContainer}>
        <Quiz questions={questions}/>
      </View>
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
    marginTop: 80,
    marginHorizontal: 16,
    marginVertical: 12,
    //borderWidth: 1,
    //borderColor: '#ddd',
    borderRadius: 8,
    // backgroundColor: '#fff'
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
