import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import styles
    from "./HomeScreen.styles";
const HomeScreen = ({ navigation }) => {

    const navigateToScan = () => {
        navigation.navigate('scan')
    }

    // useEffect(()=> {
    //     const timer = setTimeout(() => {
    //         navigateToScan()
    //     }, 2000)

    //     return (() => {clearTimeout(timer)})
    // },[])

    const images = [require('./../../assets/icons/splash/2.1.png'), require('./../../assets/icons/splash/2.2.png'), require('./../../assets/icons/splash/2.3.png')]
    const [image, setImage] = useState(0);
    const counter = useRef(0);
    useEffect(() => {
        const timer = setInterval(() => {
            if(counter.current == 2){
                console.log('GATA')
                clearInterval(timer)

            }
            counter.current +=1

            setImage(image => image+1)
        }, 1500)

        return (() => {
            clearInterval(timer)
        })
    },[])
    return (
        <SafeAreaView style={styles.container}>
                <Image
                    source={images[image]}
                    style={{ alignSelf: 'center'}}
                />
        </SafeAreaView>
    )
}

export default HomeScreen;