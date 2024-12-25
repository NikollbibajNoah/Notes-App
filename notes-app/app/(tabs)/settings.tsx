import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { benedictLogo, expoLogo, firebaseLogo, reactLogo, Section } from "../../components";
import { Heading, Image } from "native-base";

/**
 * Die `settings`-Komponente rendert die Einstellungen-Seite der Notizen-App.
 * 
 * @returns {JSX.Element} Die gerenderte Einstellungen-Seite.
 * 
 * @component
 * 
 * @example
 * // Beispielnutzung
 * <settings />
 * 
 * @description
 * Diese Komponente zeigt verschiedene Abschnitte der Einstellungen an, einschließlich:
 * - Daten: Informationen darüber, wie Notizen in der Cloud auf Firebase gespeichert werden.
 * - App: Informationen über den Entwickler, das Erstelldatum und die Version der App.
 * - Infos: Zusätzliche Informationen über die App und die verwendeten Frameworks und Tools.
 * 
 * @remarks
 * Die Komponente verwendet verschiedene benutzerdefinierte Stile und Schriftarten, um den Text und die Layouts zu formatieren.
 * 
 * @see {@link https://reactnative.dev/ React Native}
 * @see {@link https://expo.dev/ Expo}
 * @see {@link https://www.typescriptlang.org/ TypeScript}
 * @see {@link https://code.visualstudio.com/ Visual Studio Code}
 * @see {@link https://github.com/ GitHub}
 */
const settings = () => {
  return (
    <View style={styles.Container}>
      <ScrollView>
        <View style={styles.Heading}>
          <Heading style={{fontFamily: "NotoSans-Regular"}}>Einstellungen</Heading>
        </View>
        <Section label="Daten">
          <Text style={{fontFamily: "NotoSans-Regular"}}>
            Notizen werden in der Cloud auf Firebase gespeichert und sind somit auf 
            allen Geräten verfügbar. Die Daten werden nicht an Dritte weitergegeben.
          </Text>
        </Section>
        <Section label="App">
          <Text style={{fontFamily: "NotoSans-Regular"}}>Entwickler: Noah Nikollbibaj</Text>
          <Text style={{fontFamily: "NotoSans-Regular"}}>Erstelldatum: Dezember 2024</Text>
          <Text style={{fontFamily: "NotoSans-Regular"}}>Version: 0.1.0</Text>
        </Section>
        <Section label="Infos">
          <View style={styles.Content}>
            <Text style={{fontFamily: "NotoSans-Regular"}}>
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
            <View style={styles.Logo}>
              <Image
                source={firebaseLogo}
                width="100%"
                height="100%"
                resizeMode="contain"
              />
            </View>
          </View>
        </Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
    height: "100%",
  },
  Heading: {
    marginBottom: 16,
    marginTop: 16,
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
