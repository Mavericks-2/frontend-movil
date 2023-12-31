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
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useRef } from "react";
import colors from "../constants/colors";
import { verifyToken } from "../services";


export default function VerifyCode(props) {
  const [firstInput, setFirstInput] = useState();
  const [secondInput, setSecondInput] = useState();
  const [thirdInput, setThirdInput] = useState();
  const [fourthInput, setFourthInput] = useState();
  const [fifthInput, setFifthInput] = useState();
  const [sixthInput, setSixthInput] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();
  const input5Ref = useRef();

  const { width, height } = useWindowDimensions();
  const { email } = props.route.params;

  const [focus, setFocus] = useState([false, false, false, false, false, false]);

  const handleTextChange = (text, setFunction) => {
    if (/^[0-9]*$/.test(text) || text === "") {
      setFunction(text);
    }
  };

  const newHandleTextChange = (text, setFunction, ref) => {
    if (/^[0-9]*$/.test(text) || text === "") {
      setFunction(text);
      if (text !== "") {
        ref.current.focus();
      }
    }
  }

  const handleVerifyCode = async () => {
    setLoading(true);
    const verifyCode = firstInput + secondInput + thirdInput + fourthInput + fifthInput + sixthInput;
    
    const response = await verifyToken({ email: email, verifyCode }).catch((err) => {
      console.log(err);
    });

    if (response === "ok") {
      props.navigation.navigate("Home", { email: email });
    }
    else {
      setErrorMessage("Código incorrecto");
    }
    setLoading(false);
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
              autoFocus={true}
              keyboardType="numeric"
              maxLength={1}
              value={firstInput}
              onChangeText={(text) => newHandleTextChange(text, setFirstInput, input1Ref)}
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
              onChangeText={(text) => newHandleTextChange(text, setSecondInput, input2Ref)}
              onFocus={() => setFocus([false, true, false, false, false, false])}
              ref={input1Ref}
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
              onChangeText={(text) => newHandleTextChange(text, setThirdInput, input3Ref)}
              onFocus={() => setFocus([false, false, true, false, false, false])}
              ref={input2Ref}
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
              onChangeText={(text) => newHandleTextChange(text, setFourthInput, input4Ref)}
              onFocus={() => setFocus([false, false, false, true, false, false])}
              ref={input3Ref}
            />
            <TextInput
              style={[
                verifyCodeStyles.input,
                { borderColor: focus[4] ? colors.PRIMARY : "black", 
                width: width > 800 ? 56 : 32,
                height: width > 800 ? 56 : 32,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={fifthInput}
              onChangeText={(text) => newHandleTextChange(text, setFifthInput, input5Ref)}
              onFocus={() => setFocus([false, false, false, false, true, false])}
              ref={input4Ref}
            />
            <TextInput
              style={[
                verifyCodeStyles.input,
                { borderColor: focus[5] ? colors.PRIMARY : "black", 
                width: width > 800 ? 56 : 32,
                height: width > 800 ? 56 : 32,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={sixthInput}
              onChangeText={(text) => handleTextChange(text, setSixthInput)}
              onFocus={() => setFocus([false, false, false, false, false, true])}
              ref={input5Ref}
            />
          </View>
          <View style={verifyCodeStyles.errorMessageContainer}>
            <Text style={verifyCodeStyles.errorMessage}>
              {errorMessage}
            </Text>
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
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={[verifyCodeStyles.buttonText, {
                    fontSize: width > 800 ? 18 : 16,
                  }]}>Verificar</Text>
                )}
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
  errorMessageContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
  },
});
