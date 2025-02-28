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
      backgroundColor: '#fff',
    },
    backButton: {
      padding: 10,
    },
    dotsButton: {
      padding: 10,
    },
    headerText: {
      fontSize: 20,
      color: '#000',
      flex: 1,
      textAlign: 'center',
      // fontWeight: 'bold',
    },
    mainContent:{
      flex: 1,
      backgroundColor: '#F5F6F8', // Light grey background
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 24,
    },
    subTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 8,
    },
    text: {
      fontSize: 14,
      marginBottom: 8,
    },
    section: {
      marginBottom: 24,
    },
    disclaimerTitle: {
      fontSize: 12,
      lineHeight: 18,
      // color: 'gray',
      marginTop: 16,
    },  
    paragraphText:{
      paddingLeft: 20
    },
    divider:{
      width: '100%',
      height: 1.5,
      backgroundColor: '#e5e5e5',
    }
  });
  export default styles;