import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import colors from "../constants/colors";

export default function EvaluatePlanogram() {

  const { width, height } = useWindowDimensions();

  return (
    <View style={[evalueatePlanogramStyles.mainContainer, {
      marginTop: width > height ? 32 : 90,
    }]}>
      <View style={[evalueatePlanogramStyles.headerContainer, {
        marginBottom: width > height ? 16 : 32,
        gap: width > height ? 16 : 32,
      }]}>
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
    width: "90%",
    height: 400,
    backgroundColor: "black",
    borderRadius: 12,
  }
});
