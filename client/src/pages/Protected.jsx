import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUserStore from '../store/userStore';

const Protected = ({children}) => {
    const {isAuth} = useUserStore()
    const location = useLocation()
    return isAuth ? children : <Navigate to='/signin' replace state={{from : location}}/>
};

export default Protected;