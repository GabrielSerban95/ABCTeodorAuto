import { collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const USERS_COLLECTION = 'users';
export const STUDENTS_COLLECTION = 'students';
export const INSTRUCTORS_COLLECTION = 'instructors';
export const BOOKINGS_COLLECTION = 'bookings';

export const getUserDocRef = (uid) => doc(db, USERS_COLLECTION, uid);
export const getStudentDocRef = (uid) => doc(db, STUDENTS_COLLECTION, uid);
export const getInstructorDocRef = (uid) => doc(db, INSTRUCTORS_COLLECTION, uid);
export const getBookingsCollectionRef = () => collection(db, BOOKINGS_COLLECTION);

export const createUserProfile = async (user, role = 'student') => {
  const payload = {
    uid: user.uid,
    email: user.email,
    role,
    name: user.displayName || user.email?.split('@')[0] || 'Utilizator',
    phone: '',
    photoURL: user.photoURL || null,
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(getUserDocRef(user.uid), payload, { merge: true });
  return payload;
};

export const createStudentProfile = async (user, extra = {}) => {
  const payload = {
    uid: user.uid,
    name: user.displayName || user.email?.split('@')[0] || 'Utilizator',
    phone: '',
    email: user.email,
    enrolledCategory: 'cat-b',
    assignedInstructorId: null,
    status: 'pending',
    theoryHoursCompleted: 0,
    practiceHoursCompleted: 0,
    enrolledAt: serverTimestamp(),
    notes: '',
    ...extra,
  };

  await setDoc(getStudentDocRef(user.uid), payload, { merge: true });
  return payload;
};

export const getDocument = async (ref) => {
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? snapshot.data() : null;
};
