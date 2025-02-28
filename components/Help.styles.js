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
      // marginTop: 40,
      paddingBottom: 10,
      backgroundColor: '#fff',
    },
    backButton: {
      padding: 10,
    },
    headerText: {
      fontSize: 20,
      color: '#000',
      flex: 1,
      textAlign: 'center',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#Fff', // Light grey background for the search bar
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 1,
      // marginBottom: 16,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    mainContent: {
      flex: 1,
      backgroundColor: '#F5F6F8', // Light grey background
      padding: 16,
    },
    categoryTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#007AFF',
      marginTop: 20,
      marginBottom: 10,
    },
    questionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      
    },
    questionText: {
      fontSize: 14,
      color: '#333',
      width: 290
    },
  });

  export default styles