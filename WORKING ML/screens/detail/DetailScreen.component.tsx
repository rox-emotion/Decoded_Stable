import React from "react";
import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './DetailScreen.styles'
import { useRef, useState } from "react";
import Header from "../../components/header/Header";

const DetailScreen = () => {

    const scrollRef = useRef();
    const [isScrolled, setIsScrolled] = useState(false);

    const scrollDown = () => {
        // scrollRef.current?.scrollTo({
        //     y: 0,
        //     animated: true,
        // });
        setIsScrolled(true)
        scrollRef.current?.scrollToEnd({ animated: true })

    }

    const scrollUp = () => {
        setIsScrolled(false)
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }

    return (
        <SafeAreaView>

            <Header hasBackArrow={false} />
            <View style={styles.container}>
                {
                    isScrolled
                        ? null
                        : <Image source={require('./../../assets/photos/409815.jpg')} style={{ height: 400, width: 300 }} />
                }
                <Text style={styles.title}>Full Name</Text>
                <ScrollView ref={scrollRef}>
                    <TouchableOpacity onPress={scrollDown}>
                        <Image source={require('./../../assets/icons/down_arrow.png')} style={{ height: 50, width: 50, alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <Text style={styles.smallText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada arcu id arcu rutrum molestie. Donec suscipit vestibulum est sit amet imperdiet. Morbi non venenatis massa, a dictum sapien. Integer volutpat tempus interdum. In nec venenatis odio. Duis vitae ultrices tortor, in tempus nisl. Fusce vel urna finibus, vulputate ante eu, viverra sapien. Maecenas finibus, dolor quis maximus aliquet, quam orci auctor nunc, sed tincidunt leo nibh vitae lacus. Donec rutrum dolor ac aliquam gravida.

                        Aenean vitae mi quis neque ullamcorper semper id non sapien. Pellentesque sagittis lobortis viverra. Vestibulum sagittis eget metus non elementum. In sit amet turpis justo. Nulla dignissim urna eget molestie sagittis. Fusce feugiat purus sed urna dignissim aliquam. Ut dapibus aliquam sollicitudin. Aliquam vitae est commodo, tincidunt ipsum in, rutrum leo. Pellentesque varius libero et fermentum condimentum. Proin consequat, sem a auctor congue, sapien sem commodo nisi, ac euismod dui odio a diam. Vivamus ut consectetur arcu, non vestibulum odio. Aenean ultricies dolor et porta dictum. Maecenas feugiat, turpis ut consectetur euismod, urna magna suscipit felis, sagittis aliquet tellus turpis in nisi. Praesent malesuada id lectus eu sollicitudin. Cras ac purus vitae sapien porta dapibus in vehicula nisl.
                        Aenean vitae mi quis neque ullamcorper semper id non sapien. Pellentesque sagittis lobortis viverra. Vestibulum sagittis eget metus non elementum. In sit amet turpis justo. Nulla dignissim urna eget molestie sagittis. Fusce feugiat purus sed urna dignissim aliquam. Ut dapibus aliquam sollicitudin. Aliquam vitae est commodo, tincidunt ipsum in, rutrum leo. Pellentesque varius libero et fermentum condimentum. Proin consequat, sem a auctor congue, sapien sem commodo nisi, ac euismod dui odio a diam. Vivamus ut consectetur arcu, non vestibulum odio. Aenean ultricies dolor et porta dictum. Maecenas feugiat, turpis ut consectetur euismod, urna magna suscipit felis, sagittis aliquet tellus turpis in nisi. Praesent malesuada id lectus eu sollicitudin. Cras ac purus vitae sapien porta dapibus in vehicula nisl.

                    </Text>

                    <TouchableOpacity onPress={scrollUp}>
                        <Image source={require('./../../assets/icons/up_arrow.png')} style={{ height: 50, width: 50, alignSelf: 'center' }} />
                    </TouchableOpacity>
                    {/* <Image source={require('./../../assets/icons/info.png')} /> */}

                    {/* AICI PLAYER */}
                    {/* <View>
                        <ProgressBar
                            progress={progress.position}
                            buffered={progress.buffered}
                        />
                    </View> */}
                    {/* <MyPlayerBar/>

                    <Text style={styles.smallText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada arcu id arcu rutrum molestie. Donec suscipit vestibulum est sit amet imperdiet. Morbi non venenatis massa, a dictum sapien. Integer volutpat tempus interdum. In nec venenatis odio. Duis vitae ultrices tortor, in tempus nisl. Fusce vel urna finibus, vulputate ante eu, viverra sapien. Maecenas finibus, dolor quis maximus aliquet, quam orci auctor nunc, sed tincidunt leo nibh vitae lacus. Donec rutrum dolor ac aliquam gravida.

                        Aenean vitae mi quis neque ullamcorper semper id non sapien. Pellentesque sagittis lobortis viverra. Vestibulum sagittis eget metus non elementum. In sit amet turpis justo. Nulla dignissim urna eget molestie sagittis. Fusce feugiat purus sed urna dignissim aliquam. Ut dapibus aliquam sollicitudin. Aliquam vitae est commodo, tincidunt ipsum in, rutrum leo. Pellentesque varius libero et fermentum condimentum. Proin consequat, sem a auctor congue, sapien sem commodo nisi, ac euismod dui odio a diam. Vivamus ut consectetur arcu, non vestibulum odio. Aenean ultricies dolor et porta dictum. Maecenas feugiat, turpis ut consectetur euismod, urna magna suscipit felis, sagittis aliquet tellus turpis in nisi. Praesent malesuada id lectus eu sollicitudin. Cras ac purus vitae sapien porta dapibus in vehicula nisl.

                    </Text>

                    {/* <TouchableOpacity onPress={onPressTouch}>
                        <Image source={require('./../../assets/icons/arrow.png')} style={{ height: 50, width: 50, alignSelf: 'center' }} />
                    </TouchableOpacity> */}

                    {/* <Modal
                        animationType="none"
                        transparent={true}
                        visible={showModal}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setShowModal(!showModal);
                        }}
                    >
                        <View style={styles.modal}>
                            <Text>Thank you for your interest in the DeCoded project. Would you be interested in purchasing the Decoded book?</Text>
                            <View style={styles.buttons}>
                                <Button
                                    title="Link to Shop"
                                />
                                <Button
                                    title="No Thanks"
                                    onPress={() => { setShowModal(!showModal) }}
                                />
                            </View>
                        </View>
                    </Modal> */}


                    {/* {showModal
                        ? <Modal />
                        : null} */}


                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

export default DetailScreen;