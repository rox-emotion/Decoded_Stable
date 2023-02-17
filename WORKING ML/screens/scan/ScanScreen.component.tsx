import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image } from 'react-native';
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

const App = ({navigation}) => {

  const [isTfReady, setIsTfReady] = useState(false);
  const [result, setResult] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [model, setModel] = useState<mobilenet.MobileNet>();
  const cameraRef = useRef<Camera>(null);
  const [imageURI, setImageURI] = useState('./');
  var firstRender = useRef(null);

  useEffect(() => {
    askForPermissions();
    load();
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(()=> {
  //     takePicture()
  //   },10000)
  // },[])

  const load = async () => {
    try {
      await tf.ready();
      const model = await mobilenet.load();
      setModel(model)
      setIsTfReady(true);
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
      [{ resize: { width: 300, height: 300 } }],
      { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG },
    );
    return resizedImage.uri;
  };

  const takePicture = async () => {
    console.error('am intrat')
    let photo = { uri: './' }
    if (cameraRef.current) {
      photo = await cameraRef.current.takePictureAsync();
      setImageURI(photo.uri)
    }

    console.error(model)
    console.error('am facut poza')

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
      console.error(`${predictionMe[0].className} (${predictionMe[0].probability.toFixed(3)})`)
      setResult(
        `${predictionMe[0].className} (${predictionMe[0].probability.toFixed(3)})`
      );
    }
    console.error('gata fra')
  }


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
      <Camera style={styles.camera} type={CameraType.back} ref={cameraRef}>
      </Camera>
      {
        isTfReady
        ? <View>
          <TouchableOpacity style={styles.pula} onPress={takePicture}>
          <Text style={styles.pula}>da cool</Text>
          </TouchableOpacity>
          </View>
        : null
      }
      <Image
        source={{ uri: imageURI }}
        style={{ width: 200, height: 200 }}
      />
      {result !== '' && <Text>{result}</Text>}
    </View>
  );
};

export default App;





