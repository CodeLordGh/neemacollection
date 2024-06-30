import React, { useState } from 'react';

const Settings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const togglePaymentVisibility = () => {
    setIsPaymentVisible(!isPaymentVisible);
  };

  return (
    <div className="pt-10 bg-gray-light w-full min-h-screen absolute">
      <div className="flex flex-col">
        <h1 className="font-bold ml-4">Account Settings</h1>
        <button 
        className="bg-gray text-white px-2 py-2 rounded ml-4 font-bold mt-4"
          onClick={toggleVisibility}>
          {isVisible ? 'Hide Account Settings' : 'Show Account Settings'}
        </button>
        {isVisible && (
          <div className="ml-64 mt-2 text-sm">
            <h2 className="font-bold mt-2">Names</h2> 
            <p className="mt-2">Your names are <span className="font-bold">Peris Muniu</span> <a className="ml-4 text-blue-500 font-bold" href="#">change</a></p>
            <h2 className="font-bold mt-2">Phone Number</h2> 
            <p className="mt-2">Your phone number is <span className="font-bold">0723167757</span> <a className="ml-4 text-blue-500 font-bold" href="#">change</a></p>
            <h2 className="font-bold mt-2">Email address</h2>
            <p className="mt-2">Your email address is <span className="font-bold">peris.muniu@gmail.com</span> <a className="ml-4 text-blue-500 font-bold" href="#">change</a></p>
            <h2 className="font-bold mt-4">Password <a className="ml-4 text-blue-500" href="#">Hide</a></h2> 
            <div className="flex flex-row">
              <div className="mt-2">
                <p>New Password</p>
                <input
                  name="password"
                  id="password"
                  className="mt-2 w-40 rounded focus:outline-none"
                />
              </div>
              <div>
                <p className="mt-2 ml-4 focus:outline-none">Current Password</p>
                <input
                  name="password"
                  id="password"
                  className="mt-2 ml-4 w-40 rounded focus:outline-none"
                />
              </div>
            </div>
            <p className="mt-2">Can't remember your current password? <a href="#">Reset your password</a></p>
            <button className="bg-gray text-white px-2 py-2 rounded font-bold mt-2">Save Password</button>
            <h2 className="mt-2 font-bold mb-4">Delete Account</h2>
            <p>Would you like to delete your account?</p>
            <a className="text-red-500" href="#">I want to delete my account</a>
        </div>
      )}
      </div>
      <div className="flex flex-col mt-6">
      <h1 className="font-bold ml-4 mt-4">Payment settings</h1>
      <button 
        className="bg-gray text-white px-2 py-2 rounded ml-4 mt-4 font-bold"
        onClick={togglePaymentVisibility}>
        {isPaymentVisible ? 'Hide Payment Settings' : 'Show Payment Settings'}
      </button>
      {isPaymentVisible && (
        <div className="ml-64 mt-2 text-sm">
          <h2 className="font-bold mt-2">Mpesa Phone Number</h2> 
          <p className="mt-2 mb-4">Your mpesa phone number is <span className="font-bold">0723167757</span> <a className="ml-4 text-blue-500 font-bold" href="#">change</a></p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Settings;