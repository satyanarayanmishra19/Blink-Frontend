import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, StatusBar, Dimensions, TextInput, Share, Modal, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './Contacts.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalContext } from './GlobalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../apiConfig'; // Adjust the import path as necessary

const { width, height } = Dimensions.get('window');
const scaleSize = size => (width / 375) * size;

// Helper function to format preferences
const formatPreferences = (preferencesString) => {
  const preferences = preferencesString.split(', ');
  if (preferences.length <= 2) {
    return preferencesString;
  }
  return `${preferences[0]}, ${preferences[1]} +${preferences.length - 2}`;
};

const contactsList = [
];

const Contacts = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [connections, setConnections] = useState([]); // State to store fetched connections
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const { userData, setAcceptedChats } = useContext(GlobalContext); // Add setAcceptedChats to context
  const username = userData?.id; // Assuming username is part of userData

  const fetchConnections = async (search = '') => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/chats/${username}?search=${search}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fetched connections:', data);
      setConnections(data); // Update connections state
    } catch (err) {
      console.error('Error fetching connections:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections(); // Fetch all connections on component mount
  }, [username]);

  const addChatToStorage = async (newChat) => {
    try {
      const storedChats = await AsyncStorage.getItem('chats'); // Load existing chats
      const chats = storedChats ? JSON.parse(storedChats) : [];
      const updatedChats = [...chats, newChat];
      await AsyncStorage.setItem('chats', JSON.stringify(updatedChats)); // Save updated chats
    } catch (error) {
      console.error('Error adding chat to storage:', error);
    }
  };

  const handleContactPress = (item) => {
    const newChat = {
      id: item.id,
      name: item.name,
      profileImage: item.profileImage || 'https://via.placeholder.com/150',
      lastMessage: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      badge: null,
      username: item.username,
    };

    setAcceptedChats((prevChats) => [...prevChats, newChat]); // Update global state
    addChatToStorage(newChat); // Persist the new chat

    navigation.navigate('MessageScreen', {
      chatData: {
        id: item.id,
        name: item.name,
        profileImage: item.profileImage,
        sender: username,
        recipient: item.username,
      },
    });
  };

  const filteredContacts = connections.filter(contact =>
    contact.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleContactPress(item)} // Navigate to MessageScreen on single press
    >
      <View style={styles.contactItem}>
        <Image source={{ uri: item.profileImage || 'https://via.placeholder.com/150' }} style={styles.avatar} />
        <View style={styles.contactInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
        </View>
        <Text style={[styles.phone, { color: 'grey' }]}>
          {item.preferences?.join(', ') || 'No preferences'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/images/Blink.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#3498db' }}>BLINK</Text>
        </View>
      </View>
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

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default Contacts;