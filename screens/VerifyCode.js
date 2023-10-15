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


export default function VerifyCode(props) {
  const [firstInput, setFirstInput] = useState(0);
  const [secondInput, setSecondInput] = useState(0);
  const [thirdInput, setThirdInput] = useState(0);
  const [fourthInput, setFourthInput] = useState(0);

  const { width, height } = useWindowDimensions();

  const [focus, setFocus] = useState([false, false, false, false]);

  const handleTextChange = (text, setFunction) => {
    if (/^[0-9]*$/.test(text) || text === "") {
      setFunction(text);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[verifyCodeStyles.mainContainer, {
          gap: width > 600 ? 128 : 64,
        }]}>
          <View style={verifyCodeStyles.headerContainer}>
            <Text style={[verifyCodeStyles.header,{
              fontSize: width > 600 ? 32 : 18,
            }]}>
              Ingresa el código de confirmación
            </Text>
            <Text 
            style={
              {
                fontSize: width > 600 ? 16 : 12,
                textAlign: "center",
                width: "80%",
              }
            }
            >
              Un código de 4 dígitos ha sido enviado a tu correo electrónico
            </Text>
          </View>
          <View style={[verifyCodeStyles.inputsContainer,{
            gap: width > 600 ? 32 : 24,
          }]}>
            <TextInput
              style={[
                verifyCodeStyles.input,
                { borderColor: focus[0] ? colors.PRIMARY : "black", 
                width: width > 600 ? 64 : 40,
                height: width > 600 ? 64 : 40,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={firstInput}
              onChangeText={(text) => handleTextChange(text, setFirstInput)}
              onFocus={() => setFocus([true, false, false, false])}
            />
             <TextInput
              style={[
                verifyCodeStyles.input,
                { borderColor: focus[1] ? colors.PRIMARY : "black", 
                width: width > 600 ? 64 : 40,
                height: width > 600 ? 64 : 40,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={secondInput}
              onChangeText={(text) => handleTextChange(text, setSecondInput)}
              onFocus={() => setFocus([false, true, false, false])}
            />
             <TextInput
              style={[
                verifyCodeStyles.input,
                { borderColor: focus[2] ? colors.PRIMARY : "black", 
                width: width > 600 ? 64 : 40,
                height: width > 600 ? 64 : 40,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={thirdInput}
              onChangeText={(text) => handleTextChange(text, setThirdInput)}
              onFocus={() => setFocus([false, false, true, false])}
            />
             <TextInput
              style={[
                verifyCodeStyles.input,
                { borderColor: focus[3] ? colors.PRIMARY : "black", 
                width: width > 600 ? 64 : 40,
                height: width > 600 ? 64 : 40,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={fourthInput}
              onChangeText={(text) => handleTextChange(text, setFourthInput)}
              onFocus={() => setFocus([false, false, false, true])}
            />
            
          </View>
          <View style={[verifyCodeStyles.buttonContainer, {
            width: width > 600 ? "50%" : "60%",
            marginTop: width > 600 ? 24 : 0,
          }]}>
            <Pressable onPress={() => props.navigation.navigate("Home")}>
              <LinearGradient
                colors={[colors.PRIMARY, colors.SECONDARY]}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 1]}
                style={verifyCodeStyles.button}
              >
                <Text style={[verifyCodeStyles.buttonText, {
                  fontSize: width > 600 ? 18 : 16,
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
  },
  buttonText: {
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    lineHeight: 48,
  },
});
