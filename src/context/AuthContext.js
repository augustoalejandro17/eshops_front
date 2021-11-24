import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase.js"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
  
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // function signup(email, password) {
    //     return auth.createUserWithEmailAndPassword(email, password)
    // }
    const signup = async (auth, email, password) => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
        } catch (error) {
          console.log(error.message);
        }
      };

    // function login(email, password) {
    //     return auth.signInWithEmailAndPassword(email, password)
    // }

    // function logout() {
    //     return auth.signOut()
    // }

    // function resetPassword(email) {
    //     return auth.sendPasswordResetEmail(email)
    // }

    // function updateEmail(email) {
    //     return currentUser.updateEmail(email)
    // }

    // function updatePassword(password) {
    //     return currentUser.updatePassword(password)
    // }
    onAuthStateChanged(auth, (currentUser) => {
                setCurrentUser(currentUser)
                setLoading(false)
              });
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setCurrentUser(currentUser)
    //         setLoading(false)
    //       });

    //     return unsubscribe
    // }, [])
    
    const value = {
        currentUser,
        signup,
        // login,
        // logout,
        // resetPassword,
        // updateEmail,
        // updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    )
}