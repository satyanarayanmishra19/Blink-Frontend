import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Switch } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './SettingsContents.styles'; 

export default function ChatsSettings({ navigation }) {
  const [enterToSend, setEnterToSend] = useState(false);
  const [enterToSendMedia, setEnterToSendMedia] = useState(false);
  const [useProximitySensor, setUseProximitySensor] = useState(false);
  const [mediaQuickSelect, setMediaQuickSelect] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      <View style={{ paddingHorizontal: 20 }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Chats</Text>
          <View style={{ width: 30 }} />
        </View>
        
        <Text style={styles.subSectionTitle}>Keyboard</Text>
        <View style={styles.section}>
          <SettingItem 
            IconComponent={MaterialCommunityIcons} 
            icon="vibrate" 
            showIcon 
            label="Enter to Send" 
            smallLabel="Enter Key Adds a New Line" 
            showSwitch 
            switchValue={enterToSend} 
            onSwitchToggle={() => setEnterToSend(prev => !prev)} 
          />
        </View>

        <Text style={styles.subSectionTitle}>Media</Text>
        <View style={styles.section}>
          <SettingItem 
            IconComponent={MaterialCommunityIcons} 
            icon="vibrate" 
            showIcon 
            label="Enter to Send" 
            showSwitch 
            switchValue={enterToSendMedia} 
            onSwitchToggle={() => setEnterToSendMedia(prev => !prev)} 
          />
          <SettingItem 
            label="Use Proximity Sensor" 
            smallLabel="Use earpiece for voice message playback if proximity sensor is covered" 
            showSwitch 
            switchValue={useProximitySensor} 
            onSwitchToggle={() => setUseProximitySensor(prev => !prev)} 
          />
          <SettingItem 
            IconComponent={MaterialCommunityIcons} 
            icon="vibrate" 
            showIcon 
            label="Media Quick Select" 
            smallLabel="Display a list of recently added images in the attachments popup"  
            showSwitch 
            switchValue={mediaQuickSelect} 
            onSwitchToggle={() => setMediaQuickSelect(prev => !prev)} 
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
      <View style={[styles.labelContainer, !smallLabel && { justifyContent: 'center' }]}>
        <Text style={styles.label}>{label}</Text>
        {smallLabel && <Text style={styles.smallLabel}>{smallLabel}</Text>}
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



