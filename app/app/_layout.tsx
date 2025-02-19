import { Stack } from "expo-router";
import "react-native-reanimated";
import { SCHEMA_VERSION, Courses } from "@/src/schema/assets";
import { RealmProvider } from "@realm/react";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { initializeDatabase } from "@/src/database";

export default function RootLayout() {
    return (
        <SQLiteProvider databaseName="synap.db" onInit={initializeDatabase}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{
                    headerShown: false,
                    presentation: "modal",
                }} />
            </Stack>
        </SQLiteProvider>
    );
};