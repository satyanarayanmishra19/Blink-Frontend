import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { GlobalContext } from './GlobalContext';
import styles from './BlinkIdScreen.styles';

export default function BlinkIDScreen({ navigation, route }) {
  // const { id } = route.params;
  const { userData } = useContext(GlobalContext);
  const username = userData.id;
  const saveUsernameToBackend = async () => {
    try {
      const response = await fetch('http://192.168.100.195:8080/api/users/save-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }), // Replace id with username
      });
      if (!response.ok) {
        throw new Error('Failed to save username');
        return;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/Blink__Colorful.png')} resizeMode="contain" style={styles.logo} />
      </View>

      {/* Generated ID Section */}
      <View style={styles.idBox}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.infoText}>Your generated Blink ID is </Text>
          {/* <TouchableOpacity>
          <Icon name="info" size={24} color="#0073e6" />
        </TouchableOpacity> */}
        </View>
        <TouchableOpacity style={styles.idContainer}>
          {/* <Text style={styles.idText}>{id}</Text> */}
          <Text style={styles.idText}>{userData.id}</Text>
        </TouchableOpacity>
        <Text style={styles.instructionText}>
          Your friend can reach you through this ID, This ID works similar to a phone number
        </Text>

      </View>

      {/* "Next" Button at Bottom */}
      <TouchableOpacity style={styles.button} onPress={() => { saveUsernameToBackend(); navigation.navigate('SignUp', { username }); }}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}


