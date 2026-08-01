import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase';

export const googleProvider = new GoogleAuthProvider();

const requireAuth = () => {
  if (!auth) {
    throw new Error('Firebase Auth is not configured yet.');
  }
  return auth;
};

export const loginWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(requireAuth(), email, password);
};

export const registerWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(requireAuth(), email, password);
};

export const loginWithGoogle = async () => {
  return signInWithPopup(requireAuth(), googleProvider);
};

export const logout = async () => {
  return signOut(requireAuth());
};

export const onAuthStateChange = (callback) => {
  if (!auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
};
