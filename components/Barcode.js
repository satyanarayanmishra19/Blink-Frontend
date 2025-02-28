import React, { useContext, useRef } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg'; 
import { GlobalContext } from './GlobalContext';
import styles from './Barcode.styles';
import Feather from 'react-native-vector-icons/Feather';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

const Barcode = ({ navigation }) => {
  const { userData } = useContext(GlobalContext); // Access the context
  const uniqueId = userData.id; // Retrieve the id
  const viewShotRef = useRef();

  const handleShare = async () => {
    try {
      // Capture the entire QR code container
      const uri = await viewShotRef.current.capture();
      // Open the Share dialog with the captured image URI
      await Share.open({
        title: 'Share QR Code',
        message: 'Here is my Blink Unique ID QR code!',
        url: uri,
        type: 'image/png',
      });
    } catch (error) {
      console.error('Error sharing QR code:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f9f9f9" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.headingText}>Blink Unique ID</Text>

        <View style={styles.scannerContainer}>
          {/* ViewShot wraps the QR code to capture the image */}
          <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
            <View style={styles.scanFrame}>
              <QRCode value={uniqueId} size={230} />
            </View>
          </ViewShot>

          <View style={styles.instructionContainer}>
            <Text style={styles.instructions}>
              Share the QR to connect with people.
            </Text>
            
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Feather name="share-2" size={24} color="#000" />
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Powered by</Text>
              <Image
                source={require('../assets/images/Blink-Vertical.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Barcode;
