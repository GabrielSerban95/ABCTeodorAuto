import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
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

export const registerWithEmailAndPassword = async (email, password, displayName = '') => {
  const userCredential = await createUserWithEmailAndPassword(requireAuth(), email, password);
  if (displayName && userCredential.user) {
    try {
      await updateProfile(userCredential.user, { displayName });
    } catch (profileErr) {
      console.warn('Could not set displayName on Auth user:', profileErr);
    }
  }
  return userCredential;
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

export const getFriendlyAuthErrorMessage = (error) => {
  if (!error) return 'A apărut o eroare necunoscută.';
  const code = error.code || '';
  switch (code) {
    case 'auth/invalid-email':
      return 'Adresa de email introdusă nu este validă.';
    case 'auth/user-disabled':
      return 'Acest cont a fost dezactivat.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Emailul sau parola este incorectă.';
    case 'auth/email-already-in-use':
      return 'Există deja un cont creat cu această adresă de email.';
    case 'auth/weak-password':
      return 'Parola trebuie să aibă cel puțin 6 caractere.';
    case 'auth/popup-closed-by-user':
      return 'Fereastra de autentificare Google a fost închisă.';
    case 'auth/network-request-failed':
      return 'Eroare de rețea. Verificați conexiunea la internet.';
    case 'auth/too-many-requests':
      return 'Prea multe încercări. Vă rugăm să așteptați câteva momente.';
    default:
      return error.message || 'Autentificarea a eșuat.';
  }
};
