import React from "react";
import { View, StyleSheet, Text } from "react-native";

export interface SectionProps {
  label: string;
  children: React.ReactNode;
}

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
