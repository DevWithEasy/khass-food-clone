import React, { useState } from "react";
import {Input} from '../components/Index'
import axios from "axios";
import apiUrl from "../utils/apiUrl";
import {useNavigate} from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate()
  const [value,setValue] = useState({
    name : '',
    email : '',
    phone : '',
    password : '',
    confirmPassword : ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevVelue) => ({
      ...prevVelue,
      [name]: value,
    }));
  };
  const handleSignup = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${apiUrl}/user/signup`,value)
      if(res.data.success === true){
        localStorage.setItem('token',res.data.token)
        navigate('/verification')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return <div className='md:w-1/2 md:mx-auto mx-1 mb-10 border rounded-md'>
    <h2 className='p-2 bg-gray-200 text-center text-2xl rounded-t-md'>Create new account</h2>
    <form
      onSubmit={handleSignup}
      className="p-2 space-y-3"
    >
      <Input {...{
        name : 'name',
        label : 'Name',
        placeholder : 'Enter your name',
        handleChange : handleChange
      }}/>
      <Input {...{
        name : 'email',
        label : 'Email',
        placeholder : 'Enter your email address',
        handleChange : handleChange
      }}/>
      <Input {...{
        name : 'phone',
        label : 'Phone Number',
        placeholder : 'Enter your phone number',
        handleChange : handleChange
      }}/>
      <Input {...{
        name : 'password',
        label : 'Password',
        placeholder : 'Enter you Password',
        handleChange : handleChange
      }}/>
      <Input {...{
        name : 'confirmPassword',
        label : 'Confirm Password',
        placeholder : 'Enter you confirm password',
        handleChange : handleChange
      }}/>
      {value.password === value.confirmPassword ? '' : 
        <p className="text-red-500">Password not match.</p>
      }
      <input 
        type='submit'
        value='Sign up'
        className="px-6 py-2 bg-green-600 text-white rounded cursor-pointer"
      />
    </form>
  </div>;
};

export default SignUp;
