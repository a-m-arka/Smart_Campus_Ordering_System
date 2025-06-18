import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext.js';
import AccessDenied from '../PopUps/accessDenied.jsx';

const PrivateRoute = ({ allowed }) => {
    const navigate = useNavigate()
    const { isLoggedIn, userRole } = useGlobalContext();

    const onClose = () => {
        navigate(-1);
    };

    if (allowed.includes(userRole)) {
        return <Outlet />;
    }

    if (!isLoggedIn) {
        return <AccessDenied canLogin={true} onClose={onClose}/>;
    }
    return <AccessDenied canLogin={false} onClose={onClose}/>;
}

export default PrivateRoute
