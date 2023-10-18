import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Line } from "react-native-svg";

const LineDrawing = (props) => {
  const lineDrawingArray = props.lines || [
    {
      x1: 0,
      y1: 75,
      x2: 700,
      y2: 75,
    },
    {
      x1: 0,
      y1: 150,
      x2: 700,
      y2: 150,
    },
    {
      x1: 0,
      y1: 225,
      x2: 700,
      y2: 225,
    },
    {
      x1: 21.875,
      y1: 0,
      x2: 21.875,
      y2: 75,
    },
    {
      x1: 65.625,
      y1: 0,
      x2: 65.625,
      y2: 75,
    },
    {
      x1: 109.375,
      y1: 0,
      x2: 109.375,
      y2: 75,
    },
    {
      x1: 153.125,
      y1: 0,
      x2: 153.125,
      y2: 75,
    },
    {
      x1: 196.875,
      y1: 0,
      x2: 196.875,
      y2: 75,
    },
    {
      x1: 240.625,
      y1: 0,
      x2: 240.625,
      y2: 75,
    },
    {
      x1: 284.375,
      y1: 0,
      x2: 284.375,
      y2: 75,
    },
    {
      x1: 328.125,
      y1: 0,
      x2: 328.125,
      y2: 75,
    },
    {
      x1: 371.875,
      y1: 0,
      x2: 371.875,
      y2: 75,
    },
    {
      x1: 415.625,
      y1: 0,
      x2: 415.625,
      y2: 75,
    },
    {
      x1: 459.375,
      y1: 0,
      x2: 459.375,
      y2: 75,
    },
    {
      x1: 503.125,
      y1: 0,
      x2: 503.125,
      y2: 75,
    },
    {
      x1: 546.875,
      y1: 0,
      x2: 546.875,
      y2: 75,
    },
    {
      x1: 590.625,
      y1: 0,
      x2: 590.625,
      y2: 75,
    },
    {
      x1: 634.375,
      y1: 0,
      x2: 634.375,
      y2: 75,
    },
    {
      x1: 678.125,
      y1: 0,
      x2: 678.125,
      y2: 75,
    },
    {
      x1: 721.875,
      y1: 0,
      x2: 721.875,
      y2: 75,
    },
    {
      x1: 23.333333333333332,
      y1: 75,
      x2: 23.333333333333332,
      y2: 150,
    },
    {
      x1: 70,
      y1: 75,
      x2: 70,
      y2: 150,
    },
    {
      x1: 116.66666666666666,
      y1: 75,
      x2: 116.66666666666666,
      y2: 150,
    },
    {
      x1: 163.33333333333331,
      y1: 75,
      x2: 163.33333333333331,
      y2: 150,
    },
    {
      x1: 210,
      y1: 75,
      x2: 210,
      y2: 150,
    },
    {
      x1: 256.66666666666663,
      y1: 75,
      x2: 256.66666666666663,
      y2: 150,
    },
    {
      x1: 303.3333333333333,
      y1: 75,
      x2: 303.3333333333333,
      y2: 150,
    },
    {
      x1: 350,
      y1: 75,
      x2: 350,
      y2: 150,
    },
    {
      x1: 396.66666666666663,
      y1: 75,
      x2: 396.66666666666663,
      y2: 150,
    },
    {
      x1: 443.3333333333333,
      y1: 75,
      x2: 443.3333333333333,
      y2: 150,
    },
    {
      x1: 490,
      y1: 75,
      x2: 490,
      y2: 150,
    },
    {
      x1: 536.6666666666666,
      y1: 75,
      x2: 536.6666666666666,
      y2: 150,
    },
    {
      x1: 583.3333333333333,
      y1: 75,
      x2: 583.3333333333333,
      y2: 150,
    },
    {
      x1: 630,
      y1: 75,
      x2: 630,
      y2: 150,
    },
    {
      x1: 676.6666666666666,
      y1: 75,
      x2: 676.6666666666666,
      y2: 150,
    },
    {
      x1: 723.3333333333333,
      y1: 75,
      x2: 723.3333333333333,
      y2: 150,
    },
    {
      x1: 15.909090909090908,
      y1: 150,
      x2: 15.909090909090908,
      y2: 225,
    },
    {
      x1: 47.72727272727273,
      y1: 150,
      x2: 47.72727272727273,
      y2: 225,
    },
    {
      x1: 79.54545454545455,
      y1: 150,
      x2: 79.54545454545455,
      y2: 225,
    },
    {
      x1: 111.36363636363636,
      y1: 150,
      x2: 111.36363636363636,
      y2: 225,
    },
    {
      x1: 143.1818181818182,
      y1: 150,
      x2: 143.1818181818182,
      y2: 225,
    },
    {
      x1: 175,
      y1: 150,
      x2: 175,
      y2: 225,
    },
    {
      x1: 206.8181818181818,
      y1: 150,
      x2: 206.8181818181818,
      y2: 225,
    },
    {
      x1: 238.63636363636363,
      y1: 150,
      x2: 238.63636363636363,
      y2: 225,
    },
    {
      x1: 270.45454545454544,
      y1: 150,
      x2: 270.45454545454544,
      y2: 225,
    },
    {
      x1: 302.27272727272725,
      y1: 150,
      x2: 302.27272727272725,
      y2: 225,
    },
    {
      x1: 334.09090909090907,
      y1: 150,
      x2: 334.09090909090907,
      y2: 225,
    },
    {
      x1: 365.9090909090909,
      y1: 150,
      x2: 365.9090909090909,
      y2: 225,
    },
    {
      x1: 397.7272727272727,
      y1: 150,
      x2: 397.7272727272727,
      y2: 225,
    },
    {
      x1: 429.5454545454545,
      y1: 150,
      x2: 429.5454545454545,
      y2: 225,
    },
    {
      x1: 461.3636363636363,
      y1: 150,
      x2: 461.3636363636363,
      y2: 225,
    },
    {
      x1: 493.18181818181813,
      y1: 150,
      x2: 493.18181818181813,
      y2: 225,
    },
    {
      x1: 525,
      y1: 150,
      x2: 525,
      y2: 225,
    },
    {
      x1: 556.8181818181818,
      y1: 150,
      x2: 556.8181818181818,
      y2: 225,
    },
    {
      x1: 588.6363636363636,
      y1: 150,
      x2: 588.6363636363636,
      y2: 225,
    },
    {
      x1: 620.4545454545454,
      y1: 150,
      x2: 620.4545454545454,
      y2: 225,
    },
    {
      x1: 652.2727272727273,
      y1: 150,
      x2: 652.2727272727273,
      y2: 225,
    },
    {
      x1: 684.090909090909,
      y1: 150,
      x2: 684.090909090909,
      y2: 225,
    },
    {
      x1: 715.9090909090909,
      y1: 150,
      x2: 715.9090909090909,
      y2: 225,
    },
    {
      x1: 23.333333333333332,
      y1: 225,
      x2: 23.333333333333332,
      y2: 300,
    },
    {
      x1: 70,
      y1: 225,
      x2: 70,
      y2: 300,
    },
    {
      x1: 116.66666666666666,
      y1: 225,
      x2: 116.66666666666666,
      y2: 300,
    },
    {
      x1: 163.33333333333331,
      y1: 225,
      x2: 163.33333333333331,
      y2: 300,
    },
    {
      x1: 210,
      y1: 225,
      x2: 210,
      y2: 300,
    },
    {
      x1: 256.66666666666663,
      y1: 225,
      x2: 256.66666666666663,
      y2: 300,
    },
    {
      x1: 303.3333333333333,
      y1: 225,
      x2: 303.3333333333333,
      y2: 300,
    },
    {
      x1: 350,
      y1: 225,
      x2: 350,
      y2: 300,
    },
    {
      x1: 396.66666666666663,
      y1: 225,
      x2: 396.66666666666663,
      y2: 300,
    },
    {
      x1: 443.3333333333333,
      y1: 225,
      x2: 443.3333333333333,
      y2: 300,
    },
    {
      x1: 490,
      y1: 225,
      x2: 490,
      y2: 300,
    },
    {
      x1: 536.6666666666666,
      y1: 225,
      x2: 536.6666666666666,
      y2: 300,
    },
    {
      x1: 583.3333333333333,
      y1: 225,
      x2: 583.3333333333333,
      y2: 300,
    },
    {
      x1: 630,
      y1: 225,
      x2: 630,
      y2: 300,
    },
    {
      x1: 676.6666666666666,
      y1: 225,
      x2: 676.6666666666666,
      y2: 300,
    },
    {
      x1: 723.3333333333333,
      y1: 225,
      x2: 723.3333333333333,
      y2: 300,
    },
  ];

  // Ajustar los valores de x1, y1, x2, y2 para que se ajusten al contenedor dado un width y height
  const getAdjustedLineDrawingArray = (width, height) => {
    const adjustedLineDrawingArray = [];
    lineDrawingArray.forEach((line) => {
      const adjustedLine = {
        x1: (line.x1 * width) / 700,
        y1: (line.y1 * height) / 300,
        x2: (line.x2 * width) / 700,
        y2: (line.y2 * height) / 300,
      };
      adjustedLineDrawingArray.push(adjustedLine);
    });
    let rectangles = convertLinesToRectangles(adjustedLineDrawingArray);
    console.log("Rectangles:",rectangles);
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
        {getAdjustedLineDrawingArray(props.width, props.height).map(
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
