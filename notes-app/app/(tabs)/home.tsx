import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { AddIcon, Button, Heading } from "native-base";
import { CircularButton } from "../../components";
import axios from "axios";
import { NoteProps } from "../../NoteProps";
import { NoteBox } from "../../components/NoteBox";

const handleNewNote = () => {
  console.log("New Note created!");
};
const url: string = "http://localhost:5000/notes";

const home = () => {
  const [data, setData] = useState<NoteProps[]>([]);

  const loadAllNotesAsync = async () => {
    const res = (await axios.get(url)).data;

    setData(res);
  };

  useEffect(() => {
    loadAllNotesAsync();
  }, []);

  return (
    <>
      <View>
        <Heading>Home</Heading>
        <View>
          {data.length > 0 ? (
            data.map((note: NoteProps, i: number) => (
              <NoteBox key={i} {...note} />
            ))
          ) : (<View>Notizen werden geladen...</View>)}
        </View>
      </View>
      <View style={styles.AddNoteButton}>
        <CircularButton size={96} onPress={handleNewNote}>
          <AddIcon size={8} color="white" />
        </CircularButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Button: {
    width: 100,
    marginBottom: 10,
  },
  AddNoteButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 32,
  },
});

export default home;
