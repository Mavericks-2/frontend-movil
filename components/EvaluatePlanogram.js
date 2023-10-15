import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import colors from "../constants/colors";
import CameraComponent from "./CameraComponent";

export default function EvaluatePlanogram() {
  const [photoTaked, setPhotoTaked] = useState(false);

  const { width, height } = useWindowDimensions();

  return (
    <View
      style={[
        evalueatePlanogramStyles.mainContainer,
        {
          marginTop: width > height ? 32 : 90,
        },
      ]}
    >
      <View
        style={[
          evalueatePlanogramStyles.headerContainer,
          {
            marginBottom: width > height ? 16 : 32,
            gap: width > height ? 16 : 32,
          },
        ]}
      >
        <View style={evalueatePlanogramStyles.headerTextContainer}>
          <Text style={evalueatePlanogramStyles.headerText}>
            Registra tu acomódo para evaluar el planograma
          </Text>
          <Text style={evalueatePlanogramStyles.descriptionText}>
            Asegúrate de ajustar los productos dentro de los espacios marcados
          </Text>
        </View>
        <TouchableOpacity style={evalueatePlanogramStyles.button} onPress={()=>setPhotoTaked(!photoTaked)}>
          <Text style={evalueatePlanogramStyles.buttonText}>{photoTaked ? "Descartar foto" : "Tomar foto"}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          evalueatePlanogramStyles.cameraContainer,
          {
            width: width * 0.9,
            height: width > height ? height * 0.5 : height * 0.6,
          },
        ]}
      >
        <CameraComponent
          width={width * 0.9}
          height={width > height ? height * 0.5 : height * 0.6}
          photoTaked={photoTaked}
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
    padding: 24,
  },
  headerTextContainer: {
    flexDirection: "column",
    gap: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "800",
    color: "black",
    textAlign: "left",
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#71727A",
    textAlign: "left",
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
});
