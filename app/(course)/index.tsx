import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import subjects from '@/src/constants/prompts';
import { useQuestion } from '@/src/context/question';
import { useEffect } from 'react';

export default function SubjectDetailsScreen() {
  const { subject } = useLocalSearchParams() as { subject: string };
  const { getContent } = useQuestion()

  useEffect(() => {
    getContent(subject);
  },[])

  return (
    <ScrollView style={styles.container}>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  roadmapSection: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
  },
  level: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  topicContainer: {
    marginBottom: 15,
  },
  topicName: {
    fontSize: 18,
    fontWeight: '500',
  },
  concept: {
    fontSize: 16,
    marginLeft: 10,
  },
});