import { Button } from "native-base";
import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

export interface CircularButtonProps {
  size: number;
  children?:ReactNode;
  onPress?: () => void;
}

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