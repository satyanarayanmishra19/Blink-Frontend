import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Text, 
  Platform,
  Alert,
  Dimensions,
  Modal
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import QRCodeScanner from 'react-native-qrcode-scanner'; // Add QR code scanner
import { launchImageLibrary } from 'react-native-image-picker';
import { BarCodeScanner } from "expo-barcode-scanner";
import { scanQRCodeFromImage } from 'vision-camera-code-scanner';


const { width, height } = Dimensions.get('window');

const QRCodeScannerScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [barCodeResult, setBarcodeResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  // const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
  const devices = useCameraDevices();

  const handleBarcodeScanned = useCallback((codes) => {
    if (codes.length > 0) {
      const scannedValue = codes[0]?.value || 'No data';
      setBarcodeResult(scannedValue);
      setModalVisible(true);
    }
  }, []);
  

  const requestPermission = useCallback(async () => {
    const cameraPermission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA
    });

    try {
      const result = await request(cameraPermission);
      
      if (result === RESULTS.GRANTED) {
        setHasPermission(true);
        return true;
      } else {
        Alert.alert(
          'Camera Permission', 
          'Camera permission is required to use the camera.'
        );
        return false;
      }
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  }, []);

  // Request permission on mount
  useEffect(() => {
    requestPermission();
  }, []);

  const selectImageFromGallery = () => {
    // Open the image picker to select an image from gallery
    launchImageLibrary(
      {
        mediaType: 'photo', // Limit selection to images only
        quality: 1, // Highest quality
      },
      async (response) => { // Make this callback function async
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('Error: ', response.errorMessage);
        } else {
          // If an image is selected, pass the URI to scanQRCodeFromImage
          try {
            const scannedResults = await BarCodeScanner.scanFromURLAsync(
              response.assets[0].uri
            );
  
            const dataNeeded = scannedResults[0].data;
            setBarcodeResult(dataNeeded);
            setModalVisible(true);
          } catch (error) {
            // If there is no QR code
            setDisplayText("No QR Code Found");
            setTimeout(() => setDisplayText(""), 4000);
          }
        }
      }
    );
  };
  
  

  const scanQRCodeFromImage = (uri) => {
    // Use the QRCodeScanner library to scan the selected image
    QRCodeScanner.scanFromUrl(uri, (error, result) => {
      if (error) {
        console.error("Error scanning QR code:", error);
      } else {
        setBarcodeResult(result.data);
        setModalVisible(true);
      }
    });
  };

  const renderContent = () => {
    const deviceArray = Object.values(devices);
    if (deviceArray.length === 0) {
      return (
        <View style={styles.centeredView}>
          <Text style={styles.errorText}>No camera devices detected</Text>
        </View>
      );
    }

    const device = deviceArray.find(device => device?.position === 'back') || deviceArray[0];

    // if (!device) {
    //   return (
    //     <View style={styles.centeredView}>
    //       <Text style={styles.errorText}>Unable to select a camera device</Text>
    //       <Text style={styles.debugText}>
    //         Detected {deviceArray.length} devices
    //       </Text>
    //     </View>
    //   );
    // }

    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        codeScanner={{
          codeTypes:['qr', 'ean-13','ean-8','code-128'],
          onCodeScanned: handleBarcodeScanned
        }}
      />
      
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      {renderContent()}
      <View style={styles.scannerContainer}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeftCorner]} />
            <View style={[styles.corner, styles.topRightCorner]} />
            <View style={[styles.corner, styles.bottomLeftCorner]} />
            <View style={[styles.corner, styles.bottomRightCorner]} />
          </View>
        </View>
        {/* <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.shareButton} onPress={selectImageFromGallery}>
            <Feather name="share-2" size={24} color="#fff" />
            <Text style={styles.shareText}>Scan From Gallery</Text>
          </TouchableOpacity>
        </View> */}


        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Scanned Result:</Text>
            <Text style={styles.barcodeText}>{barCodeResult}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  debugText: {
    color: 'gray',
    marginTop: 10
  },
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5
  },
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: width * 0.6,
    height: width * 0.6,
    position: 'absolute',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#3498db',
  },
  topLeftCorner: {
    top: 0,
    left: 0,
    borderLeftWidth: 4,
    borderTopWidth: 4,
  },
  topRightCorner: {
    top: 0,
    right: 0,
    borderRightWidth: 4,
    borderTopWidth: 4,
  },
  bottomLeftCorner: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
  },
  bottomRightCorner: {
    bottom: 0,
    right: 0,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  barcodeText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  shareButton: {
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 20,
      width: '45%',
      bottom:'400%'
    },

    shareText: {
      marginLeft: 10,
      fontSize: 16,
      // fontWeight: 'bold',
      color: '#fff',
    },
});

export default QRCodeScannerScreen;
