import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import styles from './ChatModal.styles';

const ChatModal = ({ visible, onClose, chatData }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
    <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={styles.imageContainer}>
              <Image
                source={chatData.profileImage} // Replace with your image URL
                style={styles.image}
              />
              <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={onClose}>
                  <Ionicons name="chevron-back-outline" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.rightIconsContainer}>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="qr-code-sharp" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="share-social-outline" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.bottomRow}>
                <Text style={styles.bottomText}>{chatData.name}</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Entypo name="edit" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.headerTextContainer}>
              <View style={styles.idSection}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.idText}>Blink ID : 09EJH49KJ</Text>
                  <View style={styles.statusDots}>
                    <View style={[styles.dot, { backgroundColor: '#4689F5' }]} />
                    <View style={[styles.dot, { backgroundColor: '#D94E45' }]} />
                    <View style={[styles.dot, { backgroundColor: '#2D3436' }]} />
                  </View>
                </View>
                <TouchableOpacity>
                  <Feather name="info" size={22} color="black" />
                </TouchableOpacity>
              </View>

              <View style={styles.profileSection}>
                <View>
                  <Text>Nickname</Text>
                  <Text style={styles.nickname}>Mee Kaira</Text>
                </View>
                <TouchableOpacity style={styles.publicKeyButton}>
                  <Text style={styles.publicKeyText}>Show public key</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mediaSectionContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.hiText}>Media Shared</Text>
                </View>
                <ScrollView horizontal={true} style={styles.mediaSection}>
                  <Image source={require('../assets/images/Gallery.jpg')} style={styles.mediaImage} />
                  <Image source={require('../assets/images/Gallery2.jpg')} style={styles.mediaImage} />
                  <Image source={require('../assets/images/Gallery3.jpg')} style={styles.mediaImage} />
                  <Image source={require('../assets/images/Gallery3.jpg')} style={styles.mediaImage} />
                  <TouchableOpacity style={styles.mediaOverlay}>
                    <Text style={styles.moreMediaText}>23+</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              <View style={styles.privacySection}>
                <Text style={styles.privacyHeading}>Privacy</Text>
                <Text style={styles.privacyLabel}>Send read receipts</Text>
                <View style={styles.pickerWrapper}>
                  <Picker style={styles.picker}>
                    <Picker.Item label="Default (Send)" value="send" />
                    <Picker.Item label="Don't Send" value="dontSend" />
                  </Picker>
                </View>

                <Text style={styles.privacyLabel}>Send typing indicator</Text>
                <View style={styles.pickerWrapper}>
                  <Picker style={styles.picker}>
                    <Picker.Item label="Default (Send)" value="send" />
                    <Picker.Item label="Don't Send" value="dontSend" />
                  </Picker>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
    </Modal>
  );
};



export default ChatModal;
