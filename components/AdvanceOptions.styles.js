import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: '#F9F9F9',
      flexGrow: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      // marginVertical: 10,
    },
    sectionTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      marginVertical: 15,
      textAlign: 'center'
    },
    section: {
      backgroundColor: '#fff',
      borderRadius: 8,
      marginVertical: 10,
      paddingVertical: 5,
      paddingBottom: -10,
    },
    toggleButton: {
      fontSize: 30,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      paddingHorizontal: 10,
      gap: 10,
    },
    // itemBorder: {
    //   borderBottomWidth: 1,
    //   borderBottomColor: '#ddd',
    // },
    iconContainer: {
      width: 40,
      height: 40,
    //   borderRadius: 10,
      justifyContent: 'center',
    //   backgroundColor: 'grey',
      alignItems: 'center',
    },
    labelContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
      // borderBottomWidth: 1,
      // borderBottomColor: '#ddd',
    },
    label: {
      // flex: 1,
      fontSize: 16,
      
    },
    status: {
      fontSize: 16,
      color: '#777',
      marginRight: 10,
    },
    footer: {
      marginTop: 20,
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingVertical: 5,
    },
    networkItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      // borderBottomWidth: 1,
      // borderBottomColor: '#ddd',
      
    },
    networkLabel: {
      flex: 1,
      fontSize: 16,
      width: '70%'
    },
    networkStatus: {
      fontSize: 16,
      color: '#777',
      marginRight: 10,
      width: '30%'
    },
  });
  
  export default styles