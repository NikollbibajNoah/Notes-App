import { database } from "../firebaseConfig";
import { get, ref, remove, set } from "firebase/database";
import { NoteProps } from "../NoteProps";

//Hauptendpunkt für die Datenbank
const urlEndpoint: string = "/notes";

/**
 * Löscht eine Notiz aus Firebase anhand der angegebenen Notiz-ID.
 *
 * @param {number} noteId - Die ID der zu löschenden Notiz.
 * @returns {Promise<void>} - Ein Promise, das aufgelöst wird, wenn die Notiz erfolgreich gelöscht wurde.
 * @throws {Error} - Wenn ein Fehler beim Löschen der Notiz auftritt.
 */
export const deleteNoteFromFirebase = async (noteId: number) => {
  const userRef = ref(database, urlEndpoint + "/" + noteId);

  try {
    const snapshot = await remove(userRef);
    console.log("Datei erfolgreich gelöscht!", snapshot);
  } catch (error) {
    console.error("Fehler beim löschen der Datei:", error);
  }
};

/**
 * Aktualisiert eine Notiz in Firebase.
 *
 * @param {NoteProps} note - Die Notiz, die aktualisiert werden soll.
 * @returns {Promise<void>} - Ein Promise, das aufgelöst wird, wenn die Notiz erfolgreich aktualisiert wurde.
 * @throws {Error} - Wirft einen Fehler, wenn die Aktualisierung fehlschlägt.
 */
export const updateNoteToFirebase = async (note: NoteProps) => {
  const userRef = ref(database, urlEndpoint + "/" + note.id);

  try {
    const snapshot = await set(userRef, note);
    console.log("Datei erfolgreich geändert!", snapshot);
  } catch (error) {
    console.error("Fehler beim ändern der Datei:", error);
  }
};

/**
 * Liest Notizen aus Firebase.
 *
 * Diese Funktion liest Notizen aus der Firebase-Datenbank und gibt sie als Array von NoteProps zurück.
 *
 * @returns {Promise<NoteProps[]>} Ein Promise, das ein Array von NoteProps zurückgibt, wenn die Daten vorhanden sind.
 * @throws {Error} Wenn ein Fehler beim Lesen der Daten auftritt.
 */
export const readNotesFromFirebase = async (): Promise<NoteProps[]> => {
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

/**
 * Liest eine Notiz aus Firebase anhand der angegebenen Notiz-ID.
 *
 * @param {number} noteId - Die ID der Notiz, die gelesen werden soll.
 * @returns {Promise<NoteProps>} Ein Promise, das die Notizdaten zurückgibt, wenn sie existieren.
 * @throws {Error} Wenn ein Fehler beim Lesen der Daten auftritt.
 */
export const readNoteByIdFromFirebase = async (
  noteId: number
): Promise<NoteProps> => {
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
