import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar, Switch, ScrollView, Platform, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './ArchivedChats.styles';

const ArchivedChats = ({ navigation, route }) => {
  const { archivedChats, setArchivedChats, setConnections  } = route.params; // Get archived chats from navigation params
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const sortedChats = [...archivedChats].sort((a, b) => new Date(b.time) - new Date(a.time)); // Sort by descending time

  const onLongPressChat = (item) => {
    setIsLongPressed(true);
    if (!selectedIds.includes(item.id)) {
      setSelectedIds([...selectedIds, item.id]);
    }
  };

  const onPressChat = (item) => {
    if (isLongPressed) {
      toggleSelectChat(item.id);
    } else {
      // Navigate or perform other action for non-long press
    }
  };

  const toggleSelectChat = (id) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id) ? prevIds.filter((itemId) => itemId !== id) : [...prevIds, id]
    );
  };

  const unarchiveSelectedChats = () => {
    const unarchivedItems = archivedChats.filter(chat => selectedIds.includes(chat.id));
    const remainingArchivedChats = archivedChats.filter(chat => !selectedIds.includes(chat.id));
    
    // Update main chats and archived chats
    setConnections(prevConnections => [...prevConnections, ...unarchivedItems]);
    setArchivedChats(remainingArchivedChats);
    
    // Reset selection state
    setSelectedIds([]);
    setIsLongPressed(false);
    navigation.goBack(); // Go back to the Chats screen after unarchiving
  };


  const renderArchivedChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.archivedChatItem}
      onLongPress={() => onLongPressChat(item)}
      onPress={() => onPressChat(item)}
    >
      <Image source={item.profileImage} style={styles.profilePicture} />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
     <StatusBar barStyle="dark-content" backgroundColor="white" />
     {isLongPressed ? (
        <View style={styles.longPressHeader}>
          <TouchableOpacity onPress={() => setIsLongPressed(false)}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.selectedCount}>{selectedIds.length}</Text>
          <View style={styles.actionIcons}>
            <TouchableOpacity onPress={unarchiveSelectedChats}>
              <MaterialIcons name="unarchive" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Archived Chats</Text>
          <View style={{ width: 24 }} />
        </View>
      )}

      <View style={styles.mainContent}>
        <FlatList
          data={sortedChats}
          renderItem={renderArchivedChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};


export default ArchivedChats;
