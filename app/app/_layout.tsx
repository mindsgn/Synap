import { Stack } from "expo-router";
import "react-native-reanimated";
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from "@/src/database";
import 'react-native-get-random-values'

export default function RootLayout() {
    return (
        <SQLiteProvider databaseName="@/src/database/synap.db" onInit={initializeDatabase}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="questions" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{
                    headerShown: false,
                    presentation: "modal",
                }} />
            </Stack>
        </SQLiteProvider>
    );
};