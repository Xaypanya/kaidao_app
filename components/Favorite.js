import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { GbStyle } from "../components/GbStyle";
import { db } from "../App";
import { CredentialsContext } from "./CredentialsContext";
import { indexOf } from "lodash";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Favorite({navigation, route}) {
  //context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { email } = storedCredentials;
  const [favoriteDocCount, setFavoriteDocCount] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  
  useEffect(() => {
    db.collection("users")
    .doc(email)
    .get()
    .then((doc) => {
      if (doc.exists) {
        //    console.log("Document data:", doc.data());
        // console.log("Favoooo:", doc.data().favoriteDoc);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        setFavoriteDocCount(doc.data().favoriteDoc);
        return { favoriteDoc: doc.data().favoriteDoc };
        // console.log(allMenus)
      })
      .catch((error) => console.log(error));
    });
    
    const favoriteDocCountValue = favoriteDocCount ? Object.values(favoriteDocCount) : null;
   
    
    // console.log("count" + favoriteDocCount.length);
  // console.log("value",favoriteDocCountValue);
  const [allMenus, setAllMenus] = useState([{}]);

  useEffect(() => {
    db.collection("all-menus")
      .get()
      .then((result) => result.docs)
      .then(
        (docs) =>
          docs.map((a_doc) => {
            const data = a_doc.data();
            return {
              key: a_doc.id,
              title: data.title,
              type: data.type,
              thumbnailUrl: data.thumbnailUrl,
              ingredientHeader: data.ingredientHeader,
              ingredient: data.ingredient,
              unit: data.unit,
              ingredient02: data.ingredient02,
              cooking: data.cooking,
              unit02: data.unit02,
            };
          })
        // console.log(allMenus)
      )
      .then((docs) => setAllMenus(docs));
  }, []);


  const formatedAllMenu = allMenus
    ? allMenus.filter((menu) => {
        return favoriteDocCountValue ? favoriteDocCountValue.indexOf(menu.key) !== -1 : null;
      })
    : allMenus;

  // console.log(formatedAllMenu);


  const handleDeleteMenu = (key) => {
    db.collection("users").doc(email).update({
      favoriteDoc:  favoriteDocCountValue.filter((el)=> el !== key)
    })
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        navigation.navigate("MenuDetails", item);
      }}
    >
      <View style={styles.box}>
        <Image
          source={{ uri: item.thumbnailUrl }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
            opacity: 0.4,
          }}
        />
        <TouchableOpacity onPress={()=> {console.log("deleted item " + item.key); handleDeleteMenu(item.key);}} style={{ position: "absolute", top: 15, right: 10 }}>
          <FontAwesome5 name="trash-alt" size={30} color="#ececec" />
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            position: "absolute",
            top: 15,
            color: "#ffffff",
            fontFamily: "Defago",
            fontSize: 20,
          }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {
        favoriteDocCount.length > 1 ?
        <FlatList
        data={formatedAllMenu}
        renderItem={renderItem}
        key={(item, index) => index.toString()}
        style={{ flex: 1, alignSelf: "stretch",  paddingHorizontal: 9 }}
      />
      : <Text style={{fontFamily: 'Defago-Bold', color: '#0000006f', fontSize: 20}}>ທ່ານຍັງບໍ່ມີເມນູທີ່ຕິດດາວ  😵</Text>
      }
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    fontFamily: "Defago",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 10
  },
  text: {
    fontFamily: "Defago",
    fontSize: 24,
    marginVertical: 10,
  },
  box: {
    backgroundColor: "#00000099",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    height: 60,
    borderRadius: 10,
  },
});
