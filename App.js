import * as Font from "expo-font";
import React, { useState } from "react";
import DefagoBold from "./assets/fonts/NotoSansLao-Bold.ttf";
import Defago from "./assets/fonts/NotoSansLao-Regular.ttf";
import { NavStack } from "./components/NavStack";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useFonts } from 'expo-font';
//firebase
import firebase from "firebase";
//app loading
import AppLoading from "expo-app-loading";
//async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
//credentials context
import { CredentialsContext } from "./components/CredentialsContext";
import { firebaseConfig } from "./components/Config";
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();


export default function App() {

  const getFonts = () => {
    return Font.loadAsync({
      "Defago": Defago,
      "Defago-Bold": DefagoBold,
    });
  };
  
  
  let [fontsLoaded] = useFonts({
    "Defago": Defago,
    "Defago-Bold": DefagoBold,
  });

  const [fontLoaded, setFontLoaded] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage.getItem("kaidaoCredentials")
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch(error => console.log(error));
  };

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }

  if (!fontsLoaded) {
    return (
      <AppLoading />
    );
  } else {
    return (
      <CredentialsContext.Provider
      value={{ storedCredentials, setStoredCredentials }}
    >     
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <NavStack />
      </TouchableWithoutFeedback>
    </CredentialsContext.Provider>
    );
  }
}
