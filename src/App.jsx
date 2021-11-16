import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import * as React from 'react';
import DefaultHeader from './views/DefaultHeader';
import Home from './views/Home';
import Shop from './views/Shop';
import Messages from './views/Messages';
import Profile from './views/Profile';
import ShoppingCart from './views/ShoppingCart';
import LoginScreen from './views/LoginScreen';
import RegisterScreen from './views/RegisterScreen';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

const App = () => {
    return(
        <Routes>
            <Route path="/" element={<DefaultHeader/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/cart" element={<ShoppingCart/>}/>
                <Route path="/shop/:shopIndex" element={<Shop/>}/>
                <Route path="*" element={<NoMatch />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
            </Route>
        </Routes>
    )
}

const NoMatch = () => {
    return (
      <div>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
}
export default App;
