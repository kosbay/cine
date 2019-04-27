import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import config from 'config';

const firebaseDevConfig = {
  apiKey: 'AIzaSyCU0V7suKqws3x0mjCNpt60n29-H9n716k',
  authDomain: 'wunder-dev-notification.firebaseapp.com',
  databaseURL: 'https://wunder-dev-notification.firebaseio.com',
  projectId: 'wunder-dev-notification',
  storageBucket: 'wunder-dev-notification.appspot.com',
  messagingSenderId: '322679450504',
};

const firebaseProdConfig = {
  apiKey: 'AIzaSyB-rekAObJdk795jYmf_IA3_uFB7ZYF-Zo',
  authDomain: 'wunder-prod-notification-be1a7.firebaseapp.com',
  databaseURL: 'https://wunder-prod-notification-be1a7.firebaseio.com',
  projectId: 'wunder-prod-notification-be1a7',
  storageBucket: 'wunder-prod-notification-be1a7.appspot.com',
  messagingSenderId: '634648699216',
};
const Firebase = {
  init() {
    if (!firebase.apps.length) {
      const currentConfig = config.getNodeEnv() === 'production'
        ? firebaseProdConfig : firebaseDevConfig;
      firebase.initializeApp(currentConfig);
    }
  },
  subscribeToNotifications({ userId, onChildAdded }) {
    const database = firebase.database();
    const path = 'notifications';
    const dbRef = database.ref(path).orderByChild('recieverId_isSend').equalTo(`${userId}_false`);
    dbRef.on('value', async (dataSnapshot) => {
      const data = dataSnapshot.val();
      const convertedToArray = Object.keys(data || {}).reduce((acc, nV) => {
        const notification = { _id: nV, ...data[nV] };
        return [...acc, notification];
      }, []);
      const userNotifications = convertedToArray.filter(({ recieverId, isSend }) => `${recieverId}`.localeCompare(userId) === 0 && !isSend);
      const populated = await Promise.all(userNotifications.map(async (notification) => {
        const ref = database.ref(`notificationMessages/${notification.notificationMessageId}`);
        const dS = await ref.once('value');
        const notificationMessage = dS.val();

        return {
          ...notification,
          notificationMessageId: {
            ...notificationMessage,
            _id: notification.notificationMessageId,
          },
        };
      }));
      onChildAdded(populated);
    });
  },
  async getAllNotifications(userId) {
    const database = firebase.database();
    const path = 'notifications';
    const dbRef = database.ref(path);
    const dataSnapshot = await dbRef.orderByChild('recieverId').equalTo(userId).once('value');
    const data = dataSnapshot.val();
    const convertedToArray = Object.keys(data || {}).reduce((acc, nV) => {
      const notification = { _id: nV, ...data[nV] };
      return [...acc, notification];
    }, []);

    const populated = await Promise.all(convertedToArray.map(async (notification) => {
      const ref = database.ref(`notificationMessages/${notification.notificationMessageId}`);
      const dS = await ref.once('value');
      const notificationMessage = dS.val();

      return {
        ...notification,
        notificationMessageId: {
          ...notificationMessage,
          _id: notification.notificationMessageId,
        },
      };
    }));
    return populated;
  },
  editNotification({ notificationId, userId }) {
    const database = firebase.database();
    const path = `notifications/${notificationId}`;
    const dbRef = database.ref(path);
    return dbRef.update({ isSend: true, recieverId_isSend: `${userId}_true` });
  },
  updateNotificationStatus({ notificationId }) {
    const database = firebase.database();
    const path = `notifications/${notificationId}`;
    const dbRef = database.ref(path);
    return dbRef.update({ isRead: true });
  },
};

export default Firebase;
