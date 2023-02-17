import React from "react";
import { Image, View, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./Header.style";

const Header = (props) => {
    const navigation = useNavigation();
    const backArrow = props.hasBackArrow;
    const menu = !backArrow
    return (
        <View style={styles.container}>
            {
                backArrow
                    ? <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Image
                            source={require('../../assets/icons/back_arrow.png')}
                        />
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={() => { navigation.navigate('all') }}>
                        <Image
                            source={require('../../assets/icons/menu.png')}
                        />
                    </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => {navigation.navigate('about')}}>
                <Image
                    source={require('../../assets/icons/icon.png')}
                />
            </TouchableOpacity>

        </View>
    )
}

export default Header;