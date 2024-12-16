import { database } from "../firebaseConfig";
import { get, push, ref, remove, set } from "firebase/database";
import { NoteProps } from "../NoteProps";

const urlEndpoint: string = "/notes";

export const deleteNoteFromFirebase = async (noteId: number) => {
    const userRef = ref(database, urlEndpoint + "/" + noteId);

    try {
      const snapshot = await remove(userRef);
      console.log('Datei erfolgreich gelöscht!', snapshot);
    } catch (error) {
      console.error('Fehler beim löschen der Datei:', error);
    }
  };

export const updateNoteToFirebase = async (note: NoteProps) => {
    const userRef = ref(database, urlEndpoint + "/" + note.id);

    try {
      const snapshot = await set(userRef, note);
      console.log('Datei erfolgreich geändert!', snapshot);
    } catch (error) {
      console.error('Fehler beim ändern der Datei:', error);
    }
  };

export const readNotesFromFirebase = async ():Promise<NoteProps[]> => {
  const userRef = ref(database, urlEndpoint);

  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("Keine Daten verfügbar");
    }
  } catch (error) {
    console.error("Fehler beim Lesen der Daten:", error);
  }
};

export const readNoteByIdFromFirebase = async (noteId: number):Promise<NoteProps> => {
  const userRef = ref(database, urlEndpoint + "/" + noteId);

  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("Keine Daten verfügbar");
    }
  } catch (error) {
    console.error("Fehler beim Lesen der Daten:", error);
  }
};
