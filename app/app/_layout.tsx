import { Stack } from "expo-router";
import "react-native-reanimated";
import { SCHEMA_VERSION, Courses } from "@/src/schema/assets";
import { RealmProvider } from "@realm/react";

export default function RootLayout() {
    return (
        <RealmProvider
            schema={[Courses]}
            schemaVersion={SCHEMA_VERSION}
        >
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{
                    headerShown: false,
                    presentation: "modal",
                }} />
            </Stack>
      </RealmProvider>
    );
};