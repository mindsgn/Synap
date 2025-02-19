import { Stack } from "expo-router";
import "react-native-reanimated";
import { SCHEMA_VERSION, Courses } from "@/src/schema/assets";
import { RealmProvider } from "@realm/react";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';

async function initializeDatabase(db) {
    try {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstName TEXT,
                lastName TEXT,
                age INTEGER,
                email TEXT
            );
        `);
        console.log('Database initialised')
    } catch (error) {
        console.log('Error while initializing database : ', error);
    }
  }

export default function RootLayout() {
    return (
        <SQLiteProvider databaseName="test.db" onInit={initializeDatabase}>
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