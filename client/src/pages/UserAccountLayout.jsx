import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/Index'
import React from "react";

const UserAccountLayout = ({ children }) => {
    return <>
        <Header />
        <div
            className='w-11/12 mx-auto py-5 flex justify-between'
        >
            <div
                className='w-3/12 flex flex-col space-y-3'
            >
                <Link to='/profile'>Account info</Link>
                <Link to='/myorders'>My Orders</Link>
                <Link to='/profile/update'>Update info</Link>
            </div>
            <div
                className='w-9/12'
            >
                {children}
            </div>
        </div>
        <Footer />
    </>;
};

export default UserAccountLayout;
