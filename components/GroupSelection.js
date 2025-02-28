import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SectionList, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, Dimensions, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';      // For FontAwesome icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo'; 

const { width, height } = Dimensions.get('window');
const scaleSize = size => (width / 375) * size;

const GroupSelection = ({ navigation }) => {
  const [sections, setSections] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSections, setFilteredSections] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const chatData = [
    {
      id: '1',
      name: 'Jane Doe',
      message: 'Physiological respiration involves the...',
      time: '12:03 AM',
      status: 'online',
      badge: 12,
      image: require('../assets/images/Avatar.jpg'),
      role: 'Admin',
    },
    {
      id: '2',
      name: 'Annette Black',
      message: 'Hey! I\'m using Blink',
      time: '08:34 AM',
      status: 'online',
      badge: null,
      image: require('../assets/images/Avatar2.jpg'),
      role: '',
    },
    {
      id: '3',
      name: 'Leslie Alexander',
      message: 'Can you please come to tomorrow’s...',
      time: '08:34 AM',
      status: 'online',
      badge: null,
      image: require('../assets/images/Avatar3.jpg'),
      role: '',
    },
    {
      id: '4',
      name: 'Jerome Bell',
      message: "Sorry I won't be available tomorrow.",
      time: 'Yesterday',
      status: 'offline',
      badge: null,
      image: require('../assets/images/Default-Image.png'),
      role: 'Admin',
    },
    {
      id: '5',
      name: 'Devon Lane',
      message: "Hey, what's the update on that project?",
      time: 'Yesterday',
      status: 'offline',
      badge: 5,
      image: require('../assets/images/Avatar4.jpg'),
      role: 'Admin',
    },
    {
      id: '6',
      name: 'Cody Fisher',
      message: 'Can you please come to tomorrow’s...',
      time: 'Yesterday',
      status: 'error',
      badge: null,
      image: require('../assets/images/Avatar4.jpg'),
      role: '',
    },
  ];

  useEffect(() => {
    const groupedData = chatData.reduce((acc, chat) => {
      const firstLetter = chat.name.charAt(0).toUpperCase();
      const section = acc.find((item) => item.title === firstLetter);

      if (section) {
        section.data.push(chat);
      } else {
        acc.push({ title: firstLetter, data: [chat] });
      }
      return acc;
    }, []);

    const sortedSections = groupedData
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((section) => ({
        ...section,
        data: section.data.sort((a, b) => a.name.localeCompare(b.name)),
      }));

    setSections(sortedSections);
    setFilteredSections(sortedSections);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredSections(sections);
    } else {
      const filtered = sections
        .map((section) => ({
          title: section.title,
          data: section.data.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          ),
        }))
        .filter((section) => section.data.length > 0);

      setFilteredSections(filtered);
    }
  };

  const handleSelect = (item, isLongPress = false) => {
    const newSelectedItems = new Set(selectedItems);
  
    if (selectedItems.size === 0 && isLongPress) {
      newSelectedItems.add(item.id);
    } else if (selectedItems.size > 0) {
      if (newSelectedItems.has(item.id)) {
        newSelectedItems.delete(item.id);
      } else {
        newSelectedItems.add(item.id);
      }
    }
  
    setSelectedItems(newSelectedItems);
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleSelect(item, true)}  // Long press for first selection
      onPress={() => handleSelect(item)}           // On press for subsequent selections
      style={[
        styles.chatItem,
        selectedItems.has(item.id) && styles.selectedItem,
      ]}
    >
      <View style={styles.profileImage}>
        <Image source={item.image} style={styles.image} />
        {item.status === 'online' && <View style={styles.onlineDot} />}
        {item.status === 'error' && <View style={styles.errorDot} />}
      </View>
      <View style={styles.chatDetails}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
        </View>
        <View style={styles.chatMessage}>
          <Text
            style={[
              styles.messageText,
              item.message === 'typing...' && styles.typingStyle,
            ]}
            numberOfLines={1}
          >
            {item.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
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
            {/* <TouchableOpacity onPress={() => navigation.navigate('GroupSelection')}>
              <Text style={{color: '#007aff'}}>GROUP CHATS</Text>
            </TouchableOpacity> */}
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <View style={styles.searchContainer}>
          <TouchableOpacity >
            <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search members..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <Text style={styles.title}>Select Members to Add in Group</Text>

      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        renderSectionHeader={renderSectionHeader}
      />
      {selectedItems.size > 0 && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            const selectedContacts = chatData.filter((item) =>
              selectedItems.has(item.id)
            );
            navigation.navigate('GroupName', { selectedContacts });
          }}

        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <FontAwesome5 name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    // paddingVertical: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 30,
    paddingHorizontal: 10,
    // paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  title: {
    textAlign: 'left',
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 10,
    color: '#1F6ED4'
  },
  sectionHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    // borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#D8E8FF',
    borderRadius: 10,
  },
  profileImage: {
    position: 'relative',
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00ff00',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  errorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  chatDetails: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatTime: {
    fontSize: 12,
    color: '#888',
  },
  chatMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 14,
    color: '#555',
  },
  typingStyle: {
    fontStyle: 'italic',
    color: '#888',
  },
  badge: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
  },
  continueButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1F6ED4',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: -80,
    left: -20,
    paddingBottom: 10,
    marginTop: scaleSize(25)
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  logo: {
    width: 120,
    height: 50,
    marginRight: -30
  },
});

export default GroupSelection;
