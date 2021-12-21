import  React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
// import { styled, alpha,} from '@mui/styles';
import IconButton from '@mui/material/IconButton';
// import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from "context/AuthContext"
import { auth } from "firebase.js"

const theme = createTheme();

const NotLoggedInBar = (props) => {
    const { children } = props;

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    return(
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <AppBar style={{ background: '#F4F6FD' }}>
            <Toolbar>
            <Link style={{ textDecoration: "none" }} 
                to={`/`}
            >  
                <Typography
                style={{ color: 'black' }}
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                Atina
                </Typography>
            </Link>
            
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
               
             
                
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>

            </Box>
            </Toolbar>
        </AppBar>
        
        {children}


      </React.Fragment>
    </ThemeProvider>
    );
}

export default NotLoggedInBar;