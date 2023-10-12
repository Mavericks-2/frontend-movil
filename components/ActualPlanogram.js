import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useState, Fragment } from "react";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

export default function ActualPlanogram() {
  const [planogram, setPlanogram] = useState(null);

  const emptyPlanogram = (
    <Fragment>
      <Image
        source={require("../assets/EmptyImage.jpg")}
        style={{ width: 100, height: 100 }}
      />
      <View
        style={[
          actualPlanogramStyles.textContainer,
          actualPlanogramStyles.emptyWidth,
        ]}
      >
        <Text style={actualPlanogramStyles.header}>
          Todavía no se ha registrado un nuevo planograma.
        </Text>
        <View
          style={[
            actualPlanogramStyles.descriptionContainer,
            actualPlanogramStyles.emptyWidth,
          ]}
        >
          <Text style={actualPlanogramStyles.description}>
            Aquí encontrarás las actualizaciones que se manden desde OXXO.
          </Text>
        </View>
      </View>
    </Fragment>
  );

  const planogramFilled = (
    <Fragment>
      <View
        style={[
          actualPlanogramStyles.textContainer,
          actualPlanogramStyles.filledWidth,
        ]}
      >
        <Text style={actualPlanogramStyles.header}>
          ¡Se ha registrado un nuevo planograma!
        </Text>
        <View
          style={[
            actualPlanogramStyles.descriptionContainer,
            actualPlanogramStyles.filledWidth,
          ]}
        >
          <Text style={actualPlanogramStyles.description}>
            Realiza el acomodo de la góndola según te lo indique el siguiente
            planograma.
          </Text>
        </View>
      </View>

      <LinearGradient
        colors={[colors.PRIMARY_60, colors.SECONDARY_60]}
        start={[0, 0]}
        end={[1, 1]}
        location={[0.25, 1]}
        style={actualPlanogramStyles.imageContainer}
      >
        <Image
          source={require("../assets/GondolaEx.jpeg")}
          style={{ width: "90%", resizeMode: "contain", borderRadius: 24 }}
        />
      </LinearGradient>
    </Fragment>
  );

  return (
    <View style={actualPlanogramStyles.mainContainer}>
      {planogram === null ? emptyPlanogram : planogramFilled}
    </View>
  );
}

const actualPlanogramStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    gap: 80,
    marginTop: height *  0.25,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  header: {
    fontSize: 24,
    fontWeight: "800",
    color: "black",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#71727A",
    textAlign: "center",
  },
  emptyWidth: {
    width: "60%",
  },
  filledWidth: {
    width: "80%",
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "42%",
    borderRadius: 24,
  },
});
