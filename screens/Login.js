import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, {useState} from "react";
import colors from "../constants/colors";
import { Input, Icon } from "@rneui/themed";

export default function Login(props) {
    const [iconName, setIconName] = useState("eye-slash");

    const handlePassowrdIcon = () => {
        if (iconName === "eye-slash") {
            setIconName("eye");
        } else {
            setIconName("eye-slash");
        }
    }

  return (
    <View style={LoginStyles.mainContainer}>
      <View style={LoginStyles.imageContainer}>
        <Image
          source={require("../assets/Oxxo.png")}
          style={LoginStyles.image}
        ></Image>
      </View>
      <View style={LoginStyles.body}>
        <Text style={LoginStyles.header}>¡Bienvenido Colaborador!</Text>
        <View style={LoginStyles.inputs}>
          <Input placeholder="Ingresa correo electrónico" />
          <Input
            placeholder="Contraseña"
            secureTextEntry={iconName === "eye-slash"}
            rightIcon={<Icon name={iconName} type="font-awesome" onPress={handlePassowrdIcon}/>}
          />
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
});
