import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const home = () => {
  return (
    <View>
      <Text>home</Text>
      <Link href="/notes/1">One</Link>
      <Link href="/notes/2">Two</Link>
      <Link href="/notes/3">Three</Link>
    </View>
  );
};

export default home;
