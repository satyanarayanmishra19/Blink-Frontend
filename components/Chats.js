import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Text, Image, StatusBar } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Header from './Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Chats.styles';
import { GlobalContext } from './GlobalContext';

// Sample chat data
const sampleConnections = [];

const Chats = ({ navigation, route }) => {
  const { userData } = useContext(GlobalContext); // Access userData from GlobalContext
  const [searchQuery, setSearchQuery] = useState('');
  const [connections, setConnections] = useState([]);
  const [archivedConnections, setArchivedConnections] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const username = userData.id;

  const sortConnectionsByTime = (connections) => {
    return connections.slice().sort((a, b) => {
      const [hourA, minuteA] = a.time.split(':').map(Number);
      const [hourB, minuteB] = b.time.split(':').map(Number);
      return hourB - hourA || minuteB - minuteA; // Compare hours first, then minutes
    });
  };

  // Fetch connections from the API with search query
  const fetchConnections = async (search = '') => {
    setLoading(true); // Set loading to true before fetching
    try {
      console.log(`Fetching connections for username: ${username} with search query: ${search}`);
      const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
      const response = await fetch(`http://192.168.86.102:8080/api/chats/${username}?search=${search}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Fetched connections:', data);
        setConnections(data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      console.error('Error fetching connections:', err.message);
      setError(err.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery !== '') {
        console.log(`Fetching filtered connections for query: ${searchQuery}`);
        await fetchConnections(searchQuery); // Fetch filtered connections
      } else {
        console.log('Fetching all connections');
        await fetchConnections(); // Fetch all connections
      }
    };

    fetchData();
  }, [searchQuery, username]); // Monitor searchQuery and username changes

  useEffect(() => {
    setConnections(prevConnections => [...prevConnections, ...username]);
  }, [username]);

  useEffect(() => {
    setConnections(sortConnectionsByTime(sampleConnections));
  }, []);

  const filteredConnections = connections.filter(connection => connection.id !== username)
  .filter(connection => connection.name?.toLowerCase().includes(searchQuery.toLowerCase()));

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
    navigation.navigate('MessageScreen', {
      chatData: {
        id: item.id, // Pass the connection ID if needed
        name: item.name, // Pass the recipient's name
        profileImage: item.profileImage, // Pass the profile image if needed
        sender: username, // Pass current user's username as sender
        recipient: item.username,
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
          <Image source={item.profileImage} style={styles.profilePicture} />
          <View style={styles.chatContent}>
            <View style={styles.chatHeader}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.chatTime}>{item.time}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </View>
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
      <StatusBar backgroundColor={'#F9F9F9'} barStyle={'dark-content'} />
      {/* Display loading indicator or error message */}
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/images/Blink.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#3498db' }}>BLINK</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('GroupChats')}>
          {/* <Entypo name="dots-three-vertical" size={24} color="black" /> */}
          <Text style={{ color: '#007aff' }}>GROUP CHATS</Text>
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
          data={filteredConnections}
          renderItem={renderChatItem}
          keyExtractor={item => item.id.toString()} // Ensure keys are unique
        />
      </View>
      {/* <BottomNavigationBar navigation={navigation} /> */}
    </View>
  );
};

// Styles

export default Chats;