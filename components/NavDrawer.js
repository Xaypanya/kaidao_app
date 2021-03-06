import React, {useContext} from "react";
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
//async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
//credentials context
import { CredentialsContext } from "./CredentialsContext";



const { Navigator, Screen } = createDrawerNavigator();

export default function NavDrawer({ navigation}) {

  //context
  const {storedCredentials,setStoredCredentials} = useContext(CredentialsContext);
  const {name , email, photoUrl} = storedCredentials;
  const AvatarImg = photoUrl ? {uri: photoUrl} : require("../assets/images/Icon/Xaypanya.jpg");


  const profileHandler = () => {
    navigation.navigate("Profile", {AvatarImg, name, email});
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
              <Image style={GbStyle.avatar} source={AvatarImg} />
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
            <Text style={GbStyle.DrawerText}>??????????????????????????????</Text>
          ),
          title: "??????????????????????????????",
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
            <Text style={GbStyle.DrawerText}>??????????????????</Text>
          ),
          title: "??????????????????",
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
            <Text style={GbStyle.DrawerText}>?????????????????????</Text>
          ),
          title: "?????????????????????",
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
            <Text style={GbStyle.DrawerText}>??????????????????????????????</Text>
          ),
          title: "??????????????????????????????",
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
            <Text style={GbStyle.DrawerText}>??????????????????????????????</Text>
          ),
          title: "??????????????????????????????",
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
            <Text style={GbStyle.DrawerText}>?????????????????????????????????</Text>
          ),
          title: "?????????????????????????????????",
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
