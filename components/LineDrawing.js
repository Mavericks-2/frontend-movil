import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Line } from "react-native-svg";

const LineDrawing = (props) => {
  const lineDrawingArray = props.lines || [];
  const [adjustedLineDrawingArray, setAdjustedLineDrawingArray] = useState([]);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    let adjustedArray = lineDrawingArray;
    if (props.adjust){
      adjustedArray = adjustLines(lineDrawingArray);
      props.setRectangles(convertLinesToRectangles(adjustedArray));
    }
    setAdjustedLineDrawingArray(
      adjustedArray
    );
  }, []);

  useEffect(() => {
    if (props.photoTaked) {
      // Ajustar las lineas como si fuera una imagen 
      let rectangles = convertLinesToRectangles(adjustedLineDrawingArray);
      props.setRectangles(rectangles);
    }
  }, [props.photoTaked]);

  useEffect(() => {
    if(adjustedLineDrawingArray.length > 0 && !isConfigured){
      let newAdjustedArray = adjustedLineDrawingArray;
      if (!props.adjust){
        newAdjustedArray = adjustLines(lineDrawingArray);
        setAdjustedLineDrawingArray(newAdjustedArray);
      }
      let containerSize = getContainerSize(newAdjustedArray);
      if (props.setCameraContainerSize){
        props.setCameraContainerSize(containerSize);
      }
      setIsConfigured(true);
    }
  }, [adjustedLineDrawingArray, isConfigured]);

  const getContainerSize = (arrayLines) => {
    let containerSize = {
      width: 0,
      height: 0,
    };
    let maxWidth = 0;
    let maxHeight = 0;
    for (let i = 0; i < arrayLines.length; i++) {
      let line = arrayLines[i];
      if (line.x2 > maxWidth) {
        maxWidth = line.x2;
      }
      if (line.y2 > maxHeight) {
        maxHeight = line.y2;
      }
    }
    containerSize.width = maxWidth;
    containerSize.height = maxHeight;
    return containerSize;
  };

  const convertLinesToRectangles = (lineArray) => {
    let rowLines = [];
    for (let i = 0; i < lineArray.length; i++) {
      if (lineArray[i].y1 === lineArray[i].y2) {
        rowLines.push(lineArray[i]);
      }
    }
    
    let lastRowLine = {
      x1: 0,
      y1: props.height,
      x2: props.width,
      y2: props.height,
    };

    rowLines.push(lastRowLine);

    let rowColumnLines = {};
    for (let i = 0; i < lineArray.length; i++) {
      if (lineArray[i].x1 === lineArray[i].x2) {
        for (let j = 0; j < rowLines.length; j++) {
          let rowLine = rowLines[j];
          if (rowLine.y1 === lineArray[i].y2) {
            row = j;
            break;
          }
        }

        if (rowColumnLines[row]) {
          rowColumnLines[row].push(lineArray[i]);
        } else {
          rowColumnLines[row] = [lineArray[i]];
        }
      }
    }

    let rowColumnLinesKeys = Object.keys(rowColumnLines);
    for (let i = 0; i < rowColumnLinesKeys.length; i++) {
      let rowKey = rowColumnLinesKeys[i];
      let firstColumnLine = {
        x1: 0,
        y1: rowColumnLines[rowKey][0].y1,
        x2: 0,
        y2: rowColumnLines[rowKey][0].y2,
      };
      let lastColumnLine = {
        x1: props.width,
        y1: rowColumnLines[rowKey][0].y1,
        x2: props.width,
        y2: rowColumnLines[rowKey][0].y2,
      };

      rowColumnLines[rowKey].push(firstColumnLine);
      rowColumnLines[rowKey].push(lastColumnLine);

      rowColumnLines[rowKey].sort((a, b) => {
        return a.x1 - b.x1;
      });
    }

    let rectangles = [];

    for (let i = 0; i < rowColumnLinesKeys.length; i++) {
      let rowKey = rowColumnLinesKeys[i];
      for (let j = 0; j < rowColumnLines[rowKey].length - 1; j++) {
        let columnLine = rowColumnLines[rowKey][j];
        let nextColumnLine = rowColumnLines[rowKey][j + 1];

        let rectangle = {
          x: columnLine.x1,
          y: columnLine.y1,
          width: nextColumnLine.x1 - columnLine.x1,
          height: columnLine.y2 - columnLine.y1,
        };

        rectangles.push(rectangle);
      }
    }

     // Maintain rectangles close to the canvas borders
     rectangles = rectangles.filter(
      (rect) =>
        rect.x !== 0 &&
        rect.x + rect.width !== props.width
    );

    // get the length of the rectangles
    let rectanglesLength = 0;
    for (let i = 0; i < rectangles.length; i++) {
      rectanglesLength += rectangles[i].width;
    }

    console.log("rectanglesLength", rectanglesLength);

    return rectangles;
  };

  const adjustLines = (lineArray) => {
    const {width, height} = props;
    const {width: imageWidth, height: imageHeight} = getWidthHeight(lineArray);
    let adjustedLineArray = [];
    for (let i = 0; i < lineArray.length; i++) {
      let line = lineArray[i];
      let adjustedLine = {
        x1: (line.x1 * width) / imageWidth,
        y1: (line.y1 * height) / imageHeight,
        x2: (line.x2 * width) / imageWidth,
        y2: (line.y2 * height) / imageHeight,
      };
      adjustedLineArray.push(adjustedLine);
    }
    return adjustedLineArray;
  };

  const getWidthHeight = (lineArray) => {
    let width = 0;
    let height = 0;
    for (let i = 0; i < lineArray.length; i++) {
      let line = lineArray[i];
      if (line.x2 > width) {
        width = line.x2;
      }
      if (line.y2 > height) {
        height = line.y2;
      }
    }
    return { width: width, height: height };
  }

  return (
    <View style={lineDrawingStyles.container}>
      <Svg style={lineDrawingStyles.redSvg}>
        {adjustedLineDrawingArray.map((line, index) => {
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
        })}
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
