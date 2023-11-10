import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator
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


  const handleUploadData = async () =>{
    setLoading(true);
    const response = await uploadImage(base64Image);
    if (response === "ok"){
      const imageSize = await getImageSize().catch((err) => {
        console.log(err);
      });
      let newRectangles = [...rectangles];
      if (imageSize){
        newRectangles = scaleRectangles(rectangles, imageSize);
      }
      const classes = await classifyImage(newRectangles).catch((err) => {
        console.log(err);
      });
      props.setPlanogramClasses(classes);
    }
    setLoading(false);
  }

  const scaleRectangles = (rectangles, imageSize) => {
    const scaledRectangles = rectangles.map((rectangle) => {
      const scaledRectangle = {
        x: rectangle.x * (imageSize.width / camaraContainerSize.width),
        y: rectangle.y * (imageSize.height / camaraContainerSize.height),
        width: rectangle.width * (imageSize.width / camaraContainerSize.width),
        height: rectangle.height * (imageSize.height / camaraContainerSize.height),
      };
      return scaledRectangle;
    });
    return scaledRectangles;
  }

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
      width: width ,
      height: width  / containerRatio ,
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
        {
          marginTop: width > 800 ? (width > height ? 32 : 90) : 32,
        },
      ]}
    >
      {
        loading ? 
        (
          <View style={evalueatePlanogramStyles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.PRIMARY} />
            <Text style={evalueatePlanogramStyles.loadingText}>
              Clasificando imagen...
            </Text>
          </View>
        )
        :
        (<View
          style={[
            evalueatePlanogramStyles.headerContainer,
            {
              marginBottom:
                width > 800 ? (width < 1200 ? 16 : width > height ? 16 : 32) : 16,
              gap: width < 1200 ? 16 : width > height ? 16 : 32,
              padding: width > 800 ? (width < 1200 ? 16 : 24) : 16,
            },
          ]}
        >
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
                },
              ]}
            >
              {width > 800
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
              {width > 1200
                ? "Asegúrate de ajustar los productos dentro de los espacios marcados"
                : "Toma una foto de tu acomódo y compara."}
            </Text>
          </View>
          <TouchableOpacity
            style={evalueatePlanogramStyles.button}
            onPress={() => setPhotoTaked(!photoTaked)}
          >
            <Text style={evalueatePlanogramStyles.buttonText}>
              {photoTaked ? "Descartar foto" : "Tomar foto"}
            </Text>
          </TouchableOpacity>
        </View>)
      }
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
          height={
            camaraContainerSize.height
          }
          photoTaked={photoTaked}
          lines={props.lines}
          setRectangles={setRectangles}
          setBase64Image={setBase64Image}
          setCameraContainerSize={setCamaraContainerSize}
          setUriImage={props.setUriImage}
        />
      </View>
    </View>
  );
}

const evalueatePlanogramStyles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FE",
    borderRadius: 12,
  },
  headerTextContainer: {
    flexDirection: "column",
    gap: 8,
  },
  headerText: {
    fontWeight: "800",
    color: "black",
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
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.PRIMARY,
    textAlign: "center",
  },
});
