import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";

// Obtener el ancho y alto de la ventana
const { width, height } = Dimensions.get("window");

export default function OnBoarding(props) {
  const onBoardingSteps = [
    {
      header: "Valida tu planograma en segundos.",
      description: "Explicación paso a paso de como usar la aplicación.",
      image: require("../assets/gondola1.jpeg"),
    },
    {
      header: "Valida tu planograma en segundos 1.",
      description: "Explicación paso a paso de como usar la aplicación.",
      image: require("../assets/gondola2.jpeg"),
    },
    {
      header: "Valida tu planograma en segundos 2.",
      description: "Explicación paso a paso de como usar la aplicación.",
      image: require("../assets/gondola3.jpeg"),
    },
  ];

  const scrollX = new Animated.Value(0);

  const renderContent = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
      >
        {onBoardingSteps.map((step, index) => {
          return (
            <View>
              <View style={OnBoardingStyles.imageContainer}>
                <Image
                  source={step.image}
                  style={OnBoardingStyles.image}
                ></Image>
              </View>
              <View style={OnBoardingStyles.footer}>
                <View key={index} style={OnBoardingStyles.textContainer}>
                  <Text style={OnBoardingStyles.header}>{step.header}</Text>
                  <Text style={OnBoardingStyles.description}>
                    {step.description}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, width);

    return (
      <View style={OnBoardingStyles.dotContainer}>
        {onBoardingSteps.map((step, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [12, 24, 12],
            extrapolate: "clamp",
          });

          // Añadir que el color del punto cambie cuando se cambie de pantalla
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [colors.SECONDARY, colors.PRIMARY, colors.SECONDARY],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[OnBoardingStyles.dot, { width: dotSize, height: dotSize, backgroundColor: dotColor }]}
              opacity={opacity}
            ></Animated.View>
          );
        })}
      </View>
    );
  };

  return (
    <View>
      <View>{renderContent()}</View>
      <View style={OnBoardingStyles.dotRootContainer}>{renderDots()}</View>
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
    width: width,
    opacity: 0.5,
    resizeMode: "cover",
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
    marginTop: 64,
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
  dotRootContainer: {
    position: "absolute",
    bottom: height > 700 ? "20%" : "16%",
    left: 16,
  },
  dotContainer: {
    flexDirection: "row",
    height: 24,
  },
  dot: {
    borderRadius: "50%",
    marginHorizontal: 12,
  },
});
