import React from "react";
import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";

export const RootLayout = () => {
  return (
    <NativeBaseProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </NativeBaseProvider>
  );
};

export default RootLayout;
