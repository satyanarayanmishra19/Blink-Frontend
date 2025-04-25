import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import GenerateIDScreen from './components/IdCreation';
import { GlobalProvider } from './components/GlobalContext';
import BlinkIDScreen from './components/BlinkIdScreen';
import BlinkSafe from './components/BlinkSafe';
import SignUp from './components/SignUp';
import Preferences from './components/Preferences';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Barcode from './components/Barcode';
import BlinkWeb from './components/BlinkWeb';
import QRCodeScannerScreen from './components/QRCodeScanner';
import MessageScreen from './components/MessageScreen';
import PrivacySettings from './components/PrivacySettings';
import Security from './components/Security';
import Appearance from './components/Appearance';
import Sound from './components/Sound';
import ChatsSettings from './components/ChatsSettings';
import MediaSettings from './components/MediaSettings';
import SecureCalls from './components/SecureCalls';
import AboutBlinkIOS from './components/AboutBlinkIOS';
import PrivacyPolicy from './components/PrivacyPolicy';
import License from './components/Licenses';
import TnS from './components/TnS';
import EndUserLicense from './components/EndUserLicense';
import Help from './components/Help';
import AdvanceOptionIOS from './components/AdvanceOptionsIOS';
import BackupScreen from './components/BackUpScreen';
import VerificationLevelsScreen from './components/VerificationLevelsScreen';
import VoiceCallScreen from './components/VoiceCallScreen';
import ArchivedChats from './components/ArchivedChats';
import GroupProfile from './components/GroupProfile';
import GroupSelection from './components/GroupSelection';
import StarredMessagesScreen from './components/StarredMessage';
import DeleteAccountScreen from './components/DeletedAccountScreen';
import VideoCallScreen from './components/VideoCallScreen';
import Login from './components/Login';
import AboutBlink from './components/AboutBlink';
import AdvanceOptions from './components/AdvanceOptions';
import BottomTabNavigator from './components/BottomTabNavigator';
import GroupName from './components/GroupName';
import GroupChats from './components/GroupChats';
import { RewardProvider } from './components/RewardContext';
import ScribbleScreen from './components/ScribbleScreen';
import firebaseService from './components/FirebaseService';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const setupFirebase = async () => {
      // Request permission for notifications
      const hasPermission = await firebaseService.requestUserPermission();

      if (hasPermission) {
        // Get FCM token
        const fcmToken = await firebaseService.getFCMToken();

        if (fcmToken) {
          // Register token with backend
          await firebaseService.registerTokenWithBackend(fcmToken);
        }
      }
    };

    setupFirebase();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <GlobalProvider>
      <RewardProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='SplashScreen'>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="GenerateIDScreen" component={GenerateIDScreen} options={{headerShown: false}}/>
            <Stack.Screen name="BlinkIDScreen" component={BlinkIDScreen} options={{headerShown: false}}/>
            <Stack.Screen name="BlinkSafe" component={BlinkSafe} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Preferences" component={Preferences} options={{headerShown: false}}/>
            <Stack.Screen name="BottomTabs" component={BottomTabNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="Barcode" component={Barcode} options={{headerShown: false}}/>
            <Stack.Screen name="BlinkWeb" component={BlinkWeb} options={{headerShown: false}}/>
            <Stack.Screen name="MessageScreen" component={MessageScreen} options={{headerShown: false}}
              listeners={({ navigation }) => ({
                focus: () => {
                  // Setup notification listeners with navigation available
                  firebaseService.setupNotificationListeners(navigation);
                },
                blur: () => {
                  // Remove listeners when screen is unfocused
                  firebaseService.removeNotificationListeners();
                },
              })}
            />
            <Stack.Screen name="PrivacySettings" component={PrivacySettings} options={{headerShown: false}}/>
            <Stack.Screen name="Security" component={Security} options={{headerShown: false}}/>
            <Stack.Screen name="Appearance" component={Appearance} options={{headerShown: false}}/>
            <Stack.Screen name="Sound" component={Sound} options={{headerShown: false}}/>
            <Stack.Screen name="ChatsSettings" component={ChatsSettings} options={{headerShown: false}}/>
            <Stack.Screen name="MediaSettings" component={MediaSettings} options={{headerShown: false}}/>
            <Stack.Screen name="SecureCalls" component={SecureCalls} options={{headerShown: false}}/>
            <Stack.Screen name="AboutBlinkIOS" component={AboutBlinkIOS} options={{headerShown: false}}/>
            <Stack.Screen name="AboutBlink" component={AboutBlink} options={{headerShown: false}}/>
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{headerShown: false}}/>
            <Stack.Screen name="License" component={License} options={{headerShown: false}}/>
            <Stack.Screen name="TnS" component={TnS} options={{headerShown: false}}/>
            <Stack.Screen name="EndUserLicense" component={EndUserLicense} options={{headerShown: false}}/>
            <Stack.Screen name="Help" component={Help} options={{headerShown: false}}/>
            <Stack.Screen name="AdvanceOptionIOS" component={AdvanceOptionIOS} options={{headerShown: false}}/>
            <Stack.Screen name="AdvanceOptions" component={AdvanceOptions} options={{headerShown: false}}/>
            <Stack.Screen name="BackupScreen" component={BackupScreen} options={{headerShown: false}}/>
            <Stack.Screen name="VerificationLevelsScreen" component={VerificationLevelsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="QRCodeScannerScreen" component={QRCodeScannerScreen} options={{headerShown: false}}/>
            {/* <Stack.Screen name="Trying" component={Trying} options={{headerShown: false}}/> */}
            <Stack.Screen name="VoiceCallScreen" component={VoiceCallScreen} options={{headerShown: false}}/>
            <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} options={{headerShown: false}}/>
            <Stack.Screen name="ArchivedChats" component={ArchivedChats} options={{headerShown: false}}/>
            <Stack.Screen name="GroupProfile" component={GroupProfile} options={{headerShown: false}}/>
            <Stack.Screen name="GroupSelection" component={GroupSelection} options={{headerShown: false}}/>
            <Stack.Screen name="GroupName" component={GroupName} options={{headerShown: false}}/>
            <Stack.Screen name="GroupChats" component={GroupChats} options={{headerShown: false}}/>
            <Stack.Screen name="ScribbleScreen" component={ScribbleScreen} options={{headerShown: false}}/>
            {/* <Stack.Screen name="StarredMessagesScreen" component={StarredMessagesScreen} options={{headerShown: false}}/> */}
            {/* <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} options={{headerShown: false}}/> */}
        </Stack.Navigator>
        </NavigationContainer>
      </RewardProvider>
    </GlobalProvider>
    </GestureHandlerRootView>
  );
}