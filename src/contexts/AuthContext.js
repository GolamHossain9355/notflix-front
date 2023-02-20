import React from "react";
import { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });

    return unsubscribe;
  }, []);
  const signUp = (email, password) => {
    setCurrentPassword(password);
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signIn = (email, password) => {
    setCurrentPassword(password);
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  const updateProfile = (profileData) => {
    return auth.currentUser?.updateProfile(profileData);
  };

  const value = {
    currentUser,
    currentPassword,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateEmail,
    updatePassword,
    updateProfile
  };

  if (pending) return

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}