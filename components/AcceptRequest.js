import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, StatusBar, Dimensions, TextInput, Share, Modal, TouchableWithoutFeedback } from 'react-native';
const { width, height } = Dimensions.get('window');
const scaleSize = size => (width / 375) * size;

const AcceptRequest = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/images/Blink.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#3498db' }}>BLINK</Text>
        </View>
      </View>
      
      
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F9F9',
      // paddingVertical:20,
    },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: -80,
    left: -20,
    paddingBottom: 10,
    marginTop: scaleSize(25)
  },
  logo: {
    width: 120,
    height: 50,
    marginRight: -30
  },
});

export default AcceptRequest;