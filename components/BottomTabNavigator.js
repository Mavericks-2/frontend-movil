/**
 * @fileOverview Componente que maneja la navegación inferior.
 *
 * @component BottomTabNavigator
 *
 * @requires react
 * @requires react-native
 * @requires react-navigation/bottom-tabs
 * @requires ../screens
 * @requires ./BottomTabCustom
 * @requires react-native-async-storage/async-storage
 * @requires ../services
 * 
 * @exports BottomTabNavigator
 * 
 * @param  {Object}  props  Props recibidas por el componente.
 * 
 * @example
 *  <BottomTabNavigator />
 * 
 */

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Account } from "../screens";
import BottomTabCustom from "./BottomTabCustom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from "../services";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  const { email } = props.route.params;

  const handleGetUserData = async () => {
    const user = await getUser({email: email}).catch((err) => {
      console.log(err);
    });
    if (user){
      await AsyncStorage.setItem("user", JSON.stringify(user)).catch((err) => {
        console.log(err);
      });
    }
  }

  useEffect(() => {
    if (email){
      handleGetUserData();
    }
  }, []);

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
