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

const NotesPage = () => {
  const [data, setData] = useState<string | null>(null);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [params] = useSearchParams();
  const id: number = Number(params[1]);

  const url: string = "http://localhost:5000/notes";

  const loadNotesAsync = async () => {
    await axios
      .get(url)
      .then((res) => setData(res.data[0].content))
      .catch((error) => console.error(error));
  };

  const saveNoteAsync = async () => {
    try {
      const note = {
        content: data,
      };

      await axios.put(`${url}/${id}`, note).then((res) => console.log(res));
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      //Get Notes
      loadNotesAsync();

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
          value={data}
          placeholder="Geben Sie hier Ihre Notiz ein... 🚀✨"
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setData(e.currentTarget.value)
          }
          onChangeText={(text: string) => {setData(text); setHasChanged(true);}}
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
