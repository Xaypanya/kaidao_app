import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Drink from "./Drink";

export default function MenuDetails({ navigation, route }) {
  //from data we have
  //thumbnailUrl, title,ingredientHeader, ingredient, unit, ingredient02, ingredient02, cooking, key

  const {
    thumbnailUrl,
    ingredient,
    unit,
    ingredient02,
    unit02,
    title,
    ingredientHeader,
    cooking,
    type,
  } = route.params;

  const ingredientElements = ingredient.map((item,index)=> {
    return (
      <Text key={index} style={{fontFamily: 'Defago', fontSize: 16}}>{item}</Text>
    )
  })

  const ingredient02Elements = ingredient02 ? ingredient02.map((item,index)=> {
    return (
      <Text key={index} style={{fontFamily: 'Defago', fontSize: 16}}>{item}</Text>
    )
  }) : null;

  const unit02Elements = unit02 ? unit02.map((item,index)=> {
    return (
      <Text key={index} style={{fontFamily: 'Defago', fontSize: 16}}>{item}</Text>
    )
  }) : null;

  const cookingElements = cooking.map((item,index)=> {
    return (
      <Text key={index} style={{fontFamily: 'Defago', fontSize: 16, marginBottom: 8}}>{item}</Text>
    )
  })

  const unitElements = unit.map((item,index)=> {
    return (
      <Text key={index} style={{fontFamily: 'Defago', fontSize: 16}}>{item}</Text>
    )
  })

  const allIngredient = (
    <View style={{paddingHorizontal: 20, paddingBottom: 50, flex: 1}}>
              {ingredient02 && <Text style={{fontFamily: 'Defago-Bold', fontSize: 16, marginTop: 10}}>{ingredientHeader && ingredientHeader[0]}</Text>}
              <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{paddingTop: 10, flex: 1}}>
                  
                  {ingredientElements}
                </View>
                <View style={{paddingTop: 10, flex: 1}}>
                  {unitElements}
                </View>
              </View>
              {ingredient02 && <Text style={{fontFamily: 'Defago-Bold', fontSize: 16, marginTop: 10}}>{ingredientHeader && ingredientHeader[1]}</Text>}
              <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{paddingTop: 10, flex: 1}}>
                  
                  {ingredient02Elements}
                </View>
                <View style={{paddingTop: 10, flex: 1}}>
                  {unit02Elements}
                </View>
              </View>
             
    </View>
  )

  const allCooking = (
    <View style={{paddingHorizontal: 20, flex: 1, flexDirection: 'row'}}>
              <View style={{paddingTop: 20, flex: 1}}>
                {cookingElements}
              </View>
    </View>
  )

  
  const [stared, setStared] = useState(false);
  const [isIngredient, setIsIngredient] = useState(true);
  const [isCooking, setIsCooking] = useState(false);

  const staredHandler = () => {
    setStared(true);
    
  }

  const handleIngredient = ()=> {
    setIsIngredient(true);
    setIsCooking(false);
  }

  const handleCooking = ()=> {
    setIsIngredient(false);
    setIsCooking(true);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => setStared((prev) => !prev)}
        >
          <AntDesign name={stared ? "star" : "staro"} size={26} color="black" />
        </TouchableOpacity>
      ),
      title: title,
    });
  });

  let WxH = "100%";

  let {
    container,
    bannerPart,
    detailsPart,
    bannerText,
    bannerTitleText,
    tabBox,
    tabText,
  } = styles;

  return (
    // container
    <View style={container}>
      {/* menu banner part*/}
      <View style={bannerPart}>
        <View style={{ flex: 1, paddingLeft: 15 }}>
          <View
            style={{
              backgroundColor: "#000",
              width: 160,
              height: 160,
              borderRadius: 22,
              elevation: 5,
            }}
          >
            <Image
              style={{ width: WxH, height: WxH, borderRadius: 20 }}
              resizeMode="cover"
              source={thumbnailUrl}
            />
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 5,
              }}
            >
              <Text
                Text
                style={{ color: "#fff", fontFamily: "Defago", fontSize: 18 }}
              >
                {title}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, height: "100%", paddingTop: 20 }}>
          <Text style={bannerText}>ຊື່ເມນູ: {title}</Text>
          <Text style={bannerText}>ປະເພດ: {type}</Text>
        </View>
      </View>

      {/* details ingredient and cooking part*/}
      <View style={detailsPart}>
        <View style={tabBox}>
          <TouchableHighlight
            style={{  borderRadius: 10,marginRight: 10}}
            underlayColor="#357e79"
            onPress={() => handleIngredient()}
          >
            <View
              style={ [ isIngredient ?  {backgroundColor: "#c4fffb"} : {backgroundColor: "#f8f8f8"}, {
                alignItems: "center",
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingVertical: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }]}
            >
              <Text style={tabText}>ສ່ວນປະກອບ</Text>
              <MaterialCommunityIcons name="food-drumstick" size={16} color="black" style={{marginLeft: 5}}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
           style={{  borderRadius: 10}}
           underlayColor="#357e79"
            onPress={() => handleCooking()}
          >
          <View
               style={ [ isCooking ?  {backgroundColor: "#c4fffb"} : {backgroundColor: "#f8f8f8"}, {
                alignItems: "center",
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingVertical: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }]}
            >
              <Text style={tabText}>ວິທີປຸງ</Text>
              <MaterialCommunityIcons name="pot-steam" size={16} color="black" style={{marginLeft: 5}} />
            </View>
          </TouchableHighlight>
        </View>
        <ScrollView>
           {isIngredient && allIngredient}
           {isCooking && allCooking}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c4fffb",
  },
  bannerPart: {
    flex: 3.5,
    backgroundColor: "#c4fffb",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsPart: {
    flex: 8,
    backgroundColor: "#f6f6f6",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bannerTitleText: {
    fontFamily: "Defago",
    fontSize: 16,
  },
  bannerText: {
    fontFamily: "Defago",
    fontSize: 16,
  },
  tabBox: {
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tabText: {
    fontFamily: "Defago",
    fontSize: 16,
  },
});
