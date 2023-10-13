import { View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import LinearProgressComponent from "./LinearProgressComponent";
import StepComponent from "./StepComponent";
import colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

export default function Feedback() {
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const [steps, setSteps] = useState([0, 0, 0, 0]);
  const [completedSteps, setCompletedSteps] = useState(false);
  let stepWidth = ((width - 64) * 0.7) / steps.length;
  useEffect(() => {
    let completedSteps = progress.filter((element) => element === 1).length !== progress.length;
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
      <View style={feedbackStyles.stepContainer}>
        {steps.map((step, index) => (
          <Fragment key={index}>
            <StepComponent
              key={index}
              progressValues={progress}
              setProgressValues={setProgress}
            />
          </Fragment>
        ))}
      </View>
      <View style={feedbackStyles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.SECONDARY_60 : completedSteps ? colors.SECONDARY_60 : colors.SECONDARY,
            },
            feedbackStyles.button,
          ]}
          onPress={() => {}}
          disabled={completedSteps}
        >
          <Text style={feedbackStyles.buttonText}>Evaluar nuevamente</Text>
        </Pressable>
      </View>
    </View>
  );
}

const feedbackStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 32,
    gap: 64,
  },
  progressBarContainer: {
    width: (width - 64) * 0.7,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  stepContainer: {
    width: (width - 64) * 0.95,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    gap: 40,
  },
  buttonContainer: {
    width: (width - 64) * 0.95,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
