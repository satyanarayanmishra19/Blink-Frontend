import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Camera, useCameraDevices, useCameraPermission, useCodeScanner } from "react-native-vision-camera";



const Trying = () => {
    const devices = useCameraDevices()
    const device = devices.back;

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
          console.log(`Scanned ${codes.length} codes!`)
        }
      })

    useEffect(() => {
        checkPermission();
    }, []);
    const checkPermission = async () => {
        const newCameraPermission = await Camera.requestCameraPermission();
        console.log(newCameraPermission);
    };
    if (device == null) return <ActivityIndicator />
    return(
        <View style={{flex: 1}}>
            <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            />
        </View>
    );
};

export default Trying