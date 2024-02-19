import {Header,Footer} from '../components/Index'
import React from "react";

const Layout = ({children}) => {
  return (
    <div
      className=''
    >
      <Header/>
      <div
        className='w-11/12 mx-auto py-5'
      >
        {children}
      </div>
      <Footer/>
    </div>
  )
};

export default Layout;
