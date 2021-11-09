import * as React from 'react';
import { Outlet, Link } from "react-router-dom";
import DefaultAppBar from './../components/DefaultAppBar';

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