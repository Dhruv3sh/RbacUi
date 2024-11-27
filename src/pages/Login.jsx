import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import useCurrentUser from "../context/UserContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useCurrentUser();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data: users } = await axios.get("/users");
      const user = users.find((u) => u.email === email);

      if (!user) {
        toast.error("Incorrect email", {
          position: "top-center",
          autoClose: 1200,
          theme: "dark",
          hideProgressBar: true,
        });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        toast.error("Incorrect password", {
          position: "top-center",
          autoClose: 1200,
          theme: "dark",
          hideProgressBar: true,
        });
        return;
      }
      setCurrentUser(user);
      if (user.role === "admin") {
        navigate("/admin-dashboard");
        toast.success("Welcome admin", {
          position: "top-center",
          autoClose: 1200,
          theme: "dark",
          hideProgressBar: true,
        });
      } else {
        navigate("/");
        toast.success(`Welcome ${user.name}`, {
          position: "top-center",
          autoClose: 1200,
          theme: "dark",
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1200,
        theme: "dark",
        hideProgressBar: true,
      });
      console.error("error during login:", error);
    }
  };

  return (
    <div className='h-screen bg-[url("../images/login2.jpg")] bg-cover bg-center overflow-hidden '>
      <div className=" h-full w-full md:w-1/2 flex flex-col">
        <div className="flex m-4 md:m-10 pl-8 md:pl-1 lg:pl-14 gap-3">
          <img
            className=" h-20 w-20 rounded-full "
            src="images/logo.png"
            alt="logo"
          />
          <p className="text-white text-2xl opacity-80 content-center">
            VRV Security
          </p>
        </div>

        <div className="h-auto mt-10 md:mt-10 w-full flex flex-col justify-center items-center">
          <h1 className="h-20 text-3xl text-white font-semibold">Login</h1>
          <form
            onSubmit={handleForm}
            className="w-full flex flex-col gap-2 items-center text-white"
          >
            <input
              className="w-70 md:w-80 h-11 rounded-md p-2 text-xl bg-black bg-opacity-50"
              type="email"
              value={email}
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                className="w-70 md:w-80 h-11 rounded-md p-2 text-xl bg-black bg-opacity-50 "
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
              Login
            </button>
          </form>
          <p className="mt-2 text-xl text-white">
            Dont't have an accout?
            <span
              className="text-yellow-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              {" "}
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
