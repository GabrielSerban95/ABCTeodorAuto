import { createContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChange, logout } from '../firebase/auth';
import { createStudentProfile, createUserProfile, getDocument, getStudentDocRef, getUserDocRef } from '../firebase/firestore';
import { ROLES } from '../constants/roles';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setProfile(null);
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const existingProfile = await getDocument(getUserDocRef(firebaseUser.uid));
        if (!existingProfile) {
          const createdProfile = await createUserProfile(firebaseUser, ROLES.STUDENT);
          await createStudentProfile(firebaseUser);
          setProfile(createdProfile);
          setRole(createdProfile.role || ROLES.STUDENT);
        } else {
          setProfile(existingProfile);
          setRole(existingProfile.role || ROLES.STUDENT);
        }
      } catch (error) {
        console.error('Auth bootstrap error', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({
    user,
    profile,
    role,
    loading,
    logout,
    isStudent: role === ROLES.STUDENT,
    isInstructor: role === ROLES.INSTRUCTOR,
    isAdmin: role === ROLES.ADMIN,
    isAuthenticated: Boolean(user),
  }), [user, profile, role, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
