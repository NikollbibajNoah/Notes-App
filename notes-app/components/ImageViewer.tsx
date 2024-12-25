import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Button, DeleteIcon } from "native-base";

/**
 * Eigenschaften für die ImageViewer-Komponente.
 *
 * @typedef {Object} ImageViewerProps
 * @property {string} [selectedImage] - Der Pfad zum ausgewählten Bild. Optional.
 * @property {Function} onDelete - Eine Funktion, die aufgerufen wird, wenn das Bild gelöscht werden soll.
 */
type ImageViewerProps = {
  selectedImage?: string;
  onDelete: () => void;
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
export const ImageViewer = ({ selectedImage, onDelete }: ImageViewerProps) => {
  return (
    <View>
      <View>
        <Image source={selectedImage} style={styles.Image} />;
      </View>
      <View>
        <Button style={styles.Button} onPress={onDelete} >
          <DeleteIcon color="white" />
        </Button>
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
  Button: {
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 16,
    color: "white",
    borderRadius: 50,
  }
});
