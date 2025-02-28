import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar, Switch, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './BlinkWeb.styles';

const BlinkWeb = ({navigation}) => {
  const [toggleValue, setToggleValue] = useState(false);

  const handleToggle = () => {
    setToggleValue(previousValue => !previousValue);
  };


  return (
    <SafeAreaView style={styles.container}>
     <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
     {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Blink Web</Text>
        <TouchableOpacity style={styles.dotsButton}>
          <Icon name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Toggle Row */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>{toggleValue ? 'On' : 'Off'}</Text>
        <Switch 
        style={styles.toggleButton}
        onValueChange={handleToggle}
        value={toggleValue}/>
      </View>

      {toggleValue ? 
      
      <View style={styles.mainContent}>
        <Text style={{fontSize:30, color: '#3498db'}}>Chat from your PC !</Text>
        <Text style={styles.instructionText}>
          The desktop app and the web client allow you to 
          chat from your PC or notebook while giving you full 
          access to all your contacts, media and chats, even 
          past conversations. All communication between 
          phone and PC is fully end-to-end encrypted and 
          uses a direct connection if both phone and PC are 
          on the same network Please note : The desktop 
          app/web client may cause some additional battery 
          drain while it is active . You can enable or disable it 
          at any time        
        </Text>
        <TouchableOpacity>
        <Text style={{color: '#3498db', textDecorationLine: 'underline', paddingVertical: 20}}>
        More information
        </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gotItButton} >
          <Text style={styles.gotItText}>Got it</Text>
        </TouchableOpacity>
      </View>
      :
      <View style={styles.mainContent}>
        <View style={styles.scanningIconContainer}>
          {/* Replace with your actual scanning icon */}
          <Icon name="qr-code" size={60} color="#fff" />
        </View>
        <Text style={styles.instructionText}>
          To Connect, Download the desktop app (https://blink.com/download) or open the web client on your computer, and tap the button to scan the QR code displayed on your computer screen.
        </Text>
        <TouchableOpacity style={styles.startSessionButton} onPress={() => Alert.alert('Starting a new session...')}>
          <MaterialCommunityIcons name="web" size={24} color="#3498db" />
          <Text style={styles.startSessionButtonText}>Start a new session</Text>
        </TouchableOpacity>
      </View>
}
    </SafeAreaView>
  );
};



export default BlinkWeb;
