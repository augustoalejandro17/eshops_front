import React from 'react'
import { Routes, Route } from 'react-router-dom';

import  LoginScreen from 'views/LoginScreen';
import  RegisterScreen from 'views/RegisterScreen';
import  ShopNotLoggedIn from 'views/ShopNotLoggedIn';

function AuthStack() {
    return (
        <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="*" element={<LoginScreen />} />
            <Route path="/shop/:shopIndex" element={<ShopNotLoggedIn/>}/>
        </Routes>
    )
}

export default AuthStack
 