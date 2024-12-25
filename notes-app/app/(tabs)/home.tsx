import { View, StyleSheet, ScrollView } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AddIcon, Button, Heading } from "native-base";
import { CircularButton, GridList, NoteCard } from "../../components";
import { NoteProps } from "../../NoteProps";
import {
  deleteNoteFromFirebase,
  readNotesFromFirebase,
  updateNoteToFirebase,
} from "../../services";
import { useFocusEffect } from "expo-router";
import { AlertDialog } from "native-base";


/**
 * Die Home-Komponente zeigt eine Liste von Notizen an und ermöglicht das Hinzufügen und Löschen von Notizen.
 * 
 * @component
 * 
 * @returns {JSX.Element} Die gerenderte Home-Komponente.
 * 
 * @description
 * Diese Komponente verwendet Firebase, um Notizen zu speichern und abzurufen. 
 * Sie zeigt eine Liste von Notizen an, die nach Datum sortiert sind, und bietet Schaltflächen zum Hinzufügen und Löschen von Notizen.
 * 
 * @example
 * <Home />
 */
const home = () => {
  const [updatedState, setUpdatedState] = useState(false);
  const [currentNote, setCurrentNote] = useState<number>(null);
  const [data, setData] = useState<NoteProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Ruft Notizen aus Firebase ab und aktualisiert den Zustand mit den abgerufenen Daten.
   * 
   * Diese Funktion liest Notizen aus Firebase und setzt die abgerufenen Daten in den Zustand,
   * falls Notizen vorhanden sind.
   * 
   * @async
   * @function fetchData
   * @returns {Promise<void>} Eine Promise, die aufgelöst wird, wenn die Daten erfolgreich abgerufen wurden.
   */

  const fetchData = async () => {
    const firebaseNotes = await readNotesFromFirebase();

    if (firebaseNotes) {
      setData(Object.values(firebaseNotes));
    }
  };

  useFocusEffect(
    useCallback(() => {

      //Lade Daten aus Firebase
      fetchData();

      setUpdatedState(false);

      return () => {};
    }, [updatedState])
  );

  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  /**
   * Erstellt eine neue Notiz mit einer eindeutigen ID und fügt sie zu Firebase hinzu.
   * 
   * @async
   * @function handleNewNote
   * @returns {Promise<void>} - Eine Promise, die aufgelöst wird, wenn die Notiz erfolgreich zu Firebase hinzugefügt wurde.
   * 
   * @description
   * Diese Funktion generiert eine neue Notiz-ID basierend auf der Länge der vorhandenen Daten.
   * Sie überprüft, ob die generierte ID bereits existiert und passt sie gegebenenfalls an, um Duplikate zu vermeiden.
   * Anschließend wird eine neue Notiz mit Standardinhalt und aktuellem Datum erstellt und zu Firebase hinzugefügt.
   * Der Status wird aktualisiert, um die Benutzeroberfläche zu aktualisieren.
   */
  const handleNewNote = async () => {
    let newId = data.length + 1;

    //Kontrolliere duplizierte IDs
    data.map((note: NoteProps) => {
      if (newId === note.id) {
        newId = note.id + 1;
      }
    });

    const newNote: NoteProps = {
      id: newId,
      content: "Das ist meine neue Notiz! Click mich um zu bearbeiten.💫🖊️",
      date: new Date().toString(),
    };

    await updateNoteToFirebase(newNote);

    setUpdatedState(true);
  };

  /**
   * Löscht eine Notiz aus Firebase und aktualisiert den Zustand.
   *
   * @param {number} id - Die ID der zu löschenden Notiz.
   * @returns {Promise<void>} - Ein Promise, das aufgelöst wird, wenn die Notiz gelöscht wurde.
   */
  const handleNoteDelete = async (id: number) => {
    await deleteNoteFromFirebase(id);

    setUpdatedState(true);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.Heading}>
        <Heading style={styles.Font}>Guten Tag! Hier sind deine Notizen</Heading>
      </View>
      <ScrollView>
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
      </ScrollView>

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
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    display: "flex",
    flexDirection: "column",
  },
  Heading: {
    marginBottom: 16,
    marginTop: 16,
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
  Font: {
    fontFamily: "NotoSans-Regular"
  }
});

export default home;
