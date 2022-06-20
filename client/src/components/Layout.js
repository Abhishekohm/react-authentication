import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="main vh-100">
            <Outlet />
        </div>
    )
}

export default Layout