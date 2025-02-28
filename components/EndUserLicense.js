import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar, Switch, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons
import styles from './Licenses.styles';

const EndUserLicense = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#fff'}/>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>End-User License Agreement</Text>
        <View style={{ width: 24 }} />
      </View>


    
      <View style={styles.mainContent}>
      <Text style={styles.title}>End-User License Agreement</Text>
      <Text style={styles.text}>
        This product contains artwork and code from the following rights holders.
      </Text>
        <View style={styles.divider}></View>
      <View style={styles.section}>
        <Text style={styles.subTitle}>Android Fast Scroll</Text>
        <Text style={styles.text}>Android Gesture Detectors Framework</Text>
        <Text style={styles.text}>Copyrights © 2022. Almer Thie</Text>
        <Text style={styles.text}>All rights reserved</Text>

        <Text style={styles.text}>
          Redistribution and use in source and binary forms, with or without modification, 
          are permitted provided that the following conditions are met.
        </Text>

        <Text style={styles.paragraphText}>
          1. Redistribution of source code must retain the above copyright notice, the list 
          of conditions and the following disclaimer.
        </Text>
        <Text style={styles.paragraphText}>
          2. Redistribution in binary form must reproduce the above copyright notice, this 
          list of conditions and the following disclaimer in the documentation and/or other 
          material provided with the distribution.
        </Text>

        <Text style={styles.disclaimerTitle}>
          THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER AND CONTRIBUTORS "AS IS" AND ANY 
          EXPRESS OR IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR 
          PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE 
          LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
          DAMAGES (INCLUDING BUT NOT LIMITED TO PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
          LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY 
          THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
          NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF 
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        </Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.section}>
        <Text style={styles.subTitle}>Android Image Cropper</Text>
      </View>
      </View>
      
    </SafeAreaView>
  );
};



export default EndUserLicense;
