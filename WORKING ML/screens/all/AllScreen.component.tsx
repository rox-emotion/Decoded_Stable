import React from "react";
import { useRef } from 'react';
import { SafeAreaView, Text, Modal, ScrollView, Image, View, TouchableOpacity, FlatList } from "react-native";
import Header from "../../components/header/Header";
import { useState } from "react";
import styles from "./AllScreen.styles";
import { useNavigation } from "@react-navigation/native";
import images from './../detail/images'

const AllScreen = () => {
    const scrollRef = useRef();
    const navigation = useNavigation()
    const navigateToDetail = () => {
        navigation.navigate('Detail')
    }

    const [images, setImages] = useState(Array.from({ length: 100 }, (_, i) => `00${i + 1}`.slice(-3)));

    const renderItem = ({ item, index }) => {
        console.log(index)
        return (
            <View>
                <Image style={{height:94, width:74, margin:6}} source={images[index+2]} />
            </View>
        );
    };
    //AICI O SA FIE UN FLATLIST CARE O SA RANDEZE UN <TouchableOpacity onPress={navigateToDetail(item.id)}><Image source={require()} style={...}</TouchableOpacity>
    return (
        <SafeAreaView>
            <Header hasMenu={false} hasBackButton={true} />
            <View style={styles.container}>
                <FlatList
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    numColumns={4}
                />
                {/* <View style={styles.pictureRow}>
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
                    </View> */}
            </View>
        </SafeAreaView>
    )
}

export default AllScreen;