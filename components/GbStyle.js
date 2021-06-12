import {StyleSheet} from 'react-native';

export const GbStyle = StyleSheet.create({
    container: {
        fontFamily: 'Defago',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24
    },
    text: {
        fontFamily: 'Defago',
        fontSize: 24,
        marginVertical: 10 
    },
    button: {
        fontFamily: 'Defago',
        marginVertical: 10
    },
    DrawerText: {
        fontFamily: 'Defago-Bold',
        fontSize: 16,
        // backgroundColor: '#afafaf',
        alignSelf: 'flex-start',
        marginLeft: -20
    },
    IconBox:{
        // backgroundColor: '#dfb4b4',
         width: 31},
    avatar: {
        borderWidth: 1,
        borderRadius: 15,
        marginRight: 10,
        borderColor: '#2e2e2e',
        width: 40,
        height: 40
    }
    
})