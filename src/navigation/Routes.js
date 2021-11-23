import React from 'react';
import  AppStack from 'navigation/AppStack';
import  AuthStack from 'navigation/AuthStack';
import { useAuth } from "context/AuthContext"

const RoutesFile = () => {
    const { currentUser } = useAuth()
    return (
        currentUser ? 
        <AppStack /> : <AuthStack />
    );
};

export default RoutesFile;

