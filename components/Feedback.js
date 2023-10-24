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
import { compareImages } from "../services";

export default function Feedback(props) {
  const [progress, setProgress] = useState([]);
  const [steps, setSteps] = useState([]);
  const [completedSteps, setCompletedSteps] = useState(false);
  const { width, height } = useWindowDimensions();

  let stepWidth = ((width) * 0.7) / steps.length;

  useEffect(() => {
    let completedSteps =
      progress.filter((element) => element === 1).length !== progress.length;
    setCompletedSteps(completedSteps);
  }, [progress]);

  useEffect(() => {
    compareImages(props.planogramClasses, props.actualPlanogramClases)
      .then((res) => {
        let errors = res.filter((element) => !element.isCorrect);
        setSteps(errors);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  useEffect(() => {
    let newProgressValues = [];
    steps.forEach((step) => {
      newProgressValues.push(0);
    });
    setProgress(newProgressValues);
  }, [steps]);

  return (
    <View style={feedbackStyles.container}>
      {
        steps.length > 0 ? (
          <Fragment>
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
        style={{ maxHeight: width > 1200 ? width > height ? height * .4 : height * 0.5 : height * 0.35 }}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          gap: width > 1200 ? 40 : 24,
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
              step={step}
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
              paddingVertical: width > 1200 ? 16 : 8,
              paddingHorizontal: width > 1200 ? 32 : 16,
            }
          ]}
          onPress={() => {}}
          disabled={completedSteps}
        >
          <Text style={[feedbackStyles.buttonText, {
            fontSize: width > 1200 ? 16 : 12,
          }]}>Evaluar nuevamente</Text>
        </Pressable>
      </View>
          </Fragment>
        ) : (
          <View style={[feedbackStyles.emptyContainer, {marginTop: height*.3}]}>
            <Text style={feedbackStyles.emptyHeader}>¡ Excelente !</Text>
            <Text style={feedbackStyles.emptyBody}>Tu góndola coincide con el planograma.</Text>
          </View> 
        )
      }
     
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
  emptyContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 32,
  },
  emptyHeader: {
    color: colors.PRIMARY,
    fontWeight: "bold",
    fontSize: 32,
  },
  emptyBody: {
    color: "black",
    fontSize: 24,
    textAlign: "center",
  },
});
