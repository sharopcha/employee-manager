import firebase from 'firebase/app';
import 'firebase/firestore';
import config from './firebaseConfg';

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();
