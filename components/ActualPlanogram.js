/**
 * @fileOverview Componente que muestra el planograma actual.
 *
 * @component ActualPlanogram
 *
 * @requires react
 * @requires react-native
 * @requires react-native-linear-gradient
 * @requires ../constants/colors
 * @requires ../services
 * 
 * @exports ActualPlanogram
 * 
 * @param  {Object}  user  Información del usuario.
 * @param  {Function}  setLines  Función que actualiza el estado de las líneas.
 * @param  {Function}  setPlanogramClasses  Función que actualiza el estado de las clases del planograma.
 * 
 * 
 * @example
 *  <ActualPlanogram
 *    user={user}
 *    setLines={setLines}
 *    setPlanogramClasses={setPlanogramClasses}
 *  />
 * 
 */

import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useState, Fragment, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";
import { getPlanogramConfig } from "../services";

export default function ActualPlanogram(props) {
  const [planogram, setPlanogram] = useState(null);
  const { width, height } = useWindowDimensions();
  const {user} = props;

  const emptyPlanogram = (
    <Fragment>
      <Image
        source={require("../assets/EmptyImage.jpg")}
        style={{ width: 100, height: 100 }}
      />
      <View
        style={[
          actualPlanogramStyles.textContainer,
          actualPlanogramStyles.emptyWidth,
        ]}
      >
        <Text style={[actualPlanogramStyles.header,
        {
          fontSize: width > 800 ? 24 : 16,
        }]}>
          Todavía no se ha registrado un nuevo planograma.
        </Text>
        <View
          style={[
            actualPlanogramStyles.descriptionContainer,
            actualPlanogramStyles.emptyWidth,
          ]}
        >
          <Text style={[actualPlanogramStyles.description,{
            fontSize: width > 800 ? 16 : 12,
            width: width > 800 ? "90%" : "80%",
          }]}>
            Aquí encontrarás las actualizaciones que se manden desde OXXO.
          </Text>
        </View>
      </View>
    </Fragment>
  );


  const planogramFilled = (
    <Fragment>
      <View
        style={[
          actualPlanogramStyles.textContainer,
          actualPlanogramStyles.filledWidth,
        ]}
      >
        <Text style={[actualPlanogramStyles.header, {
          fontSize: width > 800 ? width < 1200 ? 18 : 24 : 16,
        }]}>
          ¡Se ha registrado un nuevo planograma!
        </Text>
        <View
          style={[
            actualPlanogramStyles.descriptionContainer,
            actualPlanogramStyles.filledWidth,
          ]}
        >
          <Text style={[actualPlanogramStyles.description,{
            fontSize: width > 1200 ? 16 : 12,
          }]}>
            Realiza el acomodo de la góndola según te lo indique el siguiente
            planograma.
          </Text>
        </View>
      </View>

      <LinearGradient
        colors={[colors.PRIMARY_60, colors.SECONDARY_60]}
        start={[0, 0]}
        end={[1, 1]}
        location={[0.25, 1]}
        style={[
          actualPlanogramStyles.imageContainer,
          {
            height: width > 800 ? width < 1200 ? height * .4 : width > height ? height * 0.65 : height * 0.40 : height * 0.4,
            width: width < 1200 ? width * .5 : width > height ? width * 0.6 : width * 0.8,
          },
        ]}
      >
        <Image
          source={{uri: planogram}}
          style={{
            resizeMode: "contain",
            width: width > height ? "75%" : "90%",
            height: width > height ? "75%" : "90%",
          }}
        />
      </LinearGradient>

    </Fragment>
  );

  useEffect(() => {
    if (user) {
      getPlanogramConfig(user).then((response) => {
        setPlanogram(response.url_imagen);
        props.setLines(response.lineas);
        props.setPlanogramClasses(response.matriz_productos.productos);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [user]);

  return (
    <View
      style={[
        actualPlanogramStyles.mainContainer,
        { marginTop: planogram === null ? 0 : width > 800 ? width > height ? height * 0.05 : height * 0.15 : 32, 
          gap: width > height ? 32 : 80,
          justifyContent: planogram === null ? "center" : "flex-start" ,
        },
      ]}
    >
      {planogram === null ? emptyPlanogram : planogramFilled}
    </View>
  );
}

const actualPlanogramStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  header: {
    fontWeight: "800",
    color: "black",
    textAlign: "center",
  },
  description: {
    fontWeight: "400",
    color: "#71727A",
    textAlign: "center",
  },
  emptyWidth: {
    width: "90%",
    alignItems: "center",
  },
  filledWidth: {
    width: "80%",
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
});
