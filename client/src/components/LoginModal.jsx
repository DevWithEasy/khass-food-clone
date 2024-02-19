import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import apiUrl from "../utils/apiUrl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Index";
import { Link } from "react-router-dom";
import useUserStore from "../store/userStore";

const LoginModal = ({ view, handleView }) => {
  const {setLogin} = useUserStore()
  const navigate = useNavigate()
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
    e.preventDefault()
    try {
      const res = await axios.post(`${apiUrl}/user/signin`, value);
      if (res.data.success === true) {
        localStorage.setItem('token', res.data.token)
        if (res.data.data.isVerified === false) {
          handleView()
          return navigate('/verification')
        }
        setLogin(res.data.data)
        console.log(res.data.data)
        handleView()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={view} onClose={handleView}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign in</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
          </ModalBody>

          <ModalFooter className="border-t space-x-3">
            <Link
              to='/signup'
              onClick={handleView}
              className="p-2 w-full bg-yellow-500 text-white text-center rounded uppercase"
            >
              Create new account
            </Link>
            <Link
              to='/find'
              onClick={handleView}
              className="p-2 w-full bg-red-500 text-white text-center rounded uppercase"
            >
              Forget Password
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
