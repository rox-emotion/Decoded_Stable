import React from "react";
import { View, Button, Text, SafeAreaView, Platform, Animated, Image, ScrollView } from 'react-native';
import { useEffect, useState, useRef } from "react";
import { Audio } from 'expo-av';
import Svg, { G, Circle, Rect } from 'react-native-svg';
import { requestPermissionsAsync } from "expo-av/build/Audio";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./DetailScreen.styles";
import Header from "../../components/header/Header";
import { useIsFocused } from '@react-navigation/native';
import data from './data.json'
import images from "./images";
import FadedScrollView from 'rn-faded-scrollview';

const DetailScreen = ({ route }) => {

    const isFocused = useIsFocused();
    const id = route.params.id
    console.error(id)
    const allData = data
    const [sound, setSound] = useState();
    const [percetange, setPercentage] = useState(0)
    const [passed, setPassed] = useState(0)
    const [isPaused, setIsPaused] = useState(false);
    const [isScrolled, setIsScrolled] = useState(true);

    const playSound = async () => {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('./../../assets/audio/001.ios.m4a'), { shouldPlay: true });
        setSound(sound)
        console.log('Playing Sound');
        await sound.playAsync();
    }

    const enableAudio = async () => {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: false,
            // shouldDuckAndroid: false,
        })
    }

    const toggleSound = async () => {
        if (sound) {
            const status = await sound.getStatusAsync();
            if (status.isPlaying === true) {
                await sound.pauseAsync()
                setIsPaused(true)
            }
            else {
                await sound.playAsync()
                setIsPaused(false)
            }
        }
    }

    const calculatePosition = async () => {
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
            const progress = status.positionMillis / status.durationMillis;
            const percentage = Math.floor(progress * 100);
            console.log(`Played ${percentage}% of the audio`);
            setPercentage(percentage)
        }
    }

    const scrollDown = () => {
        setIsScrolled(false)
    }

    const scrollUp = () => {
        setIsScrolled(true)
    }

    useEffect(() => {
        if (Platform.OS === 'ios') {
            enableAudio();
        }

        if (isFocused) {
            playSound();
        }
        else {
            sound.stopAsync();
        }

        // Return a cleanup function to stop the sound when the component unmounts
        return () => {
            console.log('Stopping Sound');
            if (sound !== undefined) {
                sound.stopAsync();
            }
        };
    }, [isFocused]);


    useEffect(() => {
        const timer = setInterval(() => {
            calculatePosition()
        }, 1000)

        return (() => {
            clearInterval(timer)
        })

    }, [sound])



    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const radius = 55;
    const strokeWidth = 20;
    const duration = 500;
    const color = allData[id].color;
    const inactiveColor = '#EBE9E4'
    const delay = 0;
    const max = 100;
    const halfCircle = radius + strokeWidth;
    const circleCircumference = 2 * Math.PI * radius;
    const circleRef = React.useRef();
    const strokeDashoffset = circleCircumference - (circleCircumference * percetange) / 100;


    return (
        <SafeAreaView>
            <Header hasMenu={false} hasBackButton={true} />
            {
                isScrolled
                    ? (
                        <View style={styles.container}>
                            <Image source={images[id]}
                                style={{ height: 400, width: 300, marginBottom: 23 }} />
                            <View style={{ justifyContent: 'space-evenly' }}>

                                <Text style={[styles.title, { color: allData[id].color }]}>Full Name</Text>
                                <Text style={[styles.title, { color: allData[id].color }]}>Artist and Writer</Text>
                                <Text style={[styles.title, { color: allData[id].color }]}>02_1994</Text>
                                <View style={styles.player}>
                                    <TouchableOpacity
                                        onPress={toggleSound}
                                    >
                                        <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
                                            <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
                                                <Circle cy='50%' cx='50%' stroke={inactiveColor} strokeWidth={strokeWidth} r={radius} fill='transparent' />
                                                {
                                                    isPaused
                                                        ? <Image source={require('./../../assets/icons/pause.png')} style={{ width: 25, height: 30, alignSelf: 'center', marginTop: '35%' }} />

                                                        : null
                                                }
                                                <TouchableOpacity>
                                                <AnimatedCircle ref={circleRef} cy='50%' cx='50%' stroke={color} strokeWidth={strokeWidth} r={radius} fill='transparent' strokeDasharray={circleCircumference} strokeDashoffset={strokeDashoffset} />
                                                </TouchableOpacity>
                                            </G>
                                        </Svg>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={scrollDown}>
                                    <Image source={require('./../../assets/icons/down_arrow.png')} style={{ height: 50, width: 50, alignSelf: 'center' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    : (

                        <View style={styles.containerScroll}>
                            <Text style={styles.title}>Full Name</Text>
                            <Text style={styles.title}>Artist and Writer</Text>
                            <Text style={styles.title}>02_1994</Text>
                            <View style={[styles.player, { marginBottom: 14 }]}>
                                <TouchableOpacity
                                    onPress={toggleSound}
                                >
                                    <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
                                        <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
                                            <Circle cy='50%' cx='50%' stroke={inactiveColor} strokeWidth={strokeWidth} r={radius} fill='transparent' />
                                            {
                                                isPaused
                                                    ? <Image source={require('./../../assets/icons/pause.png')} style={{ width: 25, height: 30, alignSelf: 'center', marginTop: '35%' }} />

                                                    : null
                                            }
                                            <AnimatedCircle ref={circleRef} cy='50%' cx='50%' stroke={color} strokeWidth={strokeWidth} r={radius} fill='transparent' strokeDasharray={circleCircumference} strokeDashoffset={strokeDashoffset} />

                                        </G>
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                            <FadedScrollView fadeSize={40} fadeColors={['#ffffff', '#ffffff00']}
                                style={{ height: '80%' }}>
                                <Text style={styles.smallText}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada arcu id arcu rutrum molestie. Donec suscipit vestibulum est sit amet imperdiet. Morbi non venenatis massa, a dictum sapien. Integer volutpat tempus interdum. In nec venenatis odio. Duis vitae ultrices tortor, in tempus nisl. Fusce vel urna finibus, vulputate ante eu, viverra sapien. Maecenas finibus, dolor quis maximus aliquet, quam orci auctor nunc, sed tincidunt leo nibh vitae lacus. Donec rutrum dolor ac aliquam gravida.

                                    Aenean vitae mi quis neque ullamcorper semper id non sapien. Pellentesque sagittis lobortis viverra. Vestibulum sagittis eget metus non elementum. In sit amet turpis justo. Nulla dignissim urna eget molestie sagittis. Fusce feugiat purus sed urna dignissim aliquam. Ut dapibus aliquam sollicitudin. Aliquam vitae est commodo, tincidunt ipsum in, rutrum leo. Pellentesque varius libero et fermentum condimentum. Proin consequat, sem a auctor congue, sapien sem commodo nisi, ac euismod dui odio a diam. Vivamus ut consectetur arcu, non vestibulum odio. Aenean ultricies dolor et porta dictum. Maecenas feugiat, turpis ut consectetur euismod, urna magna suscipit felis, sagittis aliquet tellus turpis in nisi. Praesent malesuada id lectus eu sollicitudin. Cras ac purus vitae sapien porta dapibus in vehicula nisl.
                                    Aenean vitae mi quis neque ullamcorper semper id non sapien. Pellentesque sagittis lobortis viverra. Vestibulum sagittis eget metus non elementum. In sit amet turpis justo. Nulla dignissim urna eget molestie sagittis. Fusce feugiat purus sed urna dignissim aliquam. Ut dapibus aliquam sollicitudin. Aliquam vitae est commodo, tincidunt ipsum in, rutrum leo. Pellentesque varius libero et fermentum condimentum. Proin consequat, sem a auctor congue, sapien sem commodo nisi, ac euismod dui odio a diam. Vivamus ut consectetur arcu, non vestibulum odio. Aenean ultricies dolor et porta dictum. Maecenas feugiat, turpis ut consectetur euismod, urna magna suscipit felis, sagittis aliquet tellus turpis in nisi. Praesent malesuada id lectus eu sollicitudin. Cras ac purus vitae sapien porta dapibus in vehicula nisl.

                                </Text>

                                <TouchableOpacity
                                    onPress={scrollUp}
                                >
                                    <Image source={require('./../../assets/icons/up_arrow.png')} style={{ height: 50, width: 50, alignSelf: 'center' }} />
                                </TouchableOpacity>

                            </FadedScrollView>
                        </View>



                    )
            }

        </SafeAreaView>
    )
}

export default DetailScreen;