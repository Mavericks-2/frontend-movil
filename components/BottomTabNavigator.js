import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Account } from "../screens";
import BottomTabCustom from "./BottomTabCustom";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  const { email } = props.route.params;

  const handleGetUserData = async () => {
    const user = await getUser(props.route.params.email).catch((err) => {
      console.log(err);
    });
    console.log(user);
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
