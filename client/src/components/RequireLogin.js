import useAuth from '../hooks/useAuth';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const RequireLogin = () => {
    const { auth } = useAuth();
    console.log(auth)
    const location = useLocation();
    return (
        auth?.user
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace /> // state={{ from: location }} replace this is used so that after user logs in we can redirect user to page they requested initially
    )
}

export default RequireLogin