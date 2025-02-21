import { useEffect } from "react";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { openDatabaseSync, SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from "@/src/database";
import 'react-native-get-random-values'
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations"
export const DATABASE_NAME = "synap.db"

export default function RootLayout() {
    const expoDatabase = openDatabaseSync(DATABASE_NAME);
    const database = drizzle(expoDatabase);
    const { success, error } = useMigrations(database, migrations);

    useEffect(() => {
        //if(success){
        // addCourse(database);
        //}
    },[success])

    return (
        <SQLiteProvider
            databaseName={DATABASE_NAME} 
            options= {{enableChangeListener: true}}
        >
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