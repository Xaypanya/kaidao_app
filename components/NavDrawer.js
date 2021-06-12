import React from "react";
import { DrawerActions} from "@react-navigation/native";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AllMenu from "./AllMenu";
import Main from "./Main";
import Sweet from "./Sweet";
import Drink from "./Drink";
import Fovorite from "./Favorite";
import About from "./About";
import {
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  Pressable,
} from "react-native";
import { GbStyle } from "../components/GbStyle";
import SideBar from "./SideBar";



const { Navigator, Screen } = createDrawerNavigator();

export default function NavDrawer({ navigation }) {
  const avatar = require("../assets/images/Icon/Xaypanya.jpg");

  const profileHandler = () => {
    navigation.navigate("Profile");
  };

  return (
    // <NavigationContainer>
    <Navigator
      initialRouteName="ScreenA"
      drawerContent={(props) => <SideBar {...props} />}
      drawerType="front"
      drawerContentOptions={{ activeBackgroundColor: "#c4fffb9d" }}
      screenOptions={{
        headerRight: () => {
          return (
            <TouchableOpacity onPress={() => profileHandler()}>
              <Image style={GbStyle.avatar} source={avatar} />
            </TouchableOpacity>
          );
        },
        headerLeft: () => (
          <Pressable
            rounded
            // transparent
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
              Keyboard.dismiss();
            }}
            style={({pressed})=>[{backgroundColor: pressed? '#7daca86c' : '#c4fffb' },{
              elevation: 0,
              borderRadius: 30,
              height: 45,
              width: 45,
              alignItems: 'center',
              justifyContent: "center",
              marginLeft: 5,
            }]}
          >
            <MaterialCommunityIcons name="hamburger" size={24} color="black" />
          </Pressable>
        ),
        headerTitleAlign: "center",
        headerShown: true,
        swipeEnabled: true,
        headerStyle: {
          backgroundColor: "#c4fffb",
          //  elevation: 0,
              // shadowOpacity: 0,
          //     backgroundColor: "#c4fffb",
        },

        headerTintColor: "#2e2e2e",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "Defago-Bold",
          fontWeight: "200",
        },
      }}
    >
      <Screen
        name="AllMenu"
        component={AllMenu}
        options={{
          drawerLabel: ({ focused }) => (
            <Text style={GbStyle.DrawerText}>ເມນູທັງໝົດ</Text>
          ),
          title: "ເມນູທັງໝົດ",
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              style={GbStyle.IconBox}
              name="food-bank"
              size={focused ? 31 : 29}
              color={focused ? "#000" : "#2e2e2e"}
            />
          ),
        }}
      />
      <Screen
        name="Main"
        component={Main}
        options={{
          drawerLabel: ({ focused }) => (
            <Text style={GbStyle.DrawerText}>ຂອງຄາວ</Text>
          ),
          title: "ຂອງຄາວ",
          drawerIcon: ({ focused }) => (
            <FontAwesome5
              style={GbStyle.IconBox}
              name="fish"
              size={focused ? 25 : 24}
              color={focused ? "#000" : "#2e2e2e"}
            />
          ),
        }}
      />
      <Screen
        name="Sweet"
        component={Sweet}
        options={{
          drawerLabel: ({ focused }) => (
            <Text style={GbStyle.DrawerText}>ຂອງຫວານ</Text>
          ),
          title: "ຂອງຫວານ",
          drawerIcon: ({ focused }) => (
            <FontAwesome5
              style={GbStyle.IconBox}
              name="ice-cream"
              size={focused ? 26 : 24}
              color={focused ? "#000" : "#2e2e2e"}
            />
          ),
        }}
      />
      <Screen
        name="Drink"
        component={Drink}
        options={{
          drawerLabel: ({ focused }) => (
            <Text style={GbStyle.DrawerText}>ເຄື່ອງດື່ມ</Text>
          ),
          title: "ເຄື່ອງດື່ມ",
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              style={GbStyle.IconBox}
              name="local-drink"
              size={focused ? 26 : 24}
              color={focused ? "#000" : "#2e2e2e"}
            />
          ),
        }}
      />
      <Screen
        name="Favorite"
        component={Fovorite}
        options={{
          drawerLabel: ({ focused }) => (
            <Text style={GbStyle.DrawerText}>ເມນູຕິດດາວ</Text>
          ),
          title: "ເມນູຕິດດາວ",
          drawerIcon: ({ focused }) => (
            <AntDesign
              style={GbStyle.IconBox}
              name="star"
              size={focused ? 26 : 24}
              color={focused ? "#000" : "#2e2e2e"}
            />
          ),
        }}
      />
      <Screen
        name="About"
        component={About}
        options={{
          drawerLabel: ({ focused }) => (
            <Text style={GbStyle.DrawerText}>ກ່ຽວກັບແອັບ</Text>
          ),
          title: "ກ່ຽວກັບແອັບ",
          drawerIcon: ({ focused }) => (
            <Entypo
              style={GbStyle.IconBox}
              name="info-with-circle"
              size={focused ? 26 : 24}
              color={focused ? "#000" : "#2e2e2e"}
            />
          ),
        }}
      />
    </Navigator>
    // </NavigationContainer>
  );
}
