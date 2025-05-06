import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Text, Image, StatusBar } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
// import BottomNavigationBar from './BottomNavigationBar';
import Header from './Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Chats.styles';
import { GlobalContext } from './GlobalContext';
// Sample chat data
const sampleConnections = [
];

const Chats = ({ navigation }) => {
  const { userData } = useContext(GlobalContext);
  const [searchQuery, setSearchQuery] = useState('');
  const { acceptedChats } = useContext(GlobalContext);
  const [connections, setConnections] = useState([]);
  const [archivedConnections, setArchivedConnections] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLongPressed, setIsLongPressed] = useState(false);
  const username = userData.id;

  const saveChatsToStorage = async (chats) => {
    try {
      await AsyncStorage.setItem('chats', JSON.stringify(chats)); // Save chats to AsyncStorage
    } catch (error) {
      console.error('Error saving chats to storage:', error);
    }
  };

  const loadChatsFromStorage = async () => {
    try {
      const storedChats = await AsyncStorage.getItem('chats'); // Load chats from AsyncStorage
      if (storedChats) {
        setConnections(JSON.parse(storedChats)); // Update state with stored chats
      }
    } catch (error) {
      console.error('Error loading chats from storage:', error);
    }
  };

  const sortConnectionsByTime = (connections) => {
    return connections.slice().sort((a, b) => {
      const [hourA, minuteA] = a.time.split(':').map(Number);
      const [hourB, minuteB] = b.time.split(':').map(Number);
      return hourB - hourA || minuteB - minuteA; // Compare hours first, then minutes
    });
  };

  useEffect(() => {
    loadChatsFromStorage(); // Load chats when the component mounts
  }, []);

  useEffect(() => {
    setConnections(prevConnections => [...prevConnections, ...acceptedChats]);
  }, [acceptedChats]);

  useEffect(() => {
    setConnections(sortConnectionsByTime(sampleConnections));
  }, []);

  useEffect(() => {
    // Update connections when acceptedChats changes, ensuring no duplicates
    setConnections((prevConnections) => {
      const connectionMap = new Map(); // Use a Map to ensure unique entries by ID

      // Add existing connections to the Map
      prevConnections.forEach((connection) => {
        connectionMap.set(connection.id, connection);
      });

      // Add new acceptedChats to the Map
      acceptedChats.forEach((chat) => {
        if (!connectionMap.has(chat.id)) {
          connectionMap.set(chat.id, chat);
        }
      });

      // Convert the Map back to an array and sort by time
      return sortConnectionsByTime(Array.from(connectionMap.values()));
    });
  }, [acceptedChats]);

  useEffect(() => {
    saveChatsToStorage(connections); // Save chats whenever they change
  }, [connections]);

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const archiveChat = (itemId) => {
    const newConnections = connections.filter(connection => connection.id !== itemId);
    const selectedChat = connections.find(connection => connection.id === itemId);
    
    // Update the archived chats state
    if (selectedChat) {
      setArchivedConnections(prevArchivedConnections => [...prevArchivedConnections, selectedChat]);
    }
    
    // Update the connections state
    setConnections(sortConnectionsByTime(newConnections));
  };

  const deleteChat = (itemId) => {
    setConnections(prevConnections => prevConnections.filter(connection => connection.id !== itemId));
  };

  const handleChatPress = (item) => {
    setConnections(prevConnections =>
      prevConnections.map(connection =>
        connection.id === item.id ? { ...connection, badge: null } : connection
      )
    );
    // Ensure all necessary properties are passed to MessageScreen
    navigation.navigate('MessageScreen', {
      chatData: {
        id: item.id, // Unique chat ID
        name: item.name, // Chat name
        profileImage: item.profileImage || 'https://via.placeholder.com/150', // Fallback profile image
        sender: username, // Current user's username
        recipient: item.username, // Recipient's username
      },
    });
  };

  const renderChatItem = ({ item }) => {
    const renderRightActions = () => (
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity onPress={() => archiveChat(item.id)} style={styles.archiveButton}>
          <Foundation name="archive" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteChat(item.id)} style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreOptionsButton}>
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity
          style={[styles.chatItem, { backgroundColor: selectedIds.includes(item.id) ? '#ADD8E6' : '#F9F9F9' }]}
          onPress={() => handleChatPress(item)}
        >
          <Image source={{ uri: item.profileImage }} style={styles.profilePicture} />
          <View style={styles.chatContent}>
            <View style={styles.chatHeader}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.chatTime}>{item.time}</Text>
            </View>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            {item.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const renderArchivedSection = () => (
    <TouchableOpacity style={styles.archiveSection} onPress={() => navigation.navigate('ArchivedChats', { archivedChats: archivedConnections, setArchivedChats: setArchivedConnections, setConnections: setConnections })}>
      <Foundation name="archive" size={20} color="black" />
      <Text style={styles.archiveText}>Archived ({archivedConnections.length})</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    <StatusBar backgroundColor={'#F9F9F9'} barStyle={'dark-content'}/>
    <View style={styles.header}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../assets/images/Blink.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#3498db' }}>BLINK</Text>
        </View>
            <TouchableOpacity onPress={() => navigation.navigate('GroupChats')}>
              {/* <Entypo name="dots-three-vertical" size={24} color="black" /> */}
              <Text style={{color: '#007aff'}}>GROUP CHATS</Text>
            </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.searchContainer}>
            <TouchableOpacity>
            <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {archivedConnections.length > 0 && renderArchivedSection()}

        <FlatList
          data={searchQuery ? filteredConnections : connections}
          renderItem={renderChatItem}
          keyExtractor={(item, index) => `${item.id}-${index}`} // Use a combination of id and index for unique keys
          style={styles.chatContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* <BottomNavigationBar navigation={navigation} /> */}
    </View>
  );
};

// Styles


export default Chats;