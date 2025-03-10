import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Share, FlatList, StatusBar, Dimensions, Modal, Animated, TouchableWithoutFeedback, Alert, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PublicKeyModal from './PublicKeyModal';
import { GlobalContext } from './GlobalContext';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './ProfileComponent.styles';
import { RewardContext } from './RewardContext';

const { width, height } = Dimensions.get('window');
const scaleSize = size => (width / 375) * size;

const gridSize = 8; // Number of rows and columns
const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Alphanumeric characters

// Generate random alphanumeric characters for the grid
const generateRandomGrid = () => {
  const grid = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    grid.push(alphanumericChars[randomIndex]);
  }
  return grid;
};

// Randomly select images from Avatar folder
const avatarImages = [
  require('../assets/Avatar/Avatar1.jpg'),
  require('../assets/Avatar/Avatar2.jpg'),
  require('../assets/Avatar/Avatar3.jpg'),
  require('../assets/Avatar/Avatar4.jpg'),
  require('../assets/Avatar/Avatar5.jpg'),
  require('../assets/Avatar/Avatar6.jpg'),
  require('../assets/Avatar/Avatar7.jpg'),
  require('../assets/Avatar/Avatar8.jpg'),
  require('../assets/Avatar/Avatar9.jpg'),
  require('../assets/Avatar/Avatar10.jpg'),
  require('../assets/Avatar/Avatar11.jpg'),
];


