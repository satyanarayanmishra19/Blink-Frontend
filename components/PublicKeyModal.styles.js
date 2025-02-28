import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: '80%',
      padding: 20,
      backgroundColor: '#87CEEB',
      borderRadius: 10,
      alignItems: 'center',
    },
    publicKeyValue: {
      fontSize: 16,
      color: 'black',
      marginBottom: 40,
    },
    okayButton: {
      position: 'absolute',
      bottom: 10,
      right: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      borderRadius: 20,
    },
    okayButtonText: {
      color: '#000',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    okayButtonActive: {
      backgroundColor: '#1F6ED4',
    },
    okayButtonTextActive: {
      color: '#fff',
    },
    noButtonActive: {
      backgroundColor: '#1F6ED4',
    },
    noButtonTextActive: {
      color: '#fff',
    },
    fifthOkayButton: {
      position: 'absolute',
      bottom: 10,
      right: 20,
      paddingVertical: 10,
      paddingHorizontal: 50,
      backgroundColor: '#fff',
      borderRadius: 20,
    },
    fifthOkayButtonText: {
      color: '#000',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    noButton: {
      bottom: 10,
      right: 20,
      paddingVertical: 10,
      paddingHorizontal: 60,
      backgroundColor: 'transparent',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'grey',
    },
    noButtonText: {
      color: '#000',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    wideButton: {
      width: '100%',
      position: 'absolute',
      bottom: 10,
      right: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      borderRadius: 20,
    },
  });

  export default styles