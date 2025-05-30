import React, { useContext } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Contacts from './Contacts';
import Chats from './Chats';
import ProfileComponent from './ProfileComponent';
import Settings from './Settings';
import { GlobalContext } from './GlobalContext';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ route }) {
  // Ensure username is not undefined
  const { userData } = useContext(GlobalContext);
  const username = route?.params?.username || userData?.id || '';
  return (
    <Tab.Navigator
      initialRouteName="Contact"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 70,
          paddingBottom: 15,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          if (route.name === 'Contact') {
            iconName = 'people-outline';
          } else if (route.name === 'Chats') {
            iconName = 'chatbubble-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={focused ? 28 : 24}
              color={color}
              style={{ transform: [{ translateY: focused ? -5 : 0 }] }}
            />
          );
        },
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: color,
              transform: [{ translateY: focused ? -5 : 0 }],
            }}
          >
            {route.name}
          </Text>
        ),
        headerShown: false,
        swipeEnabled: true,
      })}
    >
      <Tab.Screen name="Contact" component={Contacts} initialParams={{ username }} />
      <Tab.Screen name="Chats" component={Chats} initialParams={{ username }} />
      <Tab.Screen name="Profile" component={ProfileComponent} initialParams={{ username }} />
      <Tab.Screen name="Settings" component={Settings} initialParams={{ username }} />
    </Tab.Navigator>
  );
}
