import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai"

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const currentQuestionData = questions[currentQuestion];

  const handleOptionClick = (index: number) => {
    if (!submitted) {
      setSelected(index);
    }
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === currentQuestionData.correctAnswer) {
      setScore(score + 1);
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
          Your score is {score} out of {questions.length}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setCurrentQuestion(0);
            setScore(0);
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
      <ThemedText style={styles.subtitle}>Quiz</ThemedText>
      <ThemedText style={styles.question}>{currentQuestionData.question}</ThemedText>
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
            <ThemedText style={styles.optionText}>{option}</ThemedText>
          </TouchableOpacity>
        );
      })}
      {!submitted ? (
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={selected === null}
          style={[
            styles.button,
            selected === null && { backgroundColor: '#aaa' }
          ]}
        >
          <ThemedText style={styles.buttonText}>Submit</ThemedText>
        </TouchableOpacity>
      ) : (
        <View style={styles.feedbackContainer}>
          {selected !== currentQuestionData.correctAnswer && (
            <ThemedText style={[styles.feedbackText, { color: 'red' }]}>
              Sorry, that's incorrect.
              {"\n"}
              <ThemedText style={{ fontWeight: 'bold' }}>Explanation:</ThemedText> {currentQuestionData.explanation}
            </ThemedText>
          )}
          {selected === currentQuestionData.correctAnswer && (
            <ThemedText style={[styles.feedbackText, { color: 'green' }]}>
              Correct!
            </ThemedText>
          )}
          <TouchableOpacity onPress={handleNext} style={styles.button}>
            <ThemedText style={styles.buttonText}>Next Question</ThemedText>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.scoreContainer}>
        <ThemedText style={styles.text}>
          Score: {score} / {questions.length}
        </ThemedText>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const generateQuize = async() => {
    const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_API_KEY}`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Based on the provided contract: "${data.text}" and the laws of "${country}", perform the following tasks:
  
    1. **Validate the Contract**:
      - Determine if the provided text is a valid contract.
      - If it is NOT a contract, return JSON only in this format:
        {
          "error": true,
          "message": "Not a real contract."
        }
      - If it IS a contract, continue to step 2.
  
    2. **Analyze and Extract Contract Information**:
      - Extract the following details from the contract and return them in JSON format:
        {
          "error": false,
          "name": "Contract name", // Extract the name of the contract, or "contract type" if unavailable
          "company": "Company name", // Extract the company name, or "contract type" if unavailable
          "concerns": [
            // List each concern point or things to think about before signing the contract.
            // If there are no specific concerns, return an empty array.
          ],
          "contractRating": Contract fairness rating out of 10, // Rate fairness, or return 0 if undetermined
          "duration": {
            "start": Timestamp of the contract's start date, // If unavailable, return 0
            "end": Timestamp of the contract's end date // If unavailable, return 0
          },
          "description": "Short description of the contract.", // Provide a brief summary, or null if unavailable
        }
      - Ensure all extracted data is as complete and accurate as possible.
      - If a specific field cannot be determined, return a null value for that field.
  
    **Additional Notes**:
      - All data must comply with the provided contract text and laws of the specified country.
      - Be concise and accurate in the extraction and analysis.
      - If a section or data point cannot be found, ensure it is explicitly marked as "null".
  `;

    const result = await model.generateContent(prompt);

    const jsonData = extractJsonData(result.response.text())
    console.log(jsonData)
  }



  return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
