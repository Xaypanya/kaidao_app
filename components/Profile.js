import React, {useContext, useEffect,useState} from 'react';
import { View, Text,StyleSheet,Image} from 'react-native';
import { GbStyle } from '../components/GbStyle';
import {Button} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
//async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
//credentials context
import { CredentialsContext } from "./CredentialsContext";
import { db } from '../App';

export default function Profile({navigation, route}) {

    const { AvatarImg, name, email} = route.params;

    let {BgContainer, container, ContentContainer,AvatarImage} = styles;

    const {storedCredentials,setStoredCredentials} = useContext(CredentialsContext);

    const [allMenus, setAllMenus] = useState([{}]);
    const [favoriteDocCount,setFavoriteDocCount] = useState([]);

     useEffect(() => {
     db.collection("users")
      .doc(email)
      .get()
      .then(
        (doc) =>
          { if (doc.exists) {
            // console.log("Document data:", doc.data());
            // console.log("favoriteDoc data:", doc.data().favoriteDoc);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        setFavoriteDocCount(doc.data().favoriteDoc);
        return  {favoriteDoc: doc.data().favoriteDoc};
      // console.log(allMenus)  
        } 
      ).catch((error) => console.log(error))
  }, []);

    // console.log(favoriteDocCount);

    const favoriteDocCountValue = favoriteDocCount ? Object.values(favoriteDocCount) : null;

    // console.log("property value = " + propertyValues.length);
   
    const clearLogin = () => {
        AsyncStorage.removeItem('kaidaoCredentials')
        .then(()=>{
            setStoredCredentials("");
            navigation.replace("Login"); 
        })
        .catch(error=> console.log(error))
    }

    const menuFavCount = favoriteDocCountValue.length-1 === -1 ? "ກຳລັງໂຫຼດ..." : favoriteDocCountValue.length-1;

    return (
        <View style={BgContainer}>
             <View style={container}>
                <View style={ContentContainer}>
                    <Image
                    style={AvatarImage}
                    source={AvatarImg}
                    />
                    <Text style={{color: '#000000',fontFamily: 'Defago-Bold', fontSize: 16,marginBottom: 10}}>{name ? name.toUpperCase() : 'Octopus Kaidao'}</Text>
                    <Text style={{color: '#000000',fontFamily: 'Defago-Bold', fontSize: 16,marginBottom: 10}}>ເມນູຕິດດາວ: {favoriteDocCountValue ? favoriteDocCountValue.length-1: 0} </Text>
                    <Button block danger style={{width: 150, height: 35, borderRadius: 10}} onPress={clearLogin}>
                    <MaterialIcons name="exit-to-app" size={24} color="#FFF" style={{marginRight: 5}}/>
                    <Text style={{color: '#fff',fontFamily: 'Defago-Bold', fontSize: 16,}}>ອອກຈາກລະບົບ</Text>
                    </Button>
                </View>
             </View>
        </View>
    )
}

const styles = StyleSheet.create({
    BgContainer: {
        backgroundColor: '#c4fffb',
        flex: 1,
    },
    container: {
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff'
    },
    ContentContainer: {
        flex: 1,
        paddingTop: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: '#00000034',
        
    },
    AvatarImage: {
        borderWidth: 2,
        borderColor: '#313131',
        borderRadius: 30,
        width:  120,
        height: 120,
        marginBottom: 10
    }
})