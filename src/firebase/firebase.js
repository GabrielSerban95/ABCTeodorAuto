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
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (initErr) {
    console.error('Eroare la inițializarea Firebase:', initErr);
  }
} else {
  console.warn(
    'Firebase config is missing or incomplete in .env. Asigură-te că variabilele încep cu VITE_ și că ai repornit dev serverul (npm run dev).'
  );
}

export { auth, db, hasFirebaseConfig };
export default app;
