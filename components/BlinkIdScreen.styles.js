import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      paddingHorizontal: width * 0.05, // 5% padding
    },
    logoContainer: {
      height: height * 0.25, // 25% of screen height
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: width * 0.5, // 50% of screen width
    },
    infoText: {
      fontSize: 16,
      color: '#555',
      marginBottom: height * 0.02,
    },
    idContainer: {
      backgroundColor: '#0073e6',
      paddingVertical: height * 0.02,
      paddingHorizontal: width * 0.22,
      borderRadius: 10,
      marginBottom: height * 0.02,
    },
    idText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#fff',
    },
    instructionText: {
      fontSize: 14,
      color: '#888',
      textAlign: 'center',
      paddingHorizontal: width * 0.1,
    },
    button: {
      position: 'absolute',
      bottom: height * 0.09, // 4% from the bottom
      width: width * 0.8, // 80% of screen width
      height: height * 0.07, // 7% of screen height
      backgroundColor: '#3498db',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontSize: width*0.05,
      fontWeight: 'bold',
    },
    idBox: {
      alignItems: 'center',
    },
  });
  export default styles