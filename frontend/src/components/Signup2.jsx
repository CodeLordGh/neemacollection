import axios from "axios";
import BusinessLogoBlack from "../assets/NeemaCollection-color_black.svg";
import GoogleLogo from "../assets/google.png";
import { useNavigate } from "react-router-dom";

const Signup2 = ({ buttonText, signupData, setSignupData }) => {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(signupData)
    try {
      const res = await axios.post("http://localhost:3001/api/auth/register",
        signupData
      )
      res.data.isAdmin? navigate("/dashboard") : navigate("/")
    } catch (error) {
      console.log(error)
      alert("Error registering. Pease try again in few minutes")
    }
  };

  return (

    <div className="rounded-r-md bg-white w-96 h-96">
      <img src={BusinessLogoBlack} className="w-44 mb-0 flex-2 mx-auto" />
      <div className="flex flex-col flex-1">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email" className="font-bold text-lg mt-3 text-left ml-24 text-gray">
            Email
          </label>
          <input
            name="email" // The name and id attributes are used to reference the form input in the onChange function
            id="email"
            onChange={(e) => setSignupData({...signupData, email: e.target.value})} // This function is called whenever the user types in the form input
            type="email"
            className="bg-gray-light w-48 h-6 text-left ml-24 focus:outline-none"
          />
          <label
            htmlFor="password" // The label is used to label the form input
            className="font-bold text-lg mt-3 text-left ml-24 text-gray"
          >
            Password
          </label>
          <input
            name="password" // The name and id attributes are used to reference the form input in the onChange function
            id="password"
            onChange={(e) => setSignupData({...signupData, password: e.target.value})} // This function is called whenever the user types in the form input
            className="bg-gray-light w-48 h-6  text-left ml-24 focus:outline-none"
            type="password"
          />
          <button
            type="submit" // The button is of type submit, which means it will submit the form when clicked
            className="bg-light-pink w-20 mt-3 h-8 justify-center text-center mx-auto text-white font-bold rounded-md text-lg"
          >
            {buttonText} {/* Signup */}
          </button>
        </form>
        <hr className="border-black mt-8"></hr>
        <img src={GoogleLogo} className="w-5 mx-auto mt-4"></img>
      </div>
    </div>
  );
};
export default Signup2;