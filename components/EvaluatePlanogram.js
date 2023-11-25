/**
 * @fileOverview Componente que muestra la pantalla de evaluación del planograma.
 * 
 * @component EvaluatePlanogram
 * 
 * @requires react
 * @requires react-native
 * @requires ../constants/colors
 * @requires ./CameraComponent
 * @requires ../services
 * 
 * @exports EvaluatePlanogram
 * 
 * @param  {Array}  lines  Líneas del planograma.
 * @param  {Function}  setPlanogramClasses  Función que actualiza el estado de las clases del planograma.
 * @param  {Function}  setUriImage  Función que actualiza el estado de la imagen.
 * 
 * @example
 *  <EvaluatePlanogram
 *    lines={lines}
 *    setPlanogramClasses={setPlanogramClasses}
 *    setUriImage={setUriImage}
 *  />
 * 
 */

import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../constants/colors";
import CameraComponent from "./CameraComponent";
import { classifyImage, uploadImage, getImageSize } from "../services";

export default function EvaluatePlanogram(props) {
  const { width, height } = useWindowDimensions();
  const [photoTaked, setPhotoTaked] = useState(false);
  const [rectangles, setRectangles] = useState();
  const [base64Image, setBase64Image] = useState(null);
  const [camaraContainerSize, setCamaraContainerSize] = useState({
    width: 0,
    height: 0,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUploadData = async () => {
    setLoading(true);
    try{
      const response = await uploadImage(base64Image);
      if (response === "ok") {
        const imageSize = await getImageSize();
        let newRectangles = [...rectangles];
        if (imageSize) {
          newRectangles = scaleRectangles(rectangles, imageSize);
        }
        const classes = await classifyImage(newRectangles);
        props.setPlanogramClasses(classes);
      }
    } catch (err) {
      setErrorMessage("Ocurrió un error al clasificar la imagen.");
    }
    setLoading(false);
  };

  const scaleRectangles = (rectangles, imageSize) => {
    const scaledRectangles = rectangles.map((rectangle) => {
      const scaledRectangle = {
        x: rectangle.x * (imageSize.width / camaraContainerSize.width),
        y: rectangle.y * (imageSize.height / camaraContainerSize.height),
        width: rectangle.width * (imageSize.width / camaraContainerSize.width),
        height:
          rectangle.height * (imageSize.height / camaraContainerSize.height),
      };
      return scaledRectangle;
    });
    return scaledRectangles;
  };

  const getContainerSize = (arrayLines) => {
    let containerSize = {
      width: 0,
      height: 0,
    };
    let maxWidth = 0;
    let maxHeight = 0;
    let minHeight = 100000;

    for (let i = 0; i < arrayLines.length; i++) {
      let line = arrayLines[i];
      if (line.x2 > maxWidth) {
        maxWidth = line.x2;
      }
      if (line.y2 > maxHeight) {
        maxHeight = line.y2;
      }
      if (line.y1 < minHeight) {
        minHeight = line.y1;
      }
    }

    for (let i = 0; i < arrayLines.length; i++) {
      arrayLines[i].y1 = arrayLines[i].y1 - minHeight;
      arrayLines[i].y2 = arrayLines[i].y2 - minHeight;
    }

    containerSize.width = maxWidth;
    containerSize.height = maxHeight;
    return containerSize;
  };

  useEffect(() => {
    container = getContainerSize(props.lines);
    const containerRatio = container.width / container.height;
    newContainer = {
      width: width,
      height: width / containerRatio,
    };
    setCamaraContainerSize(newContainer);
  }, []);

  useEffect(() => {
    if (rectangles && base64Image) {
      handleUploadData();
    }
  }, [rectangles, base64Image]);

  return (
    <View
      style={[
        evalueatePlanogramStyles.mainContainer,
      ]}
    >
      <View
        style={[
          evalueatePlanogramStyles.cameraContainer,
          {
            width: camaraContainerSize.width,
            height: camaraContainerSize.height,
          },
        ]}
      >
        <CameraComponent
          width={camaraContainerSize.width}
          height={camaraContainerSize.height}
          photoTaked={photoTaked}
          lines={props.lines}
          setRectangles={setRectangles}
          setBase64Image={setBase64Image}
          setCameraContainerSize={setCamaraContainerSize}
          setUriImage={props.setUriImage}
        />
      </View>
      {loading ? (
        <View style={evalueatePlanogramStyles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.SECONDARY} />
          <Text style={evalueatePlanogramStyles.loadingText}>
            Clasificando imagen...
          </Text>
        </View>
      ) : (
        <View
          style={[
            evalueatePlanogramStyles.headerContainer,
            {
              marginBottom:
                width > 800
                  ? width < 1200
                    ? 16
                    : width > height
                    ? 16
                    : 32
                  : 16,
              gap: width < 1200 ? 16 : width > height ? 16 : 32,
              padding: width > 800 ? (width < 1200 ? 16 : 24) : 16,
            },
          ]}
        >
          {
            <View
              style={[
                evalueatePlanogramStyles.headerTextContainer,
                {
                  width: width > 800 ? (width < 1200 ? "60%" : "50%") : "60%",
                },
              ]}
            >
              <Text
                style={[
                  evalueatePlanogramStyles.headerText,
                  {
                    fontSize: width > 800 ? (width < 1200 ? 14 : 16) : 12,
                    color: "black",
                  },
                ]}
              >
                {photoTaked ? errorMessage ? errorMessage : "Acomódo clasificado" :  width > 800
                  ? "Registra tu acomódo para evaluar el planograma"
                  : "Evalúa tu acomódo"}
              </Text>
              <Text
                style={[
                  evalueatePlanogramStyles.descriptionText,
                  {
                    fontSize: width > 800 ? (width < 1200 ? 12 : 14) : 10,
                    width: width > 800 ? "90%" : "80%",
                  },
                ]}
              >
                {photoTaked ? errorMessage ? "Favor de evaluar nuevamente el acomódo." : "Puedes ver los resultados en la pestaña de Retroalimentación" : width > 1200
                  ? "Asegúrate de ajustar los productos dentro de los espacios marcados"
                  : "Toma una foto de tu acomódo y compara."}
              </Text>
            </View>
          }
          
          <TouchableOpacity
            style={[evalueatePlanogramStyles.button]}
            onPress={() => {
              if (errorMessage || !photoTaked){
                setPhotoTaked(!photoTaked);
              }
              else{
                props.setSelected(2);
              }
            }}
          >
            <Text style={evalueatePlanogramStyles.buttonText}>
              {photoTaked ? errorMessage ?  "Volver a tomar foto" : "Ver resultados" : "Tomar foto"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const evalueatePlanogramStyles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
  },
  headerContainer: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: "#F8F9FE",
    borderRadius: 12,
  },
  headerTextContainer: {
    flexDirection: "column",
    gap: 8,
  },
  headerText: {
    fontWeight: "800",
    textAlign: "justify",
  },
  descriptionText: {
    fontWeight: "400",
    color: "#71727A",
    textAlign: "justify",
  },
  button: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.PRIMARY,
    borderWidth: 1,
    width: "35%",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.PRIMARY,
    textAlign: "center",
  },
  cameraContainer: {
    backgroundColor: "black",
    borderRadius: 12,
  },
  loadingContainer: {
    width: "80%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.SECONDARY,
    textAlign: "center",
  },
});
