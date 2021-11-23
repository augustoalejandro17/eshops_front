import React, { useContext, useState, useEffect } from "react"
import { auth } from "firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";


export const AuthContext = React.createContext()

// export function useAuth() {
//   return useContext(AuthContext)
// }

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(auth, email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  function login(auth, email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut()
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
            setCurrentUser(user)
            setLoading(false)
        }
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}