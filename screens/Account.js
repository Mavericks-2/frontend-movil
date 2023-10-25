import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import CardInfo from "../components/CardInfo";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";

const Account = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Ejemplo Nombre</Text>
        <Text style={styles.body}>Ejemplo Correo</Text>
      </View>
      <View style={styles.cardsContainer}>
        <CardInfo />
        <CardInfo />
        <CardInfo />
        <CardInfo />
        <CardInfo />
      </View>
      <Pressable onPress={() => props.navigation.navigate("Login")}>
        <LinearGradient
          colors={[colors.PRIMARY, colors.SECONDARY]}
          start={[0, 0]}
          end={[1, 1]}
          location={[0.25, 1]}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 64,
    backgroundColor: "#fff",
  },
  cardsContainer: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 32,
    rowGap: 40,
  },
  headerContainer: {
    width: "80%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
    color: "#71727A",
  },
  button: {
    width: "100%",
    height: 48,
    color: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
});
