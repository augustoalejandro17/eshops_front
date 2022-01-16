import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase.js"
import { db } from "../firebase.js"
import { addDoc, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"; 

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
    const [currentUser, setCurrentUser] = useState(null)
    const [currentUserData, setCurrentUserData] = useState(null)
    const [userRef, setUserRef] = useState(null)
    const [userPermissionsRef, setUserPermissionsRef] = useState(null)
    const [userPermissions, setUserPermissions] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])

    const signup = async (auth, userName, userEmail, userPassword) => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            userEmail,
            userPassword
          ).then(() => {

            addDoc(collection(db, "users"), {
                name: userName,
                email: userEmail,
            }).then((docRef) => { setUserRef(docRef.id); })
          })
          //we need to catch the whole sign up process if it fails too.
        } catch (error) {
            throw new Error(error.code);
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
            throw new Error(error.code);
        }
    };

    const logout = async (auth) => {
        window.localStorage.clear();
        await signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = 
        onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
            setLoading(false)
          });
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        if(currentUser) {
            const queryVar = query(collection(db, "users"), where("email", "==", currentUser.email));
            getDocs(queryVar).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setUserRef(doc.id);
                    setUserPermissionsRef(doc.data().permissions);
                    setCurrentUserData({id: doc.id, ...doc.data()});
                });    
            });
        }
    }, [currentUser]);

    useEffect(() => {
        
        async function fetchStoreData(indexToFetch){
            const queryVar = doc(db, "user_permissions", indexToFetch);
            const docSnap = await getDoc(queryVar);
            if (docSnap.exists()) {
                setUserPermissions(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }
        
        if(userPermissionsRef) {
            fetchStoreData(userPermissionsRef);
        }

    }, [userPermissionsRef]);

    

    const value = {
        currentUser,
        userRef,
        userPermissions,
        cart,
        currentUserData,
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