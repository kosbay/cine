import socketIOClient from 'socket.io-client';
import config from 'config';

const backendUrl = config.getBackendUrl();
const socket = socketIOClient(backendUrl);

const socketConnection = null;

const Sucbscriber = {
  listeners: [],
  onMessageCame: function onMessageCame(...args) {
    this.listeners.map(listener => listener(...args));
  },
  subscribe(listener) {
    this.listeners = [...this.listeners, listener];
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
};

const initConnection = ({ userId }) => {
  socket.emit('newOnline', userId);
  socket.on(userId, Sucbscriber.onMessageCame.bind(Sucbscriber));
};

const subscribeToConnection = ({ userId, onMessageCame }) => {
  if (!socketConnection) {
    initConnection({ userId });
  }

  return Sucbscriber.subscribe(onMessageCame);
};

export default subscribeToConnection;
