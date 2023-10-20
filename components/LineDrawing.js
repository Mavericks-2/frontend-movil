import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Line } from "react-native-svg";

const LineDrawing = (props) => {
  const lineDrawingArray = props.lines || [];
  const [adjustedLineDrawingArray, setAdjustedLineDrawingArray] = useState([]);

  useEffect(() => {
    setAdjustedLineDrawingArray(getAdjustedLineDrawingArray(props.width, props.height));
  }, []);

  useEffect(() => {
    if (props.photoTaked) {
      let rectangles = convertLinesToRectangles(adjustedLineDrawingArray);
      props.setRectangles(rectangles);
    }
  }, [props.photoTaked]);

  const getAdjustedLineDrawingArray = (width, height) => {
    const adjustedLineDrawingArray = [];
    lineDrawingArray.forEach((line) => {
      const adjustedLine = {
        x1: (line.x1 * width) / 500,
        y1: (line.y1 * height) / 250,
        x2: (line.x2 * width) / 500,
        y2: (line.y2 * height) / 250,
      };
      adjustedLineDrawingArray.push(adjustedLine);
    });
    return adjustedLineDrawingArray;
  };

  const convertLinesToRectangles = (lineArray) => {
    let rowLines = [];
    for (let i = 0; i < lineArray.length; i++) {
      if (lineArray[i].y1 === lineArray[i].y2) {
        rowLines.push(lineArray[i]);
      }
    }

    let columnLines = [];
    for (let i = 0; i < lineArray.length; i++) {
      if (lineArray[i].x1 === lineArray[i].x2) {
        let row = -1;
        for (let j = 0; j < rowLines.length; j++) {
          let rowLine = rowLines[j];
          if (rowLine.y1 === lineArray[i].y2) {
            row = j;
            break;
          }
        }
        if (row >= 0) {
          lineArray[i].row = row;
          columnLines.push(lineArray[i]);
        }
      }
    }

    let rectangles = [];
    let prev = { x1: 0, y1: 0 };
    let row = 0;
    for (let i = 0; i < columnLines.length; i++) {
      if (columnLines[i].x1 > props.width) {
        continue;
      }
      if (columnLines[i].row !== row) {
        prev = { x1: 0, y1: columnLines[i].y1 };
      }
      // create a rectangle
      let rectangle = {
        x: prev.x1,
        y: prev.y1,
        width: columnLines[i].x1 - prev.x1,
        height: columnLines[i].y2 - prev.y1,
      };
      rectangles.push(rectangle);

      prev = columnLines[i];
      row = columnLines[i].row;
    }

    return rectangles;
  };

  return (
    <View style={lineDrawingStyles.container}>
      <Svg style={lineDrawingStyles.redSvg}>
        {adjustedLineDrawingArray.map(
          (line, index) => {
            return (
              <Line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="red"
                strokeWidth="2"
                key={index}
              />
            );
          }
        )}
      </Svg>
    </View>
  );
};

const lineDrawingStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  redSvg: {
    backgroundColor: "transparent",
    borderColor: "red",
    borderWidth: 1,
    width: "100%",
    height: "100%",
  },
});

export default LineDrawing;
