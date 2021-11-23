import React from 'react'
import { Routes, Route } from 'react-router-dom';

import  LoginScreen from 'views/LoginScreen';
import  RegisterScreen from 'views/RegisterScreen';

function AuthStack() {
    return (
        <Routes>
            <Route path="/" element={<RegisterScreen />} />
            <Route path="*" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
        </Routes>
    )
}

export default AuthStack
 