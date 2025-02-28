import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: '#f5f5f5',
      // paddingVertical: 20,
    },
    scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20, // Add padding at bottom for scrolling
  },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#1a3c79',
    },
    description: {
      fontSize: 14,
      textAlign: 'left',
      marginBottom: 30,
      color: '#606060',
      marginTop: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#d3d3d3',
      borderRadius: 10,
      paddingHorizontal: 20,
      marginBottom: 15,
      backgroundColor: '#fff',
    },
    input: {
      flex: 1,
      paddingVertical: 15,
      paddingHorizontal: 10,
      color: '#000'
    },
    button: {
      // position: 'absolute',
      // bottom: -160,
      width: 300,
      height: 50,
      backgroundColor: '#3498db',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    divider: {
      width: 2,
      height: '75%',
      backgroundColor: '#e5e5e5',
      marginHorizontal: 15,
    },
    errorMessage: {
      color: 'red',
      fontSize: 14,
      marginBottom: 15,
      // textAlign: 'center',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0)', // Semi-transparent background
      // justifyContent: 'center',
      alignItems: 'center',
    },
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
    option: {
      width: '100%',
      paddingVertical: 10,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#d3d3d3',
    },
    optionText: {
      fontSize: 16,
      color: '#333',
    },
    flagButton: {
      // paddingHorizontal: 8,
    },
    flag: {
      fontSize: 16,
      
    },
    phoneInput: {
      flex: 1,
      fontSize: 16,
      marginLeft: 10,
    },
    dropdown: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      backgroundColor: "#fff",
      marginTop: 350,
      padding: 10,
      zIndex: 1,
      position: "absolute",
      width: "90%",
    },
    searchBox: {
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    countryItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
    },
    countryName: {
      fontSize: 16,
      marginLeft: 10,
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
    errorText: {
    color: 'red',
    textAlign:'center',    
  },
  });

  export default styles;