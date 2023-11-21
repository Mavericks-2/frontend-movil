/**
 * @fileOverview Pantalla de verificación de código.
 * 
 * @module VerifyCode
 * 
 * @requires react
 * @requires react-native
 * @requires expo-linear-gradient
 * @requires ../constants/colors
 * @requires ../services
 * 
 * @exports VerifyCode
 * 
 * @param  {Object}  props  Propiedades para el componente de pantalla de verificación de código.
 * 
 * @example
 * <VerifyCode />
 *
 */

import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import colors from "../constants/colors";
import { verifyToken } from "../services";


export default function VerifyCode(props) {
  const [firstInput, setFirstInput] = useState();
  const [secondInput, setSecondInput] = useState();
  const [thirdInput, setThirdInput] = useState();
  const [fourthInput, setFourthInput] = useState();
  const [fifthInput, setFifthInput] = useState();
  const [sixthInput, setSixthInput] = useState();

  const { width, height } = useWindowDimensions();
  const { email } = props.route.params;

  const [focus, setFocus] = useState([false, false, false, false, false, false]);

  const handleTextChange = (text, setFunction) => {
    if (/^[0-9]*$/.test(text) || text === "") {
      setFunction(text);
    }
  };

  const handleVerifyCode = async () => {
    const verifyCode = firstInput + secondInput + thirdInput + fourthInput + fifthInput + sixthInput;
    
    const response = await verifyToken({ email: email, verifyCode }).catch((err) => {
      console.log(err);
    });

    if (response === "ok") {
      props.navigation.navigate("Home", { email: email });
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[verifyCodeStyles.mainContainer, {
          gap: width > 800 ? 128 : 64,
        }]}>
          <View style={verifyCodeStyles.headerContainer}>
            <Text style={[verifyCodeStyles.header,{
              fontSize: width > 800 ? 32 : 18,
            }]}>
              Ingresa el código de confirmación
            </Text>
            <Text 
            style={
              {
                fontSize: width > 800 ? 16 : 12,
                textAlign: "center",
                width: "80%",
              }
            }
            >
              Un código de 4 dígitos ha sido enviado a tu correo electrónico
            </Text>
          </View>
          <View style={[verifyCodeStyles.inputsContainer,{
            gap: width > 800 ? 32 : 24,
          }]}>
            <TextInput
              style={[
                verifyCodeStyles.input,
                { borderColor: focus[0] ? colors.PRIMARY : "black", 
                width: width > 800 ? 56 : 32,
                height: width > 800 ? 56 : 32,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={firstInput}
              onChangeText={(text) => handleTextChange(text, setFirstInput)}
              onFocus={() => setFocus([true, false, false, false, false, false])}
            />
             <TextInput
              style={[
                verifyCodeStyles.input,
                { borderColor: focus[1] ? colors.PRIMARY : "black", 
                width: width > 800 ? 56 : 32,
                height: width > 800 ? 56 : 32,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={secondInput}
              onChangeText={(text) => handleTextChange(text, setSecondInput)}
              onFocus={() => setFocus([false, true, false, false, false, false])}
            />
             <TextInput
              style={[
                verifyCodeStyles.input,
                { borderColor: focus[2] ? colors.PRIMARY : "black", 
                width: width > 800 ? 56 : 32,
                height: width > 800 ? 56 : 32,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={thirdInput}
              onChangeText={(text) => handleTextChange(text, setThirdInput)}
              onFocus={() => setFocus([false, false, true, false, false, false])}
            />
             <TextInput
              style={[
                verifyCodeStyles.input,
                { borderColor: focus[3] ? colors.PRIMARY : "black", 
                width: width > 800 ? 56 : 32,
                height: width > 800 ? 56 : 32,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={fourthInput}
              onChangeText={(text) => handleTextChange(text, setFourthInput)}
              onFocus={() => setFocus([false, false, false, true, false, false])}
            />
            <TextInput
              style={[
                verifyCodeStyles.input,
                { borderColor: focus[3] ? colors.PRIMARY : "black", 
                width: width > 800 ? 56 : 32,
                height: width > 800 ? 56 : 32,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={fifthInput}
              onChangeText={(text) => handleTextChange(text, setFifthInput)}
              onFocus={() => setFocus([false, false, false, false, true, false])}
            />
            <TextInput
              style={[
                verifyCodeStyles.input,
                { borderColor: focus[3] ? colors.PRIMARY : "black", 
                width: width > 800 ? 56 : 32,
                height: width > 800 ? 56 : 32,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={sixthInput}
              onChangeText={(text) => handleTextChange(text, setSixthInput)}
              onFocus={() => setFocus([false, false, false, false, false, true])}
            />
          </View>
          <View style={[verifyCodeStyles.buttonContainer, {
            width: width > 800 ? "50%" : "60%",
            marginTop: width > 800 ? 24 : 0,
          }]}>
            <Pressable onPress={() => {
              handleVerifyCode();
            }}>
              <LinearGradient
                colors={[colors.PRIMARY, colors.SECONDARY]}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 1]}
                style={verifyCodeStyles.button}
              >
                <Text style={[verifyCodeStyles.buttonText, {
                  fontSize: width > 800 ? 18 : 16,
                }]}>Verificar</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const verifyCodeStyles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  header: {
    textAlign: "center",
    fontWeight: "800",
    color: colors.PRIMARY,
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    textAlign: "center",
  },
  buttonContainer: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "black",
    color: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
});
