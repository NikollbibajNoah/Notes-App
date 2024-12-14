import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { NoteProps } from "../NoteProps";
import { Link } from "expo-router";
import { DeleteIcon } from "native-base";
import { deleteNote } from "../services";

interface NoteBoxProps extends NoteProps {
  onDelete: (id: number) => void;
}

export const NoteBox: React.FC<NoteBoxProps> = ({ id, content, date, onDelete }) => {
  const dateString = new Date(date).toLocaleDateString();
  const dateTimeString = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleNoteDelete = async () => {
    await deleteNote(id);

    console.log("Deleted " + id);
  };

  return (
    <View style={styles.NoteBox}>
      <View style={styles.NoteHeading}>
        <View>
          <Text style={styles.NoteHeader}>
            <b>Notiz: </b>
            {id}
          </Text>
        </View>
        <View style={{ marginLeft: "auto" }}>
          <button style={styles.NoteEdit} onClick={() => onDelete(id)}>
            <DeleteIcon />
          </button>
        </View>
      </View>

      <Link href={`/notes/${id}`}>
        <View style={styles.NoteContent}>
          <Text numberOfLines={4}>{content}</Text>
        </View>
        <View style={styles.DateDisplay}>
          Zuletzt bearbeitet: <br />
          <Text style={{ color: "gray" }}>
            <em>
              {dateString} - {dateTimeString}
            </em>
          </Text>
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  NoteBox: {
    width: 150,
    height: 150,
    borderRadius: 12,
    backgroundColor: "#CECECE",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    cursor: "pointer",
    padding: 6,
    display: "flex",
    flexDirection: "column",
  },
  NoteContent: {
    height: 70,
    color: "gray",
  },
  NoteHeader: {
    fontSize: 16,
  },
  DateDisplay: {
    marginTop: "auto",
  },
  NoteHeading: {
    height: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  NoteEdit: {
    padding: 4,
    border: "none",
    cursor: "pointer",
    display: "flex",
    borderRadius: 50,
  },
});
