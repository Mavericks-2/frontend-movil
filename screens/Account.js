import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import CardInfo from "../components/CardInfo";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAccuracy, getMostFailedProduct, getNumberScanns, getNumberScannsProducts} from "../services";

const Account = (props) => {
  const [user, setUser] = useState();
  const [data, setData] = useState({
    "Producto más fallado": "Producto",
    "Escaneos realizados": 0,
    "Productos escaneados": 0,
    "Precisión de acomodo": 0,
  });

  useEffect(() => {
    const getUserData = async () => {
      const user = await AsyncStorage.getItem("user").catch((err) => {
        console.log(err);
      });
      if (user){
        setUser(JSON.parse(user));
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (user){
        try {
          const accuracy = await getAccuracy(user.id_acomodador);
          const mostFailedProduct = await getMostFailedProduct(user.id_acomodador);
          const numberScanns = await getNumberScanns(user.id_acomodador);
          const numberScannsProducts = await getNumberScannsProducts(user.id_acomodador);

          setData({
            "Producto más fallado": mostFailedProduct,
            "Escaneos realizados": numberScanns,
            "Productos escaneados": numberScannsProducts,
            "Precisión de acomodo": accuracy.toString()+ "%",
          });
        }
        catch (err) {
          console.log(err);
        }
        
      }
    }
    getData();
  }, [user]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user").catch((err) => {
      console.log(err);
    });
    props.navigation.navigate("Login");
  }


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{
          user ? user.nombre + " " + user.apellido : "Nombre Apellido"
        }</Text>
        <Text style={styles.body}>
          {
            user ? user.correo : "ejemplo@correo"
          }
        </Text>
      </View>
      <View style={styles.cardsContainer}>
        {
          Object.keys(data).map((key, index) => {
            return (
              <CardInfo
                key={index}
                title={key}
                data={data[key]}
              />
            )
          })
        }
      </View>
      <Pressable onPress={() => {
        handleLogout();
      }}>
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
