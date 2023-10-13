import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useState, Fragment } from "react";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";

export default function ActualPlanogram() {
  const [planogram, setPlanogram] = useState(1);
  const { width, height } = useWindowDimensions();

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
        style={[
          actualPlanogramStyles.imageContainer,
          {
            height: width > height ? height * 0.55 : height * 0.35,
            width: width > height ? width * 0.6 : width * 0.8,
          },
        ]}
      >
        <Image
          source={require("../assets/GondolaEx.jpeg")}
          style={{
            resizeMode: "contain",
            width: width > height ? "75%" : "90%",
          }}
        />
      </LinearGradient>
    </Fragment>
  );

  return (
    <View
      style={[
        actualPlanogramStyles.mainContainer,
        { marginTop: width > height ? height * 0.05 : height * 0.2, 
          gap: width > height ? 32 : 80,
        },
      ]}
    >
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
    borderRadius: 24,
  },
});
