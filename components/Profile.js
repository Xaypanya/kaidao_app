import React from 'react';
import { View, Text,StyleSheet,Image} from 'react-native';
import { GbStyle } from '../components/GbStyle';
import {Button} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';


export default function Profile({navigation}) {

    // const onPressHandler = ()=>{
    //     navigation.goBack();
    // }

    let {BgContainer, container, ContentContainer,AvatarImage} = styles;

    const avatar = require('../assets/images/Icon/Xaypanya.jpg');

    return (
        <View style={BgContainer}>
             <View style={container}>
                <View style={ContentContainer}>
                    <Image
                    style={AvatarImage}
                    source={avatar}
                    />
                    <Text style={{color: '#000000',fontFamily: 'Defago-Bold', fontSize: 16,marginBottom: 10}}>Xaypanya Phongsa</Text>
                    <Text style={{color: '#000000',fontFamily: 'Defago-Bold', fontSize: 16,marginBottom: 10}}>ເມນູຕິດດາວ: 2</Text>
                    <Button block danger style={{width: 150, height: 35, borderRadius: 10}}>
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