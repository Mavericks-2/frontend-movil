/**
 * @fileOverview Componente que muestra una barra de progreso lineal.
 * 
 * @component LinearProgressComponent
 * 
 * @requires react
 * @requires react-native
 * @requires rneui/themed
 * @requires ../constants/colors
 * 
 * @exports LinearProgressComponent
 * 
 * @param  {Number}  progress  Progreso de la barra.
 * @param  {Number}  width  Ancho de la barra.
 * 
 * @example
 *  <LinearProgressComponent
 *    progress={0.5}
 *    width={100}
 *  />
 * 
 */

import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Button, LinearProgress } from "@rneui/themed";
import colors from "../constants/colors";

export default function LinearProgressComponent(props) {

  return (
    <View style={{width: props.width || 100}}>
        <LinearProgress
          style={{
            marginVertical: 10,
            height: 8,
            borderRadius: 12,
          }}
          color={colors.SECONDARY}
          value={props.progress}
        />
    </View>
  );
}
