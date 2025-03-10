import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import { GlobalContext } from './GlobalContext';
import styles from './Preferences.styles';

const Preferences = ({ navigation, route }) => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const { updateUserData } = useContext(GlobalContext);
  const { username } = route.params; // Add this line to get the username from route params

  const preferenceList = [
    { id: '1', title: 'MERN', description: 'It is a long established fact that a reader will be' },
    { id: '2', title: 'MEAN', description: 'It is a long established fact that a reader will be' },
    { id: '3', title: 'LAMP', description: 'It is a long established fact that a reader will be' },
    { id: '4', title: 'Django', description: 'It is a long established fact that a reader will be' },
    { id: '5', title: 'Ruby on Rails', description: 'It is a long established fact that a reader will be' },
    { id: '6', title: 'React Native', description: 'It is a long established fact that a reader will be' },
    { id: '7', title: 'Flutter', description: 'It is a long established fact that a reader will be' },
    { id: '8', title: 'Python Data Stack', description: 'It is a long established fact that a reader will be' },
    { id: '9', title: 'Big Data Stack', description: 'It is a long established fact that a reader will be' },
    { id: '10', title: 'Data Visualization Stack', description: 'It is a long established fact that a reader will be' },
    { id: '11', title: 'AWS', description: 'It is a long established fact that a reader will be' },
    { id: '12', title: 'Microsoft Azure', description: 'It is a long established fact that a reader will be' },
    { id: '13', title: 'Google Cloud', description: 'It is a long established fact that a reader will be' },
    { id: '14', title: 'CI/CD Stack', description: 'It is a long established fact that a reader will be' },
    { id: '15', title: 'Ethereum Stack', description: 'It is a long established fact that a reader will be' },
    { id: '16', title: 'Binance Smart Chain Stack', description: 'It is a long established fact that a reader will be' },
  ];

  const handleSelect = (id) => {
    setSelectedPreferences((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((item) => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleFinish = async () => {
    if (selectedPreferences.length > 0) {
      try {
        const response = await fetch('http://192.168.86.102:8080/api/users/update-preferences', {
          method: 'PUT', // Change method to PUT
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName : username, // Pass username in the body
            preferences: selectedPreferences.map(id => {
              const selected = preferenceList.find(item => item.id === id);
              return selected ? selected.title : null;
            }).filter(title => title !== null),
          }),
        });

        const result = await response.json(); // Parse the response

        if (response.ok) {
          console.log('Preferences saved successfully!', result);
          updateUserData({ preferences: selectedPreferences, username });
          navigation.navigate('BottomTabs', { username });
        } else {
          console.error('Failed to save preferences:', result);
        }
      } catch (error) {
        console.error('Error saving preferences:', error);
      }
    } else {
      console.error('No preferences selected.');
    }
  };

  const renderPreference = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.preferenceContainer,
        selectedPreferences.includes(item.id) && styles.selectedPreference,
      ]}
      onPress={() => handleSelect(item.id)}
    >
      <Text style={styles.preferenceTitle}>{item.title}</Text>
      <Text style={styles.preferenceDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#f5f5f5'} />
      <Text style={styles.title}>Choose your Preference</Text>
      <Text style={styles.subtitle}>Choose your tech preference, show your interest</Text>
      <FlatList
        data={preferenceList}
        renderItem={renderPreference}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        style={styles.list}
      />
      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Preferences;
