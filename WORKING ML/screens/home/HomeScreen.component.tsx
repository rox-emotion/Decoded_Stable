import React from "react";
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import styles
 from "./HomeScreen.styles";
const HomeScreen = ({navigation}) => {

    const navigateToScan = () => {
        navigation.navigate('scan')
    }

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={navigateToScan}>
                <Text style={{marginTop:100}}>Scan Portrait</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HomeScreen;