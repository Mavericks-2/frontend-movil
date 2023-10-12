import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, Fragment } from "react";

export default function ActualPlanogram() {
  const [planogram, setPlanogram] = useState(null);

  return (
    <View style={actualPlanogramStyles.mainContainer}>
      {planogram === null ? (
        <Fragment>
          <Image
            source={require("../assets/EmptyImage.png")}
            style={{ width: 150, height: 150 }}
          />
          <View style={actualPlanogramStyles.textContainer}>
            <Text style={actualPlanogramStyles.header}>
              Todavía no se ha registrado un nuevo planograma.
            </Text>
            <View style={actualPlanogramStyles.descriptionContainer}>
              <Text style={actualPlanogramStyles.description}>
                Aquí encontrarás las actualizaciones que se manden desde OXXO.
              </Text>
            </View>
          </View>
        </Fragment>
      ) : null}
    </View>
  );
}

const actualPlanogramStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    gap: 80,
  },
  textContainer: {
    width: "60%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "800",
    color: "black",
    textAlign: "center",
  },
  descriptionContainer: {
    width: "60%",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
    textAlign: "center",
  },
});
