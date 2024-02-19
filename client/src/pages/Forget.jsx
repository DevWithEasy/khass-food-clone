import axios from "axios";
import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import apiUrl from "../utils/apiUrl";
import { Input } from "../components/Index";

const Forget = () => {
    const navigate = useNavigate()
    const { token, code } = useParams();
    const [value, setValue] = useState({
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue((prevVelue) => ({
            ...prevVelue,
            [name]: value,
        }));
    };

    const handleReset = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`${apiUrl}/user/reset_password`, { ...value, code }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            if (res.data.status === 200) {
                navigate('/signin')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return <div className='md:w-1/2 md:mx-auto mx-1 my-10 border rounded-md'>
        <h2 className='p-2 bg-green-600 text-white text-center text-2xl rounded-t-md'>Reset Password</h2>
        <form
            onSubmit={handleReset}
            className="p-2 space-y-3"
        >
            <Input {...{
                name: 'password',
                label: 'New Password',
                placeholder: 'password',
                handleChange: handleChange
            }} />
            <Input {...{
                name: 'confirmPassword',
                label: 'Confirm Password',
                placeholder: 'confirm password',
                handleChange: handleChange
            }} />
            {value.password === value.confirmPassword ? '' :
                <p className="text-red-500">Password not match.</p>
            }
            <input
                type='submit'
                value='Reset'
                className="px-6 py-2 bg-green-600 text-white rounded cursor-pointer"
            />
        </form>
    </div>;
};

export default Forget;
