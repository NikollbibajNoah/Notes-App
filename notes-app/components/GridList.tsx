import { Center, Box } from "native-base";
import React from "react";


/**
 * Schnittstelle für die Eigenschaften der GridList-Komponente.
 *
 * @property {React.ReactNode} [children] - Die untergeordneten Elemente, die in der GridList-Komponente gerendert werden sollen.
 */
export interface GridListProps {
  children?: React.ReactNode;
}


/**
 * Ein React Functional Component, das eine Grid-Layout-Liste darstellt.
 * 
 * @component
 * @param {GridListProps} props - Die Eigenschaften, die an die Komponente übergeben werden.
 * @param {React.ReactNode} props.children - Die untergeordneten Elemente, die innerhalb der Grid-Liste gerendert werden.
 * 
 * @returns {JSX.Element} Ein zentriertes Grid-Layout, das die untergeordneten Elemente in einer flexiblen Box anzeigt.
 */
export const GridList: React.FC<GridListProps> = ({ children }) => {
  return (
    <Center flex={1} p="4" justifyItems={"center"}>
      <Box
        flexDirection="row"
        flexWrap="wrap"
        gap={4}
        justifyContent={"center"}
      >
        {children}
      </Box>
    </Center>
  );
};

