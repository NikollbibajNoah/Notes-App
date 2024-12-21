import {
  View,
  Text,
  TextInputChangeEventData,
  NativeSyntheticEvent,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Stack, useFocusEffect } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { Box, Button, TextArea } from "native-base";
import {
  getNoteById,
  readNoteByIdFromFirebase,
  saveNote,
  updateNoteToFirebase,
} from "../../services";
import { NoteProps } from "../../NoteProps";

const NotesPage = () => {
  const [data, setData] = useState<NoteProps | null>(null);
  const [noteText, setNoteText] = useState<string>("");
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [params] = useSearchParams();
  const id: number = Number(params[1]);

  const fetchNoteData = async () => {
    // const data = await getNoteById(id);
    const data = await readNoteByIdFromFirebase(id);

    setData(data.content);
    setNoteText(data.content);
  };

  const saveNoteAsync = async () => {
    const note: NoteProps = {
      id: id,
      content: noteText,
      date: new Date().toString(),
    };
    // const res = await saveNote(id, note);
    const res = await updateNoteToFirebase(note);
    console.log(res);
  };

  useFocusEffect(
    useCallback(() => {
      //Get Notes
      fetchNoteData();

      return () => {};
    }, [])
  );

  return (
    <View style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <View>
        <Stack.Screen
          options={{
            headerTitle: `Notiz #${id}`,
            headerRight: () =>
              hasChanged ? (
                <View style={{ marginRight: 12 }}>
                  <Button
                    onPress={() => {
                      setHasChanged(false);
                      saveNoteAsync();
                    }}
                  >
                    Speichern
                  </Button>
                </View>
              ) : (
                <></>
              ),
          }}
        />
      </View>
      <View style={{ height: "100%" }}>
        <KeyboardAvoidingView style={{ height: "100%" }}>
          <Box style={{ flex: 1 }}>
            <TextInput
              style={styles.textInput}
              value={noteText}
              onChangeText={(value) => {
                setNoteText(value);
                setHasChanged(true);
              }}
              placeholder="Geben Sie hier Ihre Notiz ein... 🚀✨"
              multiline={true} // Aktiviert TextArea-ähnliches Verhalten
              numberOfLines={4} // Legt die Höhe des Textfeldes fest
            />
          </Box>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top", // Text oben ausrichten
    fontSize: 16,
  },
});

export default NotesPage;
