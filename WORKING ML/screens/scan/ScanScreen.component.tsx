import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ViewStyle } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
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
import * as MediaLibrary from 'expo-media-library';

const ScanScreen = () => {

  const prepareModel = async () => {
    console.error('ceau calule')
    const modelJson = require('./../../assets/my_model/model.json');
    const modelWeights = require('./../../assets/my_model/weights.bin')

    // const modelWeights1 = require('./../../assets/my_model/1.bin')
    // const modelWeights2 = require('./../../assets/my_model/2.bin')
    // const modelWeights3 = require('./../../assets/my_model/3.bin')
    // const modelWeights4 = require('./../../assets/my_model/4.bin')
    // const modelWeights5 = require('./../../assets/my_model/5.bin')
    // const modelWeights6 = require('./../../assets/my_model/6.bin')
    // const modelWeights7 = require('./../../assets/my_model/7.bin')
    // const modelWeights8 = require('./../../assets/my_model/8.bin')
    // const modelWeights9 = require('./../../assets/my_model/9.bin')


    // const model = await tf.loadLayersModel(
    //   bundleResourceIO(modelJson,[modelWeights1, modelWeights2, modelWeights3, modelWeights4, modelWeights5, modelWeights6, modelWeights7, modelWeights8])
    // )
    // setModel(model);
    // return model;

    const model = await tf.loadLayersModel(
      bundleResourceIO(modelJson, modelWeights)
    ).catch((e)=>{
      console.log("[LOADING ERROR] info:",e)
    })
    setModel(model)
    return model;
  }
  
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

  useEffect(() => {
    askForPermissions()
    loadTF()
    takePicture()
  }, [])

  const loadTF = async () => {
    await tf.ready();
    setIsTfReady(true)
    console.error("tf loaded")
  }

  const askForPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY_WRITE_ONLY, Permissions.MEDIA_LIBRARY);
    setHasCameraPermission(status === 'granted');
    console.error('CAMERA PERMISSION GRANTED')
  };

  const resizeImage = async (photoUri: string) => {
    const resizedImage = await ImageManipulator.manipulateAsync(
      photoUri,
      [{ resize: { width: 256, height: 256 } }],
      { format: ImageManipulator.SaveFormat.JPEG },
    );
    return resizedImage.uri;
  };

  const transformImageToTensor = async (photo) => {
    console.error('am inceput')
    console.error(photo.uri)
    const imageString = await FileSystem.readAsStringAsync(await resizeImage(photo.uri), {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imageBytes = new Uint8Array(Buffer.from(imageString, 'base64'));
    const imageTensor = decodeJpeg(imageBytes);

    // const pixelsTypedArrayT = imageTensor.dataSync();

    // const pixelsArrayT = Array.from(pixelsTypedArrayT);

    // console.log(pixelsArrayT)

    const reshapedImageTensor = tf.reshape(imageTensor, [1, 256, 256, 3])

    // const pixelsTypedArrayR = reshapedImageTensor.dataSync();

    // const pixelsArrayR = Array.from(pixelsTypedArrayR);

    // console.log(pixelsArrayR)

    // const normalizedImageTensor = tf.div(reshapedImageTensor, 255.0);


    // const pixelsTypedArray = normalizedImageTensor.dataSync();

    // const pixelsArray = Array.from(pixelsTypedArray);

    // console.log(pixelsArray)

    // const array = Array.from(reshapedImageTensor.dataSync());

    // console.log(array)



    const pixelRange = tf.tidy(() => {
      const min = reshapedImageTensor.min();
      const max = reshapedImageTensor.max();
      return { min, max };
    });

    console.log('Minimum pixel value:', await pixelRange.min.array());
    console.log('Maximum pixel value:', await pixelRange.max.array());
    return reshapedImageTensor;
  }



  const takePicture = async () => {
    const model = await prepareModel()
    console.error('READY FOR PICTURES')
    
    if (model !== undefined) {
      while (!isCameraReady) {
        console.log('preparing...')
      }
      if (isCameraReady) {
        console.error('ready to go')
      }
      let photo = { uri: './' }
      if (cameraRef.current) {
        try {
          console.error("start picture taking")
          photo = await cameraRef.current.takePictureAsync({
            skipProcessing: true
          })
          console.error("gata poza")
          setImageURI(photo.uri)
          console.log(photo.uri)
          try {

            const asset = await MediaLibrary.createAssetAsync(photo.uri);
            console.log('Saved asset:', asset);
          } catch (error) {
            console.log('An error occurred while saving the asset:', error);
          }
        }
        catch (error) {
          console.error(error)
        }

      }


      const processedImg = await transformImageToTensor(photo)
      console.error('gata procesarea')
      const predictionMe = await model.predict(processedImg)
      console.error('gata prezicerea')
      console.log("The prediction is: " + predictionMe)
      let predictedClassIndex = predictionMe.argMax(-1).dataSync()[0];
      // const finalImage = predictedClassIndex > 99 ? predictedClassIndex : predictedClassIndex > 9 ? '0' + predictedClassIndex : '00' + predictedClassIndex
      // console.error(finalImage)

      console.log(predictedClassIndex)
      if(predictedClassIndex == 1 || predictedClassIndex == 1){
        predictedClassIndex = 4
      }
      navigation.navigate("Detail", {id: predictedClassIndex})

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
      {/* <Header hasMenu={false} hasBackButton={false} /> */}
      <TouchableOpacity style={{zIndex:1}} onPress={() => {navigation.navigate('Debug')}}>
        <Text style={{fontSize:28, color: 'red'}}>Debug</Text>
      </TouchableOpacity>
      <Camera
        style={styles.camera}
        type={CameraType.back} ref={cameraRef}
      >
      </Camera>

      {/* <Image
        source={{ uri: imageURI }}
        style={{ width: 200, height: 200 }}
      /> */}
  
      
  
      {result !== '' && <Text>{result}</Text>}
    </View>
  );


};

export default ScanScreen;
