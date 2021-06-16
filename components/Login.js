import React, {useState,useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import firebase from "firebase";
import * as Google from 'expo-google-app-auth';
//async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
//credentials context
import { CredentialsContext } from "./CredentialsContext";

const mascot = require("../assets/images/Icon/KaRainz.png");

const Login = ({navigation, route}) => {

  const onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);

    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
  
        // Sign in with credential from the Google user.
        firebase
        .auth()
        .signInWithCredential(credential)
        .then((result)=>{
          console.log('user signed in');
          console.log("name = " + result.user.name);
          console.log(result.user.email);
          console.log(result.user.photoURL);
          firebase
          .database()
          .ref('users/'+ result.uid)
          .set({
            gmail: result.user.email,
            profile_picture: result.user.photoURL,
            user_name: result.user.name,
          })
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }


  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.user.id) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
  
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  //context
  const {storedCredentials,setStoredCredentials} = useContext(CredentialsContext);

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);
    const config = {
      iosClientId: `395331947715-fotna0uqhi3uqsj4bvcgvjao72kulaiu.apps.googleusercontent.com`, 
      androidClientId: `395331947715-hibrq4iek5tdi4gburhm1pnu9ikgesm4.apps.googleusercontent.com`,
      scopes: ['profile', 'email'] }
    
    Google
    .logInAsync(config)
    .then((result)=> {
      const {type, user} = result;

      if( type === 'success'){
        const {email, name, photoUrl} = user;
        onSignIn(result);
        ToastAndroid.show('ເຂົ້າສູ່ລະບົບສຳເລັດ', ToastAndroid.SHORT);
        setTimeout(()=>navigation.navigate('NavDrawer'), 1000);
        persistLogin({email,name,photoUrl});
        return result.accessToken;
      }else {
        ToastAndroid.show('ກະລຸນາລອງໃໝ່ອີກຄັ້ງ!', ToastAndroid.SHORT);
      }
      setGoogleSubmitting(false);
    })
    .catch(error => {
      console.log(error);
      ToastAndroid.show('ບັນຫາເກີດຂຶ້ນ, ກະລຸນາລອງໃໝ່ອີກຄັ້ງ!', ToastAndroid.SHORT);
      setGoogleSubmitting(false);
    })
  };

  const persistLogin = (credentials) => {
    AsyncStorage.setItem('kaidaoCredentials', JSON.stringify(credentials))
    .then(()=>{
      setStoredCredentials(credentials);
      console.log("persisting success");
    })
    .catch((error)=> {
      console.log(error);
    })
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 250 }}
        resizeMode="contain"
        source={mascot}
      />
      <Text style={styles.loginText}>ເຂົ້າສູລະບົບ</Text>
      {!googleSubmitting && 
        <TouchableHighlight
        style={{ borderRadius: 7 }}
        underlayColor="#357e79"
        onPress={handleGoogleSignin}
      >
        <View
          style={{
            elevation: 2,
            backgroundColor: "#f8f8f8",
            alignItems: "center",
            borderRadius: 7,
            width: 220,
            height: 35,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="google" size={20} style={{marginRight: 10}} color="#000000"/>
          <Text style={styles.btnText}>ດຳເນີນການຕໍ່ດ້ວຍ Google</Text>
        </View>
      </TouchableHighlight>
      }

      {googleSubmitting && 
        <TouchableHighlight
        style={{ borderRadius: 7 }}
        disabled={true}
      >
        <View
          style={{
            elevation: 2,
            backgroundColor: "#f8f8f8",
            alignItems: "center",
            borderRadius: 7,
            width: 220,
            height: 35,
            paddingVertical: 5,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
           <ActivityIndicator size="small" color="#000"/>
        </View>
      </TouchableHighlight>}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c4fffb",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontFamily: "Defago-Bold",
    fontSize: 18,
    marginTop: -45,
    marginBottom: 30
  },
  btnText: {
    fontFamily: "Defago",
    fontSize: 16,
  }
});

