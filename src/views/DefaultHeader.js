import React from 'react';
import { Outlet } from "react-router-dom";
import DefaultAppBar from '../components/AppBarComponent';

const DefaultHeader = (props) => {
    return (
        <div>
            <DefaultAppBar {...props}>
                <Outlet />
            </DefaultAppBar>
        </div>
    );
}

export default DefaultHeader;