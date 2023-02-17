import React from "react";
import {useRef} from 'react';
import { SafeAreaView, Text, Image, ScrollView, TouchableOpacity} from "react-native";
import Header from "../../components/header/Header";
import styles from "./AboutScreen.styles";

const AboutScreen = () => {
    const scrollRef = useRef();

    const onPressTouch = () => {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
      }

    return (
        <SafeAreaView style={styles.container}>
            <Header hasBackArrow={true} />
            <ScrollView ref={scrollRef}>
            <Text style={styles.title}>Decoded</Text>
            <Text style={styles.title}>A Human of Silicon Valley</Text>
            <Text style={styles.title}>Marcus Lyon</Text>
            <Text style={styles.smallText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada arcu id arcu rutrum molestie. Donec suscipit vestibulum est sit amet imperdiet. Morbi non venenatis massa, a dictum sapien. Integer volutpat tempus interdum. In nec venenatis odio. Duis vitae ultrices tortor, in tempus nisl. Fusce vel urna finibus, vulputate ante eu, viverra sapien. Maecenas finibus, dolor quis maximus aliquet, quam orci auctor nunc, sed tincidunt leo nibh vitae lacus. Donec rutrum dolor ac aliquam gravida.

                Aenean vitae mi quis neque ullamcorper semper id non sapien. Pellentesque sagittis lobortis viverra. Vestibulum sagittis eget metus non elementum. In sit amet turpis justo. Nulla dignissim urna eget molestie sagittis. Fusce feugiat purus sed urna dignissim aliquam. Ut dapibus aliquam sollicitudin. Aliquam vitae est commodo, tincidunt ipsum in, rutrum leo. Pellentesque varius libero et fermentum condimentum. Proin consequat, sem a auctor congue, sapien sem commodo nisi, ac euismod dui odio a diam. Vivamus ut consectetur arcu, non vestibulum odio. Aenean ultricies dolor et porta dictum. Maecenas feugiat, turpis ut consectetur euismod, urna magna suscipit felis, sagittis aliquet tellus turpis in nisi. Praesent malesuada id lectus eu sollicitudin. Cras ac purus vitae sapien porta dapibus in vehicula nisl.</Text>

            <Text>Link to Book</Text>
            {/* <Image source={require('./../../assets/icons/plc.png')} style={{height: 300, width: 300, alignSelf:'center'}}/> */}
            <Text style={styles.title}>Marcus Lyon</Text>
            <Text style={[styles.smallText, {alignSelf:'center'}]}>22.08.65</Text>
            <Text style={[styles.smallText, {alignSelf:'center'}]}>London</Text>
            <Text style={styles.smallText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada arcu id arcu rutrum molestie. Donec suscipit vestibulum est sit amet imperdiet. Morbi non venenatis massa, a dictum sapien. Integer volutpat tempus interdum. In nec venenatis odio. Duis vitae ultrices tortor, in tempus nisl. Fusce vel urna finibus, vulputate ante eu, viverra sapien. Maecenas finibus, dolor quis maximus aliquet, quam orci auctor nunc, sed tincidunt leo nibh vitae lacus. Donec rutrum dolor ac aliquam gravida.

                Aenean vitae mi quis neque ullamcorper semper id non sapien. Pellentesque sagittis lobortis viverra. Vestibulum sagittis eget metus non elementum. In sit amet turpis justo. Nulla dignissim urna eget molestie sagittis. Fusce feugiat purus sed urna dignissim aliquam. Ut dapibus aliquam sollicitudin. Aliquam vitae est commodo, tincidunt ipsum in, rutrum leo. Pellentesque varius libero et fermentum condimentum. Proin consequat, sem a auctor congue, sapien sem commodo nisi, ac euismod dui odio a diam. Vivamus ut consectetur arcu, non vestibulum odio. Aenean ultricies dolor et porta dictum. Maecenas feugiat, turpis ut consectetur euismod, urna magna suscipit felis, sagittis aliquet tellus turpis in nisi. Praesent malesuada id lectus eu sollicitudin. Cras ac purus vitae sapien porta dapibus in vehicula nisl.</Text>

            <Text>Link to Human Atlas website</Text>
            <TouchableOpacity onPress={onPressTouch}>
            <Image source={require('./../../assets/icons/up_arrow.png')} style={{height:50, width:50, alignSelf:'center'}}/>
            </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutScreen;