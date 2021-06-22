import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { DrawerActions } from "@react-navigation/routers";
import React from "react";
import { TouchableWithoutFeedback, View, StyleSheet,Keyboard,Image } from "react-native";
import { AntDesign,Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { Header, Container,Content, ListItem,Right,Left, Thumbnail, Footer, Button } from "native-base";
import { GbStyle } from "./GbStyle";
import { StatusBar } from "expo-status-bar";


export default function SideBar({ progress, ...props }) {
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const avatar = require('../assets/images/Icon/KaiDaoDev_Round.png');

  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <Container>
      <Header style={{backgroundColor: '#b3f3ef', height:140, alignItems: 'center'}}>
      <StatusBar barStyle="light-content" />
      <View style={styles.DrawerContainer}>
          {/* <View>
           <Thumbnail
            source={{
              uri: 'https://randomuser.me/api/portraits/thumb/men/8.jpg'
            }}
          /></View>
          <View>
            <Text style={styles.nameText}>Xaypanya Phongsa</Text>
          </View> */}
          <Image
          style={styles.tinyLogo}
          source={avatar}
         />
      </View>
      </Header>
      
      <Content>
        <DrawerContentScrollView {...props}>

          <Animated.View style={{ transform: [{ translateX }], position: 'relative', top: -23, left: 0 }}>
            <DrawerItemList {...props} />
          </Animated.View>
        </DrawerContentScrollView>
      </Content> 
    </Container>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  DrawerContainer: {
    paddingTop: 20,
    // backgroundColor: "#999b9a",
    height: 120,
    height: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelText: {
    fontFamily: "Defago",
    fontSize: 20,
  },
  nameText: {
    fontFamily: "Defago",
    fontSize: 19,
    marginLeft: 10
  },
  tinyLogo: {
    width: 80,
    height: 80
  }
});
