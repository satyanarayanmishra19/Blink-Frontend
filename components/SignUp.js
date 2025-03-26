import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Modal, FlatList, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { GlobalContext } from './GlobalContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './SignUp.styles';
import countries from './CountriesList';


const SignUp = ({ navigation, route }) => {
  const { updateUserData } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [thirdModalVisible, setThirdModalVisible] = useState(false);
  const [isFourthModalVisible, setFourthModalVisible] = useState(false);
  const [isFifthModalVisible, setFifthModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [isNoButtonPressed, setNoButtonPressed] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    flag: "🇮🇳",
    code: "+91",
  });

  const { username } = route.params;
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setDropdownVisible(false);
  };

  const handleNoButtonPress = () => {
    setNoButtonPressed(true); // Track No button press separately
    setTimeout(() => {
      setNoButtonPressed(false); // Reset No button state
      setFifthModalVisible(false); // Close the modal
      // onClose(); // Optionally handle close after the "No" action
    }, 100);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = countries.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.code.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries); // Reset to the full list if query is empty
    }
  };

  const validateInputsAndPasswords = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    };

    let isValid = true;

    // Validate name
    if (!name) {
      newErrors.name = 'Name cannot be empty.';
      isValid = false;
    }

    // Validate email
    if (!email) {
      newErrors.email = 'Email cannot be empty.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate phone number
    if (!phone) {
      newErrors.phone = 'Phone number cannot be empty.';
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
      isValid = false;
    }

    // Validate password
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
      isValid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)) {
      newErrors.password = 'Password must contain letters, numbers, and special characters.';
      isValid = false;
    }

    // Check if passwords match
    if (confirmPassword.length < 1) {
      newErrors.confirmPassword = 'Re-enter the password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  // updateUserData({ name, email, number: phone, gender,password: password });

  const handleNext = async () => {
    if (validateInputsAndPasswords()) {
      try {
        // Send signup request
        const response = await fetch('http://192.168.100.195:8080/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, name, email, phone, password: password }),
        });

        if (response.ok) {
          // Save user data
          updateUserData({ name, email, username, phone, password, countryCode: selectedCountry.code });
          // Navigate to the next screen
          navigation.navigate('Preferences', { username });
        } else {
          const error = await response.text();
          setErrorMessage(error || 'Failed to signup. Please try again.'); // Fix error handling
        }
      } catch (err) {
        setErrorMessage('Something went wrong. Please try again.'); // Fix error handling
      }
    }
  };
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5f5f5" />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ paddingVertical: 40 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Text style={styles.title}>SignUp to Chat</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Icon name="info" size={24} color="#0073e6" />
                  {/* <Feather name="info" size={22} color="#0073e6" /> */}
                </TouchableOpacity>
              </View>
              <Text style={styles.description}>
                This name will be visible to your friends when you ping them.
              </Text>

              {/* Name Input */}
              <View style={styles.inputContainer}>
                <AntDesign name="user" size={20} color="#3498db" />
                <View style={styles.divider} />
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#888"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {errors.name ? <Text style={styles.errorMessage}>{errors.name}</Text> : null}

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <AntDesign name="mail" size={20} color="#3498db" />
                <View style={styles.divider} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#888"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {errors.email ? <Text style={styles.errorMessage}>{errors.email}</Text> : null}

              {/* Phone Number Input */}

              <View style={styles.inputContainer}>

                <TouchableOpacity style={{ right: 7 }} onPress={() => setDropdownVisible(!isDropdownVisible)} >
                  <Text style={styles.flag}>{selectedCountry.code}</Text>
                </TouchableOpacity>

                <View style={[styles.divider, { right: 7 }]} />
                {/* Phone number input */}
                <TextInput
                  style={[styles.input, { right: 7 }]}
                  placeholder="Phone Number"
                  placeholderTextColor="#888"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
              <Modal
                transparent={true}
                visible={isDropdownVisible}
                onRequestClose={() => setDropdownVisible(false)}
              >
                <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
                  <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                      <View style={styles.dropdown}>
                        <TextInput
                          style={styles.searchBox}
                          placeholder="Search by name or code..."
                          placeholderTextColor="#888"
                          value={searchQuery}
                          onChangeText={handleSearch}
                        />
                        <FlatList
                          data={filteredCountries}
                          keyExtractor={(item) => item.name}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              onPress={() => handleCountrySelect(item)}
                              style={styles.countryItem}
                            >
                              <Text style={{ marginRight: 10, fontSize: 20, }}>{item.flag}</Text>
                              <Text style={styles.countryName}>{item.name} ({item.code})</Text>
                            </TouchableOpacity>
                          )}
                          style={{ maxHeight: 250 }} // Limit the dropdown height
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
              {errors.phone ? <Text style={styles.errorMessage}>{errors.phone}</Text> : null}

              {/* Gender Selection
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setGenderModalVisible(true)}
            >
              <AntDesign name="team" size={20} color="#3498db" />
              <View style={styles.divider} />
              <Text style={[styles.input, gender ? null : { color: '#a6a6a6' }]}>
                {gender || 'Select Gender'}
              </Text>
            </TouchableOpacity>
            Gender Modal
              <Modal
                animationType="fade"
                transparent={true}
                visible={genderModalVisible}
                onRequestClose={() => setGenderModalVisible(false)}
              >
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Select Gender</Text>
                    {['Male', 'Female', 'Other'].map((item) => (
                      <TouchableOpacity
                        key={item}
                        onPress={() => {
                          setGender(item);
                          setGenderModalVisible(false);
                        }}
                        style={styles.option}
                      >
                        <Text style={styles.optionText}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </Modal> */}

              {/* Password Input */}
              <View style={styles.inputContainer}>
                {/* <Ionicons name="key-outline" size={20} color="#3498db" /> */}
                <Ionicons name="key-outline" size={20} color="#3498db" />
                <View style={styles.divider} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#888"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#3498db"
                  />
                  {/* <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#3498db" /> */}
                </TouchableOpacity>
              </View>

              {errors.password ? <Text style={styles.errorMessage}>{errors.password}</Text> : null}

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="key-outline" size={20} color="#3498db" />
                {/* <Ionicons name="key-outline" size={20} color="#3498db" /> */}
                <View style={styles.divider} />
                <TextInput
                  style={styles.input}
                  placeholder="Re-Enter Password"
                  placeholderTextColor="#888"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons
                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#3498db"
                  />
                  {/* <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#3498db" /> */}
                </TouchableOpacity>
              </View>

              {errors.confirmPassword ? <Text style={styles.errorMessage}>{errors.confirmPassword}</Text> : null}

              {/* Error Message */}
              {/* {errorMessage !== '' &@gmail.com& <Text style={styles.errorText}>{errorMessage}</Text>} */}

            </View>

            {/* Next Button */}
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            {/* Error Message */}
            {/* {error ? <Text style={styles.errorMessage}>{error}</Text> : null} */}

          </ScrollView>
        </TouchableWithoutFeedback>
        {/* Info Modal */}
        {/* First Modal for info */}
        <Modal
          animationType='fade'
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
          animationType="fade"
          transparent={true}
          visible={secondModalVisible}
          onRequestClose={() => setSecondModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.publicKeyValue}>
                All you need to chat is stored only on your device. you don’t have an account with us and we cannot help you out if you lose your phone or accidentally delete your data.
              </Text>
              <Text style={styles.publicKeyValue}>
                Blink safe creates automatic backups of all the important data, including your keys, your contact list, and your group membership (but no message content) anonymously on a secure server of your choice.
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setSecondModalVisible(false);
                  setThirdModalVisible(true);
                }}
                style={[styles.okayButton]}
              >
                <Text style={styles.okayButtonText}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Third Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={thirdModalVisible}
          onRequestClose={() => setThirdModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.publicKeyValue}>
                The nickname is used in push notifications on some devices or as an additional means of identifying you to users who do not yet have you in their address book. We recommend providing only your first name or a pseudonym.
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setThirdModalVisible(false);
                  setFourthModalVisible(true);
                }}
                style={styles.wideButton}
              >
                <Text style={styles.okayButtonText}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Fourth Modal */}
        <Modal
          transparent={true}
          visible={isFourthModalVisible && !isFifthModalVisible}
          animationType="fade"
          onRequestClose={() => setFourthModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.publicKeyValue}>
                By providing your phone number, Blink can help your friends find you automatically if they have you in their phone’s address book. You can skip this step to use Blink completely anonymously.
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setFourthModalVisible(false);
                  setFifthModalVisible(true);
                }}
                style={[styles.wideButton, isButtonPressed ? styles.okayButtonActive : null]}
              >
                <Text style={[styles.okayButtonText, isButtonPressed ? styles.okayButtonTextActive : null]}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Fifth Modal */}
        <Modal
          transparent={true}
          visible={isFifthModalVisible}
          animationType="fade"
          onRequestClose={() => setFifthModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.publicKeyValue}>
                Contact sync helps you find your friends automatically. If you agree, phone numbers and email addresses from your phone book will be encrypted before being sent to our server.
              </Text>
              <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', left: 20 }}>
                <TouchableOpacity onPress={handleNoButtonPress} style={[styles.noButton, isNoButtonPressed ? styles.noButtonActive : null]}>
                  <Text style={[styles.noButtonText, isNoButtonPressed ? styles.noButtonTextActive : null]}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFifthModalVisible(false);
                  }}
                  style={[styles.fifthOkayButton, isButtonPressed ? styles.okayButtonActive : null]}
                >
                  <Text style={[styles.fifthOkayButtonText, isButtonPressed ? styles.okayButtonTextActive : null]}>Okay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    );
  };



  export default SignUp;
