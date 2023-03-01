import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./Header.style";

const Header = ({hasMenu}) => {
    const menu = hasMenu;
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <Image
                    source={require('../../assets/icons/back_arrow.png')}
                    style={{ height: 38, width: 19 }}

                />
            </TouchableOpacity>
            {
                menu
                    ? <TouchableOpacity onPress={() => { navigation.navigate('All') }}>
                        <Image
                            source={require('../../assets/icons/menu.png')}
                            style={{ height: 45, width: 40 }}

                        />
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={() => { navigation.navigate('About') }}>
                        <Image
                            source={require('../../assets/icons/icon.png')}
                            style={{ height: 50, width: 50 }}
                        />
                    </TouchableOpacity>
            }

        </View>
    )
}

export default Header;