import { Button } from "native-base";
import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";


/**
 * Schnittstelle für die Eigenschaften der CircularButton-Komponente.
 *
 * @property {number} size - Die Größe des Buttons.
 * @property {ReactNode} [children] - Die optionalen Kinderkomponenten, die innerhalb des Buttons gerendert werden.
 * @property {() => void} [onPress] - Die optionale Funktion, die beim Drücken des Buttons aufgerufen wird.
 */
export interface CircularButtonProps {
  size: number;
  children?:ReactNode;
  onPress?: () => void;
}

/**
 * Eine runde Button-Komponente.
 *
 * @param {CircularButtonProps} props - Die Eigenschaften für die runde Button-Komponente.
 * @param {number} props.size - Die Größe (Durchmesser) des runden Buttons.
 * @param {React.ReactNode} props.children - Der Inhalt, der innerhalb des Buttons angezeigt wird.
 * @param {() => void} props.onPress - Die Funktion, die aufgerufen wird, wenn der Button gedrückt wird.
 *
 * @returns {JSX.Element} Die gerenderte runde Button-Komponente.
 */
export const CircularButton: React.FC<CircularButtonProps> = ({ size, children, onPress }) => {
  return (
    <View style={{ width: size, height: size, display: "flex" }}>
      <Button onPress={onPress} style={[styles.CircularButton, { borderRadius: 50, width: size, height: size }]}>
        {children}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  CircularButton: {
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  }
})