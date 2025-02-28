import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './AboutBlinkIOS.styles';

export default function AboutBlinkIOS({navigation}) {
  return (
    <SafeAreaView>
    <StatusBar barStyle={'dark-content'} backgroundColor='#F9F9F9' />
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Blink</Text> */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <TouchableOpacity 
          style={{ position: 'absolute', left: 0 }} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>About Blink</Text>
      </View>

      <View style={styles.section}>
        <SettingItem 
        IconComponent={MaterialCommunityIcons} 
        icon="license" label="Licenses" NextScreen="License" navigation={navigation} hasBorder />
        <SettingItem 
        IconComponent={MaterialIcons} 
        icon="privacy-tip" label="Privacy Policy" NextScreen="PrivacyPolicy" navigation={navigation} hasBorder/>
        <SettingItem 
        IconComponent={Icon} 
        icon="notifications-outline" label="Terms of services" NextScreen="TnS" navigation={navigation} hasBorder/>
        <SettingItem 
        IconComponent={MaterialCommunityIcons} 
        icon="license" label="End-User License Agreement" NextScreen="EndUserLicense" navigation={navigation} />
      </View>

      <View style={styles.section}>
        <SettingItem 
        IconComponent={Feather} 
        icon="help-circle" label="Help" NextScreen="Help" navigation={navigation}/>
      </View>

      <View style={styles.section}>
        <SettingItem 
        IconComponent={MaterialIcons} 
        icon="translate" label="Translators" navigation={navigation}/>
      </View>

      <View style={styles.section}>
        <SettingItem 
        IconComponent={Icon} 
        icon="settings" label="Advanced Options" NextScreen="AdvanceOptionIOS" navigation={navigation} />
      </View>

      <View style={styles.footer}>
        <NetworkStatus label="Version 5.5 Build 3000996 Google Play" status="Copyright 2013-2024 Blink GmbH" hasBorder/>
        <NetworkStatus label="Nothing A063" status="Nothing/Spacewar/Spacewar:14/UP1A.453445.435/45435345:user/release-key" />
      </View>


    </ScrollView>
    </SafeAreaView>
  );
}

function SettingItem({ IconComponent, icon, label, status, hasBorder, NextScreen, navigation }) {
    return (
      <TouchableOpacity style={[styles.item, hasBorder && styles.itemBorder]} onPress={() => navigation.navigate(NextScreen)}>
        <View style={styles.iconContainer}>
          <IconComponent name={icon} size={24} color="#fff" />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {status && <Text style={styles.status}>{status}</Text>}
          <Icon name="chevron-forward" size={20} color="#777" />
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


