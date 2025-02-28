import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './SettingsContents.styles';

// import BottomNavigationBar from './BottomNavigationBar';

export default function Settings({ navigation }) {
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
     <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

    <View style={{paddingHorizontal: 20,}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={{ width: 20 }} />
      </View>
      
      <View style={styles.section}>
        <SettingItem 
        IconComponent={MaterialIcons} 
        icon="privacy-tip" label="Privacy" smallLabel="Chats, Contacts, List" NextScreen="PrivacySettings" navigation={navigation} />
        <SettingItem 
        IconComponent={MaterialIcons} 
        icon="security" label="Security" smallLabel="Access protection, Encryption of locally stored data" NextScreen="Security" navigation={navigation}/>
        <SettingItem 
        IconComponent={Ionicons} 
        icon="color-palette-outline" label="Appearance" smallLabel="Design theme, Emoji style, Language, Font Size, Contact List"NextScreen="Appearance" navigation={navigation} />
        <SettingItem 
        IconComponent={AntDesign} 
        icon="sound" label="Sound and Notification" smallLabel="Ringtones, Vibrate, Notification light" NextScreen="Sound" navigation={navigation}/>
        <SettingItem 
        IconComponent={Ionicons} 
        icon="chatbubble-ellipses-outline" label="Chat" smallLabel="Keyboard, Media" NextScreen="ChatsSettings" navigation={navigation}/>
        <SettingItem 
        IconComponent={MaterialIcons} 
        icon="perm-media" label="Media & Storage" smallLabel="Image dimensions, Automatically download media, clean up media files and messages"  NextScreen="MediaSettings" navigation={navigation}/>
        <SettingItem 
        IconComponent={AntDesign} 
        icon="videocamera" label="Secure Calls" smallLabel="Blink Calls, Video Calls, Group Calls" NextScreen="SecureCalls" navigation={navigation}/>
        <SettingItem 
        IconComponent={Entypo} 
        icon="star-outlined" label="Rate Blink" smallLabel="Rate our app, if you like using it" />
        <SettingItem 
        IconComponent={Feather} 
        icon="info" label="About Blink" NextScreen="AboutBlink" navigation={navigation}/>
        <SettingItem 
        IconComponent={Ionicons} 
        icon="log-out-outline" label="Log Out" NextScreen="Login" navigation={navigation}/>
        {/* <SettingItem 
        IconComponent={AntDesign} 
        icon="deleteuser" label="Delete Account" NextScreen="DeleteAccountScreen" navigation={navigation}/> */}
      </View>

      
      </View>
      {/* <BottomNavigationBar navigation={navigation} /> */}
    </ScrollView>
  );
}

function SettingItem({ IconComponent, icon, label, status, smallLabel, NextScreen, navigation }) {
  return (
    <TouchableOpacity style={[styles.item,{paddingVertical: 15,}]} onPress={() => NextScreen && navigation.navigate(NextScreen)}>
      <View style={styles.iconContainer}>
        <IconComponent name={icon} size={24} color="#777" />
      </View>
      <View style={[styles.labelContainer, !smallLabel && { justifyContent: 'center' }]}>
        <Text style={styles.label}>{label}</Text>
        {smallLabel && <Text style={styles.smallLabel}>{smallLabel}</Text>}
      </View>
      <Icon name="chevron-forward" size={20} color="#777" />
    </TouchableOpacity>
  );
}



