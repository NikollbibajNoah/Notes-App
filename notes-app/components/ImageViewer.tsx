import { StyleSheet, View } from "react-native";
import { Image, ImageSource } from "expo-image";
import { Button, DeleteIcon } from "native-base";

type Props = {
  imgSource?: ImageSource;
  selectedImage?: string;
  onDelete: () => void;
};

export const ImageViewer = ({ imgSource, selectedImage, onDelete }: Props) => {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return (
    <View>
      <View>
        <Image source={selectedImage} style={styles.image} />;
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
  image: {
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
