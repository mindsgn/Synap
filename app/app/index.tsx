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
import { getAllCourses } from '@/src/database/courses';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import CalendarHeatmap from 'react-native-calendar-heatmap';

export default function HomeScreen() {
  const router = useRouter();
  const db = useSQLiteContext();
  const database = drizzle(db)
  const { courses, setCourses } = useQuestion();

  const getAll = async() => {
    try {
      const allRows = await getAllCourses({db: database});
      if (!allRows) return;
      setCourses(allRows);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <View style={styles.container}>
      <CalendarHeatmap
        endDate={new Date('1994-01-01')}
        numDays={600}
        values={[
          { date: '2016-01-01' },
          { date: '2016-01-22' },
          { date: '2016-01-30' },
        ]}
      />
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