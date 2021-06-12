import * as Font from "expo-font";
import AppLoading  from 'expo-app-loading';
import React,{useState} from 'react';
import DefagoBold from './assets/fonts/NotoSansLao-Bold.ttf';
import Defago from './assets/fonts/NotoSansLao-Regular.ttf';
import {NavStack} from './components/NavStack';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import { StatusBar } from "expo-status-bar";



const getFonts = () => {
  return Font.loadAsync({
    'Defago': Defago,
    'Defago-Bold': DefagoBold
  });
};



export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

    if (fontLoaded) {
      return (
          // <NavDrawer/>
          <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <NavStack/>
          </TouchableWithoutFeedback>
      );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={()=> setFontLoaded(true)} onError={console.warn}/>
    );
  }
}


