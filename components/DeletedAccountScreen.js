import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { GlobalContext } from './GlobalContext';

const DeleteAccountScreen = ({ isVisible, onClose }) => {
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [blinkId, setBlinkId] = useState('');
  const [isSuccessPopupVisible, setSuccessPopupVisible] = useState(false);
  const { userData } = useContext(GlobalContext);
  const id = userData.id;

  const toggleConfirmModal = () => setConfirmModalVisible(!isConfirmModalVisible);

  const handleDeleteAccount = () => {
    if (blinkId === id) {
      setSuccessPopupVisible(true);
      setTimeout(() => {
        setSuccessPopupVisible(false);
        toggleConfirmModal();
        onClose(); // Close the delete modal
      }, 3000);
    } else {
      alert('Blink ID does not match. Please try again.');
    }
  };

  const handleCancelAccount = () => {
    toggleConfirmModal();
    onClose();
  };

  return (
    <View>
      {/* Delete Account Confirmation Modal */}
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={styles.modal}>
          <Text>Are you sure you want to delete your account?</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.yesButton} onPress={toggleConfirmModal}>
              <Text style={styles.redText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noButton} onPress={onClose}>
              <Text style={styles.blueText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Blink ID Confirmation Modal */}
      <Modal
        isVisible={isConfirmModalVisible}
        onBackdropPress={toggleConfirmModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={styles.modal}>
          <Text>
            Type <Text style={styles.boldText}>{id}</Text>, Please confirm your Blink ID
          </Text>
          <TextInput
            value={blinkId}
            onChangeText={setBlinkId}
            placeholder="Enter your Blink ID"
            style={styles.input}
          />
          <View style={styles.buttonRow2}>
            <TouchableOpacity style={styles.yesButton} onPress={handleDeleteAccount}>
              <Text style={styles.redText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noButton} onPress={handleCancelAccount}>
              <Text style={styles.blueText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Popup */}
      <Modal isVisible={isSuccessPopupVisible} animationIn="fadeIn" animationOut="fadeOut">
        <View style={styles.successPopup}>
          <Text style={styles.successText}>Account deleted successfully!</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: { backgroundColor: '#e0f0ff', padding: 25, borderRadius: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, paddingTop: 20 },
  buttonRow2: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  yesButton: { borderRadius: 20, borderColor: 'grey', borderWidth: 1, paddingHorizontal: 15, paddingVertical: 5, backgroundColor: 'white' },
  noButton: { borderRadius: 20, borderColor: 'grey', borderWidth: 1, paddingHorizontal: 15, paddingVertical: 5, backgroundColor: 'white' },
  redText: { color: 'red', fontWeight: 'bold' },
  blueText: { color: '#007aff', fontWeight: 'bold' },
  boldText: { color: '#007aff',fontWeight: 'bold' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10, marginTop: 10 },
  successPopup: { backgroundColor: '#4CAF50', padding: 20, borderRadius: 10, alignItems: 'center' },
  successText: { color: 'white', fontWeight: 'bold' },
});

export default DeleteAccountScreen;
