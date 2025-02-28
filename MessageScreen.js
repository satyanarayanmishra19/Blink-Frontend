import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, StatusBar, SafeAreaView, Dimensions, Platform, Modal, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatModal from './ChatModal';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import { RewardContext } from './RewardContext';
import SockJS from 'sockjs-client'; // Ensure this import is correct
import { Client } from '@stomp/stompjs';
import styles from './MessageScreen.styles';
const { width } = Dimensions.get('window');

// Dummy Data for conversation
const messagesData = [
  { id: '1', text: 'Hello, how are you?', time: '8:24 AM', type: 'received' },
  { id: '2', text: 'I am good man... You?', time: '8:24 AM', type: 'sent' },
];

const MessageScreen = ({ route, navigation }) => {
  const { chatData } = route.params;
  const [messages, setMessages] = useState(messagesData);
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const { incrementReward } = useContext(RewardContext);
  const client = useRef(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const flatListRef = useRef(null);

  // Generate unique IDs
  const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  useEffect(() => {
    const socket = new SockJS('http://192.168.1.226:8080/ws');
    client.current = new Client({
      webSocketFactory: () => socket,
    });

    client.current.onConnect = () => {
      console.log('Connected to WebSocket');
      client.current.subscribe(`/user/${chatData.sender}/private`, (message) => {
        try {
          const receivedMessage = JSON.parse(message.body);
          receivedMessage.type = 'received';
          receivedMessage.sender = chatData.recipient; // Correct sender property

          setMessages(prevMessages => {
            const updatedMessages = [...prevMessages, receivedMessage];
            const uniqueMessages = Array.from(new Set(updatedMessages.map(m => m.id)))
              .map(id => updatedMessages.find(m => m.id === id));

            return uniqueMessages;
          });
        } catch (error) {
          console.error("Error parsing private message:", error);
        }
      });
    };

    client.current.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    client.current.activate();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, [chatData]);

  const handleSend = () => {
    if (text && chatData.recipient) {
      const newMessage = {
        id: generateUniqueId(),
        sender: chatData.sender, // Ensure sender is set correctly
        recipient: chatData.recipient, // Ensure recipient is set correctly
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'sent',
      };

      console.log("Sending message:", newMessage);

      client.current.publish({
        destination: '/app/private-message',
        body: JSON.stringify(newMessage),
      });

      setMessages(prevMessages => [...prevMessages, newMessage]);
      setText('');
    } else {
      console.error('Cannot send message: Username or text is missing');
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const openAttachmentModal = () => setAttachmentModalVisible(true);
  const closeAttachmentModal = () => setAttachmentModalVisible(false);

  const pickImageFromGallery = async () => {
    const options = {
      mediaType: 'photo', // Can be 'photo', 'video', or 'mixed'
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;

        // Add image to the messages list
        const newMessage = {
          id: Date.now().toString(),
          image: uri,
          type: 'sent',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });
    closeAttachmentModal();
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      // Handle photo data here
      console.log("Photo taken:", result.uri);
    }
    closeAttachmentModal();
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // Add the picked document to the message list (e.g., 'messages' state)
      const newMessage = {
        id: Math.random().toString(),  // Unique ID for the message
        type: 'sent',
        file: res.uri,  // Document URI or file path
        fileName: res.name,  // File name
        time: new Date().toLocaleTimeString(),
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);  // Assuming you use state for messages
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log('Unknown error: ', err);
      }
    }
    closeAttachmentModal();
  };


  const handleLongPress = (messageId) => {
    setStarredMessages((prevStarredMessages) => ({
      ...prevStarredMessages,
      [messageId]: !prevStarredMessages[messageId],
    }));
  };

  const renderMessage = ({ item }) => {
    const isSent = item.type === 'sent';
    <View style={[styles.messageContainer, isSent ? styles.sentMessage : styles.receivedMessage]}>
      {item.text && <Text style={styles.messageText}>{item.text}</Text>}
      <Text style={styles.timeText}>{item.time}</Text>
    </View>

    const handleOpenDocument = (uri) => {
      FileViewer.open(uri)
        .then(() => {
          console.log('Document opened successfully');
        })
        .catch((error) => {
          console.log('Error opening document: ', error);
        });
    };

    return (
      <TouchableOpacity
        onLongPress={() => handleLongPress(item.id)}
        style={[
          styles.messageContainer,
          isSent ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        {item.file && (
          <TouchableOpacity onPress={() => handleOpenDocument(item.file)}>
            <View style={styles.documentContainer}>
              <Icon name="file-text" size={40} color="#4CAF50" style={styles.documentIcon} />
              <View>
                <Text style={styles.documentName}>{item.fileName}</Text>
                <Text style={styles.documentUri}>{item.file}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {item.image && (
          <Image
            source={typeof item.image === 'string' ? { uri: item.image } : item.image}
            style={styles.messageImage}
          />
        )}
        {item.text && (
          <Text
            style={[
              styles.messageText,
              isSent ? styles.sentMessageText : styles.receivedMessageText,
            ]}
          >
            {item.text}
          </Text>
        )}
        <View style={styles.timeContainer}>
          <Text
            style={[
              styles.timeText,
              isSent ? styles.sentTime : styles.receivedTime,
            ]}
          >
            {item.time}
          </Text>
          {/* {isStarred && (
            // <Ionicons name="star" size={width * 0.04} color="#FFD700" style={styles.starIcon} />
          )} */}
          {isSent && (
            <View style={styles.timeImageContainer}>
              <Image
                source={chatData.profileImage}
                style={styles.timeImage}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#3498db" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={width * 0.06} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerContent} onPress={openModal}>
          <Image source={chatData.profileImage} style={styles.profilePicture} />
          <View>
            <Text style={styles.headerText}>{chatData.name}</Text>
            <View style={styles.statusDots}>
              <View style={styles.onlineDot} />
              <View style={styles.offlineDot} />
              <View style={styles.offlineDot} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('VoiceCallScreen', { chatData })}>
          <Ionicons name="call" size={width * 0.06} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('StarredMessagesScreen')}>
          <Entypo name="dots-three-vertical" size={width * 0.06} color="black" />
        </TouchableOpacity>
        <ChatModal visible={modalVisible} onClose={closeModal} chatData={chatData} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
      />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Icon name="emoticon-happy-outline" size={width * 0.06} color="#9e9e9e" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor="#9e9e9e"
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleSend}
          />
          <View style={styles.iconRow}>
            {/* <TouchableOpacity>
              <Icon name="camera-outline" size={width * 0.06} color="#9e9e9e" />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={openAttachmentModal}>
              <Icon name="link" size={width * 0.06} color="#9e9e9e" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.micButton} onPress={handleSend}>
          {text ? (
            <Ionicons name="send" size={width * 0.07} color="white" />
          ) : (
            <Icon name="microphone" size={width * 0.07} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      {/* Attachment Modal */}
      <Modal
        visible={attachmentModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeAttachmentModal}
      >
        <TouchableWithoutFeedback onPress={closeAttachmentModal}>
          <View style={styles.attachmentModalContainer}>
            <View style={styles.attachmentOptions}>
              <TouchableOpacity style={styles.attachmentButton} onPress={pickImageFromGallery}>
                <Icon name="image" size={width * 0.08} color="#3498db" />
                <Text>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentButton} onPress={takePhoto}>
                <Icon name="camera" size={width * 0.08} color="#3498db" />
                <Text>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentButton} onPress={pickDocument}>
                <Icon name="file-document-outline" size={width * 0.08} color="#3498db" />
                <Text>Document</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentButton}>
                <MaterialCommunityIcons name="map-marker" size={width * 0.08} color="#3498db" />
                <Text>Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};


export default MessageScreen;