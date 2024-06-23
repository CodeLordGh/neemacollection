import Signup from "./Signup";
import SignUpIcon from "../assets/signup.png";
import Signup2 from "./Signup2";
import { Link } from "react-router-dom";
import { useState } from "react";

const Auth = () => {
  let [step, setStep] = useState(1);
  const [signupData, setSignupData] = useState({});

  const handleNext = (data) => {
    // Dispatch the register action with the signupData
    console.log(`auth component data: ${data}`)
    setSignupData(data)
  };

  return (
    <>
      <div className="bg-off-white bg-cover absolute inset-0 h-screen w-full">
        {/* The signup page is centered on the screen with a background image. */}
        <h1 className="bg-#FFFFF-500 mt-10 text-center font-Pacifico text-lg text-gray">
          neema collection
        </h1>
        <div className="flex flex-row mt-10 justify-center font-Outfit">
          <div className="bg-gray-light flex flex-row w-96 rounded-l-md">
            <img src={SignUpIcon} className="w-64 mx-auto my-auto h-56"></img>
            {/* The signup button is rendered in the top right corner of the signup page. */}
            <div className="mt-32 flex flex-col content-end ml-3 px-auto py-auto">
              <Link to="/auth/login">
                <button className="text-gray font-bold text-lg content-end px-2 py-1">
                  Login
                </button>
              </Link>
              <button className="text-white bg-light-pink font-bold rounded-l-md text-lg mt-4  px-2 py-1">
                Signup
              </button>
            </div>
          </div>
          {/* If the URL contains "signup" and the step is 1, then the Signup component is rendered. */}
          {step === 1 ? (
            <Signup onNext={handleNext} setStep={setStep} />
          ) : (
            <Signup2 signupData={signupData} setSignupData={setSignupData} buttonText={"Signup"} />
          )}
        </div>
      </div>
    </>
  );
};
export default Auth;
