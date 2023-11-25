/**
 * @fileOverview Componente que maneja la pantalla principal de la aplicación.
 * 
 * @component Home
 * 
 * @requires react
 * @requires react-native
 * @requires react-native-async-storage/async-storage
 * @requires ../components/ActualPlanogram
 * @requires ../components/EvaluatePlanogram
 * @requires ../components/Feedback
 * @requires ../services
 * @requires ../assets/oxxo_logo.png
 *
 * @exports Home
 * 
 * @example
 * <Home />
 * 
 */

import { View, Text, Pressable, useWindowDimensions, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import ActualPlanogram from "../components/ActualPlanogram";
import EvaluatePlanogram from "../components/EvaluatePlanogram";
import Feedback from "../components/Feedback";
import Logo from "../assets/oxxo_logo.png"
import { postComparedPhotos, getPlanogramConfig } from "../services";
import { productMatrixCatalog } from "../components/StepComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home(props) {
  const [selected, setSelected] = useState(0);
  const { width, height } = useWindowDimensions();
  const [planogramClasses, setPlanogramClasses] = useState([]);
  const [actualPlanogramClasses, setActualPlanogramClasses] = useState([]);
  const [planogramLines, setPlanogramLines ] = useState(null);
  const [hasPlanogram, setHasPlanogram] = useState(false);
  const [uriImage, setUriImage] = useState(null);
  const [idPlanogram, setPlanogram] = useState(null);
  const [differencesMatrix, setDifferencesMatrix] = useState([]);
  const [productMatrix, setProductMatrix] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const getUserData = async () => {
      const user = await AsyncStorage.getItem("user").catch((err) => {
        console.log(err);
      });
      if (user){
        setUser(JSON.parse(user));
      }
    }
    setTimeout(()=>getUserData(), 500);
  }, []);

  useEffect(() => {
    if (planogramClasses.length === 0) {
      setHasPlanogram(false);
    } else {
      setHasPlanogram(true);
    }
  }, [planogramClasses]);

  useEffect(() => {
    if (actualPlanogramClasses.length > 0 && selected === 2) {
      
      const fetchData = async () => {
        try {
          const response = await getPlanogramConfig(user);
          setPlanogram(response.id_planogram);
          compareMatrices(planogramClasses, actualPlanogramClasses);  
      } catch (error) {
          console.log("Error while fetching data:", error);
        }
      };
      fetchData();
    }
  }, [actualPlanogramClasses, selected]);

  useEffect(() => {
    if (differencesMatrix.length > 0) {
      sustituirErroresPorProductos(differencesMatrix, actualPlanogramClasses, productMatrixCatalog);
    }
  }, [differencesMatrix]);
  
  useEffect(() => {
    if (idPlanogram !== null && differencesMatrix.length > 0 && productMatrix.length > 0){
      const state = differencesMatrix.some(row => row.includes(1)) ? "desacomodado" : "acomodado";

      const postData = async () => {
        try {
          await postComparedPhotos(state, differencesMatrix, productMatrix, user.id_acomodador, idPlanogram);
        } catch (error) {
          
          console.log(error);
        }
      };
      postData();
    }}, [idPlanogram, differencesMatrix, productMatrix]);

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
      return <ActualPlanogram setPlanogramClasses={setPlanogramClasses} setLines={setPlanogramLines} user={user} setSelected={setSelected} />;
    } else if (selected === 1) {
      return <EvaluatePlanogram setPlanogramClasses={setActualPlanogramClasses} lines={planogramLines} setUriImage={setUriImage} user={user} setSelected={setSelected} />;
    } else {
      return <Feedback planogramClasses={planogramClasses} actualPlanogramClases={actualPlanogramClasses} lines={planogramLines} image={uriImage} setSelected={setSelected} />;
    }
  }

  function compareMatrices(planogram, photoMatrix) {
    const differenceMatrix = [];

    for (let i = 0; i < planogram.length; i++) {
      const row = planogram[i];
      const photoRow = photoMatrix[i];

      const differenceRow = [];
      for (let j = 0; j < row.length; j++) {
        const difference = row[j] !== photoRow[j];
        differenceRow.push(difference ? 1 : 0);
      }

      differenceMatrix.push(differenceRow);
    }
    setDifferencesMatrix(differenceMatrix);
    return differenceMatrix;
  }

  function sustituirErroresPorProductos (differencesMatrix, actualPlanogramClasses, productMatrixCatalog) {
    const matrizProductos = [];
  
    for (let i = 0; i < differencesMatrix.length; i++) {
      const productRow = [];
      for (let j = 0; j < differencesMatrix[i].length; j++) {
        if (differencesMatrix[i][j] === 1) {
          const productIndex = actualPlanogramClasses[i][j];
          const productName = productMatrixCatalog[productIndex];
          productRow.push(productName);
        }
      }
      matrizProductos.push(productRow);
    }
    setProductMatrix(matrizProductos);
    return productMatrix;
  }

  return (
    <View style={homeStyles.mainContainer}>
      <View>
        <Image source={Logo} style={{ width: 35, height: 15, resizeMode: 'contain'}} />
      </View>
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
          disabled={!hasPlanogram}
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
          disabled={!hasPlanogram}
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
