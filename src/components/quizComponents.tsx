import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useState } from 'react';
import { useQuestion } from '@/src/context/question';
import { usePoints } from '@/src/context/points';

export function Quiz() {
  const { questions, generateQuiz } = useQuestion();
  const { setPoints, totalPoints, points, setTotalPoints } = usePoints();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const currentQuestionData = questions[currentQuestion];

  const handleOptionClick = (index: number) => {
    if (!submitted) {
      setSelected(index);
    }
  };

  const handleSubmit = (points: number) => {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === currentQuestionData.correctAnswer) {
        setPoints(points);
    }
  };

  const handleNext = () => {
    setSubmitted(false);
    setSelected(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (currentQuestion >= questions.length) {
    return (
      <View style={styles.completionContainer}>
        <Text style={[styles.title, { marginBottom: 16 }]}>Quiz Completed!</Text>
        <Text style={styles.text}>
          Your score is {points} out of {totalPoints}
        </Text>
        <TouchableOpacity
          onPress={async() => {
            const response = await generateQuiz()
            setTotalPoints(response.totalPoints);
            setCurrentQuestion(0);
            setPoints(0);
            setSelected(null);
            setSubmitted(false);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.quizContainer}>
      <Text style={styles.subtitle}>Quiz</Text>
      <Text style={styles.question}>{currentQuestionData.question}</Text>
      {currentQuestionData.options.map((option, index) => {
        let backgroundColor = '#fff';
        if (submitted) {
          // Highlight the correct answer green and selected wrong answer red.
          if (index === currentQuestionData.correctAnswer) {
            backgroundColor = '#d4edda';
          } else if (index === selected) {
            backgroundColor = '#f8d7da';
          }
        } else if (index === selected) {
          backgroundColor = '#cce5ff';
        }
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionClick(index)}
            disabled={submitted}
            style={[styles.optionButton, { backgroundColor }]}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}
      {!submitted ? (
        <TouchableOpacity
          onPress={() => handleSubmit(currentQuestionData.points)}
          disabled={selected === null}
          style={[
            styles.button,
            selected === null && { backgroundColor: '#aaa' }
          ]}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.feedbackContainer}>
          {selected !== currentQuestionData.correctAnswer && (
            <Text style={[styles.feedbackText, { color: 'red' }]}>
              Sorry, that's incorrect.
              {"\n"}
              <Text style={{ fontWeight: 'bold' }}>Explanation:</Text> {currentQuestionData.explanation}
            </Text>
          )}
          {selected === currentQuestionData.correctAnswer && (
            <Text style={[styles.feedbackText, { color: 'green' }]}>
              Correct!
            </Text>
          )}
          <TouchableOpacity onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>Next Question</Text>
          </TouchableOpacity>
        </View>
      )}
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
    paddingTop: 80,
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
