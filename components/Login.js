import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Touchable,
  TouchableHighlight,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
const mascot = require("../assets/images/Icon/KaRainz.png");

const Login = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 250 }}
        resizeMode="contain"
        source={mascot}
      />
      <Text style={styles.loginText}>ເຂົ້າສູລະບົບ</Text>
      <TouchableHighlight
        style={{ borderRadius: 7 }}
        underlayColor="#357e79"
        onPress={() => console.log("google firsebase")}
      >
        <View
          style={{
            elevation: 2,
            backgroundColor: "#f8f8f8",
            alignItems: "center",
            borderRadius: 7,
            paddingHorizontal: 15,
            paddingVertical: 5,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="google" size={20} style={{marginRight: 10}} color="#000000"/>
          <Text style={styles.btnText}>ດຳເນີນການຕໍ່ດ້ວຍ Google</Text>
        </View>
      </TouchableHighlight>
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

