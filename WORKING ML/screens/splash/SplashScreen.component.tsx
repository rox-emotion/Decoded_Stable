import { SafeAreaView, View, Text, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './SplashScreen.styles'
import { useRef } from 'react'
import { CurrentRenderContext, useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation()


    const [showLogo, setShowLogo] = useState(false)

    useEffect(() => {
        const navigationTimer = setTimeout(() => {
            navigation.navigate('Home')
        }, 9000);

        return () => {clearTimeout(navigationTimer)}

    }, [])

    const images = [require('./../../assets/icons/splash/1.png'), require('./../../assets/icons/splash/2.png'), require('./../../assets/icons/splash/3.png'), require('./../../assets/icons/splash/4.png'), require('./../../assets/icons/splash/5.png'), require('./../../assets/icons/splash/6.png'), require('./../../assets/icons/splash/7.png'), require('./../../assets/icons/splash/8.png'), require('./../../assets/icons/splash/9.png')]
    const [imageToUse, setImageToUse] = useState(0)
    var counter = useRef(0)
    useEffect(() => {
        //TESTING PURPOSES
        // navigation.navigate('detail')
        const timer = setInterval(() => {
            if (counter.current == 9) {
                clearInterval(timer);
            }
            setImageToUse(imageToUse => imageToUse + 1)
        }, 1000)

        return () => {
            clearInterval(timer);
        };
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.tree} source={images[imageToUse]} />
        </SafeAreaView>
    )
}

export default SplashScreen;