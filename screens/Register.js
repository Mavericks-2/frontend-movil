import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import colors from "../constants/colors";
import { Input, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";

export default function Register(props) {
  const [iconName, setIconName] = useState("eye-slash");
  const [iconConfirmName, setIconConfirmName] = useState("eye-slash");
  const { width, height } = useWindowDimensions();

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
    <View
      style={[
        registerStyles.mainContainer,
        {
          width: width,
          height: height,
        },
      ]}
    >
      <View
        style={[
          registerStyles.bodyContainer,
          {
            gap: width < 600 ? 32 : 64,
            padding: width < 600 ? 16 : 32,
          },
        ]}
      >
        <Text
          style={[
            registerStyles.header,
            {
              width: width * 0.8,
              fontSize: width < 600 ? 24 : 32,
            },
          ]}
        >
          Crea tu cuenta de colaborador
        </Text>
        <View
          style={[
            registerStyles.inputs,
            {
              gap: width < 600 ? 16 : 32,
            },
          ]}
        >
          <View style={registerStyles.input}>
            <Text style={registerStyles.inputTitle}>Nombre</Text>
            <Input placeholder="Juan Perez" />
          </View>

          <View style={registerStyles.input}>
            <Text style={registerStyles.inputTitle}>Correo</Text>
            <Input placeholder="name@example.com" />
          </View>
          <View style={registerStyles.input}>
            <Text style={registerStyles.inputTitle}>Contraseña</Text>
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
          </View>
          <View style={registerStyles.input}>
            <Text style={registerStyles.inputTitle}>Confirmar contraseña</Text>
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
          </View>

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
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  header: {
    fontWeight: "800",
    color: colors.PRIMARY,
  },
  inputs: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  input: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "black",
  },
  buttonContainer: {
    width: "100%",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 16,
  },
  button: {
    width: "100%",
    height: 48,
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
