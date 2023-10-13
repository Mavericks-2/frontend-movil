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
