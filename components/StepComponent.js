import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { CheckBox } from "@rneui/themed";
import colors from "../constants/colors";

export default function StepComponent(props) {
  const [isSelected, setSelection] = useState(false);

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
    fontSize: 18,
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#71727A",
    lineHeight: 20,
  },
});
