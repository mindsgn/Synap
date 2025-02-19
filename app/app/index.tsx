import { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useQuestion } from "@/src/context/question";
import Button from '@/src/components/button';
import { useRouter } from 'expo-router';
import { FlashList } from "@shopify/flash-list";
import Card from '@/src/components/card';
import Header from '@/src/components/header';
import Empty from '@/src/components/empty';
import { useSQLiteContext } from 'expo-sqlite';

export default function HomeScreen() {
  const router = useRouter();
  const db = useSQLiteContext();
  const { courses, setCourses } = useQuestion();

  const getAll = async() => {
    const allRows = await db.getAllAsync('SELECT * FROM courses');
    setCourses(allRows)
  }

  useEffect(() => {
    getAll()
  }, []);

  return (
    <View style={styles.container}>
      <View style={{
          flex: 1, 
        }}>
        <View style={{
            flex: 1, 
          }}
        >
          <FlashList
            data={courses}
            ListEmptyComponent={<Empty onPress={() => {}} />}
            ListHeaderComponent={
              <Header />
            }
            renderItem={({ item }) => 
              <Card _id={item.uuid} status={item.status}/>
            }
            estimatedItemSize={200}
          />
        </View>
        <Button title={"ADD COURSE"} onPress={() => {
          router.push("/modal")
        }} processing={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: '#FFF',
    paddingTop: 50,
    width: Dimensions.get("window").width,
    paddingBottom: 20
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