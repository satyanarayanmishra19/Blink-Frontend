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
import { connect, sendMessage, subscribeToPublicTopic, addUser } from './Stomp';
import styles from './MessageScreen.styles';

const { width, height } = Dimensions.get('window');

// Dummy Data for conversation
const messagesData = [
  {
    id: '1',
    text: 'Hello, how are you?',
    time: '8:24 AM',
    type: 'received',
  },
  {
    id: '2',
    text: 'I am good man... You?',
    time: '8:24 AM',
    type: 'sent',
  },
  {
    id: '3',
    text: 'I\'m doing well, thank you for asking! How can I help you today?',
    time: '8:24 AM',
    type: 'received',
  },
  {
    id: '4',
    text: 'Can you send me 12,000 rupees now, I need to purchase a shoe',
    time: '8:24 AM',
    type: 'sent',
  },
  {
    id: '5',
    text: 'Cool I\'m sending now 😎',
    time: '8:25 AM',
    type: 'received',
  },
  {
    id: '6',
    text: 'Nice fit dude... 😎',
    time: '8:26 AM',
    type: 'received',
    image: 'https://images.pexels.com/photos/1387022/pexels-photo-1387022.jpeg?cs=srgb&dl=book-aesthetic-books-old-books-open-books-1387022.jpg&fm=jpg',
  },
  {
    id: '7',
    // text: 'Nice fit dude... 😎',
    time: '8:26 AM',
    type: 'sent',
    image: require('../assets/images/Avatar4.jpg'),
  },
];

const MessageScreen = ({ route, navigation }) => {
  const { chatData } = route.params;
  const [messages, setMessages] = useState(messagesData);
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [starredMessages, setStarredMessages] = useState({});
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const { incrementReward } = useContext(RewardContext);
  const isConnected = useRef(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const flatListRef = useRef(null);

  const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (!chatData.sender || !chatData.recipient) {
      console.warn("Chat data is incomplete, skipping WebSocket connection.");
      return;
    }

    const onConnected = () => {
      console.log("✅ STOMP Connected!");
      isConnected.current = true;
      console.log('isConnected.current:', isConnected.current);

      subscribeToPublicTopic((message) => {
        try {
          const receivedMessage = JSON.parse(message.body);
          receivedMessage.type = "received";
          receivedMessage.sender = chatData.recipient; // Ensuring correct sender

          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, receivedMessage];

            // Remove duplicates based on `id`
            const uniqueMessages = Array.from(
              new Map(updatedMessages.map((msg) => [msg.id, msg])).values()
            );

            return uniqueMessages;
          });
        } catch (error) {
          console.error("Error parsing private message:", error);
        }
      });

      addUser(chatData.sender);
    };

    const onError = (error) => {
      console.error("WebSocket error: ", error);
      isConnected.current = false;
      console.log('isConnected.current:', isConnected.current);
    };

    connect(chatData.sender, onConnected, onError);

    return () => {
      if (isConnected.current) {
        isConnected.current = false;
      }
    };
  }, [chatData.sender, chatData.recipient, setMessages]);

  const handleSend = () => {
    console.log('Text:', text);
    console.log('Recipient:', chatData.recipient);
    console.log('Is Connected:', isConnected.current);

    if (text && chatData.recipient && isConnected.current) {
      const newMessage = {
        id: generateUniqueId(),
        sender: chatData.sender, // Ensure sender is set correctly
        recipient: chatData.recipient, // Ensure recipient is set correctly
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'sent',
      };

      console.log("Sending message:", newMessage);

      sendMessage(text, chatData.sender);

      setMessages(prevMessages => [...prevMessages, newMessage]);
      setText('');
    } else {
      console.error('Cannot send message: Username, text is missing, or not connected');
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 10); // Small delay to ensure FlatList is rendered
    }
  }, []);

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
    const isStarred = starredMessages[item.id];

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
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
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