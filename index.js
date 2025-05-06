/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';
import {AppRegistry, AppState} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, { AndroidImportance } from '@notifee/react-native';

// Create the default channel
async function createDefaultChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  if (AppState.currentState !== 'active') { // Only show notification if app is not in foreground
    await createDefaultChannel();

    await notifee.displayNotification({
      title: remoteMessage?.notification?.title,
      body: remoteMessage?.notification?.body,
      android: {
        channelId: 'default',
        smallIcon: 'ic_launcher',
      },
    });
  }
});

AppRegistry.registerComponent(appName, () => App);
