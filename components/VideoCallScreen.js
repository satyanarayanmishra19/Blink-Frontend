import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform, Alert, Dimensions, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { GlobalContext } from './GlobalContext';

const { width, height } = Dimensions.get('window');

const VideoCallScreen = ({ navigation }) => {
    const { chatData } = useContext(GlobalContext);
    const [hasPermission, setHasPermission] = useState(false);
    const [cameraPosition, setCameraPosition] = useState('front');
    const [seconds, setSeconds] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const handleMute = () => setIsMuted(!isMuted);
    const [isBluetoothOn, setIsBluetoothOn] = useState(false);
    const handleEndCall = () => {
        ws.send(JSON.stringify({ type: 'end', message: 'Call ended' }));
        navigation.goBack();
    };
    const handleBluetooth = () => setIsBluetoothOn(!isBluetoothOn);
    const [isVisible, setIsVisible] = useState(true);
    const devices = useCameraDevices();
    const toggleVisibility = () => setIsVisible(!isVisible);

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
                Alert.alert('Camera Permission', 'Camera permission is required to use the camera.');
                return false;
            }
        } catch (error) {
            console.error('Permission request error:', error);
            return false;
        }
    }, []);

    useEffect(() => {
        requestPermission();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const ws = new WebSocket('ws://192.168.1.226:8080/ws');

        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // Handle incoming messages
            if (message.type === 'call') {
                // Handle call initiation
            } else if (message.type === 'answer') {
                // Handle call answer
            } else if (message.type === 'end') {
                // Handle call termination
                navigation.goBack();
            }
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    const renderContent = () => {
        const deviceArray = Object.values(devices);

        if (deviceArray.length === 0) {
            return (
                <View style={[styles.container, { height: screenHeight }]}>
                    <Text style={styles.errorText}>No camera devices detected</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={requestPermission}>
                        <Text>Retry Permissions</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        const device = deviceArray.find(d => d.position === cameraPosition) || deviceArray[0];

        if (!device) {
            return (
                <View style={[styles.container, { height: screenHeight }]}>
                    <Text style={styles.errorText}>Unable to select a camera device</Text>
                    <Text style={styles.debugText}>Detected {deviceArray.length} devices</Text>
                </View>
            );
        }

        return (
            <Camera
                style={[styles.camera, { width, height: screenHeight }]}
                device={device}
                isActive={true}
                photo={true}
            />
        );
    };

    return (
        <View style={[styles.container, { height: screenHeight }]}>
            <StatusBar hidden />
            <TouchableOpacity style={styles.background} onPress={toggleVisibility} activeOpacity={1}>
                {renderContent()}
                {isVisible && (
                    <View style={styles.topContainer}>
                        <Text style={styles.callerName}>Satyanarayan</Text>
                        <Text style={styles.callStatus}>Ongoing call</Text>
                        <View style={styles.callStatusDots}>
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                        </View>
                        <Text style={styles.timer}>{formatTime(seconds)}</Text>
                    </View>
                )}
                {isVisible && (
                    <View style={styles.controlsContainer}>
                        <TouchableOpacity onPress={() => setCameraPosition(current => current === 'back' ? 'front' : 'back')}>
                            <Icon name="cameraswitch" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleMute}>
                            <Icon name={isMuted ? "mic-off" : "mic"} size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleEndCall} style={styles.endCallButton}>
                            <Icon name="call-end" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleBluetooth}>
                            <Icon name="bluetooth" size={30} color={isBluetoothOn ? "#4A90E2" : "white"} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('VoiceCallScreen', { chatData })}>
                            <Icon name="call" size={26} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0
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
topContainer: {
  position: 'absolute',
  top: 150,
  alignItems: 'center',
  width: '100%',
},
callerName: {
  color: 'white',
  fontSize: 40,
  fontWeight: 'bold',
},
callStatus: {
  color: 'white',
  fontSize: 16,
  marginTop: 5,
},
callStatusDots: {
  flexDirection: 'row',
  marginTop: 5,
},
dot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#4CAF50',
  marginHorizontal: 2,
},
timer: {
  color: 'white',
  fontSize: 20,
  marginTop: 10,
},
controlsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '70%',
  position: 'absolute',
  bottom: 100,
  marginHorizontal: 60,
},
endCallButton: {
  backgroundColor: 'red',
  padding: 20,
  borderRadius: 50,
},
});

export default VideoCallScreen;