// Profile Screen Component
const ProfileComponent = ({ navigation, route }) => {
  const gridCharacters = useMemo(() => generateRandomGrid(), []);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const { userData, updateUserData } = useContext(GlobalContext);
  const { rewardPoints } = useContext(RewardContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditEmailModalOpen, setIsEditEmailModalOpen] = useState(false);
  const [isEditNameModalOpen, setIsEditNameModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isConfirmationEmailModalOpen, setIsConfirmationEmailModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSuccessEmailModalOpen, setIsSuccessEmailModalOpen] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { username } = route.params;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (isEditModalOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isEditModalOpen]);

  useEffect(() => {
    if (isConfirmationModalOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isConfirmationModalOpen]);

  useEffect(() => {
    if (isSuccessModalOpen) {
      // Start fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Close modal automatically after 3 seconds
      const timeout = setTimeout(() => {
        closeSuccessModal();
      }, 3000);

      // Cleanup the timeout if the modal closes before 3 seconds
      return () => clearTimeout(timeout);
    } else {
      // Start fade-out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isSuccessModalOpen, fadeAnim, closeSuccessModal]);

  useEffect(() => {
    if (isEditEmailModalOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isEditEmailModalOpen]);

  useEffect(() => {
    if (isConfirmationEmailModalOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isConfirmationEmailModalOpen]);

  useEffect(() => {
    if (isSuccessEmailModalOpen) {
      // Start fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Close modal automatically after 3 seconds
      const timeout = setTimeout(() => {
        closeSuccessEmailModal();
      }, 3000);

      // Cleanup the timeout if the modal closes before 3 seconds
      return () => clearTimeout(timeout);
    } else {
      // Start fade-out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isSuccessEmailModalOpen, fadeAnim, closeSuccessEmailModal]);

  useEffect(() => {
    if (isEditNameModalOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isEditNameModalOpen]);


  const [selectedImage, setSelectedImage] = useState(() => {
    // Pick a random image initially
    const randomIndex = Math.floor(Math.random() * avatarImages.length);
    return avatarImages[randomIndex];
  });


  // Function to handle share
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Hi, it's me! Sharing my Blink profile: ${userData.id}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log(`Shared with: ${result.activityType}`);
        } else {
          // Shared
          console.log('Content shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  const updateUserNumber = async () => {
    if (!number.trim()) {
      Alert.alert("Invalid Input", "Number cannot be empty.");
      return;
    }

    try {
      const body = {
        userName: username,
        phoneNumber: number,
      };
      const response = await fetch('http://192.168.86.102:8080/api/users/update-number', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      if (response.ok) {
        setIsEditModalOpen(false);
        openConfirmationModal();
      } else {
        console.error("Error updating number:", responseData.message || responseData);
        Alert.alert("Error", responseData.message || "Failed to update number.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      Alert.alert("Error", "Failed to update number.");
    }
  };

  const updateUserEmail = async () => {
    try {
      const body = {
        userName: username,
        email: email,
      };
      const response = await fetch('http://192.168.86.102:8080/api/users/update-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      if (response.ok) {
        updateUserData({ email });
      } else {
        console.error("Error updating Email:", responseData.message || responseData);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const updateUserName = async () => {
    try {
      const body = {
        userName: username,
        name: name,
      };
      const response = await fetch('http://192.168.86.102:8080/api/users/update-name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      if (response.ok) {
        updateUserData({ name });
      } else {
        console.error("Error updating Name:", responseData.message || responseData);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const verifyEmailOtp = async () => {
    try {
      const body = {
        userName: username,
        otp: otp.join(''),
      };
      const response = await fetch('http://192.168.86.102:8080/api/users/verify-email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      if (response.ok) {
        updateUserData({ email });
        closeSuccessEmailModal();
      } else {
        console.error("Error verifying OTP:", responseData.message || responseData);
        Alert.alert("Error", responseData.message || "Failed to verify OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error", "Failed to verify OTP.");
    }
  };

  const verifyPhoneOtp = async () => {
    try {
      const body = {
        userName: username,
        otp: otp.join(''),
      };
      const response = await fetch('http://192.168.86.102:8080/api/users/verify-phone-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      if (response.ok) {
        updateUserData({ number });
        closeSuccessModal();
      } else {
        console.error("Error verifying OTP:", responseData.message || responseData);
        Alert.alert("Error", responseData.message || "Failed to verify OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error", "Failed to verify OTP.");
    }
  };

  const openEditEmailModal = () => setIsEditEmailModalOpen(true);
  const closeEditEmailModal = () => {
    if (email.trim() === '') {
      Alert.alert("Invalid Input", "Email cannot be empty."); // Display an alert if the input is empty
      return; // Do not close the modal or update the data
    }
    else if (!isValidEmail(email.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    updateUserEmail();
    updateUserData({ email: email })
    setIsEditEmailModalOpen(false);
    openConfirmationEmailModal(true);
  }
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const cancleEditEmailModal = () => {
    setIsEditEmailModalOpen(false);
  }

  const openConfirmationEmailModal = () => setIsConfirmationEmailModalOpen(true);
  const closeConfirmationEmailModal = () => {
    verifyEmailOtp();
    setIsConfirmationEmailModalOpen(false);
  }
  const cancleEditEmailConfirmModal = () => {
    setIsEditEmailModalOpen(false);
    setIsConfirmationEmailModalOpen(false);
  }
  const openSuccessEmailModal = () => setIsSuccessEmailModalOpen(true);
  const closeSuccessEmailModal = () => {
    // updateUserData({number:number})
    setIsSuccessEmailModalOpen(false);
  }

  const openEditNameModal = () => setIsEditNameModalOpen(true);
  const closeEditNameModal = () => {
    if (name.trim() === '') {
      Alert.alert("Invalid Input", "Name cannot be empty."); // Display an alert if the input is empty
      return; // Do not close the modal or update the data
    }
    else if (!isValidName(name.trim())) {
      Alert.alert("Invalid Input", "Please enter a valid name.");
      return;
    }
    updateUserName();
    updateUserData({ name: name })
    setIsEditNameModalOpen(false);
  }
  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s'-]+$/; // Allows letters, spaces, hyphens, and apostrophes
    return nameRegex.test(name);
  };
  const cancleEditNameModal = () => {
    setIsEditNameModalOpen(false);
  }

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => {
    if (number.trim() === '') {
      Alert.alert("Invalid Input", "Number cannot be empty."); // Display an alert if the input is empty
      return; // Do not close the modal or update the data
    }
    else if (!isValidNumber(number.trim())) {
      Alert.alert("Invalid Input", "Please enter a valid number.");
      return;
    }
    updateUserNumber();
  }
  const isValidNumber = (number) => {
    const numberRegex = /^[0-9]+$/; // Regex to check if the string contains only digits
    return numberRegex.test(number);
  };
  const cancleEditModal = () => {
    setIsEditModalOpen(false);
    setIsConfirmationModalOpen(false);
  }
  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => {
    // updateUserData({number:number})
    setIsSuccessModalOpen(false);
  }
  const openConfirmationModal = () => setIsConfirmationModalOpen(true);
  const closeConfirmationModal = () => {
    verifyPhoneOtp();
    setIsConfirmationModalOpen(false);
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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

  const handleDoubleTap = () => {
    if (tapCount === 1) {
      // Double tap detected
      toggleImageModal();
      setTapCount(0); // Reset tap count
    } else {
      // Single tap, increment tap count
      setTapCount(tapCount + 1);
      setTimeout(() => setTapCount(0), 300); // Reset after 300ms
    }
  };

  const toggleImageModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/images/Blink.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#3498db' }}>BLINK</Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.rewardsButton}>
            <View style={styles.rewardsContainer}>
              <MaterialIcons name="monetization-on" size={24} color="gold" />
              <Text style={styles.coinsText}>{rewardPoints}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.profileSectionTitle}>
        Profile Picture & ID
      </Text>

      <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => setImageModalVisible(true)} >
          <Image source={selectedImage} style={styles.profileImage} />
        </TouchableOpacity>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={styles.profileID}>My Blink ID</Text>
          {/* <Text style={styles.profileIDValue}>1KHDSFDF</Text> */}
          <Text style={styles.profileIDValue}>{userData.id}</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Entypo name="share" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Image Modal */}
      <Modal
        visible={isImageModalVisible}
        transparent={true}
        animationType="fade">
        <TouchableWithoutFeedback onPress={() => setImageModalVisible(false)}>
          <View style={styles.modalBackground}>
            {/* <TouchableOpacity style={styles.closeModal} onPress={toggleImageModal}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity> */}
            <Image source={selectedImage} style={styles.enlargedImage} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>


      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Barcode')}>
          <Ionicons name="qr-code-sharp" size={24} color="white" />
          <Text style={styles.buttonText}>Show My QR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QRCodeScannerScreen')}>
          <MaterialCommunityIcons name="line-scan" size={24} color="white" />
          <Text style={styles.buttonText}>Scan ID</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BlinkWeb')}>
          <Feather name="monitor" size={24} color="white" />
          <Text style={styles.buttonText}>Blink Web</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.privacySection}>
        <Text style={styles.sectionTitle}>Profile picture privacy</Text>
        <Text>Who can see my profile picture?</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.dropdown} onPress={() => navigation.navigate('Contacts')}>
            <Text>Search Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              padding: 6,
              backgroundColor: '#1F6ED4',
              borderRadius: 5,
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('Contacts')}
            >
            <AntDesign name="user" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View> */}
      {/* <View style={styles.privacySection}>
          <Text style={styles.sectionTitle}>Tokens Received</Text>
          <View style={styles.tokenContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
              <Text style={styles.tokenText}>Tokens Till Now</Text>
              <Text style={styles.tokenText}>50</Text>
            </View>
            <View style={styles.divider} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.tokenText}>Tokens Left To Unlock Call</Text>
              <Text style={styles.tokenText}>50</Text>
            </View>
          </View>
      </View> */}

      <View style={styles.linkedDetailsSection}>
        <Text style={styles.sectionTitle}>Linked details</Text>
        <View style={styles.detailRow}>
          <Ionicons name="call" size={24} color="#3498db" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailName}>Mobile number (Verified)</Text>
            {/* <Text style={styles.detailValue}>+91 8323 432 733</Text> */}
            <Text style={styles.detailValue}>{userData.countryCode} {userData.phone}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={openEditModal}>
            <Entypo name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={isEditModalOpen}
          onRequestClose={closeEditModal}
        >
          <TouchableWithoutFeedback onPress={() => setIsEditModalOpen(false)}>
            <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Edit Number</Text>

                <TouchableOpacity style={styles.imageContainer}>
                  <Ionicons name="call" size={50} color="#fff" />
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value={number}
                    onChangeText={setNumber}
                    placeholder="New Number"
                    keyboardType="numeric"
                  />
                  <TouchableOpacity onPress={() => setNumber('')}>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonModalContainer}>
                  <TouchableOpacity onPress={cancleEditModal}>
                    <Text style={styles.cancelButton}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={closeEditModal}>
                    <Text style={styles.okButton}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={isConfirmationModalOpen}
          onRequestClose={closeConfirmationModal}
        >
          <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter your OTP {number}</Text>
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
                  />
                ))}
              </View>
              <Text style={styles.confirmationText}>Enter the OTP sent to the new number</Text>
              <View style={styles.buttonModalContainer}>
                <TouchableOpacity onPress={cancleEditModal}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeConfirmationModal}>
                  <Text style={styles.okButton}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Modal>

        {/* Success Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={isSuccessModalOpen}
          onRequestClose={closeSuccessModal}
        >
          <TouchableWithoutFeedback onPress={() => setIsSuccessModalOpen(false)}>
            <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Confirmation</Text>
                <Text style={styles.confirmationText}>Your number has been successfully updated to {number}.</Text>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={styles.detailRow}>
          {/* <Ionicons name="mail-open" size={24} color="#3498db" /> */}
          <MaterialIcons name="email" size={24} color="#3498db" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailName}>Email id</Text>
            {/* <Text style={styles.detailValue}>jhonsmith123@blink.in</Text> */}
            <Text style={styles.detailValue}>{userData.email}</Text>
          </View>

          <TouchableOpacity style={styles.editButton} onPress={openEditEmailModal}>
            <Entypo name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={isEditEmailModalOpen}
          onRequestClose={closeEditEmailModal}
        >
          <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Email</Text>

              <TouchableOpacity style={styles.imageContainer}>
                <MaterialIcons name="email" size={50} color="white" />
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="New Email"
                  keyboardType='email-address'
                />
                <TouchableOpacity onPress={() => setEmail('')}>
                  {/* <MaterialIcons name="close" size={24} color="gray" /> */}
                </TouchableOpacity>
              </View>

              <View style={styles.buttonModalContainer}>
                <TouchableOpacity onPress={cancleEditEmailModal}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeEditEmailModal}>
                  <Text style={styles.okButton}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={isConfirmationEmailModalOpen}
          onRequestClose={closeConfirmationEmailModal}
        >
          <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
            <View style={styles.modalContent}>
              <Text style={[styles.modalTitle, { textAlign: 'center' }]}>Enter your OTP {email}</Text>
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
                  />
                ))}
              </View>
              <Text style={styles.confirmationText}>Enter the OTP sent to the new email ID</Text>
              <View style={styles.buttonModalContainer}>
                <TouchableOpacity onPress={cancleEditEmailConfirmModal}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeConfirmationEmailModal}>
                  <Text style={styles.okButton}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Modal>

        {/* Success Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={isSuccessEmailModalOpen}
          onRequestClose={closeSuccessEmailModal}
        >
          <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirmation</Text>
              <Text style={styles.confirmationText}>Your email has been successfully updated to {email}.</Text>

              {/* <View style={styles.buttonModalContainer}>
                      <TouchableOpacity onPress={closeSuccessModal}>
                        <Text style={styles.okButton}>OK</Text>
                      </TouchableOpacity>
                    </View> */}
            </View>
          </Animated.View>
        </Modal>
        <View style={styles.detailRow}>
          {/* <AntDesign name="user" size={24} color="#3498db" /> */}
          <MaterialCommunityIcons name="account" size={24} color="#3498db" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailName}>Name</Text>
            {/* <Text style={styles.detailValue}>Jon Doe</Text> */}
            <Text style={styles.detailValue}>{userData.name}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={openEditNameModal}>
            <Entypo name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={isEditNameModalOpen}
          onRequestClose={closeEditNameModal}
        >
          <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Name</Text>

              <TouchableOpacity style={styles.imageContainer}>
                <MaterialCommunityIcons name="account" size={50} color="white" />
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="New Name"
                  keyboardType='ascii-capable'
                />
                <TouchableOpacity onPress={() => setName('')}>
                  {/* <MaterialIcons name="close" size={24} color="gray" /> */}
                </TouchableOpacity>
              </View>

              <View style={styles.buttonModalContainer}>
                <TouchableOpacity onPress={cancleEditNameModal}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeEditNameModal}>
                  <Text style={styles.okButton}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Modal>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.publicKeyButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.publicKeyText}>Show public key</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{flexDirection: 'row', gap: 20, justifyContent: 'center'}}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.logOutButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.logOutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.logOutButton} onPress={() => setDeleteModalVisible(true)}>
            <Text style={styles.logOutText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        </View> */}
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalPublicKeyBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Blink ID: {userData.id}</Text>
              <View style={styles.gridContainer}>
                {Array.from({ length: gridSize }).map((_, rowIndex) => (
                  <View key={rowIndex} style={styles.row}>
                    {gridCharacters
                      .slice(rowIndex * gridSize, (rowIndex + 1) * gridSize)
                      .map((char, colIndex) => (
                        <Text key={colIndex} style={styles.cell}>
                          {char}
                        </Text>
                      ))}
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* <BottomNavigationBar navigation={navigation} /> */}
      {/* <PublicKeyModal isVisible={isModalVisible} onClose={toggleModal} /> */}

    </View>
  );
};

export default ProfileComponent;
