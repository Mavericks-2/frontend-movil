import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import colors from '../constants/colors';

const CardInfo = () => {
    const { width, height } = useWindowDimensions();
  return (
    <LinearGradient
        colors={[colors.CARDINFO_PRIMARY, colors.CARDINFO_SECONDARY]}
        start={[0, 1]}
        end={[1, 0]}
        location={[0.25, 1]}
        style={[styles.cardContainer, {
            width: width > 700 ? 150 : 100,
            height: width > 700 ? 150 : 100,
        
        }]}
    >
      <Text style={[styles.infoHeader, {
            fontSize: width > 700 ? 24 : 14,  
      }]}>CardInfo</Text>
      <Text style={[styles.infoBody, {
            fontSize: width > 700 ? 16 : 14,  
      }]}>16</Text>
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
    },
    infoBody: {
        fontWeight: "600",
        color: colors.PRIMARY,
        fontSize: 16,
    }
});