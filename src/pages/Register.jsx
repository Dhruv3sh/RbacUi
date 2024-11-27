import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'
import useCurrentUser from '../context/UserContext'
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setCurrentUser} = useCurrentUser();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignup = (e) => {
    e.preventDefault();
    const postUserInfo = async()=>{
      const hashedPassword = await bcrypt.hash(password, 10);
      const userInfo = {
        name: name,
        email: email,
        role:'user',
        permissions:['Read'],
        status:'Active',
        password: hashedPassword
      }
      try {
        const response = await axios.post('/users', userInfo);
        setCurrentUser(response.data);
        navigate('/');
        toast.success(`Welcome ${name}`, {
          position: "top-center",
          autoClose: 1200,
          theme: "dark",
          hideProgressBar: true
        });
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
    postUserInfo();
    setName("");
    setEmail("");
    setPassword("")
  };

  return (
    <div className='h-screen bg-[url("../images/login2.jpg")] bg-cover bg-center overflow-hidden'>
      <div className=" h-full w-full md:w-1/2 flex flex-col absolute">
        <div className="flex m-4 md:m-10 pl-10 md:pl-1 lg:pl-14 gap-3 ">
          <img
            className=" h-20 w-20 rounded-full"
            src="images/logo.png"
            alt="logo"
          />
          <p className="text-white text-2xl opacity-80 content-center">VRV Security</p>
        </div>

        <div className=" h-auto mt-10 md:mt-10 w-full flex flex-col justify-center items-center">
          <h1 className="h-20 text-3xl text-white font-semibold">Sign Up</h1>
          <form
            onSubmit={handleSignup}
            className="w-full flex flex-col gap-2 items-center text-white"
          >
            <input
              className=" w-70 md:w-80 h-11 rounded-md p-2 text-xl bg-black bg-opacity-50"
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="w-70 md:w-80 h-11 rounded-md p-2 text-xl bg-black bg-opacity-50"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
            <input
              className="w-70 md:w-80 rounded-md p-2 text-xl bg-black bg-opacity-50"
              type={isVisible ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
                className="focus:outline-none absolute right-2 top-3"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            <button
              className="w-32 bg-black rounded-3xl p-2 bg-opacity-80 hover:scale-[1.02] active:scale-[0.98]"
              type="submit"
            >
              Signup
            </button>
          </form>
          <p className="mt-2 text-xl text-white">
            Already have an accout?
            <button
              className="text-yellow-500 cursor-pointer pl-1"
              onClick={() => navigate("/login")}
            >
              {" "}
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
