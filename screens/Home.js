import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

export default function Home(props) {
  return (
    <View style={homeStyles.mainContainer}>
      <Pressable onPress={() => props.navigation.navigate("Login")}>
        <Text>Home</Text>
      </Pressable>
    </View>
  );
}

const homeStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    height: height,
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
});
