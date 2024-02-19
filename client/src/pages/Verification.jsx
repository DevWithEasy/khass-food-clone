import React, { useState } from "react";
import { Input } from "../components/Index";
import apiUrl from "../utils/apiUrl";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Verification = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState({
        code: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue((prevVelue) => ({
            ...prevVelue,
            [name]: value,
        }));
    };
    const handleVerify = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`${apiUrl}/user/verify`, value, {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (res.data.success === true) {
                console.log(res.data.message)
                navigate('/signin')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSendCodeAgain = async () => {
        if (!localStorage.getItem('token')) {
            console.log('Token not found. First Login or create account.')
        }
        try {
            const res = await axios.post(`${apiUrl}/user/send_code_again`, value, {
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (res.data.success === true) {
                console.log(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='md:w-1/2 md:mx-auto mx-1 my-5 mb-40 border rounded-md'>
            <h2 className='p-2 bg-green-600 text-white text-center text-2xl rounded-t-md'>Verify account</h2>
            <form
                onSubmit={handleVerify}
                className='p-2 space-y-2'
            >
                <Input
                    {...{
                        name: "code",
                        label: "Verification Code",
                        placeholder: "Enter your verification code",
                        handleChange: handleChange,
                    }}
                />
                <input
                    type='submit'
                    value='Verify'
                    className="px-6 py-2 bg-green-600 text-white rounded cursor-pointer"
                />
            </form>
            <button
                onClick={handleSendCodeAgain}
                className='p-2 text-red-500'>
                Send code again
            </button>
        </div>
    );
};

export default Verification;
