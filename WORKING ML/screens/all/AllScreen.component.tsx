import React from "react";
import {useRef} from 'react';
import { SafeAreaView, Text, Modal, ScrollView, Image, View, TouchableOpacity } from "react-native";
import Header from "../../components/header/Header";
import { useState } from "react";
import styles from "./AllScreen.styles";

const AllScreen = () => {
    const scrollRef = useRef();

    const onPressTouch = () => {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
      }
    const [modalVisible, setModalVisible] = useState(true)
    return (
        <SafeAreaView>
            <Header hasBackArrow={true} />
            <ScrollView ref={scrollRef}>
                <View style={styles.container}>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}} />
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    </View>
                    <View style={styles.pictureRow}>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    <Image source={require('./../../assets/icons/placeholder.png')} style={{height:100, width:100}}/>
                    </View>
                </View>
                <TouchableOpacity onPress={onPressTouch}>
                <Image source={require('./../../assets/icons/up_arrow.png')} style={{height:50, width:50, alignSelf:'center'}} />
            </TouchableOpacity>
            </ScrollView>
           
        </SafeAreaView>
    )
}

export default AllScreen;