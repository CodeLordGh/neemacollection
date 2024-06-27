import { Link, useNavigate } from "react-router-dom";
import SignUp from "../assets/signup.png";
import BusinessLogoBlack from "../assets/NeemaCollection-color_black.svg";
import GoogleLogo from "../assets/google.png";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({email: "", password: ""}); // Initialize as empty object
  const [isLoading, setIsLoading] = useState(false); // Initialize as false

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(loginData)
      const res = await axios.post("http://localhost:3001/api/auth/login", loginData);
      console.log(res.data)
      localStorage.setItem("neematoken", res.data.token)
      setIsLoading(false)
      res.data.isAdmin ? navigate("/dashboard") : navigate("/");
    } catch (error) {
      alert("Error logging in. Please try again in a few minutes");
      setIsLoading(false); // Reset isLoading state on error
    }
  };

  return (
    <div className="bg-off-white bg-cover absolute inset-0 h-screen w-full text-lg">
      <h1 className="font-Pacifico mt-10 text-center text-lg text-gray">
        neema collection
      </h1>
      <div className="flex flex-row mt-10 justify-center font-Outfit">
        <div className="bg-gray-light flex flex-row w-96 rounded-l-md h-96">
          <img src={SignUp} key="signup" className="w-64 mx-auto my-auto h-56" />
          <div className="mt-32 flex flex-col content-end ml-3 px-auto py-auto">
            <button className="text-white bg-light-pink font-bold rounded-l-md text-lg px-2 py-1">
              Login
            </button>
            <Link to="/auth/signup">
              <button className="text-gray-800 mt-4 font-bold text-lg text-gray">
                SignUp
              </button>
            </Link>
          </div>
        </div>
        <div className="rounded-r-md bg-white w-96">
          <img src={BusinessLogoBlack} key="business-logo" className="w-44 mb-0 flex-2 mx-auto" />
          <div className="flex flex-col flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="email" className="font-bold text-lg ml-24 text-gray">
                Email
              </label>
              <input
                name="email"
                value={loginData.email} // Add value prop
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                id="email"
                className="bg-gray-light w-48 h-6 text-left ml-24 focus:outline-none"
              />
              <label
                htmlFor="password"
                className="font-bold text-lg mt-3 text-left ml-24 text-gray"
              >
                Password
              </label>
              <input
                name="password"
                value={loginData.password} // Add value prop
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                id="password"
                className="bg-gray-light w-48 h-6  text-left ml-24 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-light-pink w-20 mt-3 h-8 mx-auto text-center text-white font-bold rounded-md text-lg py-1"
              >
                {isLoading ? "Logging in..." : "Welcome"}
              </button>
            </form>
            <hr className="border-gray mt-8"></hr>
            <img src={GoogleLogo} key="google-logo" className="w-5 mx-auto mt-4"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;