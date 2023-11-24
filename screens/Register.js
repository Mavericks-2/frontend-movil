/**
 * @fileOverview Pantalla de registro.
 *
 * @module Register
 *
 * @requires react
 * @requires react-native
 * @requires rneui/themed
 * @requires ../constants/colors
 * @requires expo-linear-gradient
 * @requires ../services
 *
 * @exports Register
 *
 * @param  {Object}  props  Propiedades para el componente de pantalla de registro.
 *
 * @example
 * <Register />
 *
 */

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import colors from "../constants/colors";
import { Input, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { signup, getUser } from "../services";

export default function Register(props) {
  const [iconName, setIconName] = useState("eye-slash");
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordErrorMesage, setPasswordErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const { width, height } = useWindowDimensions();

  const handlePassowrdIcon = () => {
    if (iconName === "eye-slash") {
      setIconName("eye");
    } else {
      setIconName("eye-slash");
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await signup(user);
      props.navigation.navigate("VerifyCode", { email: user.email });
    } catch (e) {
      let emailError = await validateEmail(user.email);
      let passwordError = validatePassword(user.password);
      setEmailErrorMessage(emailError);
      setPasswordErrorMessage(passwordError);
    }
    setLoading(false);
  };

  const validatePassword = (password) => {
    let error =
      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un caracter especial y un número.";
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/;
    if (regex.test(password)) {
      error = "";
    }
    return error;
  };

  const validateEmail = async (email) => {
    let error = "El correo electrónico no es válido.";
    let regex = /\S+@\S+\.\S+/;
    if (regex.test(email)) {
      error = "";
      try {
        getUser(email);
        error = "El correo electrónico ya está registrado.";
      } catch (e) {
        error = "";
      }
    }
    return error;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                gap: width < 800 ? 32 : 64,
                padding: width < 800 ? 16 : 32,
              },
            ]}
          >
            <Text
              style={[
                registerStyles.header,
                {
                  width: width * 0.8,
                  fontSize: width < 800 ? 24 : 32,
                },
              ]}
            >
              Crea tu cuenta de colaborador
            </Text>
            <View
              style={[
                registerStyles.inputs,
                {
                  gap: width < 800 ? 16 : 32,
                },
              ]}
            >
              <View style={registerStyles.input}>
                <Text style={registerStyles.inputTitle}>Nombre</Text>
                <Input
                  placeholder="Juan"
                  onChangeText={(text) => setUser({ ...user, name: text })}
                />
              </View>
              <View style={registerStyles.input}>
                <Text style={registerStyles.inputTitle}>Apellido</Text>
                <Input
                  placeholder="Perez"
                  onChangeText={(text) => setUser({ ...user, lastName: text })}
                />
              </View>

              <View style={registerStyles.input}>
                <Text style={registerStyles.inputTitle}>Correo</Text>
                <Input
                  placeholder="name@example.com"
                  onChangeText={(text) => setUser({ ...user, email: text })}
                  errorMessage={emailErrorMessage}
                />
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
                  errorMessage={passwordErrorMesage}
                  onChangeText={(text) => setUser({ ...user, password: text })}
                />
              </View>

              <View style={registerStyles.buttonContainer}>
                <Pressable onPress={() => handleRegister()}>
                  <LinearGradient
                    colors={[colors.PRIMARY, colors.SECONDARY]}
                    start={[0, 0]}
                    end={[1, 1]}
                    location={[0.25, 1]}
                    style={registerStyles.button}
                  >
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={registerStyles.buttonText}>Registrarme</Text>
                    )}
                  </LinearGradient>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const registerStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
});
