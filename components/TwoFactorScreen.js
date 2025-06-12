import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Modal, Alert } from 'react-native';
import { GlobalContext } from './GlobalContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '../apiConfig'; // Adjust the import path as necessary

const TwoFA = ({ navigation }) => {
  const { userData, updateUserData } = useContext(GlobalContext);
  const username = userData?.id;
  const email = userData?.email;
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Send OTP on mount
  useEffect(() => {
    sendTwoFactorOtp();
  }, []);

  // Send OTP to backend
  const sendTwoFactorOtp = async () => {
    setErrorMessage('');
    try {
      const response = await fetch(`${BASE_URL}/api/two-factor-auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        setErrorMessage(responseData.error || "Failed to send OTP.");
      }
    } catch (error) {
      setErrorMessage("Failed to send OTP.");
    }
  };

  // Verify OTP with backend
  const verifyTwoFactorOtp = async () => {
    setErrorMessage('');
    try {
      const response = await fetch(`${BASE_URL}/api/two-factor-auth/verify-email-otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'},
        body: JSON.stringify({ username, otp: otp.join('') }),
      });
      const responseData = await response.json();
      if (response.ok) {
        updateUserData({ email });
        navigation.navigate('BottomTabs');
      } else {
        setErrorMessage(responseData.error || "Failed to verify OTP.");
        Alert.alert("Error", responseData.error || "Failed to verify OTP.");
      }
    } catch (error) {
      setErrorMessage("Failed to verify OTP.");
      Alert.alert("Error", "Failed to verify OTP.");
    }
  };

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    // Automatically focus the next input field
    if (text && index < 3) {
      inputRefs[index + 1].current.focus();
    }
    // Automatically focus the previous input field if text is empty
    if (!text && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleNext = () => {
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      setErrorMessage('Please enter a complete 4-digit OTP');
      return;
    }
    setErrorMessage('');
    verifyTwoFactorOtp();
  };

  return (
    <View style={styles.container}>
     <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
     <View style={{ paddingVertical: 40 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={styles.title}>2 Factor Authentication</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="info" size={24} color="#0073e6" />
            {/* <Feather name="info" size={22} color="#0073e6" /> */}
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          Please choose a strong password. You will need this password to restore your blink safe backup.
        </Text>

        {/* OTP Input Container */}
        <View style={styles.otpMainContainer}>
          <Text style={styles.otpLabel}>Enter OTP</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                textAlign="center"
              />
            ))}
          </View>
        </View>

        {/* Error Message */}
        {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}

      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* First Modal for info */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.publicKeyValue}>
              You also create a key pair. The public key has been securely transmitted to our servers. The private key never leaves your device. This ensures that nobody else can read your messages.
            </Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setSecondModalVisible(true);
              }}
              style={[styles.okayButton]}
            >
              <Text style={styles.okayButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Second Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={secondModalVisible}
        onRequestClose={() => setSecondModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.publicKeyValue}>
              All you need to chat is stored only on your device. you don't have an account with us and we cannot help you out if you lose your phone or accidentally delete your data.
            </Text>
            <Text style={styles.publicKeyValue}>
              Blink safe creates automatic backups of all the important data, including your keys, your contact list, and your group membership (but no message content) anonymously on a secure server of your choice.
            </Text>

            <TouchableOpacity
              onPress={() => setSecondModalVisible(false)}
              style={[styles.okayButton]}
            >
              <Text style={styles.okayButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a3c79',
  },
  description: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 30,
    color: '#606060',
    marginTop: 20,
  },
  // OTP Styles
  otpMainContainer: {
    marginVertical: 20,
  },
  otpLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a3c79',
    marginBottom: 15,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a3c79',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  expertSetting: {
    textAlign: 'right',
    color: '#3498db',
    marginBottom: 30,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    width: 300,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    width: 2,
    height: '75%',
    backgroundColor: '#e5e5e5',
    marginHorizontal: 15,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    alignItems: 'center',
  },
  publicKeyValue: {
    fontSize: 16,
    color: 'black',
    marginBottom: 40,
  },
  okayButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  okayButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TwoFA;