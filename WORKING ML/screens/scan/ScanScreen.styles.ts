import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    // flex: 1,
    height: 700,
    // width: 380
    width: Dimensions.get('window').width,
  },
  button: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});


export default styles;