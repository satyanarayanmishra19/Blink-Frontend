import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    headerContainer: {
      flexDirection: 'row',
      backgroundColor: '#3498db',
      height: height * 0.08,
      alignItems: 'center',
      paddingHorizontal: width * 0.03,
      bottom: 10,
    },
    headerContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: width * 0.02,
    },
    headerText: {
      fontSize: width * 0.05,
      fontWeight: 'bold',
    },
    profilePicture: {
      width: width * 0.12,
      height: width * 0.12,
      borderRadius: width * 0.03,
      marginRight: width * 0.02,
    },
    statusDots: {
      flexDirection: 'row',
      gap: width * 0.01,
    },
    onlineDot: {
      width: width * 0.03,
      height: width * 0.03,
      backgroundColor: 'green',
      borderRadius: width * 0.015,
    },
    offlineDot: {
      width: width * 0.03,
      height: width * 0.03,
      backgroundColor: 'white',
      borderRadius: width * 0.015,
    },
    messagesList: {
      padding: width * 0.03,
    },
    messageContainer: {
      maxWidth: '80%',
      marginVertical: height * 0.005,
      padding: width * 0.03,
    },
    sentMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#3498db',
      borderRadius: width * 0.03,
    },
    receivedMessage: {
      alignSelf: 'flex-start',
      backgroundColor: 'grey',
      borderRadius: width * 0.03,
    },
    messageText: {
      fontSize: width * 0.04,
    },
    timeText: {
      fontSize: width * 0.03,
      color: '#fff',
      alignSelf: 'flex-end',
      marginTop: height * 0.005,
    },
    timeContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    timeImageContainer: {
      paddingLeft: width * 0.01,
    },
    timeImage: {
      width: width * 0.04,
      height: width * 0.04,
      borderRadius: width * 0.02,
    },
    starIcon: {
      marginLeft: width * 0.02,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width * 0.03,
      paddingVertical: width * 0.035,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: width * 0.03,
      borderRadius: width * 0.04,
      elevation: 2,
    },
    input: {
      flex: 1,
      fontSize: width * 0.04,
      paddingVertical: 10,
      color: '#000',
    },
    iconRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: width * 0.02,
    },
    micButton: {
      backgroundColor: '#3498db',
      borderRadius: width * 0.08,
      width: width * 0.13,
      height: width * 0.13,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: width * 0.03,
    },
    attachmentModalContainer: {
      flex: 1,
      // height: 100,
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    attachmentOptions: {
      width: width * 0.95,
      // height: 200,
      padding: 20,
      bottom: 80,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    attachmentButton: {
      alignItems: 'center',
    },
    attachmentModalClose: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
    },
    messageImage: {
      width: width * 0.6,
      height: width * 0.6,
      borderRadius: 10,
      marginVertical: height * 0.01,
    }
    
  });

  export default styles;