import { useState } from "react";
import BusinessLogoBlack from "../assets/NeemaCollection-color_black.svg";
import GoogleLogo from "../assets/google.png";

const Signup = ({ onNext, setStep }) => {
  const [signupData, setSignupData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(signupData);
    setSignupData({});
    setStep(2);
    e.target.reset();
  };  

  return (
    <div className="rounded-r-md bg-white w-96 h-96">
      <img src={BusinessLogoBlack} className="w-44 mb-0 flex-2 mx-auto" />
      <div className="flex flex-col flex-1">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="name" className="font-bold text-lg ml-24 text-gray">
            Name
          </label>
          <input
            name="username"
            id="name"
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
            className="bg-gray-light w-48 h-6 text-left ml-24 focus:outline-none"
          />
          <label
            htmlFor="phone"
            className="font-bold text-lg mt-3 text-left ml-24 text-gray"
          >
            Phone number
          </label>
          <input
            name="phone"
            type="tel"
            maxLength="10"
            minLength="10"
            pattern="[0-9]{10}"
            onChange={(e) =>
              setSignupData({ ...signupData, phone: e.target.value })
            }
            id="phone"
            className="bg-gray-light w-48 h-6  text-left ml-24 focus:outline-none"
          />
          <button
            type="submit"
            className={`bg-light-pink w-20 mt-3 h-8 mx-auto text-center text-white font-bold rounded-md text-lg`}
            disabled={ !signupData.username || !signupData.phone}
          >
            Next
          </button>
        </form>
        <hr className="border-black mt-8"></hr>
        <img src={GoogleLogo} className="w-5 mx-auto mt-4"></img>
      </div>
    </div>
  );
};
export default Signup;