import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, } from 'react';
import { useQuestion } from '@/src/context/question';
import { Quiz } from '@/src/components/quizComponents';
import { Points } from '@/src/components/pointsComponent';
import { usePoints } from '@/src/context/points';
import { useLocalSearchParams }  from 'expo-router';

export default function HomeScreen() {
  const { subject } = useLocalSearchParams() as { subject: string };
  const { generateQuiz, ready } = useQuestion();
  const { setTotalPoints } = usePoints();

  const getQuize = async() => {
    const response = await generateQuiz();
    setTotalPoints((response).totalPoints);
  };

  useEffect(() => {
    getQuize()
  },[]);

  if(!ready){
    return ( 
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ActivityIndicator />
      </ScrollView>
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
    paddingBottom: 32
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
