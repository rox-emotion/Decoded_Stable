import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ViewStyle } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as Permissions from 'expo-permissions';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import styles from './ScanScreen.styles';
import { TouchableOpacity } from 'react-native';
import '@tensorflow/tfjs-react-native/dist/platform_react_native'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/header/Header';
import { TextInput } from 'react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native'

const ScanScreen = () => {

  const modelJSON = require('./../../assets/model/model.json')
  const modelWeights = require('./../../assets/model/weights.bin')

  const [isTfReady, setIsTfReady] = useState(false);
  const [result, setResult] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [model, setModel] = useState<any>();
  const cameraRef = useRef<Camera>(null);
  const [imageURI, setImageURI] = useState('./');
  const [shouldTakePhoto, setShouldTakePhoto] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(true);
  const [picsTaken, setPicsTaken] = useState(0);
  const navigation = useNavigation()
  const [det, setDet] = useState(0);

  useEffect(() => {
    askForPermissions()
    loadTF()
    takePicture()
  }, [])

  const preparePhoto = async () => {
    await loadModel()
    await takePicture()
  }

  const moveOver = () => {
    navigation.navigate("Detail", { id: det })
  }

  const loadTF = async () => {
    await tf.ready();
    setIsTfReady(true)
    console.error("tf loaded")
  }

  const loadModel = async () => {
    //.ts: const loadModel = async ():Promise<void|tf.LayersModel>=>{
    const model = await tf.loadGraphModel(
      bundleResourceIO(modelJSON, modelWeights)
    ).catch((e) => {
      console.error("[LOADING ERROR] info:", e)
    })
    setModel(model);
    console.error('model loaded')

    return model

  }

  const askForPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === 'granted');
    console.error('CAMERA PERMISSION GRANTED')
  };

  const resizeImage = async (photoUri: string) => {
    const resizedImage = await ImageManipulator.manipulateAsync(
      photoUri,
      [{ resize: { width: 150, height: 150 } }],
      { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG },
    );
    return resizedImage.uri;
  };

  const transformImageToTensor = async (uri: string) => {
    console.error('am inceput')
    console.error(uri)
    //.ts: const transformImageToTensor = async (uri:string):Promise<tf.Tensor>=>{
    //read the image as base64
    const img64 = await FileSystem.readAsStringAsync(
      await resizeImage(uri),
      {
        encoding: FileSystem.EncodingType.Base64,
      });
    console.log('img64')
    const imgBuffer = tf.util.encodeString(img64, 'base64').buffer
    console.log('imgbuffer')
    const raw = new Uint8Array(imgBuffer)
    console.log('raw')
    let imgTensor = decodeJpeg(raw)
    console.log('imgtensor')
    const scalar = tf.scalar(255)
    //resize the image
    imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [256, 256])
    console.log('resize')
    //normalize; if a normalization layer is in the model, this step can be skipped
    const tensorScaled = imgTensor.div(scalar)
    //final shape of the rensor
    const img = tf.reshape(tensorScaled, [1, 256, 256, 3])
    // console.error("UITA-TE AICI" + imgTensor)
    console.error('am terminat')
    return img
  }

  const takePicture = async () => {
    const model = await loadModel()
    console.error('READY FOR PICTURES')
    console.error("CE COAIE")
    console.error(model)

    if (model !== undefined) {
      while (!isCameraReady) {
        console.log('preparing...')
      }
      if (isCameraReady) {
        console.error('ready to go')
      }
      let photo = { uri: './' }
      if (cameraRef.current) {
        console.error("start picture taking")
        photo = await cameraRef.current.takePictureAsync({
          skipProcessing: true
        })
        console.error("gata poza")
        setImageURI(photo.uri)
      }

      const processedImg = await transformImageToTensor(photo.uri)
      // console.error(processedImg)
      console.error('gata procesaewa')
      const predictionMe = await model.predict(processedImg)
      console.error('gata prezicerea')
      console.log("The prediction is: " + predictionMe)
      const predictedClassIndex = predictionMe.argMax(-1).dataSync()[0];
      // const finalImage = predictedClassIndex > 99 ? predictedClassIndex : predictedClassIndex > 9 ? '0' + predictedClassIndex : '00' + predictedClassIndex
      // console.error(finalImage)

   
      navigation.navigate("Detail", {id: predictedClassIndex})

    }
  }


    //   setPicsTaken(picsTaken + 1)
    //   console.error(picsTaken)
    //   while (!isCameraReady) {
    //     console.log('preparing...')
    //   }
    //   if (isCameraReady) {
    //     console.error('ready to go')
    //   }
    //   let photo = { uri: './' }
    //   if (cameraRef.current) {
    //     console.error('acuma incepe sa se faca poza')
    //     photo = await cameraRef.current.takePictureAsync({
    //       skipProcessing: true
    //     });
    //     console.error('gata poza')
    //     setImageURI(photo.uri)
    //   }
    //   const processedImg = transformImageToTensor(imageURI)
    //   console.error('icisa la image processed')
    //   const predictionMe = model.predict(processedImg)
    //   console.error('aici o predictie')
    //   console.error(predictionMe)
    // const imageDataBase64 = await FileSystem.readAsStringAsync(
    //   await resizeImage(photo.uri),
    //   {
    //     encoding: FileSystem.EncodingType.Base64,
    //   },
    // );
    // ?
    // ghg
    // hjj
    // console.error('si aicia')
    // const imageData8 = new Uint8Array(Buffer.from(imageDataBase64, 'base64'));
    // const imageTensorMe = decodeJpeg(imageData8);
    // console.error('facut tensor')
    // const predictionMe = await model?.classify(imageTensorMe);
    //   console.error('gata predictia')
    //   console.error(predictionMe)
    //   if (predictionMe && predictionMe.length > 0) {
    //     console.error(predictionMe[0].className)
    //     if (predictionMe[0].className == 'computer keyboard, keypad' || predictionMe[0].className == 'notebook, notebook computer') {
    //       console.error("AVEM FLORI")
    //       navigation.navigate('Detail')
    //     }
    //     else {
    //       console.error("NU-S FLORI")
    //       takePicture()
    //     }
    //     console.error(`${predictionMe[0].className} (${predictionMe[0].probability.toFixed(3)})`)
    //     setResult(
    //       `${predictionMe[0].className} (${predictionMe[0].probability.toFixed(3)})`
    //     );
    //   }
    //   console.error('gata fra')
    // }
    // catch (err) {
    //   console.log(err);
    // }
  

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
      <Header hasMenu={false} hasBackButton={false} />
      <Camera
        style={styles.camera}
        type={CameraType.back} ref={cameraRef}
      //  onCameraReady={() => setIsCameraReady(true)}
      >
      </Camera>

      <Image
        source={{ uri: imageURI }}
        style={{ width: 200, height: 200 }}
      />
      <TextInput
        style={{ backgroundColor: 'red', width: 100, height: 50 }}
        onChangeText={(value) => { setDet(value) }}
        value={det}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={(moveOver)}>
        <Text>Move over</Text>
      </TouchableOpacity>
      {result !== '' && <Text>{result}</Text>}
    </View>
  );

  return (
    <View>
      <Text>buna</Text>
    </View>
  )

};

export default ScanScreen;
