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

export const createUserProfile = async (user, role = 'student', extra = {}) => {
  const payload = {
    uid: user.uid,
    email: user.email,
    role,
    name: extra.name || user.displayName || user.email?.split('@')[0] || 'Utilizator',
    phone: extra.phone || '',
    photoURL: user.photoURL || null,
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...extra,
  };

  await setDoc(getUserDocRef(user.uid), payload, { merge: true });
  return payload;
};

export const createStudentProfile = async (user, extra = {}) => {
  const payload = {
    uid: user.uid,
    name: extra.name || user.displayName || user.email?.split('@')[0] || 'Utilizator',
    phone: extra.phone || '',
    email: user.email,
    enrolledCategory: extra.enrolledCategory || 'cat-b',
    assignedInstructorId: extra.assignedInstructorId || 'inst-1',
    assignedInstructorName: extra.assignedInstructorName || 'Teodor Popescu',
    instructorCode: extra.teacherCode || extra.instructorCode || '',
    status: extra.status || 'activ',
    theoryHoursCompleted: extra.theoryHoursCompleted || 0,
    practiceHoursCompleted: extra.practiceHoursCompleted || 0,
    enrolledAt: serverTimestamp(),
    notes: extra.notes || '',
    ...extra,
  };

  if (db) {
    await setDoc(getStudentDocRef(user.uid), payload, { merge: true });
  } else {
    localStorage.setItem(`student_profile_${user.uid}`, JSON.stringify(payload));
  }
  return payload;
};

export const getStudentProfile = async (uid) => {
  if (!db) {
    return JSON.parse(localStorage.getItem(`student_profile_${uid}`) || 'null');
  }

  try {
    return await getDocument(getStudentDocRef(uid));
  } catch (err) {
    console.warn('Could not fetch student profile from Firestore:', err);
    return null;
  }
};

/**
 * Resolvă dinamic instructorul pe baza codului introdus.
 * 1. Verifică în colecțiile din Firestore ('teacher_codes' sau 'instructors') dacă există
 * 2. Are fallback local la lista autorizată de instructori
 */
export const resolveInstructorFromCode = async (rawCode) => {
  if (!rawCode) {
    return { isValid: false, message: 'Codul de înscriere este obligatoriu.' };
  }

  const normalized = rawCode.trim().toUpperCase();

  // 1. Verificare dinamică în Firestore (dacă baza de date este conectată)
  if (db) {
    try {
      // Verifică tabela de coduri dinamice / temporare
      const codesSnap = await getDocs(
        query(collection(requireFirestore(), 'teacher_codes'), where('code', '==', normalized))
      );

      if (!codesSnap.empty) {
        const codeDoc = codesSnap.docs[0].data();
        // Verifică dacă codul a expirat (pentru generare coduri la interval de timp)
        if (codeDoc.expiresAt && codeDoc.expiresAt.toDate && codeDoc.expiresAt.toDate() < new Date()) {
          return {
            isValid: false,
            message: 'Acest cod de înscriere a expirat. Vă rugăm să solicitați un cod nou de la profesorul dumneavoastră.',
          };
        }

        return {
          isValid: true,
          instructorId: codeDoc.instructorId || 'inst-1',
          instructorName: codeDoc.instructorName || 'Instructor Alocat',
          instructorPhone: codeDoc.instructorPhone || '',
          instructorCar: codeDoc.instructorCar || '',
          code: normalized,
        };
      }

      // Verifică în tabela de instructori dacă vreun instructor are acest cod asignat
      const instSnap = await getDocs(
        query(collection(requireFirestore(), INSTRUCTORS_COLLECTION), where('code', '==', normalized))
      );

      if (!instSnap.empty) {
        const instData = instSnap.docs[0].data();
        return {
          isValid: true,
          instructorId: instSnap.docs[0].id,
          instructorName: instData.name,
          instructorPhone: instData.phone || '',
          instructorCar: instData.car || '',
          code: normalized,
        };
      }
    } catch (err) {
      console.warn('Eroare interogare dinamică coduri în Firestore:', err);
    }
  }

  // 2. Mapează codurile statice / implicite
  const staticInstructorMap = {
    'POP-101': { instructorId: 'inst-1', instructorName: 'Teodor Popescu', instructorPhone: '0722 111 222', instructorCar: 'Volkswagen Golf 7 - Cutie Manuală' },
    'TEO-101': { instructorId: 'inst-1', instructorName: 'Teodor Popescu', instructorPhone: '0722 111 222', instructorCar: 'Volkswagen Golf 7 - Cutie Manuală' },
    'ION-102': { instructorId: 'inst-2', instructorName: 'Adrian Ionescu', instructorPhone: '0722 333 444', instructorCar: 'MAN TGX 18.440 & Semiremorcă' },
    'ADI-102': { instructorId: 'inst-2', instructorName: 'Adrian Ionescu', instructorPhone: '0722 333 444', instructorCar: 'MAN TGX 18.440 & Semiremorcă' },
    'DUM-103': { instructorId: 'inst-3', instructorName: 'Elena Dumitrescu', instructorPhone: '0722 555 666', instructorCar: 'Renault Clio 5 - Cutie Automată' },
    'ELE-103': { instructorId: 'inst-3', instructorName: 'Elena Dumitrescu', instructorPhone: '0722 555 666', instructorCar: 'Renault Clio 5 - Cutie Automată' },
    'STA-104': { instructorId: 'inst-4', instructorName: 'Mihai Stanciu', instructorPhone: '0722 777 888', instructorCar: 'Volkswagen Polo VI / Mercedes Atego' },
    'MIH-104': { instructorId: 'inst-4', instructorName: 'Mihai Stanciu', instructorPhone: '0722 777 888', instructorCar: 'Volkswagen Polo VI / Mercedes Atego' },
    'ABC2026': { instructorId: 'inst-1', instructorName: 'Teodor Popescu', instructorPhone: '0722 111 222', instructorCar: 'Volkswagen Golf 7 - Cutie Manuală' },
    'TEODOR2026': { instructorId: 'inst-1', instructorName: 'Teodor Popescu', instructorPhone: '0722 111 222', instructorCar: 'Volkswagen Golf 7 - Cutie Manuală' },
    'ABC-AUTO': { instructorId: 'inst-1', instructorName: 'Teodor Popescu', instructorPhone: '0722 111 222', instructorCar: 'Volkswagen Golf 7 - Cutie Manuală' },
    'ELEV-ABC': { instructorId: 'inst-1', instructorName: 'Teodor Popescu', instructorPhone: '0722 111 222', instructorCar: 'Volkswagen Golf 7 - Cutie Manuală' },
  };

  if (staticInstructorMap[normalized]) {
    return {
      isValid: true,
      ...staticInstructorMap[normalized],
      code: normalized,
    };
  }

  return {
    isValid: false,
    message: `Codul „${normalized}” nu este valid. Solicitați codul de la instructorul dumneavoastră sau contactați secretariatul.`,
  };
};

