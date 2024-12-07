import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { NoteProps } from "../NoteProps";
import { Link } from "expo-router";

export const NoteBox: React.FC<NoteProps> = ({ id, content, date }) => {
  return (
    <Link href={`/notes/${id}`}>
      <View style={styles.NoteBox}>
        <View>
          <Text style={styles.NoteHeader}>
            <b>Notiz: </b>
            {id}
          </Text>
        </View>
        <View style={styles.NoteContent}>
          <Text numberOfLines={4}>{content}</Text>
        </View>
        <View style={styles.DateDisplay}>
          Zuletzt bearbeitet: <br />
          <Text style={{ color: "gray" }}>
            <em>{date.toString()}</em>
          </Text>
        </View>
      </View>
    </Link>
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
    maxHeight: 70,
    color: "gray",
  },
  NoteHeader: {
    fontSize: 16,
  },
  DateDisplay: {
    marginTop: "auto",
  },
});
