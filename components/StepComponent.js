import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { CheckBox } from "@rneui/themed";
import colors from "../constants/colors";

const productMatrixCatalog = {
  1: "Takis Fuego 80g.",
  2: "Takis Original 80g.",
  3: "Runners 80g.",
  4: "Chips Jalapeño 60g.",
  5: "Chips Fuego 60g.",
  6: "Tostitos 57g.",
  7: "Cheetos Torciditos 44g.",
  8: "Fritos Limón y Sal 38g.",
  9: "Churrumais",
  10: "Rancheritos 40g.",
  11: "Sabritas Sal 36g.",
  12: "Cheetos Flamin Hot 44g.",
  13: "Doritos Nacho 48g.",
  14: "Pop Karameladas 120g.",
  15: "Hot Nuts Original 160g.",
  16: "Bitz Cacahuate Enchilado 90g.",
  17: "Bitz Almendras con Sal 32g.",
  18: "Bitz Cacahuates Enchilados 95g.",
  19: "Leo Mix Botanero 80g.",
  20: "Maruchan Pollo con Vegetales 64g.",
  21: "Botanera Chilito 125g.",
  22: "Tajín Dulce 160g.",
  23: "Salsa Búfalo Clásica 150g.",
  24: "Del Primo Salsa Guacamole 300g.",
  25: "Nestle La Lechera Original 335g.",
  26: "Nestle Carnation Leche Evaporada 360g.",
  27: "Chips Papatinas 90g.",
  28: "Ruffles Queso 41g.",
  29: "Maruchan Carne de Res 64g.",
  30: "Nissin Camarón Picante 64g.",
  31: "Nissin Carne de Res 64g.",
  32: "Bitz Cacahuate Habanero 110g.",
  33: "Semillas de Girasol 70g.",
  34: "Cacahuates Sal Bokados 90g.",
  35: "Cacahuates Japonés Leo 90g.",
  36: "Semillas de Calabaza Bokados 30g."
}


export default function StepComponent(props) {
  const [isSelected, setSelection] = useState(false);
  const { width, height } = useWindowDimensions();

    useEffect(() => {
        handleSelect();

    }, [isSelected]);

    const handleSelect = () => {
      let index = 0
      if (isSelected) {
        index = props.progressValues.indexOf(0);
      }
      else {
        index = props.progressValues.lastIndexOf(1);
      }
      let newProgressValues = [...props.progressValues];
      newProgressValues[index] = isSelected ? 1 : 0;
      props.setProgressValues(newProgressValues);
    }

  return (
    <View style={stepStyles.container}>
      <View style={stepStyles.textContainer}>
        <Text style={[stepStyles.header,{
          fontSize: width > 1200 ? 18 : 14,
        }]}>Error en repisa {props.step['row']+1}, producto {props.step['column']+1}</Text>
        <Text style={[stepStyles.subheader,{
          fontSize: width > 1200 ? 16 : 12,
          lineHeight: width > 1200 ? 24 : 16,
        }]}>Se detectó el producto {productMatrixCatalog[props.step['currentProduct']]} en donde se esperaba un producto {productMatrixCatalog[props.step['expectedProduct']]}</Text>
      </View>
      <CheckBox
        checked={isSelected}
        onPress={() => setSelection(!isSelected)}
        checkedIcon={"check-square"}
        checkedColor={colors.SECONDARY}
        size={width > 1200 ? 30 : 24}
      />
    </View>
  );
}

const stepStyles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    maxWidth: "70%",
  },
  header: {
    fontWeight: "bold",
  },
  subheader: {
    fontWeight: "normal",
    color: "#71727A",
    textAlign: "justify",
    width: "80%",
  },
});
