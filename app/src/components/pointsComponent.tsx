import { StyleSheet, View, Text } from "react-native";
import { usePoints } from "@/src/context/points";

export function Points() {
  const { points, totalPoints } = usePoints();

  return (
    <View style={styles.quizContainer}>
      <View style={styles.scoreContainer}>
        <Text style={styles.text}>
          Score: {points} / {totalPoints}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  stepContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  quizContainer: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  completionContainer: {
    padding: 16,
    alignItems: "center",
  },
  scrollViewContainer: {
    paddingTop: 80,
    paddingBottom: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  question: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  optionButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  feedbackContainer: {
    marginVertical: 12,
    alignItems: "center",
  },
  feedbackText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  scoreContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});
