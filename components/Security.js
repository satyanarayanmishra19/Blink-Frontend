import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Switch } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './SettingsContents.styles';

export default function Security({ navigation }) {
  const [lockingMechanism, setLockingMechanism] = useState(false);
  const [newMessageNotifications, setNewMessageNotifications] = useState(false);
  const [passphrase, setPassphrase] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      <View style={{ paddingHorizontal: 20 }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Security</Text>
        <View style={{ width: 30 }} />
        </View>
        <Text style={styles.subSectionTitle}>Access Protection</Text>
        <View style={styles.section}>
          <SettingItem 
            IconComponent={MaterialIcons} 
            icon="sync" 
            label="Locking Mechanism" 
            smallLabel="None" 
            showIcon 
            showSwitch 
            switchValue={lockingMechanism} 
            onSwitchToggle={() => setLockingMechanism(prev => !prev)} 
          />
          <SettingItem label="Set a PIN" smallLabel="Set a PIN" />
          <SettingItem label="App Lock" smallLabel="Lock access to the UI" />
          <SettingItem label="Time to lock" smallLabel="Never(Manual)" />
        </View>

        <Text style={styles.subSectionTitle}>Encryption of locally stored data</Text>
        <View style={styles.section}>
          <SettingItem 
            IconComponent={MaterialIcons} 
            icon="sync" 
            label="Passphrase" 
            smallLabel="Require a passphrase to unlock local encryption" 
            showIcon 
            showSwitch 
            switchValue={passphrase} 
            onSwitchToggle={() => setPassphrase(prev => !prev)} 
          />
          <SettingItem label="Change Passphrase" smallLabel="No passphrase set" />
          <SettingItem 
            label="New message notifications" 
            smallLabel="New messages trigger a generic notification when the master key is locked" 
            showSwitch 
            switchValue={newMessageNotifications} 
            onSwitchToggle={() => setNewMessageNotifications(prev => !prev)} 
          />
        </View>
      </View>
    </ScrollView>
  );
}

function SettingItem({ IconComponent, icon, label, smallLabel, showIcon, showSwitch, switchValue, onSwitchToggle }) {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.iconContainer}>
        {showIcon && <IconComponent name={icon} size={24} color="#777" />}
      </View>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Text style={styles.label}>{label}</Text>
        <Text>{smallLabel}</Text>
      </View>
      {showSwitch && 
        <Switch
          value={switchValue}
          onValueChange={onSwitchToggle}
        />
      }
    </TouchableOpacity>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F9F9F9',
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     // marginVertical: 10,
//   },
//   sectionTitle: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     // marginVertical: 15,
//   },
//   subSectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 10,
//   },
//   section: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginVertical: 10,
//     paddingVertical: 5,
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     paddingVertical: 10,
//     gap: 10,
//   },
//   iconContainer: {
//     width: 30,
//     alignItems: 'center',
//   },
//   label: {
//     fontSize: 16,
//   },
// });
