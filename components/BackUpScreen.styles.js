import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
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
    headerText: {
      fontSize: 20,
      color: '#000',
      flex: 1,
      textAlign: 'center',
    },
    container: {
      padding: 16,
      backgroundColor: '#f5f6fa',
      height: '300%',
    },
    notificationBox: {
      backgroundColor: '#e7f2ff',
      padding: 12,
      borderRadius: 10,
      marginBottom: 16,
    },
    notificationText: {
      fontSize: 14,
      color: '#6b7990',
      textAlign: 'left',
    },
    tabContainer: {
      flexDirection: 'row',
      height: 50,
      justifyContent: 'space-evenly',
      width: '100%',
      marginBottom: 16,
    },
    tab: {
      flex: 1,
      fontSize: 16,
      fontWeight: '500',
      paddingVertical: 10,
      textAlign: 'center',
      color: '#6b7990',
    },
    activeTab: {
      color: '#007aff',
      borderBottomWidth: 2,
      borderBottomColor: '#007aff',
      
    },
    safeSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    safeText: {
      fontSize: 18,
      fontWeight: '500',
    },
    infoContainer: {
      marginBottom: 16,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    infoLabel: {
      color: '#6b7990',
    },
    infoValue: {
      color: '#000',
    },
    successText: {
      color: 'green',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    passwordButton: {
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#007aff',
    },
    passwordButtonText: {
      color: '#007aff',
      fontWeight: 'bold',
    },
    backupButton: {
      flexDirection: 'row',
      backgroundColor: '#007aff',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 30,
      gap: 10,
      alignItems: 'center',
    },
    backupButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    dataBackupContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#F5F7FB',   
    },
    hiText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
    },
    iconContainer: {
      marginBottom: 40,
    },
    icon: {
      width: 120,
      height: 120,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0088FF', // Placeholder for the icon background
    },
    title: {
      textAlign: 'center',
      fontSize: 16,
      color: '#333',
      marginHorizontal: 20,
      marginBottom: 30,
    },
    backupPathContainer: {
      width: '90%',
      height: 80,
      backgroundColor: '#F1F2F6',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 10,
    },
    backupPathLabel: {
      color: '#888',
      fontSize: 14,
      fontWeight: 'bold',
      // marginBottom: 5,
    },
    changeText: {
      color: '#0088FF',
      fontSize: 14,
      // alignSelf: 'flex-end'
      // bottom:0
    },
    notSetText: {
      color: '#AAB0BC',
      marginBottom: 20,
      fontSize: 14,
      // paddingTop: 10
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      marginBottom: 30,
    },
    button: {
      borderWidth: 1,
      borderColor: '#E5E7EA',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 30,
    },
    buttonText: {
      color: '#0088FF',
      fontSize: 14,
    },
    dataBackupButton: {
      backgroundColor: '#0088FF',
      borderRadius: 30,
      width: '90%',
      alignItems: 'center',
      paddingVertical: 15,
    },
    dataBackupButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default styles