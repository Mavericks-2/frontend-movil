import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Account } from "../screens";
import BottomTabCustom from "./BottomTabCustom";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
      tabBar={(props) => <BottomTabCustom {...props} />}
    >
      <Tab.Screen name="Inspector" component={Home} 
        options={{
            iconName: "app-registration",
        }}
      />
      <Tab.Screen name="Cuenta" component={Account} 
        options={{
            iconName: "account-circle",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
