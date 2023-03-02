import React from "react";
import {useRef} from 'react';
import { SafeAreaView, Text, Modal, ScrollView, Image, View, TouchableOpacity } from "react-native";
import Header from "../../components/header/Header";
import { useState } from "react";
import styles from "./AllScreen.styles";
import { useNavigation } from "@react-navigation/native";

const AllScreen = () => {
    const scrollRef = useRef();
    const navigation = useNavigation()
    const navigateToDetail = () => {
        navigation.navigate('Detail')
    }
      
    //AICI O SA FIE UN FLATLIST CARE O SA RANDEZE UN <TouchableOpacity onPress={navigateToDetail(item.id)}><Image source={require()} style={...}</TouchableOpacity>
    return (
        <SafeAreaView>
            <Header hasMenu={false} hasBackButton={true}/>
            <ScrollView ref={scrollRef} style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.pictureRow}>
                    <TouchableOpacity onPress={navigateToDetail}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    </TouchableOpacity>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}} />
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:94, width:74, margin:6}}/>
                    </View>
                </View>
                
            </ScrollView>
           
        </SafeAreaView>
    )
}

export default AllScreen;