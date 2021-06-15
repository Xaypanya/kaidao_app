import React, { useState } from "react";
import {
  Container,
  Header,
  Input,
  Icon,
  Text,
} from "native-base";
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from "@expo/vector-icons";


import { View,Image, TouchableWithoutFeedback, Keyboard, StyleSheet, FlatList, Dimensions, TouchableOpacity, TouchableHighlight, RefreshControl } from "react-native";
import MasonryList from '@react-native-seoul/masonry-list';
import {DataList} from './DataList';


const numCols = 2;


export default function AllMenu({ navigation }) {
  
  const [staredCount, setStaredCount] = useState([]);

  const [searchText, setSearchText] = useState('');
  
  const filterDataList = DataList.filter((data)=> {
    return data.title.includes(searchText);
})

  
  let {SeachBox, imageContainer, imageStyle, imageText, First_imageContainer} = styles;

  const renderItems = ({item,index})=> {
    const randomHeight = Math.random()<0.5;
    let WxH = "100%";

    return (
    <TouchableHighlight 
      // underlayColor={"#020202"}
      onPress={()=>{
        navigation.navigate('MenuDetails', item);
      }}
      style={{height: randomHeight ? 170 : 220,flex: 1,
      // backgroundColor: '#ffb5b5',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 7,
      borderRadius: 20,
      elevation: 5}} 
      key={item.key}>

      <View style={{backgroundColor: '#000000',flex: 1,alignSelf: 'stretch',borderRadius: 20,}}>
    
      <View>
      <Image style={{width: WxH,height: WxH, borderRadius: 20}} resizeMode='cover' source={item.thumbnailUrl }/>
     
      </View>
      <View style={{zIndex: 2,position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'flex-start',paddingBottom: 5, paddingLeft: 12}}>
      <Text Text style={imageText}>{item.title}</Text>
      </View>
     
      </View>
    </TouchableHighlight>
    )
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>  
        <Header searchBar rounded style={{backgroundColor: '#fff',elevation: 0,justifyContent: 'center', alignItems: 'center'}}>
          <View style={SeachBox}>
            <Input placeholder="ຄົ້ນຫາເມນູ" value={searchText} onChangeText={(value)=> setSearchText(value)} style={{ fontSize: 18, fontFamily: 'Defago' }} />
            <Icon name="ios-search" style={{color: "#00000058"}}/>
          </View>
        </Header>
        <View style={{flex: 1, paddingHorizontal: 13}}>
        <MasonryList
              data={filterDataList}
              renderItem={renderItems}
              numColumns={numCols}
              keyExtractor={(item)=>item.key}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
        />
        </View>
        <StatusBar style={{backgroundColor:"#c4fffb"}} />
      </Container>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    SeachBox: {
        borderRadius: 10, 
        borderWidth: 1,
        borderColor: '#00000058',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        height: 40,
        paddingHorizontal: 5
    },
    imageContainer: {
      flex: 1,
      // backgroundColor: '#ffb5b5',
      alignItems: 'center',
      justifyContent: 'center',
      height: 220,
      margin: 7,
      borderRadius: 20,
      elevation: 5
    },
    First_imageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 170,
      margin: 7,
      borderRadius: 20,
      elevation: 5
    },
    imageText: {
      color: '#fff',
      fontFamily: "Defago",
      fontSize: 18,
    },
    
})