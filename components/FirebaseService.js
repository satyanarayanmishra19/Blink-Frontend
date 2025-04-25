import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

class FirebaseService {
  // Request user permission for notifications
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

  // Get FCM token and store it
  async getFCMToken() {
    try {
      // Check if we have a token saved
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      
      if (!fcmToken) {
        // Get new token if we don't have one saved
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

  // Send FCM token to backend
  async registerTokenWithBackend(token) {
    try {
      const userToken = await AsyncStorage.getItem('token'); // JWT token
      const response = await fetch('http://192.168.100.195:8080/api/fcm/token', {
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

  // Setup notification listeners
  setupNotificationListeners(navigation) {
    // Handle notifications when app is in foreground
    this.foregroundSubscription = messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification received:', remoteMessage);
      
      // Show in-app notification or update UI
      // You could use a library like react-native-flash-message for this
    });

    // Handle notification when app is in background and user taps the notification
    this.backgroundSubscription = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened from background state:', remoteMessage);
      
      // Navigate to the chat screen with the sender
      if (remoteMessage.data && remoteMessage.data.senderId) {
        navigation.navigate('MessageScreen', { 
          chatData: {
            sender: remoteMessage.data.senderId,
            // You might need to fetch other details or have them in the notification
          }
        });
      }
    });

    // Check if app was opened from a notification when closed (quit state)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification opened app from quit state:', remoteMessage);
          
          // Navigate to appropriate screen once app is ready
          if (remoteMessage.data && remoteMessage.data.senderId) {
            // You might want to delay this until app is fully loaded
            setTimeout(() => {
              navigation.navigate('MessageScreen', { 
                chatData: {
                  sender: remoteMessage.data.senderId,
                  // You might need to fetch other details
                }
              });
            }, 1000);
          }
        }
      });
  }

  // Clean up listeners
  removeNotificationListeners() {
    if (this.foregroundSubscription) this.foregroundSubscription();
    if (this.backgroundSubscription) this.backgroundSubscription();
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;