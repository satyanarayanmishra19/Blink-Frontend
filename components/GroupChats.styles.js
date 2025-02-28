import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');
const scaleSize = size => (width / 375) * size;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F9F9',
      // paddingVertical: 20,
    },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: -80,
    left: -20,
    paddingBottom: 10,
    marginTop: scaleSize(25)
  },
  logo: {
    width: 120,
    height: 50,
    marginRight: -30
  },
    actionButtonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    archiveButton: {
      backgroundColor: '#FF5722',
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: '100%',
    },
    deleteButton: {
      backgroundColor: '#D32F2F',
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: '100%',
    },
    moreOptionsButton: {
      backgroundColor: '#757575',
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: '100%',
    },
    headerText: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: 'white',
      paddingVertical: 10,
    },
    contentContainer: {
      flex: 1,
      paddingBottom: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E0E0E0',
      borderRadius: 30,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 10,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: '#000',
    },
    archiveSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#E0E0E0',
    },
    archiveText: {
      marginLeft: 10,
      fontSize: 16,
      color: '#000',
    },
    chatContainer: {
      flex: 1,
    },
    chatItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: '#FFF',
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    profilePicture: {
      width: 50,
      height: 50,
      borderRadius: 10,
      marginRight: 15,
    },
    chatContent: {
      flex: 1,
    },
    chatHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    userName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    chatTime: {
      fontSize: 12,
      color: '#888',
    },
    lastMessage: {
      fontSize: 14,
      color: '#888',
      marginTop: 4,
    },
    badge: {
      backgroundColor: '#007bff',
      borderRadius: 15, // Half of the width/height to make it circular
      width: 20, // Equal width and height for a circle
      height: 20,
      justifyContent: 'center', // Center the text horizontally
      alignItems: 'center', // Center the text vertically
      marginLeft: -35, // Optional, adjust as per your layout
    },
    badgeText: {
      color: '#fff',
      fontSize: 10,
      textAlign: 'center', // Optional, ensures text alignment
    },
    addButton: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#007aff',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  export default styles;