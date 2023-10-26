import { StyleSheet, useWindowDimensions, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import LineDrawing from "./LineDrawing";
import Svg, { Rect } from "react-native-svg";

const GraphicFeedback = (props) => {
  const [rectangles, setRectangles] = useState([]);
  const [rectanglesToDraw, setRectanglesToDraw] = useState([]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (rectangles.length > 0) {
      let rectangles = getRectanglesToDraw();
      setRectanglesToDraw(rectangles);
    }
  }, [rectangles]);

  const getRectanglesToDraw = () => {
    // Acomodar los rectangulos por row
    let rectanglesInRows = [];
    let rectanglesObject = {};
    for (let i = 0; i < rectangles.length; i++) {
      let rectangle = rectangles[i];
      if (rectanglesObject[rectangle.y]) {
        rectanglesObject[rectangle.y].push(rectangle);
      } else {
        rectanglesObject[rectangle.y] = [rectangle];
      }
    }

    for (let key in rectanglesObject) {
      rectanglesInRows.push(rectanglesObject[key]);
    }


    // Añadir el flag de isCorrect a cada rectangulo a partir de los steps
    for (let i = 0; i < props.steps.length; i++) {
      step = props.steps[i];
      let rectangle = rectanglesInRows[step.row][step.column];
      rectanglesInRows[step.row][step.column] = { ...rectangle, isCorrect: step.isCorrect };
    }

    return rectanglesInRows;
  };

  return (
    <View style={[styles.mainContainer, { width: width * 0.9 }]}>
      <Image
        source={{uri: props.image}}
        style={[
          styles.image,
          {
            width: height > 900 ? 150 : 75,
            height: height > 900 ? 150 : 75,
          },
        ]}
      />
      <View
        style={[
          styles.linesContainer,
          {
            width: height > 900 ? 150 : 75,
            height: height > 900 ? 150 : 75,
          },
        ]}
      >
        <LineDrawing
          width={height > 900 ? 150 : 75}
          height={height > 900 ? 150 : 75}
          setRectangles={setRectangles}
          adjust={true}
          lines={props.lines}
        />
      </View>
      <Svg style={[styles.rectContainer, {
        width: height > 900 ? 150 : 75,
        height: height > 900 ? 150 : 75,
      }]}>
        {
          rectanglesToDraw.map((row, index) => (
            row.map((rectangle, index) => (
              <Rect
                key={index}
                x={rectangle.x}
                y={rectangle.y}
                width={rectangle.width}
                height={rectangle.height}
                stroke="transparent"
                strokeWidth="2"
                fill={rectangle.isCorrect ? "green" : "red"}
                opacity={0.4}
              />
            ))
          ))
        }
      </Svg>
    </View>
  );
};

export default GraphicFeedback;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  linesContainer: {
    position: "absolute",
    zIndex: 5,
  },
  rectContainer: {
    position: "absolute",
    zIndex: 6,
  },
});
