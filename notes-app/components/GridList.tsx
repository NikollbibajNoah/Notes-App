import { Center, VStack, HStack, Link, Box } from "native-base";
import { Text } from "react-native";
import React from "react";

export interface GridListProps {
  children?: React.ReactNode;
}

export const GridList: React.FC<GridListProps> = ({ children }) => {
  return (
    <Center flex={1} p="4" justifyItems={"center"}>
      <Box
        flexDirection="row"
        flexWrap="wrap" // Automatisches Umbruchverhalten
        gap={4}
        justifyContent={"center"}
      >
        {children}
      </Box>
    </Center>
  );
};

