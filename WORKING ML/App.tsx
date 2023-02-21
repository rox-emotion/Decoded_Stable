import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanScreen from './screens/scan/ScanScreen.component';
import SplashScreen from './screens/splash/SplashScreen.component';
import HomeScreen from './screens/home/HomeScreen.component';
import DetailScreen from './screens/detail/DetailScreen.component';
import AllScreen from './screens/all/AllScreen.component';
import AboutScreen from './screens/about/AboutScreen.component';
import { DefaultTheme} from '@react-navigation/native';

const navTheme = DefaultTheme;
navTheme.colors.background = '#FFFFFF';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator  screenOptions={{headerShown: false}} >
        <Stack.Screen name="splash" component={SplashScreen}/>
        <Stack.Screen name="scan" component={ScanScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="detail" component={DetailScreen} />
        <Stack.Screen name="all" component={AllScreen} />
        <Stack.Screen name="about" component={AboutScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;