import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
         headerShown: false
        }}
      />
      <Tabs.Screen
        name="shorts"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}