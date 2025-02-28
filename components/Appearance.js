import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Switch } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './SettingsContents.styles';

export default function Appearance({ navigation }) {
  const [dynamicColors, setDynamicColors] = useState(false);
  const [biggerEmojis, setBiggerEmojis] = useState(false);
  const [defaultContactPicture, setDefaultContactPicture] = useState(false);
  const [showProfilePicture, setShowProfilePicture] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={{ width: 30 }} />
        </View>
        <Text style={styles.subSectionTitle}>Appearance</Text>
        <View style={styles.section}>
          <SettingItem 
          IconComponent={MaterialIcons} 
          icon="sync" label="Design Theme" smallLabel="System Default" showIcon />
          <SettingItem label="Dynamic Colours" smallLabel="Use system colors" showSwitch switchValue={dynamicColors} onSwitchToggle={() => setDynamicColors(prev => !prev)} />
          <SettingItem 
          IconComponent={Entypo} 
          icon="language" label="Language" smallLabel="Default Settings" showIcon />
          <SettingItem 
          IconComponent={Entypo} 
          icon="emoji-happy" label="Emoji Style" smallLabel="Blink Emoji(Default)" showIcon />
          <SettingItem label="Bigger single emojis" showSwitch switchValue={biggerEmojis} onSwitchToggle={() => setBiggerEmojis(prev => !prev)} />
          <SettingItem label="Default contact picture" smallLabel="Display multi-color placeholder if contact picture is missing" showSwitch switchValue={defaultContactPicture} onSwitchToggle={() => setDefaultContactPicture(prev => !prev)} />
          <SettingItem 
          IconComponent={Entypo} 
          icon="user" label="Show profile picture" smallLabel="Show profile picture provided by your contacts" showIcon showSwitch switchValue={showProfilePicture} onSwitchToggle={() => setShowProfilePicture(prev => !prev)} />
          <SettingItem 
          IconComponent={Entypo} 
          icon="user" label="Badge" smallLabel="Show badges in bottom navigation tabs" showIcon showSwitch switchValue={showBadge} onSwitchToggle={() => setShowBadge(prev => !prev)} />
        </View>

        <Text style={styles.subSectionTitle}>Chats</Text>
        <View style={styles.section}>
          <SettingItem 
          IconComponent={MaterialIcons} 
          icon="wallpaper" showIcon label="Wallpaper" />
          <SettingItem 
          IconComponent={MaterialIcons} 
          icon="font-download" showIcon label="Font Size" smallLabel="Regular" />
        </View>

        <Text style={styles.subSectionTitle}>Contact List</Text>
        <View style={styles.section}>
          <SettingItem 
          IconComponent={FontAwesome} 
          icon="sort" showIcon label="Sorting" smallLabel="Last-Name - First-Name" />
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
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: smallLabel ? 'flex-start' : 'center' }}>
        <Text style={styles.label}>{label}</Text>
        {smallLabel && <Text>{smallLabel}</Text>}
      </View>
      {showSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchToggle}
        />
      )}
    </TouchableOpacity>
  );
}

