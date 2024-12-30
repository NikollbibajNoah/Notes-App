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
import { FlipType, manipulateAsync, SaveFormat } from "expo-image-manipulator";

const NotesPage = () => {
  const [noteText, setNoteText] = useState<string>("");
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [images, setSelectedImages] = useState<string[] | undefined>(undefined);
  const [sectionType, setSectionType] = useState<number>(0); //0 = split, 1 = text, 2 = image
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [params] = useSearchParams();
  const id: number = Number(params[1]);

  /**
   * Ruft die Notizdaten von Firebase ab und setzt den Notiztext und die ausgewählten Bilder.
   *
   * @async
   * @function fetchNoteData
   * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn die Notizdaten abgerufen und gesetzt wurden.
   */
  const fetchNoteData = async () => {
    const data = await readNoteByIdFromFirebase(id);

    setNoteText(data.content);
    setSelectedImages(data.images);
  };

  /**
   * Öffnet die Bildbibliothek des Geräts, um ein Bild auszuwählen.
   * Wenn ein Bild ausgewählt wird, wird es zur Liste der ausgewählten Bilder hinzugefügt
   * und der Status wird auf geändert gesetzt.
   * Wenn kein Bild ausgewählt wird, wird eine Warnung angezeigt.
   *
   * @async
   * @function pickImageAsync
   * @returns {Promise<void>} Eine Promise, die aufgelöst wird, wenn der Bildauswahlprozess abgeschlossen ist.
   */
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

  /**
   * Speichert die Notiz asynchron.
   *
   * Diese Funktion erstellt ein `NoteProps`-Objekt mit der aktuellen Notiz-ID, dem Notiztext,
   * den Bildern (falls vorhanden) und dem aktuellen Datum. Anschließend wird die Notiz in Firebase aktualisiert.
   *
   * @async
   * @function
   * @returns {Promise<void>} Ein Promise, das aufgelöst wird, wenn die Notiz erfolgreich gespeichert wurde.
   */
  const saveNoteAsync = async () => {
    const note: NoteProps = {
      id: id,
      content: noteText,
      images: images ? images : [],
      date: new Date().toString(),
    };

    await updateNoteToFirebase(note);
  };

  /**
   * Löscht ein Bild aus der Liste der ausgewählten Bilder.
   *
   * @param {number} id - Die ID des zu löschenden Bildes.
   */
  const deleteImg = (id: number) => {
    const p1 = images?.slice(0, id);
    const p2 = images?.slice(id + 1, images.length);

    setSelectedImages(p1.concat(p2));
    setHasChanged(true);
  };

  /**
   * Kollabiert den aktuellen Abschnitt und setzt den Abschnittstyp.
   * Erhöht den Abschnittstyp um 1. Wenn der aktuelle Abschnittstyp größer als 2 ist,
   * wird der Abschnittstyp auf 0 zurückgesetzt.
   */
  const collapseSection = () => {
    const currentType = sectionType + 1;

    if (currentType > 2) {
      setSectionType(0);
    } else {
      setSectionType(currentType);
    }
  };

  /**
   * Dreht ein Bild um 90 Grad und aktualisiert die Bild-URI in der Liste.
   *
   * @param {string} img - Der Pfad zum Bild, das gedreht werden soll.
   * @param {number} id - Die ID des Bildes in der Liste.
   * @returns {Promise<void>} - Eine Promise, die aufgelöst wird, wenn die Bildmanipulation abgeschlossen ist.
   * @throws {Error} - Gibt einen Fehler aus, wenn die Bildmanipulation fehlschlägt.
   */
  const rotateImage = async (img: string, id: number) => {
    try {
      const result = await manipulateAsync(img, [{ rotate: 90 }], {
        compress: 1,
        format: SaveFormat.JPEG,
      });

      images[id] = result.uri;

      setSelectedImages([...images]);
      setHasChanged(true);
    } catch (error) {
      console.error(error);
    }
  };
  
  /**
   * Dreht ein Bild vertikal und aktualisiert die Bildliste.
   *
   * @param {string} img - Der Pfad des zu drehenden Bildes.
   * @param {number} id - Die ID des Bildes in der Bildliste.
   * @returns {Promise<void>} - Eine Promise, die aufgelöst wird, wenn das Bild erfolgreich gedreht wurde.
   * @throws {Error} - Wenn ein Fehler beim Drehen des Bildes auftritt.
   */
  const flipImage = async (img: string, id: number) => {
    try {
      const result = await manipulateAsync(img, [{ flip: FlipType.Vertical }], {
        compress: 1,
        format: SaveFormat.JPEG,
      });

      images[id] = result.uri;

      setSelectedImages([...images]);
      setHasChanged(true);
    } catch (error) {
      console.error(error);
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
                        onRotate={() => rotateImage(image, i)}
                        onFlip={() => flipImage(image, i)}
                      />
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <Text style={{ fontFamily: "NotoSans-Regular" }}>
                  Kein Bild ausgewählt 📷
                </Text>
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
    fontFamily: "NotoSans-Regular",
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
