import { View, Text, Pressable, SafeAreaView } from "react-native";
import React from "react";

export default function Register(props) {
  return (
    <SafeAreaView>
      <View>
        <Pressable onPress={() => props.navigation.navigate("Login")}>
          <Text>Register</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
