import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { Button } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

/**
 * Eigenschaften für die ImageViewer-Komponente.
 * @property {string} [selectedImage] - Der Pfad zum ausgewählten Bild.
 * @property {() => void} onDelete - Funktion, die aufgerufen wird, um das Bild zu löschen.
 * @property {(src: string) => void} [onRotate] - Optionale Funktion, die aufgerufen wird, um das Bild zu drehen.
 * @property {(src: string) => void} [onFlip] - Optionale Funktion, die aufgerufen wird, um das Bild zu spiegeln.
 */
type ImageViewerProps = {
  selectedImage?: string;
  onDelete: () => void;
  onRotate?: (src: string) => void;
  onFlip?: (src: string) => void;
};

/**
 * Ein Komponenten, die ein Bild und eine Löschtaste anzeigt.
 *
 * @param {Object} props - Die Eigenschaften der Komponente.
 * @param {ImageSourcePropType} props.selectedImage - Das ausgewählte Bild, das angezeigt werden soll.
 * @param {Function} props.onDelete - Die Funktion, die aufgerufen wird, wenn die Löschtaste gedrückt wird.
 *
 * @returns {JSX.Element} Die ImageViewer-Komponente.
 */
export const ImageViewer = ({
  selectedImage,
  onDelete,
  onRotate,
  onFlip,
}: ImageViewerProps) => {
  return (
    <View>
      <View>
        <Image source={selectedImage} style={styles.Image} />
      </View>
      <View>
        <View style={styles.Actions}>
          <Button
            style={styles.EditButton}
            onPress={() => onRotate(selectedImage)}
          >
            <MaterialIcons name="rotate-right" size={24} color="white" />
          </Button>
          <Button
            style={styles.EditButton}
            onPress={() => onFlip(selectedImage)}
          >
            <MaterialIcons name="flip" size={24} color="white" />
          </Button>
        </View>
        <View style={styles.DeleteActions}>
          <Button style={styles.EditButton} onPress={onDelete}>
            <MaterialIcons name="delete" size={24} color="white" />
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  Actions: {
    position: "absolute",
    left: 0,
    bottom: 0,
    margin: 16,
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  DeleteActions: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 16,
  },
  EditButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
