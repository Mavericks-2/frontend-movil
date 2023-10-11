import { View, Text, Pressable, SafeAreaView } from "react-native";
import React from "react";

export default function Home(props) {
  return (
    <SafeAreaView>
      <View>
        <Pressable onPress={() => props.navigation.navigate("OnBoarding")}>
          <Text>Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
