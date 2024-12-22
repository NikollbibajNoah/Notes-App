import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Stack, useFocusEffect } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { Box, Button, ChevronDownIcon, ChevronUpIcon } from "native-base";
import { readNoteByIdFromFirebase, updateNoteToFirebase } from "../../services";
import { NoteProps } from "../../NoteProps";
import * as ImagePicker from "expo-image-picker";
import { ImageViewer } from "../../components";

const NotesPage = () => {
  const [noteText, setNoteText] = useState<string>("");
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [images, setSelectedImages] = useState<string[] | undefined>(undefined);
  const [sectionType, setSectionType] = useState<number>(0); //0 = split, 1 = text, 2 = image
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [params] = useSearchParams();
  const id: number = Number(params[1]);

  const fetchNoteData = async () => {
    const data = await readNoteByIdFromFirebase(id);

    setNoteText(data.content);
    setSelectedImages(data.images);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const res = result.assets[0].uri;
      if (images) {
        setSelectedImages([...images, res]);
      } else {
        setSelectedImages([res]);
      }
      setHasChanged(true);
    } else {
      alert("Keine Bild ausgewählt");
    }
  };

  const saveNoteAsync = async () => {
    const note: NoteProps = {
      id: id,
      content: noteText,
      images: images ? images : [],
      date: new Date().toString(),
    };

    await updateNoteToFirebase(note);
  };

  const deleteImg = (id: number) => {
    const p1 = images?.slice(0, id);
    const p2 = images?.slice(id + 1, images.length);

    setSelectedImages(p1.concat(p2));
    setHasChanged(true);
  };

  const collapseSection = () => {
    const currentType = sectionType + 1;

    if (currentType > 2) {
      setSectionType(0);
    } else {
      setSectionType(currentType);
    }
  };

  useFocusEffect(
    useCallback(() => {
      //Get Notes
      fetchNoteData();

      return () => {};
    }, [])
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsFocused(true);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  });

  return (
    <View style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <View>
        <Stack.Screen
          options={{
            headerTitle: ``,
            headerRight: () => (
              <View
                style={{
                  marginRight: 12,
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <Button onPress={pickImageAsync}>Hochladen📷</Button>

                {hasChanged && (
                  <Button
                    onPress={() => {
                      setHasChanged(false);
                      saveNoteAsync();
                    }}
                  >
                    Speichern
                  </Button>
                )}
                {isFocused && (
                  <Button
                    style={{ backgroundColor: "transparent" }}
                    onPress={() => {
                      Keyboard.dismiss();
                      setIsFocused(false);
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Fertig</Text>
                  </Button>
                )}
              </View>
            ),
          }}
        />
      </View>
      <View style={{ height: "100%" }}>
        <KeyboardAvoidingView style={{ height: "100%" }}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <View
              style={
                sectionType === 0
                  ? { height: "50%" }
                  : sectionType === 1
                  ? { height: "100%" }
                  : { height: "0%" }
              }
            >
              <TextInput
                style={styles.textInput}
                value={noteText}
                onChangeText={(value) => {
                  setNoteText(value);
                  setHasChanged(true);
                }}
                placeholder="Geben Sie hier Ihre Notiz ein... 🚀✨"
                multiline={true}
                numberOfLines={4}
              />
              <View
                style={[
                  styles.Separator,
                  sectionType === 1
                    ? { bottom: 25 }
                    : sectionType === 2
                    ? { bottom: -50 }
                    : { bottom: -25 },
                ]}
              >
                <Button onPress={collapseSection}>
                  <ChevronUpIcon color="white" />
                  <ChevronDownIcon color="white" />
                </Button>
              </View>
            </View>
            <View
              style={[
                {
                  height: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f0f0f0",
                },
                sectionType === 0
                  ? { height: "50%" }
                  : sectionType === 1
                  ? { height: "0%" }
                  : { height: "100%" },
              ]}
            >
              {images && images.length > 0 ? (
                <ScrollView>
                  {images.map((image: string, i: number) => (
                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                      <ImageViewer
                        key={i}
                        selectedImage={image}
                        onDelete={() => deleteImg(i)}
                      />
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <Text>Kein Bild ausgewählt 📷</Text>
              )}
            </View>
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
    textAlignVertical: "top",
    fontSize: 16,
  },
  PhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 32,
  },
  Separator: {
    width: 50,
    height: 50,
    position: "absolute",
    bottom: -25,
    left: "50%",
    transform: [{ translateX: -25 }],
    zIndex: 1000,
  },
});

export default NotesPage;
