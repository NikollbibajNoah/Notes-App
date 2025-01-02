import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { NoteProps } from "../NoteProps";
import { Link } from "expo-router";
import {
  Menu,
  HamburgerIcon,
  DeleteIcon,
  Center,
  Text,
  Button,
} from "native-base";
interface NoteBoxProps extends NoteProps {
  onDelete: (id: number) => void;
}

/**
 * Schnittstelle für ein Menüelement.
 *
 * @interface MenuItem
 * @property {string} title - Der Titel des Menüelements.
 * @property {() => void} onClick - Die Funktion, die beim Klicken auf das Menüelement aufgerufen wird.
 * @property {React.ReactNode} [icon] - Optionales Symbol, das im Menüelement angezeigt wird.
 * @property {boolean} [isDisabled] - Optionales Flag, das angibt, ob das Menüelement deaktiviert ist.
 */
export interface MenuItem {
  title: string;
  onClick: () => void;
  icon?: React.ReactNode;
  isDisabled?: boolean;
}

/**
 * NoteCard-Komponente, die eine Notiz anzeigt und Optionen zum Löschen bietet.
 *
 * @param {NoteBoxProps} props - Die Eigenschaften der NoteCard-Komponente.
 * @param {string} props.id - Die eindeutige ID der Notiz.
 * @param {string} props.content - Der Inhalt der Notiz.
 * @param {string} props.date - Das Datum der letzten Bearbeitung der Notiz.
 * @param {function} props.onDelete - Die Funktion, die aufgerufen wird, wenn die Notiz gelöscht werden soll.
 *
 * @returns {JSX.Element} Die gerenderte NoteCard-Komponente.
 */
export const NoteCard: React.FC<NoteBoxProps> = ({
  id,
  content,
  date,
  images,
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
  ];

  return (
    <View style={styles.NoteBox}>
      <View style={styles.NoteHeading}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Text style={styles.NoteHeader}>Notiz: {id}</Text>
          {images && images.length > 0 ? (
            <Text>📷: {images.length}</Text>
          ) : (
            <></>
          )}
        </View>
        <Button style={styles.NoteEdit}>
          <Menu
            w="190"
            offset={-64}
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
        </Button>
      </View>

      <Pressable>
        <Link href={`/notes/${id}`}>
          <Center style={styles.NoteContent}>
            <Text numberOfLines={4} style={styles.NoteContentText}>
              {content}
            </Text>
          </Center>
          <View style={styles.DateDisplay}>
            <Text style={{ fontFamily: "NotoSans-Regular" }}>
              Zuletzt bearbeitet:
            </Text>
            <Text
              style={{
                color: "gray",
                fontFamily: "NotoSans-Italic",
                fontSize: 12,
              }}
            >
              {dateString} - {dateTimeString}
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
    height: 65,
    width: "100%",
    color: "gray",
  },
  NoteContentText: {
    width: "100%",
    height: 65,
    flexWrap: "wrap",
    fontSize: 12,
  },
  NoteHeader: {
    fontSize: 16,
    fontFamily: "NotoSans-Bold",
  },
  DateDisplay: {
    marginTop: "auto",
    fontFamily: "NotoSans-Regular",
  },
  NoteHeading: {
    height: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  NoteEdit: {
    padding: 10,
    border: "none",
    cursor: "pointer",
    marginLeft: "auto",
    display: "flex",
    borderRadius: 50,
    backgroundColor: "#DEDEDE",
    zIndex: 10,
  },
  ImgCount: {
    zIndex: 10,
    position: "absolute",
    left: 0,
    bottom: 0,
    padding: 4,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});
