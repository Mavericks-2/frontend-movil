/**
 * @fileOverview Componente que muestra la cámara.
 * 
 * @component CameraComponent
 * 
 * @requires react
 * @requires react-native
 * @requires expo-status-bar
 * @requires expo-camera
 * @requires expo-sharing
 * @requires expo-media-library
 * @requires expo-image-manipulator
 * @requires expo-file-system
 * @requires expo-image-picker
 * @requires ./LineDrawing
 * 
 * @exports CameraComponent
 * 
 * @param  {Array} lines  Líneas del planograma.
 * @param  {Function} setRectangles  Función que actualiza el estado de los rectángulos.
 * @param  {Function} setUriImage  Función que actualiza el estado de la imagen.
 * @param  {Function} setBase64Image  Función que actualiza el estado de la imagen en base64.
 * @param  {Number} width  Ancho de la imagen.
 * @param  {Number} height  Alto de la imagen.
 * @param  {Boolean} photoTaked  Indica si se tomó una foto.
 * @param  {Function} setCameraContainerSize  Función que actualiza el estado del tamaño del contenedor de la cámara.
 * 
 * @example
 *  <CameraComponent
 *    lines={lines}
 *    setRectangles={setRectangles}
 *    setUriImage={setUriImage}
 *    setBase64Image={setBase64Image}
 *    width={width}
 *    height={height}
 *    photoTaked={photoTaked}
 *    setCameraContainerSize={setCameraContainerSize}
 *  />
 * 
 */

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
import LineDrawing from "./LineDrawing";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from 'expo-image-picker';

export default function CameraComponent(props) {
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

  useEffect(() => {
    if (props.photoTaked) {
      takePic();
    } else {
      setPhoto(undefined);
    }
  }, [props.photoTaked]);

  useEffect(() => {
    if (photo) {
      FileSystem.readAsStringAsync(photo.uri, {
        encoding: "base64",
      }).then((res) => {
        props.setBase64Image(res);
      });
    }
  }, [photo]);

  const takePic = async () => {
    try {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      props.setUriImage(newPhoto.uri);
      setPhoto(newPhoto);
    } catch (error) {
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
        [
          {
            resize: {
              width: props.width,
              height: props.height,
            },
          },
        ],
        { compress: 1 } // Ajusta el valor de compresión según tus necesidades
      );
      return compressed;
    } catch (error) {
      console.error("Error al comprimir la imagen", error.message);
    }
  };

  return !hasPermission ? (
    <Text>
      No se ha otorgado permiso para usar la cámara, por favor otorga el permiso
      desde configuraciones.
    </Text>
  ) : photo ? (
    <SafeAreaView style={styles["camera-container"]}>
      <Image style={styles["camera-preview"]} source={{ uri: photo.uri }} />
    </SafeAreaView>
  ) : (
    <Camera style={styles["camera-container"]} ref={cameraRef}>
      <View style={styles["camera-red-box"]}>
        <LineDrawing
          width={props.width}
          height={props.height}
          lines={props.lines}
          setRectangles={props.setRectangles}
          photoTaked={props.photoTaked}
          setCameraContainerSize={props.setCameraContainerSize}
        />
      </View>
      <StatusBar style="auto" />
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
    zIndex: 5,
    position: "absolute",
  },
});
