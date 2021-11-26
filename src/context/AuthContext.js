import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase.js"
import { db } from "../firebase.js"
import { addDoc, collection } from "firebase/firestore"; 

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
    const signup = async (auth, userName, userEmail, userPassword) => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            userEmail,
            userPassword
          ).then(() => {
            //Once the user creation has happened successfully, we can add the currentUser into firestore
            //with the appropriate details.
            addDoc(collection(db, "users"), {
                name: userName,
                email: userEmail,
            })
            //ensure we catch any errors at this stage to advise us if something does go wrong
            .catch(error => {
                console.log('Something went wrong with added user to firestore: ', error);
            })
          })
          //we need to catch the whole sign up process if it fails too.
        } catch (error) {
          console.log(error.message);
        }
    };

    const login = async (auth, email, password) => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
        } catch (error) {
          console.log(error.message);
        }
    };

    const logout = async (auth) => {
        await signOut(auth);
    };

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
    //     const unsubscribe = 
    //     onAuthStateChanged(auth, (currentUser) => {
    //         setCurrentUser(currentUser)
    //         setLoading(false)
    //       });

    //     return unsubscribe
    // }, [])
    
    const value = {
        currentUser,
        signup,
        login,
        logout,
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