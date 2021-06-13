import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPreset,
  TransitionPresets,
} from "@react-navigation/stack";
import NavDrawer from "./NavDrawer";
import Profile from "./Profile";
import MenuDetails from "./MenuDetails";
import { StatusBar } from "expo-status-bar";
import Login from "./Login";
import Loading from "./Loading";
import { CredentialsContext } from "./CredentialsContext";

// !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const NavStack = () => {
  const Stack = createStackNavigator();

  // const config = {
  //   animation: 'spring',
  //   config: {
  //     stiffness: 1000,
  //     damping: 70,
  //     mass: 3,
  //     overshootClamping: true,
  //     restDisplacementThreshold: 0.01,
  //     restSpeedThreshold: 0.01,
  //   },
  // };

  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <StatusBar style="light-content" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#c4fffb",
              },
              headerTitleStyle: {
                fontWeight: "bold",
                fontFamily: "Defago-Bold",
                fontWeight: "200",
              },
              headerTitleAlign: "center",
              gestureEnabled: true,
              gestureDirection: "horizontal",
              ...TransitionPresets.SlideFromRightIOS,
              // transitionSpec: {
              //     open: config,
              //     close: config
              // }
            }}
            initialRouteName="Login"
          >
            {storedCredentials ? (
              <Stack.Screen
                name="NavDrawer"
                component={NavDrawer}
                options={{
                  header: () => null,
                }}
              />
            ) : (
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  header: () => null,
                }}
              />
            )}

            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                title: "ໂປຼຟາຍ",
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  backgroundColor: "#c4fffb",
                },
              }}
            />
            <Stack.Screen
              name="MenuDetails"
              component={MenuDetails}
              options={{
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  backgroundColor: "#c4fffb",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};
