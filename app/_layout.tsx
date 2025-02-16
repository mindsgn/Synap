import { Stack } from "expo-router";
import "react-native-reanimated";
import { SCHEMA_VERSION, Content } from "@/src/schema/assets";
import { RealmProvider } from "@realm/react";

export default function RootLayout() {
    return (
        <RealmProvider
            schema={[Content]}
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