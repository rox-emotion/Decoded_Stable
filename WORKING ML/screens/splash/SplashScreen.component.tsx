import { SafeAreaView, View, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './SplashScreen.styles'

const SplashScreen = ({ navigation }) => {
    const [showLogo, setShowLogo] = useState(false)

    useEffect(() => {
        const navigationTimer = setTimeout(() => {
            navigation.navigate('home')
        }, 4000);

        return () => {clearTimeout(navigationTimer)}

    }, [])
    return (
        <SafeAreaView style={styles.container}>
           <Text>Circles and stuff</Text>
        </SafeAreaView>
    )
}

export default SplashScreen;