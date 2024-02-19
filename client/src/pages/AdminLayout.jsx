import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    return (
        <div className='h-screen bg-gray-200'>
            <div className='flex justify-between'>
            <div
                className='h-screen w-3/12 pl-4 overflow-y-auto space-y-3'
            >
                <div>
                    <p className='border-b p-2 font-bold text-2xl text-center'>Daily Needs</p>
                    <p className='bg-gray-300 border-b p-2 font-bold'>Main</p>
                    <NavLink
                        to='/dashboard'
                        className='block my-1 ml-4 px-4 py-2'
                    >
                        Dashboard
                    </NavLink>
                </div>
                <div>
                    <p className='bg-gray-300 border-b p-2 font-bold'>Order</p>
                    <NavLink
                        to='/orders'
                        className='block my-1 ml-2 px-4 py-2'
                    >
                        Orders
                    </NavLink>
                </div>
                <div>
                    <p className='bg-gray-300 border-b p-2 font-bold'>Category</p>
                    <NavLink
                        to='/categories'
                        className='block my-1 ml-2 px-4 py-2'
                    >
                        All categories
                    </NavLink>
                    <NavLink
                        to='/category/add'
                        className='block my-1 ml-2 px-4 py-2'
                    >
                        New category
                    </NavLink>
                </div>
                <div>
                    <p className='bg-gray-300 border-b p-2 font-bold'>Product</p>
                    <NavLink
                        to='/products/all'
                        className='block my-1 ml-2 px-4 py-2'
                    >
                        All products
                    </NavLink>
                    <NavLink
                        to='/products/add'
                        className='block my-1 ml-2 px-4 py-2'
                    >
                        New product
                    </NavLink>
                </div>
                <div>
                    <p className='bg-gray-300 border-b p-2 font-bold'>Users</p>
                    <NavLink
                        to='/users'
                        className='block my-1 ml-2 px-4 py-2'
                    >
                        All users
                    </NavLink>
                </div>
            </div>
            <div
                className='w-9/12 h-screen bg-white overflow-y-auto'
            >
                {children}
            </div>
        </div>
        </div>
    );
};

export default AdminLayout;