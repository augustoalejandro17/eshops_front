import React from 'react'
import { Routes, Route } from 'react-router-dom';

import DefaultHeader from 'views/DefaultHeader';
import Home from 'views/Home';
import Shop from 'views/Shop';
import Chats from 'views/Chats';
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
import AddContent from 'views/AddContent';

function AppStack() {
    return (
        <Routes>
            <Route path="/" element={<DefaultHeader/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/chats" element={<Chats/>}/>
                <Route path="/profile/:userId" element={<Profile/>}/>
                <Route path="/edit-profile/:profileIndex" element={<EditProfile/>}/>
                <Route path="/cart" element={<ShoppingCart/>}/>
                <Route path="/shop/:shopIndex" element={<Shop/>}/>
                <Route path="/product/:productIndex" element={<Product />} />
                <Route path="/add-shop" element={<AddShop />} />
                <Route path="/add-product/:shopIndex" element={<AddProduct/>}/>
                <Route path="/add-content/:productIndex" element={<AddContent/>}/>
                <Route path="/my-orders" element={<MyOrders/>}/>
                <Route path="/approve-orders" element={<ApproveOrders/>}/>
                <Route path="*" element={<NoMatch />} />
            </Route> 
        </Routes>
    )
}

export default AppStack
