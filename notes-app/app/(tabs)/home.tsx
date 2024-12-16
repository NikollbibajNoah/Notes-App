import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AddIcon, Box, Button, Heading, Link } from "native-base";
import { CircularButton, GridList, NoteCard } from "../../components";
import { NoteProps } from "../../NoteProps";
import {
  deleteNoteFromFirebase,
  readNotesFromFirebase,
  updateNoteToFirebase,
} from "../../services";
import { useFocusEffect } from "expo-router";
import { AlertDialog } from "native-base";

const home = () => {
  const [updatedState, setUpdatedState] = useState(false);
  const [currentNote, setCurrentNote] = useState<number>(null);
  const [data, setData] = useState<NoteProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      //Get Notes
      const fetchData = async () => {
        // if (checkConnection() && localStorageState) {

        // }
        // const notes = await getNotes(); // Local Storage
        const firebaseNotes = await readNotesFromFirebase();

        // if (notes) {
        //   setData(notes);
        // } else if (firebaseNotes) {
        //   setData(Object.values(firebaseNotes));
        // }
        if (firebaseNotes) {
          setData(Object.values(firebaseNotes));
        }
      };

      fetchData();

      setUpdatedState(false);

      return () => {};
    }, [updatedState])
  );

  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  const handleNewNote = async () => {
    let newId = data.length + 1;

    //Check duplicate ids
    data.map((note: NoteProps) => {
      if (newId === note.id) {
        newId = note.id + 1;
      }
    });

    const newNote: NoteProps = {
      id: newId,
      content: "Das ist meine neue Notiz! Click mich um zu bearbeiten.",
      date: new Date().toString(),
    };

    await updateNoteToFirebase(newNote);

    setUpdatedState(true);
  };

  const handleNoteDelete = async (id: number) => {
    await deleteNoteFromFirebase(id);

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
            {data && data.length > 0 ? (
              data
                .sort(
                  (a: NoteProps, b: NoteProps) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((note: NoteProps, i: number) => (
                  <NoteCard
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
          <AlertDialog.Header>Notiz Löschen?</AlertDialog.Header>
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
