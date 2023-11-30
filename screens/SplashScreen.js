import { StyleSheet, Image, View } from "react-native";
import React, { Fragment, useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = (props) => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [user, setUser] = useState(null);
  const { navigation } = props;

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

  useEffect(() => {
    if (animationFinished) {
      setTimeout(() => {
      if (user) {
        navigation.navigate("Home", { user: user, email: user.email });
      } else {
        navigation.navigate("OnBoarding");
      }
    }, 150);
    }
  }, [animationFinished]);

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: animationFinished ? "#ff0000" : "#FFFFF" },
      ]}
    >
      {animationFinished ? (
        <Fragment></Fragment>
      ) : (
        <LottieView
          source={require("../assets/splashAnimation.json")}
          autoPlay
          loop={false}
          renderMode="cover"
          style={{ width: "100%", height: "100%" }}
          speed={0.8}
          onAnimationFinish={() => {
            setAnimationFinished(true);
          }}
        />
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 0,
    alignItems: "center",
  },
});
