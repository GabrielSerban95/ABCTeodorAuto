import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { ENV } from '../config/env';

const firebaseConfig = {
  apiKey: ENV.FIREBASE.API_KEY,
  authDomain: ENV.FIREBASE.AUTH_DOMAIN,
  projectId: ENV.FIREBASE.PROJECT_ID,
  storageBucket: ENV.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: ENV.FIREBASE.MESSAGING_SENDER_ID,
  appId: ENV.FIREBASE.APP_ID,
  measurementId: ENV.FIREBASE.MEASUREMENT_ID,
};

const hasFirebaseConfig = Boolean(
  ENV.FIREBASE.API_KEY &&
  ENV.FIREBASE.AUTH_DOMAIN &&
  ENV.FIREBASE.PROJECT_ID &&
  ENV.FIREBASE.APP_ID
);

let app = null;
let auth = null;
let db = null;

if (hasFirebaseConfig) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  console.warn('Firebase config is missing. Auth and Firestore features will stay disabled until .env is configured.');
}

export { auth, db, hasFirebaseConfig };
export default app;
