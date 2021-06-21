import React, { useState, useContext,useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
//async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
//credentials context
import { CredentialsContext } from "./CredentialsContext";
import { db } from "../App";

const mascot = require("../assets/images/Icon/KaRainz.png");


const Login = ({ navigation, route }) => {
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  //context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

    const [userCount, setUserCount] = useState([]);

  useEffect(() => {
    db.collection("users")
    .get()
    .then((result) => result.docs)
    .then((docs) =>
      docs.map((a_doc) => {
        const data = a_doc.data();
        // console.log("data = ",data);
        return data.docId ;
      }),
    )
    .then(docs => setUserCount(docs))
    .catch((error) => console.log(error));
  }, []);

  const userCountValue = userCount ? Object.values(userCount) : null;
  console.log("userCount = ",userCountValue);
  

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);
    const config = {
      behavior: "web",
      iosClientId: `395331947715-fotna0uqhi3uqsj4bvcgvjao72kulaiu.apps.googleusercontent.com`,
      androidClientId: `395331947715-hibrq4iek5tdi4gburhm1pnu9ikgesm4.apps.googleusercontent.com`,
      androidStandaloneAppClientId: `395331947715-egdl01oh792it1n3af6dom9il5knfe4d.apps.googleusercontent.com`,
      iosStandaloneAppClientId: `395331947715-fotna0uqhi3uqsj4bvcgvjao72kulaiu.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        onSignIn(result);
        if (type === "success") {
          const { email, name, photoUrl } = user;
          ToastAndroid.show("ເຂົ້າສູ່ລະບົບສຳເລັດ", ToastAndroid.SHORT);
          setTimeout(() => navigation.navigate("NavDrawer"), 1000);
          persistLogin({ email, name, photoUrl });
          return result.accessToken;
        } else {
          ToastAndroid.show("ກະລຸນາລອງໃໝ່ອີກຄັ້ງ!", ToastAndroid.SHORT);
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(
          "ມີບັນຫາເກີດຂຶ້ນ, ກະລຸນາລອງໃໝ່ອີກຄັ້ງ!",
          ToastAndroid.SHORT
        );
        setGoogleSubmitting(false);
      });
  };

  const persistLogin = (credentials) => {
    AsyncStorage.setItem("kaidaoCredentials", JSON.stringify(credentials))
      .then(() => {
        setStoredCredentials(credentials);
        console.log("persisting success");
        console.log("credentials",credentials);
      })
      .catch((error) => {
        console.log(error);
      });
  };



    const onSignIn = (googleUser) => {
      // console.log("Google Auth Response", googleUser);
    
      // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
        unsubscribe();
        console.log("firebase",firebaseUser);
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser,userCountValue)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(
              (result)=> {
                console.log("New user detected");
                // console.log(result);
                db.collection("users")
                .doc(result.additionalUserInfo.profile.email)
                .set({
                  docId: result.additionalUserInfo.profile.email,
                  name: result.additionalUserInfo.profile.name,
                  email: result.additionalUserInfo.profile.email,
                  favoriteDoc: ["0"],
                  photoUrl: result.additionalUserInfo.profile.picture,
                })
                .catch((error)=> console.log(error));
              } 
            )
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
          console.log("User already in Firebase!");
        }
      });
    };
  
    const isUserEqual = (googleUser, firebaseUser, userCountValue) => {
     
      if (firebaseUser) {
        for (var i = 0; i < userCountValue.length; i++) {
          // console.log(`Firebase ProvideerData = ${i} ` , userCountValue[i]);
          // console.log("Google user id = " + googleUser.user.email);
          if (
              userCountValue[i] === googleUser.user.email
          ) {
            // console.log("is equal return true and it have user in firebase!")
            console.log(userCountValue[i] +" === "+ googleUser.user.email)
            // We don't need to reauth the Firebase connection.
            return true;
          }
          else {
            // console.log("No no it new here");
            console.log(userCountValue[i] +" !== "+ googleUser.user.email)
            return false;
          }
        }
      }
    };





  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 250 }}
        resizeMode="contain"
        source={mascot}
      />
      <Text style={styles.loginText}>ເຂົ້າສູລະບົບ</Text>
      {!googleSubmitting && (
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
            <AntDesign
              name="google"
              size={20}
              style={{ marginRight: 10 }}
              color="#000000"
            />
            <Text style={styles.btnText}>ດຳເນີນການຕໍ່ດ້ວຍ Google</Text>
          </View>
        </TouchableHighlight>
      )}

      {googleSubmitting && (
        <TouchableHighlight style={{ borderRadius: 7 }} disabled={true}>
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
            <ActivityIndicator size="small" color="#000" />
          </View>
        </TouchableHighlight>
      )}
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
    marginBottom: 30,
  },
  btnText: {
    fontFamily: "Defago",
    fontSize: 16,
  },
});
