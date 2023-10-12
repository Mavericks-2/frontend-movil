import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import colors from "../constants/colors";
import { Input, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";

export default function Login(props) {
  const [iconName, setIconName] = useState("eye-slash");

  const handlePassowrdIcon = () => {
    if (iconName === "eye-slash") {
      setIconName("eye");
    } else {
      setIconName("eye-slash");
    }
  };

  return (
    <View style={LoginStyles.mainContainer}>
      <View style={LoginStyles.imageContainer}>
        <Image
          source={require("../assets/Oxxo.png")}
          style={LoginStyles.image}
        ></Image>
      </View>
      <View style={LoginStyles.body}>
        <Pressable onPress={() => props.navigation.navigate("OnBoarding")}>
          <Text style={LoginStyles.header}>¡Bienvenido Colaborador!</Text>
        </Pressable>
        <View style={LoginStyles.inputs}>
          <Input placeholder="Ingresa correo electrónico" />
          <Input
            placeholder="Contraseña"
            secureTextEntry={iconName === "eye-slash"}
            rightIcon={
              <Icon
                name={iconName}
                type="font-awesome"
                onPress={handlePassowrdIcon}
              />
            }
          />
          <View style={LoginStyles.forgotPassWordContainer}>
            <Text style={LoginStyles.forgotPassWord}>
              ¿Olvidaste tu contraseña?
            </Text>
          </View>
          <View style={LoginStyles.buttonContainer}>
            <Pressable onPress={() => props.navigation.navigate("Home")}>
              <LinearGradient
                colors={[colors.PRIMARY, colors.SECONDARY]}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 1]}
                style={LoginStyles.button}
              >
                <Text style={LoginStyles.buttonText}>Inicia sesión</Text>
              </LinearGradient>
            </Pressable>
          </View>
          <View style={LoginStyles.registerContainer}>
            <Text>¿Todavía no estás registrado?</Text>
            <Pressable onPress={()=>{props.navigation.navigate("Register")}}>
              <Text style={{color: colors.PRIMARY}}>Regístrate</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const LoginStyles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    paddingBottom: 32,
  },
  imageContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
  },
  body: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.PRIMARY,
  },
  inputs: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  forgotPassWordContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  forgotPassWord: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.PRIMARY,
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
  registerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
});
