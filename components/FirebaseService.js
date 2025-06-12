import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { BASE_URL } from '../apiConfig'; // Adjust the import path as necessary

class FirebaseService {
  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    }
    return false;
  }

  async getFCMToken() {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      }
      console.log('FCM TOKEN:', fcmToken);
      return fcmToken;
    } catch (error) {
      console.log('Error getting FCM token:', error);
      return null;
    }
  }

  async registerTokenWithBackend(token) {
    try {
      const userToken = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/fcm/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ token })
      });

      if (response.ok) {
        console.log('FCM token registered with backend');
        return true;
      } else {
        console.log('Failed to register FCM token with backend');
        return false;
      }
    } catch (error) {
      console.log('Error registering FCM token with backend:', error);
      return false;
    }
  }

  async createDefaultChannel() {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  }

  setupNotificationListeners(navigation) {
    this.createDefaultChannel();

    this.foregroundSubscription = messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification received:', remoteMessage);

      const { title, body } = remoteMessage.data || {};

      await notifee.displayNotification({
        title: title || 'New Message',
        body: body || 'You have a new message',
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher',
        },
      });
    });

    this.backgroundSubscription = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened from background state:', remoteMessage);
      if (remoteMessage.data?.senderId) {
        navigation.navigate('MessageScreen', {
          chatData: { sender: remoteMessage.data.senderId }
        });
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data?.senderId) {
          setTimeout(() => {
            navigation.navigate('MessageScreen', {
              chatData: { sender: remoteMessage.data.senderId }
            });
          }, 1000);
        }
      });
  }

  removeNotificationListeners() {
    if (this.foregroundSubscription) this.foregroundSubscription();
    if (this.backgroundSubscription) this.backgroundSubscription();
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;
