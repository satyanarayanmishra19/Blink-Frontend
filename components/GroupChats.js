import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Text, Image, StatusBar } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
// import BottomNavigationBar from './BottomNavigationBar';
import Header from './Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './GroupChats.styles';
import { GlobalContext } from './GlobalContext';
// Sample chat data
const sampleConnections = [
  { id: '1', name: 'John Doe', lastMessage: 'Hey, how are you?', profileImage: require('../assets/images/Avatar.jpg'), time: '20:25', badge: 12, },
  { id: '2', name: 'Jane Smith', lastMessage: 'See you soon!', profileImage: require('../assets/images/Avatar2.jpg'), time: '18:25', badge: 5, },
  { id: '3', name: 'John Doe', lastMessage: 'Hey, how are you?', profileImage: require('../assets/images/Avatar3.jpg'), time: '15:40', badge: null },
  { id: '4', name: 'John', lastMessage: 'Hey, how are you?', profileImage: require('../assets/images/Avatar4.jpg'), time: '20:00', badge: null },
  { id: '5', name: 'Manish', lastMessage: 'Hey, how are you?', profileImage: require('../assets/images/Default-Image.png'), time: '21:05', badge: 1, },
];

const GroupChats = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { acceptedChats } = useContext(GlobalContext);
  const [connections, setConnections] = useState([]);
  const [archivedConnections, setArchivedConnections] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLongPressed, setIsLongPressed] = useState(false);

  const sortConnectionsByTime = (connections) => {
    return connections.slice().sort((a, b) => {
      const [hourA, minuteA] = a.time.split(':').map(Number);
      const [hourB, minuteB] = b.time.split(':').map(Number);
      return hourB - hourA || minuteB - minuteA; // Compare hours first, then minutes
    });
  };

  useEffect(() => {
    setConnections(prevConnections => [...prevConnections, ...acceptedChats]);
  }, [acceptedChats]);

  useEffect(() => {
    setConnections(sortConnectionsByTime(sampleConnections));
  }, []);

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
    navigation.navigate('MessageScreen', { chatData: item });
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
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
            <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
              {/* <Entypo name="dots-three-vertical" size={24} color="black" /> */}
              <Text style={{color: '#007aff'}}>PERSONAL CHATS</Text>
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

        {/* <FlatList
          data={searchQuery ? filteredConnections : connections}
          renderItem={renderChatItem}
          keyExtractor={item => item.id}
          style={styles.chatContainer}
          showsVerticalScrollIndicator={false}
        /> */}
        <Text style={{textAlign: 'center', color: 'grey'}}>No Group Chats</Text>
      </View>
      {/* <TouchableOpacity style={styles.addButton} onPress={()=> navigation.navigate('GroupSelection')}>
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.addButton} >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
      
    </View>
  );
};

// Styles


export default GroupChats;
