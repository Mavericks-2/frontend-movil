import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import colors from "../constants/colors";
import { Input, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";


const { width, height } = Dimensions.get("window");

export default function Register(props) {
  const [iconName, setIconName] = useState("eye-slash");
  const [iconConfirmName, setIconConfirmName] = useState("eye-slash");

  const handlePassowrdIcon = () => {
    if (iconName === "eye-slash") {
      setIconName("eye");
    } else {
      setIconName("eye-slash");
    }
  };

  const handleConfirmPassowrdIcon = () => {
    if (iconConfirmName === "eye-slash") {
      setIconConfirmName("eye");
    } else {
      setIconConfirmName("eye-slash");
    }
  };

  return (
    <View style={registerStyles.mainContainer}>
      <View style={registerStyles.bodyContainer}>
        <Text style={registerStyles.header}>Crea tu cuenta de colaborador</Text>
        <View style={registerStyles.inputs}>
          <Text>Nombre</Text>
          <Input placeholder="Juan Perez" />

          <Text>Correo</Text>
          <Input placeholder="name@example.com" />
          <Text>Contraseña</Text>
          <Input
            placeholder="Crea una contraseña"
            secureTextEntry={iconName === "eye-slash"}
            rightIcon={
              <Icon
                name={iconName}
                type="font-awesome"
                onPress={handlePassowrdIcon}
              />
            }
          />
          <Text>Confirmar contraseña</Text>
          <Input
            placeholder="Confirma tu contraseña"
            secureTextEntry={iconConfirmName === "eye-slash"}
            rightIcon={
              <Icon
                name={iconConfirmName}
                type="font-awesome"
                onPress={handleConfirmPassowrdIcon}
              />
            }
          />
          <View style={registerStyles.buttonContainer}>
            <Pressable onPress={() => props.navigation.navigate("VerifyCode")}>
              <LinearGradient
                colors={[colors.PRIMARY, colors.SECONDARY]}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 1]}
                style={registerStyles.button}
              >
                <Text style={registerStyles.buttonText}>Registrarme</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const registerStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    height: height,
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 64,
    padding: 64,
  },
  header: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.PRIMARY,
  },
  inputs: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 24,
  },
  buttonContainer: {
    width: "100%",
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
  }
});
