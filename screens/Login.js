/**
 * @fileOverview Componente que maneja la pantalla de inicio de sesión.
 *
 * @component Login
 *
 * @requires react
 * @requires react-native
 * @requires ../constants/colors
 * @requires @rneui/themed
 * @requires expo-linear-gradient
 * @requires ../services
 *
 * @exports Login
 *
 * @param  {Object}  props  Propiedades para el componente de pantalla de inicio de sesión.
 *
 * @example
 *  <Login />
 *
 */

import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../constants/colors";
import { Input, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { signin } from "../services";

export default function Login(props) {
  const [iconName, setIconName] = useState("eye-slash");
  const [imageHeight, setImageHeight] = useState("100%");
  const [bodyGap, setBodyGap] = useState(16);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { width, height } = useWindowDimensions();

  const handlePassowrdIcon = () => {
    if (iconName === "eye-slash") {
      setIconName("eye");
    } else {
      setIconName("eye-slash");
    }
  };

  useEffect(() => {
    if (width < height) {
      setImageHeight("45%");
      setBodyGap(40);
    } else if (width > height) {
      setImageHeight("40%");
      setBodyGap(24);
    }
  }, [width, height]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signin(user);

      props.navigation.navigate("Home", { email: user.email });
    } catch (error) {
      setErrorMessage("Correo y/o contraseña incorrecto");
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[LoginStyles.mainContainer, { width: width, height: height }]}
        >
          <View style={{ width: width * 0.8, height: imageHeight }}>
            <Image
              source={require("../assets/Oxxo.jpg")}
              style={[
                LoginStyles.image,
                { width: width * 0.8, height: "100%" },
              ]}
            />
          </View>
          <View style={[LoginStyles.body, { gap: bodyGap }]}>
            <Pressable onPress={() => props.navigation.navigate("OnBoarding")}>
              <Text
                style={[
                  LoginStyles.header,
                  {
                    fontSize: width < 800 ? 24 : 28,
                  },
                ]}
              >
                ¡Bienvenido Colaborador!
              </Text>
            </Pressable>
            <View
              style={[
                LoginStyles.inputs,
                {
                  width: width * 0.8,
                  height: height * 0.4,
                  justifyContent: "space-around",
                },
              ]}
            >
              <Input
                placeholder="Ingresa correo electrónico"
                onChangeText={(text) => setUser({ ...user, email: text })}
              />
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
                onChangeText={(text) => setUser({ ...user, password: text })}
              />
              <View style={LoginStyles.forgotPassWordContainer}>
                <Text style={LoginStyles.forgotPassWord}>
                  {errorMessage}
                </Text>
              </View>
              <View style={LoginStyles.buttonContainer}>
                <Pressable
                  onPress={() => {
                    handleLogin();
                  }}
                >
                  <LinearGradient
                    colors={[colors.PRIMARY, colors.SECONDARY]}
                    start={[0, 0]}
                    end={[1, 1]}
                    location={[0.25, 1]}
                    style={LoginStyles.button}
                  >
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={LoginStyles.buttonText}>Inicia sesión</Text>
                    )}
                  </LinearGradient>
                </Pressable>
              </View>
              <View style={LoginStyles.registerContainer}>
                <Text>¿Todavía no estás registrado?</Text>
                <Pressable
                  onPress={() => {
                    props.navigation.navigate("Register");
                  }}
                >
                  <Text style={{ color: colors.PRIMARY }}>Regístrate</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const LoginStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    paddingBottom: 32,
    flex: 1,
  },
  image: {
    resizeMode: "contain",
  },
  body: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  header: {
    fontWeight: "800",
    color: colors.PRIMARY,
  },
  inputs: {
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
  },
  button: {
    width: "100%",
    height: 48,
    color: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
  registerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
});
