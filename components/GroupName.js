import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { GlobalContext } from './GlobalContext';

const { width } = Dimensions.get('window');
const scaleSize = size => (width / 375) * size;

const GroupName = ({ navigation, route }) => {
  const { selectedContacts = [] } = route.params || {};

  const { groupName, setGroupName } = useContext(GlobalContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    setGroupName(text);
  };

  const isContinueButtonEnabled = searchQuery.length >= 7;

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

      <Text style={styles.title}>Give a Name to your Group</Text>
        
      <TextInput
        style={styles.searchInput}
        placeholder="Enter group name..."
        value={groupName}
        onChangeText={handleSearchChange}
        autoCapitalize="sentences" // This will capitalize the first letter
        />

      {isContinueButtonEnabled && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            // Implement action for continue button
            navigation.navigate('GroupProfile', { selectedContacts });
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
  },
  title: {
    textAlign: 'left',
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 10,
    color: '#1F6ED4'
  },
  searchInput: {
    fontSize: 16,
    color: '#000',
    // borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginHorizontal: 10, // Add horizontal margin to align with title
    height: 40, // Add specific height instead of using flex: 1
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    marginVertical: 20,
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
    paddingBottom: 10,
    marginTop: scaleSize(25)
  },
  logo: {
    width: 120,
    height: 50,
    marginRight: -30
  },
});

export default GroupName;
