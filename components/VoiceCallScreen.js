import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const VoiceCallScreen = ({ route }) => {
    const { chatData, isCallAccepted } = route.params;
    const [isMuted, setIsMuted] = useState(false);
    const [isBluetoothOn, setIsBluetoothOn] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);

    const pc = useRef(null); // WebRTC peer connection
    const stompClient = useRef(null); // WebSocket client
    const navigation = useNavigation();

    // Handle mute/unmute
    const handleMute = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => (track.enabled = !isMuted));
            setIsMuted(!isMuted);
        }
    };

    // Handle end call
    const handleEndCall = () => {
        if (pc.current) {
            pc.current.close();
            pc.current = null;
        }
        if (stompClient.current) {
            stompClient.current.disconnect();
        }
        navigation.goBack();
    };

    // Handle Bluetooth toggle
    const handleBluetooth = () => setIsBluetoothOn(!isBluetoothOn);

    // Format time for display
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Initialize WebSocket connection
    const initWebSocket = () => {
        const socket = new SockJS('http://192.168.1.36:8080/ws');
        stompClient.current = Stomp.over(() => socket);

        stompClient.current.connect({}, () => {
            console.log('WebSocket connected');

            // Subscribe to the user's private queue for incoming audio streams
            stompClient.current.subscribe(`/user/queue/voice`, (message) => {
                const audioStream = JSON.parse(message.body);
                // Handle incoming audio stream (e.g., forward to WebRTC)
                handleIncomingStream(audioStream);
            });

            // Subscribe to call invitations
            stompClient.current.subscribe(`/user/queue/call`, (message) => {
                const callData = JSON.parse(message.body);
                navigation.navigate('IncomingCallScreen', { chatData: callData });
            });
        });
    };

    // Initialize WebRTC peer connection
    const initWebRTC = async () => {
        pc.current = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }], // Use Google's public STUN server
        });

        // Get local audio stream
        const stream = await mediaDevices.getUserMedia({ audio: true });
        setLocalStream(stream);
        pc.current.addStream(stream);

        // Handle remote stream
        pc.current.onaddstream = (event) => {
            setRemoteStream(event.stream);
        };

        // Handle ICE candidates
        pc.current.onicecandidate = (event) => {
            if (event.candidate) {
                // Send ICE candidate to the other user via WebSocket
                stompClient.current.send('/app/voice/candidate', {}, JSON.stringify(event.candidate));
            }
        };
    };

    // Handle incoming audio stream
    const handleIncomingStream = (streamData) => {
        if (pc.current) {
            const remoteDesc = new RTCSessionDescription(streamData);
            pc.current.setRemoteDescription(remoteDesc);
        }
    };

    // Start the call
    const startCall = async () => {
        await initWebRTC();

        // Create an offer and set it as the local description
        const offer = await pc.current.createOffer();
        await pc.current.setLocalDescription(offer);

        // Send the offer to the other user via WebSocket
        stompClient.current.send('/app/voice/offer', {}, JSON.stringify(offer));
    };

    useEffect(() => {
        initWebSocket();
        if (isCallAccepted) {
            startCall();

            // Timer for call duration
            const timer = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);

            return () => {
                clearInterval(timer);
                if (pc.current) {
                    pc.current.close();
                }
                if (stompClient.current) {
                    stompClient.current.disconnect();
                }
            };
        }
    }, [isCallAccepted]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#0A4A73" />
            <Text style={styles.callerName}>{chatData.name}</Text>
            <Text style={styles.callStatus}>{isCallAccepted ? 'Ongoing call' : 'Calling...'}</Text>
            <View style={styles.callStatusDots}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
            </View>
            <Text style={styles.timer}>{formatTime(seconds)}</Text>

            <Icon name="group" size={150} color="#4A90E2" style={styles.profileIcon} />

            <View style={styles.controlsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('MessageScreen', { chatData })}>
                    <Icon name="message" size={30} color="white" />
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
                <TouchableOpacity onPress={() => navigation.navigate('VideoCallScreen', { chatData })}>
                    <Icon name="videocam" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A4A73',
        alignItems: 'center',
        paddingTop: 150,
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
    profileIcon: {
        marginVertical: 20,
        padding: 100,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
        position: 'absolute',
        bottom: 100,
    },
    endCallButton: {
        backgroundColor: 'red',
        padding: 20,
        borderRadius: 50,
    },
});

export default VoiceCallScreen;