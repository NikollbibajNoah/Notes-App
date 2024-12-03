import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Button, Heading } from "native-base";

const home = () => {
  return (
    <View>
      <Heading>Home</Heading>
      <View style={styles.Button}>
        <Button>
          <Link href="/notes/1">One</Link>
        </Button>
      </View>
      <View style={styles.Button}>
        <Button>
          <Link href="/notes/2">Two</Link>
        </Button>
      </View>
      <View style={styles.Button}>
        <Button>
          <Link href="/notes/3">Three</Link>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Button: {
    width: 100,
    marginBottom: 10,
  },
});

export default home;
