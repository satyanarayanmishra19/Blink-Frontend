import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      height: height * 0.8, // Set to 90% of the screen height
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
    },
    imageContainer: {
      position: 'relative',
      height: height * 0.4, // Set to 40% of the screen height
    },
    image: {
      width: '100%',
      height: '100%',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      position: 'absolute',
      top: 10,
      left: 10,
      right: 10,
      zIndex: 1,
      justifyContent: 'space-between',
    },
    rightIconsContainer: {
      flexDirection: 'row',
    },
    iconButton: {
      marginLeft: 10,
    },
    bottomRow: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingBottom: 20,
      paddingHorizontal: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bottomText: {
      color: 'white',
      fontSize: 18, // Adjusted font size
      fontWeight: 'bold',
    },
    editButton: {
      padding: 6,
      backgroundColor: '#1F6ED4',
      borderRadius: 5,
    },
    headerTextContainer: {
      alignItems: 'center',
    },
    idSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      margin: 20,
    },
    idText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#2D3436',
    },
    statusDots: {
      flexDirection: 'row',
      marginLeft: 8,
      gap: 3,
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 10,
    },
    profileSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      width: '90%',
    },
    nickname: {
      fontSize: 24,
      fontWeight: '600',
      color: '#2D3436',
    },
    publicKeyButton: {
      backgroundColor: '#1F6ED4',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
    publicKeyText: {
      color: '#fff',
      fontSize: 14,
    },
    mediaSectionContainer: {
      flexDirection: 'column',
      marginBottom: 20,
      backgroundColor: 'black',
      borderRadius: 5,
      width: '90%',
    },
    textContainer: {
      paddingLeft: 10,
      paddingTop: 10,
    },
    hiText: {
      color: 'grey',
      fontSize: 14,
    },
    mediaSection: {
      flexDirection: 'row',
      backgroundColor: 'black',
      padding: 10,
      borderRadius: 5,
      width: '100%',
    },
    mediaImage: {
      width: 80,
      height: 80,
      borderRadius: 5,
      marginRight: 5,
    },
    mediaOverlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    moreMediaText: {
      fontSize: 20,
      color: '#2D3436',
    },
    privacySection: {
      padding: 20,
      backgroundColor: '#F5F5F5',
      borderRadius: 5,
      width: '90%',
    },
    privacyHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    privacyLabel: {
      fontSize: 14,
      marginBottom: 5,
    },
    pickerWrapper: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      overflow: 'hidden',
      marginBottom: 15,
    },
    picker: {
      height: 50,
    },
  });

  export default styles;