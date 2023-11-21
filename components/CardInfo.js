/**
 * @fileOverview Componente que muestra la información en una tarjeta.
 * 
 * @component CardInfo
 * 
 * @requires react
 * @requires react-native
 * @requires expo-linear-gradient
 * @requires ../constants/colors
 * 
 * @exports CardInfo
 * 
 * @param  {String}  title  Título de la tarjeta.
 * @param  {String}  data  Datos de la tarjeta.
 * 
 * @example
 * <CardInfo
 *  title="Título"
 *  data="Datos"
 *  />
 * 
 */

import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import colors from '../constants/colors';

const CardInfo = (props) => {
    const { width, height } = useWindowDimensions();
  return (
    <LinearGradient
        colors={[colors.CARDINFO_PRIMARY, colors.CARDINFO_SECONDARY]}
        start={[0, 1]}
        end={[1, 0]}
        location={[0.25, 1]}
        style={[styles.cardContainer, {
            width: width > 700 ? 175 : 125,
            height: width > 700 ? 175 : 125,
        
        }]}
    >
      <Text style={[styles.infoHeader, {
            fontSize: width > 700 ? 16 : 14,  
      }]}>{props.title || "CardInfo"}</Text>
      <Text style={[styles.infoBody, {
            fontSize: width > 700 ? 24 : 14,  
      }]}>{props.data || "Data"}</Text>
    </LinearGradient>
  )
}

export default CardInfo;

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 24,
        justifyContent: "space-around",
        paddingVertical: 16,
        alignItems: "center",
    },
    infoHeader: {
        fontWeight: "600",
        color: "black",
        textAlign: "center",
    },
    infoBody: {
        fontWeight: "600",
        color: colors.PRIMARY,
        fontSize: 16,
        textAlign: "center",
    }
});