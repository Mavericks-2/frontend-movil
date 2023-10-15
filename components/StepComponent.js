import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { CheckBox } from "@rneui/themed";
import colors from "../constants/colors";

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
          fontSize: width > 600 ? 18 : 14,
        }]}>Error en repisa 1, producto 10</Text>
        <Text style={[stepStyles.subheader,{
          fontSize: width > 600 ? 16 : 12,
          lineHeight: width > 600 ? 24 : 16,
        }]}>Se detectó el producto "tal" en donde se esperaba un producto "tal"</Text>
      </View>
      <CheckBox
        checked={isSelected}
        onPress={() => setSelection(!isSelected)}
        checkedIcon={"check-square"}
        checkedColor={colors.SECONDARY}
        size={width > 600 ? 30 : 24}
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
