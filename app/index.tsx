import { StyleSheet, ScrollView, Text, View } from 'react-native';
import subjects from '@/src/constants/prompts';
import { Link } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {
  const { subject } = useLocalSearchParams() as { subject: string };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Available Subjects</Text>
      {subjects.map((subject, index) => (
        <View key={index} style={styles.subjectCard}>
          <Link href={{
             pathname: '/(course)',
             params: { subject: subject.subject },
          }}>
            <Text style={styles.subjectText}>{subject.subject}</Text>
          </Link> 
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subjectCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  subjectText: {
    fontSize: 18,
  },
});