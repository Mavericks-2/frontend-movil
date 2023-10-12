import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

export default function VerifyCode(props) {
    const [firstInput, setFirstInput] = useState(0);
    const [secondInput, setSecondInput] = useState(0);
    const [thirdInput, setThirdInput] = useState(0);
    const [fourthInput, setFourthInput] = useState(0);

    const [focus, setFocus] = useState([false, false, false, false]);

  const handleTextChange = (text, setFunction) => {
    if (/^[0-9]*$/.test(text) || text === "") {
      setFunction(text);
    }
  };

  return (
    <View style={verifyCodeStyles.mainContainer}>
      <View style={verifyCodeStyles.headerContainer}>
        <Text style={verifyCodeStyles.header}>
          Ingresa el código de confirmación
        </Text>
        <Text>
          Un código de 4 dígitos ha sido enviado a tu correo electrónico
        </Text>
      </View>
      <View style={verifyCodeStyles.inputsContainer}>
        <TextInput
          style={[verifyCodeStyles.input, { borderColor: focus[0] ? colors.PRIMARY : "black" }]}
          keyboardType="numeric"
            maxLength={1}
            value={firstInput}
            onChangeText={(text) => handleTextChange(text, setFirstInput)}
            onFocus={() => setFocus([true, false, false, false])}
        />
        <TextInput
          style={[verifyCodeStyles.input, { borderColor: focus[1] ? colors.PRIMARY : "black" }]}
          keyboardType="numeric"
            maxLength={1}
            value={firstInput}
            onChangeText={(text) => handleTextChange(text, setFirstInput)}
            onFocus={() => setFocus([false, true, false, false])}
        />
        <TextInput
          style={[verifyCodeStyles.input, { borderColor: focus[2] ? colors.PRIMARY : "black" }]}
          keyboardType="numeric"
            maxLength={1}
            value={firstInput}
            onChangeText={(text) => handleTextChange(text, setFirstInput)}
            onFocus={() => setFocus([false, false, true, false])}
        />
        <TextInput
          style={[verifyCodeStyles.input, { borderColor: focus[3] ? colors.PRIMARY : "black" }]}
          keyboardType="numeric"
            maxLength={1}
            value={firstInput}
            onChangeText={(text) => handleTextChange(text, setFirstInput)}
            onFocus={() => setFocus([false, false, false, true])}
        />
      </View>
      <View style={verifyCodeStyles.buttonContainer}>
        <Pressable onPress={() => props.navigation.navigate("Home")}>
          <LinearGradient
            colors={[colors.PRIMARY, colors.SECONDARY]}
            start={[0, 0]}
            end={[1, 1]}
            location={[0.25, 1]}
            style={verifyCodeStyles.button}
          >
            <Text style={verifyCodeStyles.buttonText}>Verificar</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const verifyCodeStyles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: height,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    gap: 128,
  },
  headerContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  header: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.PRIMARY,
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 32,
  },
  input: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    textAlign: "center",
  },
  buttonContainer: {
    width: "50%",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 24,
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
