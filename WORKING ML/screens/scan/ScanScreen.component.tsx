import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ViewStyle } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as Permissions from 'expo-permissions';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import styles from './ScanScreen.styles';
import { TouchableOpacity } from 'react-native';
import '@tensorflow/tfjs-react-native/dist/platform_react_native'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/header/Header';


const ScanScreen = () => {

  const [isTfReady, setIsTfReady] = useState(false);
  const [result, setResult] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [model, setModel] = useState<mobilenet.MobileNet>();
  const cameraRef = useRef<Camera>(null);
  const [imageURI, setImageURI] = useState('./');
  const [shouldTakePhoto, setShouldTakePhoto] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [picsTaken, setPicsTaken] = useState(0);
  const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Detail")
    }, 3000)
  }, [])

  // useEffect(() => {
  //   askForPermissions();
  //   load();
  // }, []);

  // useEffect(() => {
  //   if (shouldTakePhoto) {
  //     takePicture();
  //     setShouldTakePhoto(false);
  //   }
  // }, [shouldTakePhoto]);

  const load = async () => {
    try {
      await tf.ready();
      const model = await mobilenet.load();
      setModel(model);
      setIsTfReady(true);
      setShouldTakePhoto(true)
    } catch (err) {
      console.log(err);
    }
  };


  const askForPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === 'granted');
  };

  const resizeImage = async (photoUri: string) => {
    const resizedImage = await ImageManipulator.manipulateAsync(
      photoUri,
      [{ resize: { width: 150, height: 150 } }],
      { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG },
    );
    return resizedImage.uri;
  };

  const takePicture = async () => {
    try {
      setPicsTaken(picsTaken + 1)
      console.error(picsTaken)
      while (!isCameraReady) {
        console.log('preparing...')
      }
      if (isCameraReady) {
        console.error('ready to go')
      }
      let photo = { uri: './' }
      if (cameraRef.current) {
        console.error('acuma incepe sa se faca poza')
        photo = await cameraRef.current.takePictureAsync({
          skipProcessing: true
        });
        console.error('gata poza')
        setImageURI(photo.uri)
      }

      const imageDataBase64 = await FileSystem.readAsStringAsync(
        await resizeImage(photo.uri),
        {
          encoding: FileSystem.EncodingType.Base64,
        },
      );

      const imageData8 = new Uint8Array(Buffer.from(imageDataBase64, 'base64'));
      const imageTensorMe = decodeJpeg(imageData8);
      const predictionMe = await model?.classify(imageTensorMe);
      console.error(predictionMe)
      if (predictionMe && predictionMe.length > 0) {
        console.error(predictionMe[0].className)
        if (predictionMe[0].className == 'computer keyboard, keypad' || predictionMe[0].className == 'notebook, notebook computer') {
          console.error("AVEM FLORI")
          navigation.navigate('Detail')
        }
        else {
          console.error("NU-S FLORI")
          takePicture()
        }
        console.error(`${predictionMe[0].className} (${predictionMe[0].probability.toFixed(3)})`)
        setResult(
          `${predictionMe[0].className} (${predictionMe[0].probability.toFixed(3)})`
        );
      }
      console.error('gata fra')
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };


  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Header hasMenu={false} hasBackButton={false}/>
      <Camera
        style={styles.camera}
        type={CameraType.back} ref={cameraRef} onCameraReady={() => setIsCameraReady(true)}>
      </Camera>

      <Image
        source={{ uri: imageURI }}
        style={{ width: 200, height: 200 }}
      />
      {/* <TouchableOpacity onPress={() => { navigation.navigate('detail') }}>
        <Text style={{ marginTop: 100, fontSize: 46 }}>Move over automatically</Text>
      </TouchableOpacity> */}
      {result !== '' && <Text>{result}</Text>}
    </View>
  );

};

export default ScanScreen;





