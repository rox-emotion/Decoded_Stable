import React from "react";
import { SafeAreaView, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../components/header/Header";
import styles from "./AboutScreen.styles";

const CorrectAboutScreen = () => {

    const onPressTouch = () => {

    }
    return (
        <SafeAreaView style={styles.container}>
            <Header hasMenu={true} />
            <ScrollView style={styles.scrollContainer}>
            <Image source={require('./../../assets/icons/decoded_logo.png')}
                style={{ height: 232, width: 158, alignSelf: 'center' }}
            />
            <Text style={styles.title}>De.Coded</Text>
            <Text style={styles.title}>A Human Atlas</Text>
            <Text style={styles.title}>of Silicon Valley</Text>
            <Text style={styles.title}>Marcus Lyon</Text>

          
                <Text style={styles.smallText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada arcu id arcu rutrum molestie. Donec suscipit vestibulum est sit amet imperdiet. Morbi non venenatis massa, a dictum sapien. Integer volutpat tempus interdum. In nec venenatis odio. Duis vitae ultrices tortor, in tempus nisl. Fusce vel urna finibus, vulputate ante eu, viverra sapien. Maecenas finibus, dolor quis maximus aliquet, quam orci auctor nunc, sed tincidunt leo nibh vitae lacus. Donec rutrum dolor ac aliquam gravida.

                    Aenean vitae mi quis neque ullamcorper semper id non sapien. Pellentesque sagittis lobortis viverra. Vestibulum sagittis eget metus non elementum. In sit amet turpis justo. Nulla dignissim urna eget molestie sagittis. Fusce feugiat purus sed urna dignissim aliquam. Ut dapibus aliquam sollicitudin. Aliquam vitae est commodo, tincidunt ipsum in, rutrum leo. Pellentesque varius libero et fermentum condimentum. Proin consequat, sem a auctor congue, sapien sem commodo nisi, ac euismod dui odio a diam. Vivamus ut consectetur arcu, non vestibulum odio. Aenean ultricies dolor et porta dictum. Maecenas feugiat, turpis ut consectetur euismod, urna magna suscipit felis, sagittis aliquet tellus turpis in nisi. Praesent malesuada id lectus eu sollicitudin. Cras ac purus vitae sapien porta dapibus in vehicula nisl.</Text>

                <Text>Buy the Book -> </Text>
                <Image source={require('./../../assets/icons/marcus.png')} style={{ width: 210, height: 210, alignSelf: 'center' }} />
                <Text style={styles.title}>Marcus Lyon</Text>

                <Text style={styles.smallText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada arcu id arcu rutrum molestie. Donec suscipit vestibulum est sit amet imperdiet. Morbi non venenatis massa, a dictum sapien. Integer volutpat tempus interdum. In nec venenatis odio. Duis vitae ultrices tortor, in tempus nisl. Fusce vel urna finibus, vulputate ante eu, viverra sapien. Maecenas finibus, dolor quis maximus aliquet, quam orci auctor nunc, sed tincidunt leo nibh vitae lacus. Donec rutrum dolor ac aliquam gravida.

                    Aenean vitae mi quis neque ullamcorper semper id non sapien. Pellentesque sagittis lobortis viverra. Vestibulum sagittis eget metus non elementum. In sit amet turpis justo. Nulla dignissim urna eget molestie sagittis. Fusce feugiat purus sed urna dignissim aliquam. Ut dapibus aliquam sollicitudin. Aliquam vitae est commodo, tincidunt ipsum in, rutrum leo. Pellentesque varius libero et fermentum condimentum. Proin consequat, sem a auctor congue, sapien sem commodo nisi, ac euismod dui odio a diam. Vivamus ut consectetur arcu, non vestibulum odio. Aenean ultricies dolor et porta dictum. Maecenas feugiat, turpis ut consectetur euismod, urna magna suscipit felis, sagittis aliquet tellus turpis in nisi. Praesent malesuada id lectus eu sollicitudin. Cras ac purus vitae sapien porta dapibus in vehicula nisl.</Text>

                <Text>Visit the Website -> </Text>
                <TouchableOpacity onPress={onPressTouch}>
                    <Image source={require('./../../assets/icons/up_arrow.png')} style={{ height: 50, width: 50, alignSelf: 'center' }} />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CorrectAboutScreen;