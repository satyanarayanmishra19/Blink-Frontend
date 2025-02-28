import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // marginTop: Platform.OS === 'ios' ? 0 : 40,
      paddingBottom: 10,
      backgroundColor: '#f8f8f8',
    },
    backButton: {
      padding: 10,
    },
    dotsButton: {
      padding: 10,
    },
    headerText: {
      fontSize: 20,
      color: '#000'
      // fontWeight: 'bold',
    },
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'grey',
      padding: 16,
    },
    toggleText: {
      fontSize: 16,
      color: '#fff',
    },
    toggleButton: {
      fontSize: 24,
    },
    mainContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    scanningIconContainer: {
      backgroundColor: 'skyblue',
      borderRadius: 70,
      padding: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    instructionText: {
      textAlign: 'center',
      marginVertical: 20,
      paddingHorizontal: 20,
    },
    startSessionButton: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#3498db',
      borderRadius: 30,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    startSessionButtonText: {
      color: '#3498db',
      fontSize: 16,
    },
    gotItButton: {
      flexDirection: 'row',
      backgroundColor: '#3498db',
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    gotItText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
    },
  });

  export default styles