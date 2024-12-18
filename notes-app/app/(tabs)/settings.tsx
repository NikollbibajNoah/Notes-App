import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Section } from "../../components";
import { Image } from "native-base";

const benedictLogo = require("../../assets/benedict.png");
const expoLogo = require("../../assets/expo.png");
const reactLogo = require("../../assets/react.png");

const settings = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView>
        <Section label="Darstellung">
          <Text>Dunkel/Hell Modus</Text>
        </Section>
        <Section label="Infos">
          <View style={styles.Content}>
            <Text>
              Diese App wurde für das ÜK Modul 335 erstellt und dient zu test-
              und lernzwecken. Die benutzten Framework und Tools sind unter
              anderem React Native, Expo mit TypeScript. Geschrieben und
              Bearbeiten mit Visual Studio Code und GitHub.
            </Text>
          </View>

          {/* Infos */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={styles.Logo}>
              <Image
                source={benedictLogo}
                width="100%"
                height="100%"
                resizeMode="contain"
              />
            </View>
            <View style={styles.Logo}>
              <Image
                source={expoLogo}
                width="100%"
                height="100%"
                resizeMode="contain"
              />
            </View>
            <View style={styles.Logo}>
              <Image
                source={reactLogo}
                width="100%"
                height="100%"
                resizeMode="contain"
              />
            </View>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    padding: 16,
    width: "100%",
    height: "100%",
    overflowY: "scroll",
  },
  Content: {
    marginBottom: 12,
  },
  Logo: {
    width: 75,
    height: 75,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default settings;
