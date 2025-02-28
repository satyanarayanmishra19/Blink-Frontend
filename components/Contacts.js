import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, StatusBar, Dimensions, TextInput, Share, Modal, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './Contacts.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalContext } from './GlobalContext';

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
  { id: '100', name: 'Jane Doe', phone: '(603) 555-0123', idCode: 'EBKSJ67SKS', profileImage: require('../assets/images/Avatar3.jpg'), preference: 'MERN' },
  { id: '99', name: 'Jane Doe', phone: '(603) 555-0123', idCode: 'EBKSJ67SKS', profileImage: require('../assets/images/Avatar3.jpg'), preference: 'MEAN' },
  { id: '98', name: 'Leslie Alexander', phone: '(684) 555-0102', idCode: 'EBKSJ67SKS', profileImage: require('../assets/images/Avatar3.jpg'), preference: 'Google Cloud' },
  { id: '97', name: 'Nguyen, Shane', phone: '(702) 555-0122', idCode: 'EBKSJ67SKS', profileImage: require('../assets/images/Avatar3.jpg'), preference: 'AWS' },
  { id: '96', name: 'Bessie', phone: '(229) 555-0109', idCode: 'EBKSJ67SKS', profileImage: require('../assets/images/Avatar3.jpg'), preference: 'MERN, Django, Google Cloud, AWS' },
  { id: '95', name: 'Pasztor Kira', phone: '(239) 555-0108', idCode: 'EBKSJ67SKS', profileImage: require('../assets/images/Avatar3.jpg'), preference: 'MEAN, AWS, MERN' },
  { id: '94', name: 'Cooper Kristin', phone: '(907) 555-0101', idCode: 'EBKSJ67SKS', profileImage: require('../assets/images/Avatar3.jpg'), preference: 'Google Cloud, AWS' },
];

const Contacts = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { acceptedChats, setAcceptedChats } = useContext(GlobalContext);
  const { userData } = useContext(GlobalContext);
  
  // You can replace this with your actual notification count
  const notificationCount = 3;

  // Filter contacts based on the search query
  const filteredContacts = contactsList.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Hi, it's me! Sharing my Blink profile: ${userData.id}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with: ${result.activityType}`);
        } else {
          console.log('Content shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  const handleAccept = () => {
    if (selectedContact) {
      setAcceptedChats(prev => [...prev, selectedContact]);
      setModalVisible(false);
    }
  };

  const handleReject = () => {
    setModalVisible(false);
    setSelectedContact(null);
  };

  const handleContactPress = contact => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleContactPress(item)}>
      <View style={styles.contactItem}>
        <Image source={item.profileImage} style={styles.avatar} />
        <View style={styles.contactInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{item.idCode}</Text>
        </View>
        <Text style={[styles.phone, { color: 'grey' }]}>{formatPreferences(item.preference)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/images/Blink.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#3498db' }}>BLINK</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          {/* <TouchableOpacity style={{ position: 'relative' }}>
            <Feather name="bell" size={24} color="#007aff" />
            {notificationCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity> */}
          <TouchableOpacity style={{flexDirection: 'row', gap: 10, alignItems:'center'}} onPress={handleShare}>
            <Feather name="share-2" size={24} color="#007aff" />
          </TouchableOpacity>
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
      
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.addButton}>
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Send request to {selectedContact?.name}?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleAccept} style={styles.acceptButton}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReject} style={styles.rejectButton}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Contacts;