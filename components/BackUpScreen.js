import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Button, TouchableOpacity, SafeAreaView, StatusBar, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './BackUpScreen.styles';

const BackupScreen = ({navigation}) => {
  const [isSafeEnabled, setIsSafeEnabled] = useState(true);
  const [isNotificationVisible, setIsNotificationVisible] = useState(true); // New state for notification visibility
  const [activeTab, setActiveTab] = useState('Blink Safe');

  const toggleSafeSwitch = () => setIsSafeEnabled((previousState) => !previousState);
  const toggleNotification = () => setIsNotificationVisible(false); // Function to hide notification

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'}/>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Backups</Text>
        <View style={{ width: 30 }} />
      </View>
      <View style={styles.container}>
        {/* Notification Message */}
        {isNotificationVisible && ( // Conditionally render notification box
          <View style={styles.notificationBox}>
            <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={toggleNotification}>
              <Entypo name="cross" size={24} color="grey" />
            </TouchableOpacity>
            <Text style={styles.notificationText}>
              If you switch or lose your device, nobody can restore your Blink ID or your chats if you don’t have a backup. Please save your data using the appropriate backup options.
            </Text>
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('Blink Safe')}>
            <Text style={[styles.tab, activeTab === 'Blink Safe' && styles.activeTab]}>
              Blink Safe
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Data Backup')}>
            <Text style={[styles.tab, activeTab === 'Data Backup' && styles.activeTab]}>
              Data Backup
            </Text>
          </TouchableOpacity>
        </View>

        {/* Backup Safe Section */}
        <View style={styles.safeSection}>
          <Text style={styles.safeText}>Blink Safe</Text>
          <Switch
            onValueChange={toggleSafeSwitch}
            value={isSafeEnabled}
          />
        </View>

        {activeTab === 'Blink Safe' ? (
          <>
        {/* Server Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { fontWeight: 'bold', marginBottom: 10 }]}>Server name</Text>
            <Text style={[styles.infoValue, { fontWeight: 'bold', marginBottom: 10 }]}>Use default server</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Max backup size</Text>
            <Text style={styles.infoValue}>2.10 MB</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Backup retention</Text>
            <Text style={styles.infoValue}>180 days</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { fontWeight: 'bold', marginBottom: 10, marginTop: 10 }]}>Last backup</Text>
            <Text style={[styles.infoValue, { fontWeight: 'bold', marginBottom: 10, marginTop: 10 }]}>Yesterday, 15:25</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Backup size</Text>
            <Text style={styles.infoValue}>23.44kB</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { marginBottom: 40 }]}>Backup result</Text>
            <Text style={[styles.successText, { marginBottom: 40 }]}>Successful</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.passwordButton}>
            <Text style={styles.passwordButtonText}>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backupButton}>
            <MaterialIcons name="backup" size={24} color="white" />
            <Text style={styles.backupButtonText}>Backup Now</Text>
          </TouchableOpacity>
        </View>
        </>
        ) : (
          // Display "Hi" text for Data Backup tab
          <View style={styles.dataBackupContainer}>
            
              {/* Backup Icon */}
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.icon}>
                <Ionicons name="reload" size={24} color="white"   />
                </TouchableOpacity>
              </View>

              {/* Backup Text */}
              <Text style={styles.title}>Create a data backup to save all your data, including your chat and media.</Text>

              {/* Backup Path */}
              <View style={styles.backupPathContainer}>
                <View style={{flexDirection: 'column', gap: 10}}>
                <Text style={styles.backupPathLabel}>Backup path</Text>
                <Text style={styles.notSetText}>Not set</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>

      {/* Not set text */}
      

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Learn more</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Restore</Text>
        </TouchableOpacity>
      </View>

      {/* Create Data Backup Button */}
      <TouchableOpacity style={styles.dataBackupButton}>
        <Text style={styles.dataBackupButtonText}>+ Create Data Backup</Text>
      </TouchableOpacity>
    </View>
          
        )}
      </View>
    </SafeAreaView>
  );
};


export default BackupScreen;
