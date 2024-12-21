import React from "react";
import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

export const RootLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

export default RootLayout;
