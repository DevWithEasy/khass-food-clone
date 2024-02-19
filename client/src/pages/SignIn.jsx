import axios from "axios";
import React, { useState } from "react";
import { Input } from "../components/Index";
import apiUrl from "../utils/apiUrl";
import {useLocation, useNavigate } from 'react-router-dom'
import useUserStore from "../store/userStore";
import { Link } from "react-router-dom";
const SignIn = () => {
  const {setLogin} = useUserStore()
  const navigate = useNavigate ()
  const location = useLocation()
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevVelue) => ({
      ...prevVelue,
      [name]: value,
    }));
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/user/signin`, value);
      if (res.data.success === true) {
        localStorage.setItem('token', res.data.token)
        if(res.data.data.isVerified === false){
          return navigate('/verification')
        }
        setLogin(res.data.data)
        if (location.state?.from) {
          navigate(location.state.from)
      } else {
          navigate('/')
      }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='md:w-1/2 md:mx-auto mx-1 my-10 border rounded-md'>
      <h2 className='p-2 bg-gray-200 text-center text-2xl rounded-t-md'>Create new account</h2>
      <form onSubmit={handleSignIn} className="p-2 space-y-3">
        <Input
          {...{
            name: "email",
            label: "Phone Number",
            placeholder: "Enter your email or phone number",
            handleChange: handleChange,
          }}
        />
        <Input
          {...{
            name: "password",
            label: "Password",
            placeholder: "Enter you Password",
            handleChange: handleChange,
          }}
        />

        <input
          type="submit"
          value="Sign in"
          className="px-6 py-2 bg-green-600 text-white rounded cursor-pointer"
        />
      </form>
      <p className="p-2">
        You have not an account ? 
        <Link 
          to='/signup'
          className="px-2 text-blue-500"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
