import { useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native';
import subjects from '@/src/constants/prompts';
import { Link } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useRealm } from "@realm/react";
import { useQuestion } from "@/src/context/question";
import Button from '@/src/components/button';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const { subject } = useLocalSearchParams() as { subject: string };
  const realm = useRealm();
  const setRealm = useQuestion((state) => state.setRealm);

  useEffect(() => {
    setRealm(realm);
  }, [realm]);

  return (
    <ScrollView style={styles.container}>
      <View style={{
          flex: 1, 
          display: 'flex', 
          justifyContent:  "center", 
          alignItems: "center",
        }}>
        <Text style={styles.title}>Available Subjects</Text>
        <View style={{
            flex: 1, 
            display: 'flex', 
            justifyContent:  "center", 
            alignItems: "center",
          }}
        >
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
        </View>
        <Button title={"ADD"} onPress={() => {
          router.push("/modal")
        }} processing={false} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: '#FFF',
    paddingTop: 50,
    width: Dimensions.get("window").width
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
    elevation: 3,
  },
  subjectText: {
    fontSize: 18,
  },
});