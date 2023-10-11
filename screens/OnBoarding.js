import { View, Text, Image, StyleSheet, Button, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";

export default function OnBoarding(props) {
  // TODO: Falta agregar funcionalidad para hacer scroll entre varios pasos antes de terminar el onboarding.

  return (
    <View style={{ flex: 1 }}>
      <View style={OnBoardingStyles.imageContainer}>
        <Image
          source={require("../assets/GondolaEx.jpeg")}
          style={OnBoardingStyles.image}
        ></Image>
      </View>
      <View style={OnBoardingStyles.footer}>
        <View style={OnBoardingStyles.textContainer}>
          <Text style={OnBoardingStyles.header}>
            Valida tu planograma en segundos.
          </Text>
          <Text style={OnBoardingStyles.description}>
            Explicación paso a paso de como usar la aplicación.
          </Text>
        </View>
        <View style={OnBoardingStyles.buttonContainer}>
          <Pressable onPress={()=>props.navigation.navigate("Login")}>
            <LinearGradient
              colors={[colors.PRIMARY, colors.SECONDARY]}
              start={[0, 0]}
              end={[1, 1]}
              location={[0.25, 1]}
              style={OnBoardingStyles.button}
            >
              <Text style={OnBoardingStyles.buttonText}>Entendido</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const OnBoardingStyles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "75%",
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
  footer: {
    width: "100%",
    height: "25%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  textContainer: {
    width: "100%",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "black",
  },
  description: {
    fontSize: 18,
    fontWeight: "300",
    color: "black",
  },
  buttonContainer: {
    width: "100%",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "black",
    color: "white",
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    lineHeight: 48,
  },
});
