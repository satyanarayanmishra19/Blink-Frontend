import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // paddingVertical: 40,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    longPressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff',
    },
    selectedCount: {
      fontSize: 24,
      fontWeight: 'bold',
      paddingLeft: 10,
      flex: 1,
    },
    actionIcons: {
      flexDirection: 'row',
      gap: 20,
    },
    mainContent: {
      flex: 1,
      backgroundColor: '#F5F6F8',
    },
    listContainer: {
      paddingVertical: 8,
    },
    archivedChatItem: {
      width: '100%',
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      elevation: 1,
    },
    profilePicture: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
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
      marginBottom: 4,
    },
    chatTime: {
      fontSize: 12,
      color: '#000',
    },
    lastMessage: {
      fontSize: 14,
      color: '#000',
    },
  });

  export default styles