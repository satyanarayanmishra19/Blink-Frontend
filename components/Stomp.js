import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

export function connect(username, onConnected, onError) {
  if (username) {
    const socket = new SockJS('http://192.168.144.102:8080/ws');
    stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (msg) => console.log('STOMP Debug:', msg),
      reconnectDelay: 5000, // Reconnect after 5 seconds
      onConnect: onConnected,
      onStompError: onError,
      onWebSocketClose: onError,
      onWebSocketError: onError,
    });

    stompClient.activate();
  }
}

export function sendMessage(messageContent, username) {
  if (messageContent && stompClient && stompClient.connected) {
    const chatMessage = {
      sender: username,
      content: messageContent,
      type: 'CHAT',
    };
    stompClient.publish({
      destination: '/app/sendMessage',
      body: JSON.stringify(chatMessage),
    });
  } else {
    console.error('Cannot send message: STOMP client is not connected.');
  }
}

export function subscribeToPublicTopic(onMessageReceived) {
  if (stompClient && stompClient.connected) {
    stompClient.subscribe('/topic/public', onMessageReceived);
  } else {
    console.error('Cannot subscribe: STOMP client is not connected.');
  }
}

export function addUser(username) {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/app/addUser',
      body: JSON.stringify({ sender: username, type: 'JOIN' }),
    });
  } else {
    console.error('Cannot add user: STOMP client is not connected.');
  }
}