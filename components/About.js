import React from 'react';
import { View, Text} from 'react-native';
import { GbStyle } from '../components/GbStyle';

export default function Main() {

    return (
        <View style={GbStyle.container}>
            <Text style={GbStyle.text}>About</Text>
        </View>
    )
}