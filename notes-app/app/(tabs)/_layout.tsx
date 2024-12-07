import { Text, View } from "react-native";
import React, { Component } from "react";
import { Tabs } from "expo-router";

export const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{title: "Notizen"}} />
      <Tabs.Screen name="settings" options={{title: "Einstellungen"}} />
    </Tabs>
  );
};

export default TabsLayout;
