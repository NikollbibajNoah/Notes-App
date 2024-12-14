import {
  View,
  Text,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Stack, useFocusEffect } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { Box, Button, TextArea } from "native-base";
import axios from "axios";
import { getNoteById, saveNote } from "../../services";
import { NoteProps } from "../../NoteProps";

const NotesPage = () => {
  const [data, setData] = useState<NoteProps | null>(null);
  const [noteText, setNoteText] = useState<string>("");
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [params] = useSearchParams();
  const id: number = Number(params[1]);

  const fetchNoteData = async () => {
    const data = await getNoteById(id);

    console.log(data)
    setData(data.content);
    setNoteText(data.content);
  }

  const saveNoteAsync = async () => {
    const note:NoteProps = {
      id: id,
      content: noteText,
      date: new Date(),
    }
    const res = await saveNote(id, note);
    console.log(res);
  };

  useFocusEffect(
    useCallback(() => {
      //Get Notes
      fetchNoteData();

      return () => {
     
      };
    }, [])
  );

  return (
    <View style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <View>
        <Stack.Screen
          options={{
            headerTitle: `Details #${id}`,
            headerRight: () => (
              hasChanged ? (<View style={{marginRight: 12}}>
                <Button onPress={() => {
                  setHasChanged(false);
                  saveNoteAsync();
                }}>Speichern</Button>
              </View>) : (<></>)
            ),
          }}
        />
      </View>
      <View style={{ height: "100%" }}>
        <TextArea
          value={noteText}
          placeholder="Geben Sie hier Ihre Notiz ein... 🚀✨"
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setData(e.currentTarget.value)
          }
          onChangeText={(text: string) => {setNoteText(text); setHasChanged(true);}}
          h="100%"
          w="100%"
          tvParallaxProperties={undefined}
          onTextInput={undefined}
          autoCompleteType={undefined}
        />
      </View>
    </View>
  );
};

export default NotesPage;
