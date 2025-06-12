import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GlobalContext } from './GlobalContext';
import { BASE_URL } from '../apiConfig'; // Adjust the import path as necessary

const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { updateUserData } = useContext(GlobalContext); // Use updateUserData to update userData
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');
  
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        // Save token to AsyncStorage for authentication persistence
        await AsyncStorage.setItem('token', token);
        // Fetch user details
        const userDetailsResponse = await fetch(`${BASE_URL}/api/users/get-user-details?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('User details response:', userDetailsResponse);

        if (!userDetailsResponse.ok) {
          throw new Error('Failed to fetch user details.');
        }

        const userDetails = await userDetailsResponse.json();

        // Update userData in GlobalContext
        updateUserData({
          name: userDetails.name,
          email: userDetails.email,
          phone: userDetails.phone,
          id: userDetails.username,
          countryCode: '+91'
        });

        navigation.replace('TwoFactorScreen'); // Navigate to the next screen
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5f5f5" />
      <View style={{ paddingVertical: 40 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={styles.title}>Login to Chat</Text>
        </View>
        <Text style={styles.description}>
          Enter your credentials to LogIn
        </Text>
        
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <AntDesign name="mail" size={20} color="#3498db" />
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={20} color="#3498db" />
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#3498db"
            />
          </TouchableOpacity>
        </View>

        {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}

        <View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a3c79',
  },
  description: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 30,
    color: '#606060',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  divider: {
    width: 1,
    height: '90%',
    backgroundColor: '#d3d3d3',
    marginHorizontal: 10,
  },
  button: {
    top: 400,
    width: 300,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign:'center',    
  },
};

export default Login;