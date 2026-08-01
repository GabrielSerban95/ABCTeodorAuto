import { collection, doc, getDoc, setDoc, serverTimestamp, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export const USERS_COLLECTION = 'users';
export const STUDENTS_COLLECTION = 'students';
export const INSTRUCTORS_COLLECTION = 'instructors';
export const BOOKINGS_COLLECTION = 'bookings';

const requireFirestore = () => {
  if (!db) {
    throw new Error('Firestore is not configured yet.');
  }
  return db;
};

export const getUserDocRef = (uid) => doc(requireFirestore(), USERS_COLLECTION, uid);
export const getStudentDocRef = (uid) => doc(requireFirestore(), STUDENTS_COLLECTION, uid);
export const getInstructorDocRef = (uid) => doc(requireFirestore(), INSTRUCTORS_COLLECTION, uid);
export const getBookingsCollectionRef = () => collection(requireFirestore(), BOOKINGS_COLLECTION);

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

export const createBooking = async (booking) => {
  if (!db) {
    const existing = JSON.parse(localStorage.getItem('abc_bookings') || '[]');
    const updated = [booking, ...existing];
    localStorage.setItem('abc_bookings', JSON.stringify(updated));
    return booking;
  }

  const bookingData = {
    ...booking,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(getBookingsCollectionRef(), bookingData);
  return { ...bookingData, id: docRef.id };
};

export const getBookingsByStudentId = async (studentId, email) => {
  if (!db) {
    const existing = JSON.parse(localStorage.getItem('abc_bookings') || '[]');
    return existing.filter((booking) => booking.studentId === studentId || booking.studentEmail === email);
  }

  const bookings = [];
  const snapById = await getDocs(query(getBookingsCollectionRef(), where('studentId', '==', studentId)));
  snapById.forEach((docItem) => bookings.push({ id: docItem.id, ...docItem.data() }));

  if (bookings.length === 0 && email) {
    const snapByEmail = await getDocs(query(getBookingsCollectionRef(), where('studentEmail', '==', email)));
    snapByEmail.forEach((docItem) => bookings.push({ id: docItem.id, ...docItem.data() }));
  }

  return bookings;
};

export const getBookingsByInstructorId = async (instructorId) => {
  if (!db) {
    const existing = JSON.parse(localStorage.getItem('abc_bookings') || '[]');
    return existing.filter((booking) => booking.instructorId === instructorId);
  }

  const bookings = [];
  const snapshot = await getDocs(query(getBookingsCollectionRef(), where('instructorId', '==', instructorId)));
  snapshot.forEach((docItem) => bookings.push({ id: docItem.id, ...docItem.data() }));
  return bookings;
};

export const getAllBookings = async () => {
  if (!db) {
    return JSON.parse(localStorage.getItem('abc_bookings') || '[]');
  }

  const bookings = [];
  const snapshot = await getDocs(getBookingsCollectionRef());
  snapshot.forEach((docItem) => bookings.push({ id: docItem.id, ...docItem.data() }));
  return bookings;
};

export const getAllUsers = async () => {
  if (!db) {
    return [];
  }

  const users = [];
  const snapshot = await getDocs(collection(requireFirestore(), USERS_COLLECTION));
  snapshot.forEach((docItem) => users.push({ id: docItem.id, ...docItem.data() }));
  return users;
};

export const getDocument = async (ref) => {
  if (!db) {
    return null;
  }

  const snapshot = await getDoc(ref);
  return snapshot.exists() ? snapshot.data() : null;
};
