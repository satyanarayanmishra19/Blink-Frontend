import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
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
      textAlign:'center',
    },
    subSectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: '#333',
      marginBottom: 10,
    },
    section: {
      backgroundColor: '#fff',
      borderRadius: 8,
      marginVertical: 10,
      paddingVertical: 5,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      paddingHorizontal: 10,
      gap: 10,
    },
    iconContainer: {
      width: 30,
      alignItems: 'center',
    },
    label: {
      fontSize: 16,
    },
    labelContainer: {
      flex: 1,
      flexDirection: 'column',
    },
    smallLabel: {
      fontSize: 14,
      color: '#777',
    },
  });

  export default styles