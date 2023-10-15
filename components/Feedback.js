import {
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import LinearProgressComponent from "./LinearProgressComponent";
import StepComponent from "./StepComponent";
import colors from "../constants/colors";

export default function Feedback() {
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const [steps, setSteps] = useState([0, 0, 0, 0]);
  const [completedSteps, setCompletedSteps] = useState(false);
  const { width, height } = useWindowDimensions();

  let stepWidth = ((width) * 0.7) / steps.length;

  useEffect(() => {
    let completedSteps =
      progress.filter((element) => element === 1).length !== progress.length;
    setCompletedSteps(completedSteps);
  }, [progress]);

  return (
    <View style={feedbackStyles.container}>
      <View style={feedbackStyles.progressBarContainer}>
        {steps.map((step, index) => (
          <Fragment key={index}>
            <LinearProgressComponent
              key={index}
              progress={progress[index]}
              width={stepWidth}
            />
          </Fragment>
        ))}
      </View>
      <ScrollView
        style={{ maxHeight: width > 600 ? width > height ? height * .4 : height * 0.5 : height * 0.35 }}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          gap: width > 600 ? 40 : 24,
          width: "90%",
          maxWidth: "90%",
        }}
        horizontal={false}
        vertical = {true}
      >
        {steps.map((step, index) => (
          <Fragment key={index}>
            <StepComponent
              key={index}
              progressValues={progress}
              setProgressValues={setProgress}
            />
          </Fragment>
        ))}
      </ScrollView>
      <View style={feedbackStyles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? colors.SECONDARY_60
                : completedSteps
                ? colors.SECONDARY_60
                : colors.SECONDARY,
            },
            feedbackStyles.button,
            {
              paddingVertical: width > 600 ? 16 : 8,
              paddingHorizontal: width > 600 ? 32 : 16,
            }
          ]}
          onPress={() => {}}
          disabled={completedSteps}
        >
          <Text style={[feedbackStyles.buttonText, {
            fontSize: width > 600 ? 16 : 12,
          }]}>Evaluar nuevamente</Text>
        </Pressable>
      </View>
    </View>
  );
}

const feedbackStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 32,
    gap: 64,
  },
  progressBarContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  buttonContainer: {
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },
  button: {
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