export const createBooking = async (booking) => {
  if (!db) {
    const existing = JSON.parse(localStorage.getItem('abc_bookings') || '[]');
    const newBooking = { ...booking, id: `BK-${Date.now()}` };
    const updated = [newBooking, ...existing];
    localStorage.setItem('abc_bookings', JSON.stringify(updated));
    return newBooking;
  }

  const bookingData = {
    ...booking,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(getBookingsCollectionRef(), bookingData);
  return { ...bookingData, id: docRef.id };
};

export const updateBookingStatus = async (bookingId, status) => {
  if (!db) {
    const existing = JSON.parse(localStorage.getItem('abc_bookings') || '[]');
    const updated = existing.map((b) => (b.id === bookingId ? { ...b, status } : b));
    localStorage.setItem('abc_bookings', JSON.stringify(updated));
    return true;
  }

  const bookingRef = doc(requireFirestore(), BOOKINGS_COLLECTION, bookingId);
  await setDoc(bookingRef, { status, updatedAt: serverTimestamp() }, { merge: true });
  return true;
};

export const getBookingsByStudentId = async (studentId, email) => {
  if (!db) {
    const existing = JSON.parse(localStorage.getItem('abc_bookings') || '[]');
    return existing.filter((booking) => (studentId && booking.studentId === studentId) || (email && booking.studentEmail === email));
  }

  const bookings = [];
  if (studentId) {
    const snapById = await getDocs(query(getBookingsCollectionRef(), where('studentId', '==', studentId)));
    snapById.forEach((docItem) => bookings.push({ id: docItem.id, ...docItem.data() }));
  }

  if (bookings.length === 0 && email) {
    const snapByEmail = await getDocs(query(getBookingsCollectionRef(), where('studentEmail', '==', email)));
    snapByEmail.forEach((docItem) => bookings.push({ id: docItem.id, ...docItem.data() }));
  }

  return bookings;
};

export const getBookingsByInstructorId = async (instructorId, instructorEmail) => {
  if (!db) {
    const existing = JSON.parse(localStorage.getItem('abc_bookings') || '[]');
    return existing.filter(
      (booking) =>
        (instructorId && booking.instructorId === instructorId) ||
        (instructorEmail && booking.instructorEmail === instructorEmail)
    );
  }

  const bookings = [];
  if (instructorId) {
    const snapshot = await getDocs(query(getBookingsCollectionRef(), where('instructorId', '==', instructorId)));
    snapshot.forEach((docItem) => bookings.push({ id: docItem.id, ...docItem.data() }));
  }

  if (bookings.length === 0 && instructorEmail) {
    const snapByEmail = await getDocs(query(getBookingsCollectionRef(), where('instructorEmail', '==', instructorEmail)));
    snapByEmail.forEach((docItem) => bookings.push({ id: docItem.id, ...docItem.data() }));
  }

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
