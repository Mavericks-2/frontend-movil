import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

export default function EvaluatePlanogram() {
  return (
    <View style={evalueatePlanogramStyles.mainContainer}>
      <View style={evalueatePlanogramStyles.headerContainer}>
        <View style={evalueatePlanogramStyles.headerTextContainer}>
          <Text style={evalueatePlanogramStyles.headerText}>
            Registra tu acomódo para evaluar el planograma
          </Text>
          <Text style={evalueatePlanogramStyles.descriptionText}>
            Asegúrate de ajustar los productos dentro de los espacios marcados
          </Text>
        </View>
        <View style={evalueatePlanogramStyles.button}>
          <Text style={evalueatePlanogramStyles.buttonText}>Tomar foto</Text>
        </View>
      </View>
      <View style={evalueatePlanogramStyles.cameraContainer}>

      </View>
    </View>
  );
}

const evalueatePlanogramStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 90,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 64
  },
  headerContainer: {
    width: width * 0.9,
    marginBottom: 32,
    flexDirection: "row",
    gap: 24,
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
  button:{
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
    width: width * 0.9,
    height: 400,
    backgroundColor: "black",
    borderRadius: 12,
  }
});
