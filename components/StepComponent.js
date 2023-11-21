/**
 * @fileOverview Componente que muestra un paso de la evaluación.
 * 
 * @component StepComponent
 * 
 * @requires react
 * @requires react-native
 * @requires rneui/themed
 * @requires ../constants/colors
 * 
 * @exports StepComponent
 * 
 * @param  {Object}  step  Paso de la evaluación.
 * @param  {Array}  progressValues  Valores del progreso de la evaluación.
 * @param  {Function}  setProgressValues  Función que actualiza el estado de los valores del progreso de la evaluación.
 * 
 * @example
 *  <StepComponent
 *    step={step}
 *    progressValues={progressValues}
 *    setProgressValues={setProgressValues}
 *  />
 * 
 */

import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { CheckBox } from "@rneui/themed";
import colors from "../constants/colors";

export const productMatrixCatalog = [
  "CheetosTorciditos",
  "ChipsJalapeño",
  "Churrumais",
  "DoritosNachos",
  "FritosLimonYSal",
  "HutNuts",
  "PopKarameladas",
  "Rancheritos",
  "RufflesQueso",
  "Runners",
  "TakisFuego",
  "TakisOriginal",
  "Tostitos",
];

export default function StepComponent(props) {
  const [isSelected, setSelection] = useState(false);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    handleSelect();
  }, [isSelected]);

  const handleSelect = () => {
    let index = 0;
    if (isSelected) {
      index = props.progressValues.indexOf(0);
    } else {
      index = props.progressValues.lastIndexOf(1);
    }
    let newProgressValues = [...props.progressValues];
    newProgressValues[index] = isSelected ? 1 : 0;
    props.setProgressValues(newProgressValues);
  };

  return (
    <View style={stepStyles.container}>
      <View style={stepStyles.textContainer}>
        <Text
          style={[
            stepStyles.header,
            {
              fontSize: width > 1200 ? 18 : 14,
            },
          ]}
        >
          Error en repisa {props.step["row"] + 1}, producto{" "}
          {props.step["column"] + 1}
        </Text>
        <Text
          style={[
            stepStyles.subheader,
            {
              fontSize: width > 1200 ? 16 : 12,
              lineHeight: width > 1200 ? 24 : 16,
            },
          ]}
        >
          Se detectó el producto{" "}
          {productMatrixCatalog[props.step["expectedProduct"]]} en donde se
          esperaba un producto{" "}
          {productMatrixCatalog[props.step["currentProduct"]]}
        </Text>
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
