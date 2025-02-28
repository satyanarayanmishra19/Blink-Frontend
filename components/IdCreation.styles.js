import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: width * 0.05,
    },
    title: {
      fontSize: width * 0.075,
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: height * 0.04,
      color: '#333',
    },
    progressContainer: {
      width: width * 0.8,
      height: height * 0.35,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: height * 0.03,
      // backgroundColor: 'black'
    },
    corner: {
      position: 'absolute',
      width: 30,
      height: 30,
      borderColor: '#3498db',
    },
    topLeftCorner: {
      top: 0,
      left: 0,
      borderLeftWidth: 4,
      borderTopWidth: 4,
    },
    topRightCorner: {
      top: 0,
      right: 0,
      borderRightWidth: 4,
      borderTopWidth: 4,
    },
    bottomLeftCorner: {
      bottom: 0,
      left: 0,
      borderLeftWidth: 4,
      borderBottomWidth: 4,
    },
    bottomRightCorner: {
      bottom: 0,
      right: 0,
      borderRightWidth: 4,
      borderBottomWidth: 4,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 15
    },
    text: {
      fontSize: 16,
      color: '#3498db',
      textAlign: 'center',
      width: 16,
    },
    subtitle: {
      fontSize: width * 0.04,
      color: '#7F8C8D',
      marginBottom: height * 0.08,
      textAlign: 'center',
    },
    button: {
      width: width * 0.8,
      height: height * 0.065,
      backgroundColor: '#3498db',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontSize: width * 0.05,
      fontWeight: 'bold',
    },
    buttonDisabled: {
      backgroundColor: '#ccc', // Light grey for disabled state
    },
  });

  export default styles;