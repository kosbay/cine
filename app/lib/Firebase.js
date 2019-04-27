import uuid from 'uuid/v1';
import firebase from 'firebase/app';
import 'firebase/storage';

const DEFAULT_PATH = 'files';

const firebaseDevConfig = {
  apiKey: 'AIzaSyAuZ0PFZwS4Dv6aaIpMhiETpnUCXgTiptk',
  authDomain: 'wunder-dev.firebaseapp.com',
  databaseURL: 'https://wunder-dev.firebaseio.com',
  projectId: 'wunder-dev',
  storageBucket: 'wunder-dev.appspot.com',
  messagingSenderId: '596174736831',
};

const Firebase = {
  init() {
    this.secondaryFirebase = firebase.initializeApp(firebaseDevConfig, 'secondary');
  },
  uploadFile({
    name, file, customPath, onStateChange,
  }) {
    if (!this.secondaryFirebase) this.init();
    const storage = this.secondaryFirebase.storage();
    const storageRef = storage.ref();
    const path = `${customPath || DEFAULT_PATH}/${name}`;
    const uploadTask = storageRef.child(path).put(file);

    return new Promise((onSuccess, onError) => uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      onStateChange,
      () => onError(uploadTask),
      () => onSuccess(uploadTask)
    ));
  },
  generateName(name) {
    return `${name}${uuid()}`;
  },
  removeFile(fileName) {
    if (!this.secondaryFirebase) this.init();
    const storage = this.secondaryFirebase.storage();
    const storageRef = storage.ref();
    // Create a reference to the file to delete
    const desertRef = storageRef.child(`files/${fileName}`);

    // Delete the file
    desertRef.delete().then(() => {
      console.log('File deleted successfully');
    }).catch((error) => {
      console.log('Remove error: ', error);
    });
  },
};

export default Firebase;
