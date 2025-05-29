import React, { useContext, useEffect, useRef, useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, StatusBar, SafeAreaView, Dimensions, Platform, Modal, TouchableWithoutFeedback, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatModal from './ChatModal';
import styles from './MessageScreen.styles';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { RewardContext } from './RewardContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from 'expo-document-picker';

const { width, height } = Dimensions.get('window');

const MessageScreen = ({ route, navigation }) => {
  const { chatData } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [starredMessages, setStarredMessages] = useState({});
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const { incrementReward } = useContext(RewardContext);

  const senderId = chatData.sender; // Use chatData.sender for senderId
  const receiverId = chatData.recipient; // Use chatData.recipitent for receiverId
  // Generate unique IDs
  const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const fetchChatMessages = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Retrieve token
      const response = await fetch(`http://172.30.4.184:8080/api/messages/chat/${senderId}/${receiverId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      });
      const data = await response.json();

      // Ensure each message has a 'type' property based on senderId
      const formattedMessages = data
        .map((message) => ({
          ...message,
          type: message.senderId === senderId ? 'sent' : 'received', // Determine type
        }))
        .sort((a, b) => new Date(a.time) - new Date(b.time)); // Sort messages by time (oldest to newest)

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const handleSend = async () => {
    if (text) {
      const newMessage = {
        senderId,
        receiverId,
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'sent',
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]); // Update local state
      setText(''); // Clear input
      incrementReward(1);

      try {
        const token = await AsyncStorage.getItem('token'); // Retrieve token
        await fetch('http://172.30.4.184:8080/api/messages/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add token to headers
          },
          body: JSON.stringify(newMessage),
        });

        
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(() => {
    fetchChatMessages(); // Fetch conversation messages when the component mounts
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChatMessages(); // Poll for new messages every few seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 10); // Small delay to ensure FlatList is rendered
    }
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true }); // Ensure FlatList scrolls to the bottom when messages change
    }
  }, [messages]); // Trigger scrolling whenever the messages array changes

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
          id: generateUniqueId(),
          image: uri,
          type: 'sent',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
  
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });
    closeAttachmentModal ();
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
        id: generateUniqueId(),  // Unique ID for the message
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
    const isSent = item.type === 'sent'; // Check if the message is sent by the user
  
    return (
      <View
        style={[
          styles.messageContainer,
          isSent ? styles.sentMessageContainer : styles.receivedMessageContainer, // Apply alignment styles
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
              isSent ? styles.sentMessageText : styles.receivedMessageText, // Apply text color styles
            ]}
          >
            {item.text}
          </Text>
        )}
        <Text
          style={[
            styles.messageTime,
            isSent ? styles.sentMessageTime : styles.receivedMessageTime, // Apply time alignment styles
          ]}
        >
          {item.time}
        </Text>
      </View>
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
        data={messages} // Messages are already sorted in fetchChatMessages
        renderItem={renderMessage}
        keyExtractor={(item, index) => item.id || `index-${index}`} // Ensure unique keys
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })} // Scroll to the bottom when content changes
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })} // Scroll to the bottom on initial render
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