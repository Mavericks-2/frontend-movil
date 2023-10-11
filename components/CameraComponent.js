import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import LineDrawing from './LineDrawing';


export default function CameraComponent() {
  const [hasPermission, setHasPermission] = useState();
  const [hasMediaPermission, setHasMediaPermission] = useState();
  const [photo, setPhoto] = useState();

  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(mediaStatus === "granted");
    })();
  }, []);


  const takePic = async () => {
    try{
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      newPhoto = await resize(newPhoto);
      setPhoto(newPhoto);
    }
    catch(error){
      console.error("Error al tomar la foto", error.message);
    }
  };

  const sharePic = () => {
    shareAsync(photo.uri).then(() => {
      setPhoto(undefined);
    });
  };

  const savePhoto = () => {
    MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
      setPhoto(undefined);
    });
  };

  const resize = async (photo) => {
    try {
      const compressed = await ImageManipulator.manipulateAsync(
        photo.uri,
        [],
        { compress: 0 } // Ajusta el valor de compresión según tus necesidades
      );
      return compressed;
    } catch (error) {
      console.error("Error al comprimir la imagen", error.message);
    }
  };

  return !hasPermission ? (
    <Text>No access to camera. Please change this in settings.</Text>
  ) : photo ? (
    <SafeAreaView style={styles["camera-container"]}>
      <Image
        style={styles["camera-preview"]}
        source={{ uri: "data:image/jpg;base64," + photo.base64 }}
      />
      <Button title="Share" onPress={sharePic} />
      {hasMediaPermission ? (
        <Button title="Save" onPress={savePhoto} />
      ) : undefined}
      <Button title="Discard" onPress={() => setPhoto(undefined)} />
    </SafeAreaView>
  ) : (
    <Camera style={styles["camera-container"]} ref={cameraRef}>
      <View style={styles["camera-red-box"]}>
        <LineDrawing />
      </View>
      <StatusBar style="auto" />
      <View style={styles["camera-button-container"]}>
        <Button title="Tomar foto" onPress={takePic}></Button>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  "camera-container": {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  "camera-button-container": {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 42,
  },
  "camera-preview": {
    alignSelf: "stretch",
    flex: 1,
  },
  "camera-red-box": {
    width: "100%",
    height: "100%",
    zIndex: 5 ,
    position: "absolute",
  },
});
