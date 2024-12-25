import React from "react";
import { View, StyleSheet, Text } from "react-native";

/**
 * Schnittstelle für die Eigenschaften einer Sektion.
 *
 * @interface SectionProps
 * @property {string} label - Das Label der Sektion.
 * @property {React.ReactNode} children - Die untergeordneten Elemente der Sektion.
 */
export interface SectionProps {
  label: string;
  children: React.ReactNode;
}

/**
 * Ein React Functional Component, das einen Abschnitt mit einem Label und Inhalt darstellt.
 *
 * @param {SectionProps} props - Die Eigenschaften, die an die Komponente übergeben werden.
 * @param {string} props.label - Das Label, das im Abschnitt angezeigt wird.
 * @param {React.ReactNode} props.children - Der Inhalt, der im Abschnitt angezeigt wird.
 *
 * @returns {JSX.Element} Ein JSX-Element, das den Abschnitt darstellt.
 */
export const Section: React.FC<SectionProps> = ({ label, children }) => {
  return (
    <View style={styles.Container}>
      <View>
        <Text style={styles.Label}>{label}</Text>
      </View>
      <View style={styles.Content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  Label: {
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "NotoSans-Bold",
  },
  Container: {
    marginBottom: 32,
  },
  Content: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
