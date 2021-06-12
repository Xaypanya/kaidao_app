import React, { Component,useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import firebase from "firebase";

const Loading = ({navigation}) => {

    useEffect(()=> {
        checkIfLoggedIn();
    },[]);
    
    const checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                navigation.navigate("NavDrawer");
            }else {
                navigation.navigate("Login");
            }
        })
    }

        return (
            <View style={styles.container}>
                 <ActivityIndicator size="large" color="#000"/>
            </View>
        );
}

export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#c4fffb',
        justifyContent: 'center'
    }
});