import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { CheckBox } from "@rneui/themed";
import colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

export default function StepComponent(props) {
  const [isSelected, setSelection] = useState(false);

    useEffect(() => {
        let index = props.progressValues.indexOf(isSelected ? 0 : 1);
        let newProgressValues = [...props.progressValues];
        newProgressValues[index] = isSelected ? 1 : 0;
        props.setProgressValues(newProgressValues);

    }, [isSelected]);

  return (
    <View style={stepStyles.container}>
      <View style={stepStyles.textContainer}>
        <Text style={stepStyles.header}>Error en repisa 1, producto 10</Text>
        <Text style={stepStyles.subheader}>Se detectó el producto "tal" en donde se esperaba un producto "tal"</Text>
      </View>
      <CheckBox
        checked={isSelected}
        onPress={() => setSelection(!isSelected)}
        checkedIcon={"check-square"}
        checkedColor={colors.SECONDARY}
        size={30}
      />
    </View>
  );
}

const stepStyles = StyleSheet.create({
  container: {
    width: (width - 64) * 0.95,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    maxWidth: (width - 64) * 0.7,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#71727A"
  },
});