import React from 'react'
import { Routes, Route } from 'react-router-dom';

import DefaultHeader from 'views/DefaultHeader';
import Home from 'views/Home';
import Shop from 'views/Shop';
import Messages from 'views/Messages';
import Profile from 'views/Profile';
import ShoppingCart from 'views/ShoppingCart';
import Product from 'views/Product';
import NoMatch from 'views/NoMatch';
import Carousel from '../views/Carousel';
import EditProfile from 'views/EditProfile';
import AddShop from 'views/AddShop';
import AddProduct from 'views/AddProduct';
import MyOrders from 'views/MyOrders';
import ApproveOrders from 'views/ApproveOrders';

function AppStack() {
    return (
        <Routes>
            <Route path="/" element={<DefaultHeader/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/edit-profile/:profileIndex" element={<EditProfile/>}/>
                <Route path="/cart" element={<ShoppingCart/>}/>
                <Route path="/shop/:shopIndex" element={<Shop/>}/>
                <Route path="/product/:shopIndex" element={<Product />} />
                <Route path="/add-shop" element={<AddShop />} />
                <Route path="/add-product" element={<AddProduct/>}/>
                <Route path="/my-orders" element={<MyOrders/>}/>
                <Route path="/approve-orders" element={<ApproveOrders/>}/>
                <Route path="*" element={<NoMatch />} />
            </Route> 
        </Routes>
    )
}

export default AppStack
