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
        name="modal"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}