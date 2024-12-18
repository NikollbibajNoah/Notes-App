import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Pressable } from "react-native";
import { NoteProps } from "../NoteProps";
import { Link } from "expo-router";
import { Menu, HamburgerIcon, DeleteIcon } from "native-base";

interface NoteBoxProps extends NoteProps {
  onDelete: (id: number) => void;
}

export interface MenuItem {
  title: string;
  onClick: () => void;
  icon?: React.ReactNode;
  isDisabled?: boolean;
}

export const NoteCard: React.FC<NoteBoxProps> = ({
  id,
  content,
  date,
  onDelete,
}) => {
  const dateString = new Date(date).toLocaleDateString();
  const dateTimeString = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const MenuItems: MenuItem[] = [
    {
      title: "Löschen",
      onClick: () => onDelete(id),
      icon: <DeleteIcon />,
    },
    {
      title: "Bearbeiten",
      onClick: () => console.log("Hallo"),
    },
  ];

  return (
    <View style={styles.NoteBox}>
      <View style={styles.NoteHeading}>
        <View>
          <Text style={styles.NoteHeader}>
            <b>Notiz: </b>
            {id}
          </Text>
        </View>
        <Pressable style={styles.NoteEdit}>
          <Menu
            w="190"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <HamburgerIcon />
                </Pressable>
              );
            }}
          >
            {MenuItems.map((item: MenuItem, i: number) => (
              <Menu.Item
                key={i}
                onPress={item.onClick}
                isDisabled={item.isDisabled}
              >
                {item.icon ? item.icon : null}
                {item.title}
              </Menu.Item>
            ))}
          </Menu>
        </Pressable>
      </View>

      <Pressable>
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
      </Pressable>
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
    padding: 6,
    display: "flex",
    flexDirection: "column",
  },
  NoteContent: {
    height: 70,
    width: "100%",
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
    padding: 6,
    border: "none",
    cursor: "pointer",
    marginLeft: "auto",
    display: "flex",
    borderRadius: 50,
  },
});
