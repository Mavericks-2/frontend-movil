import { useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, OnBoarding, Login, Register, VerifyCode } from "./screens";
import BottomTabNavigator from "./components/BottomTabNavigator";
import React, { useEffect, useState, Fragment } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const user = await AsyncStorage.getItem("user").catch((err) => {
        console.log(err);
      });
      if (user) {
        setUser(JSON.parse(user));
      }
    };
    getUserData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoarding">
        {!user ? (
          <Fragment>
            <Stack.Screen
              name="OnBoarding"
              component={OnBoarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VerifyCode"
              component={VerifyCode}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen
              name="Home"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
              initialParams={{ email: user.email }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VerifyCode"
              component={VerifyCode}
              options={{ headerShown: false }}
            />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
