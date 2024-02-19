import axios from 'axios';
import { useState } from 'react';
import apiUrl from '../utils/apiUrl';
import { useNavigate } from 'react-router-dom';


const Find = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [user, setUser] = useState()

    const handleFindAccount = async (e) => {
        e.preventDefault()
        if(!email){
            return alert("Please enter your email address")
        }
        try {
            const res = await axios.get(`${apiUrl}/user/find/account?q=${email}`)
            if (res.data.status === 200) {
                setUser(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSendForget = async () => {
        try {
            const res = await axios.post(`${apiUrl}/user/forget/${user?._id}`)
            if (res.data.status === 200) {
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='md:w-1/2 md:mx-auto mx-1 my-10 mb-40 border rounded-md'>
            <h2 className='p-2 bg-green-600 text-center text-white'>Find Account</h2>
            <form
                onSubmit={handleFindAccount}
                className='m-2 flex flex-col rounded-md'
            >
                <input
                    type='text'
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full p-2 focus:outline-none border rounded-t-md'
                    placeholder='Find by email or phone'
                />
                <button
                    type='submit'
                    className='w-full px-4 py-2 bg-gray-300 rounded-b-md'
                >
                    Find account
                </button>
            </form>
            {user &&
                <div className='m-2 p-2 flex  space-x-4 border rounded'>
                    <img src={user?.image} className='h-16 w-16 rounded-full' />
                    <div>
                        <p>{user?.name}</p>
                        <p>{user?.name}</p>
                        <div className='mt-3 space-x-3'>
                            <button
                                onClick={handleSendForget}
                                className='px-4 py-2 bg-red-400 text-white rounded-md'
                            >
                                Forget
                            </button>
                            <button
                            onClick={()=>setUser(null)}
                                className='px-4 py-2 bg-gray-400 text-white rounded-md'
                            >
                                Not my accound
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Find;