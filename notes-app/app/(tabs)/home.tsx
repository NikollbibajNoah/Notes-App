import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AddIcon, Box, Button, Heading, Link } from "native-base";
import { CircularButton, GridList, NoteBox } from "../../components";
import { NoteProps } from "../../NoteProps";
import { createNote, deleteNote, getNotes, saveNote } from "../../services";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import { AlertDialog } from "native-base";

const home = () => {
  const [updatedState, setUpdatedState] = useState(false);
  const [currentNote, setCurrentNote] = useState<number>(null);
  const [data, setData] = useState<NoteProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      //Get Notes
      const fetchData = async () => {
        const notes = await getNotes();
        setData(notes);
      };

      fetchData();

      setUpdatedState(false);

      return () => {};
    }, [updatedState])
  );

  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  const handleNewNote = async () => {
    const newNote: NoteProps = {
      content: "Das ist meine neue Notiz! Click mich um zu bearbeiten.",
      date: new Date(),
    };

    const res = await createNote(newNote);

    if (res) {
      ///navigate to new note
    }

    setUpdatedState(true);
  };

  const handleNoteDelete = async (id: number) => {
    await deleteNote(id);

    setUpdatedState(true);
  };

  return (
    <>
      <View style={styles.Container}>
        <View style={styles.Heading}>
          <Heading>Guten Tag! Hier sind deine Notizen</Heading>
        </View>
        <View style={styles.Grid}>
          <GridList>
            {data.length > 0 ? (
              data
                .sort(
                  (a: NoteProps, b: NoteProps) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((note: NoteProps, i: number) => (
                  <NoteBox
                    key={i}
                    {...note}
                    onDelete={(id: number) => {
                      setCurrentNote(id);
                      setIsOpen(!isOpen);
                    }}
                  />
                ))
            ) : (
              <View>Erstelle deine erste Notiz! 🙌👌</View>
            )}
          </GridList>
        </View>
      </View>
      <View style={styles.AddNoteButton}>
        <CircularButton size={96} onPress={handleNewNote}>
          <AddIcon size={8} color="white" />
        </CircularButton>
      </View>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Customer</AlertDialog.Header>
          <AlertDialog.Body>
            Diese ausgwählte Notiz wird unwiderruflich gelöscht. Bist du sicher?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Abbrechen
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  handleNoteDelete(currentNote);
                  onClose();
                }}
              >
                Löschen
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "100%",
    padding: 16,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  Heading: {
    marginBottom: 16,
  },
  Grid: {},
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
