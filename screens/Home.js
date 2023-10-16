import { View, Text, Pressable, useWindowDimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import ActualPlanogram from "../components/ActualPlanogram";
import EvaluatePlanogram from "../components/EvaluatePlanogram";
import Feedback from "../components/Feedback";


export default function Home(props) {
  const [selected, setSelected] = useState(0);
  const { width, height } = useWindowDimensions();

  const setStyleBySelected = (index) => {
    if (index === selected) {
      return homeStyles.topBarItemSelected;
    } else if (selected - index === 1 || index === 2) {
      return homeStyles.topBarItemLast;
    } else {
      return homeStyles.topBarItem;
    }
  }

  const setTextStyleBySelected = (index) => {
    let fontSize = width > 800 ? width < 1200 ? 12 : 16 : 8;
    if (index === selected) {
      return [homeStyles.topBarItemSelectedText, { fontSize: fontSize }];
    } else {
      return [homeStyles.topBarItemText, { fontSize: fontSize }];
    }
  }

  const setComponentBySelected = () => {
    if (selected === 0) {
      return <ActualPlanogram />;
    } else if (selected === 1) {
      return <EvaluatePlanogram />;
    } else {
      return <Feedback />;
    }
  }


  return (
    <View style={homeStyles.mainContainer}>
      <Pressable onPress={() => props.navigation.navigate("Login")}>
        <Text style={homeStyles.title}>Planogram Inspector</Text>
      </Pressable>
      <View style={homeStyles.topBarContainer}>
        <Pressable
          onPress={() => {
            setSelected(0);
          }}
        >
          <View
            style={
              [setStyleBySelected(0), { width: width * 0.25 }]
            }
          >
            <Text style={setTextStyleBySelected(0)}>Planograma actual</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setSelected(1);
          }}
        >
          <View
            style={
              [setStyleBySelected(1), { width: width * 0.25}]
            }
          >
            <Text style={setTextStyleBySelected(1)}>Evalúa tu planograma</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setSelected(2);
          }}
        >
          <View
            style={
              [setStyleBySelected(2), { width: width * 0.25 }]
            }
          >
            <Text style={setTextStyleBySelected(2)}>Retroalimentación</Text>
          </View>
        </Pressable>
      </View>
      {setComponentBySelected()}
    </View>
  );
}

const homeStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    alignItems: "center",
    paddingTop: 64,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "black",
  },
  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
    marginTop: 24,
    backgroundColor: "#F8F9FE",
    borderRadius: 12,
    width: "90%",
    height: 50,
  },
  topBarItemSelected: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
    backgroundColor: "white",
    height: 35,
  },
  topBarItem: {
    borderRightColor: "black",
    borderRightWidth: 1,
    color: "gray",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  topBarItemLast: {
    color: "gray",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  topBarItemSelectedText:{
    color: "black",
    fontWeight: "bold",
  },
  topBarItemText: {
    color: "gray",
  }
});
