import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './AdvanceOptions.styles';
export default function AdvanceOptions({navigation}) {
  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Blink</Text> */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <TouchableOpacity 
          style={{ position: 'absolute', left: 0 }} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Advance Options</Text>
      </View>
      <View style={styles.section}>
        <SettingItem 
        IconComponent={MaterialCommunityIcons} 
        icon="license" label="Use Blink Push"  navigation={navigation} hasBorder toggle />
        <NetworkStatus label="Reset push token" status="Re-register the device for push notification with FCM/HSM" hasBorder/>

      </View>

      <View style={styles.section}>
        <SettingItem 
        IconComponent={Feather} 
        icon="upload-cloud" label="BackUp Chats" NextScreen="BackupScreen" navigation={navigation}/>
        {/* <SettingItem icon="globe-outline" label="Desktop/Web" /> */}
      </View>

      <View style={styles.section}>
        <SettingItem 
        IconComponent={MaterialIcons} 
        icon="translate" label="Verification Levels" NextScreen="VerificationLevelsScreen" navigation={navigation}/>
        {/* <SettingItem icon="globe-outline" label="Desktop/Web" /> */}
      </View>

      <View style={styles.section}>
        <SettingItem 
        IconComponent={MaterialCommunityIcons} 
        icon="license" label="Log to file"  navigation={navigation} hasBorder toggle/>
        <SettingItem 
        IconComponent={Icon} 
        icon="settings" label="Send Log" NextScreen="AdvanceOptions" navigation={navigation} />
      </View>

      <View style={styles.section}>
        <SettingItem 
        IconComponent={MaterialCommunityIcons} 
        icon="license" label="IPv6 for messages"  navigation={navigation} hasBorder toggle/>
        <SettingItem 
        IconComponent={Icon} 
        icon="settings" label="IPv6 for calls and web" NextScreen="AdvanceOptions" navigation={navigation} toggle />
      </View>

      <View style={styles.footer}>
        <NetworkStatus label="Disable power restrictions" status="Allow blink to run in the background so it can recieve messages even when it s not active" hasBorder/>
        <NetworkStatus label="Unused app settings" status="To prevent that blink gets paused by the system after longer inactivity" />
      </View>


    </ScrollView>
    </SafeAreaView>
  );
}

function SettingItem({ IconComponent,icon, label, status, toggle, hasBorder, NextScreen, navigation }) {
    const [pushToggle, setPushToggle] = useState(false);
  const [loggingToggle, setLoggingToggle] = useState(false);
  const [ipv6MessagesToggle, setIpv6MessagesToggle] = useState(false);
  const [ipv6CallsToggle, setIpv6CallsToggle] = useState(false);

  const handlePushToggle = () => setPushToggle(prev => !prev);
  const handleLoggingToggle = () => setLoggingToggle(prev => !prev);
  const handleIpv6MessagesToggle = () => setIpv6MessagesToggle(prev => !prev);
  const handleIpv6CallsToggle = () => setIpv6CallsToggle(prev => !prev);
    return (
      <TouchableOpacity style={[styles.item, hasBorder && styles.itemBorder]} onPress={() => navigation.navigate(NextScreen)}>
        <View style={styles.iconContainer}>
          <IconComponent name={icon} size={24} color="#777" />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {status && <Text style={styles.status}>{status}</Text>}
          {/* <Icon name="chevron-forward" size={20} color="#777" /> */}
          {toggle && <Switch 
            style={styles.toggleButton}
            onValueChange={handleLoggingToggle}
            value={loggingToggle}/> 
        }
        </View>
        
      </TouchableOpacity>
    );
  }
  

function NetworkStatus({ label, status, hasBorder }) {
  return (
    <View style={[styles.networkItem, hasBorder && styles.itemBorder]}>
      <Text style={styles.networkLabel}>{label}</Text>
      <Text style={styles.networkStatus}>{status}</Text>
    </View>
  );
}

