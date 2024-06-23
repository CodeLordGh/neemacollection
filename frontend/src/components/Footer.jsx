import React from 'react'
import Mpesa from "../assets/mpesa-logo.png";
import Stripe from "../assets/stripe.png";



const Footer = () => {
  return (
    <div className="mt-28 bg-off-white">
      <div className="flex flex-row justify-around text-gray mb-4">
        <div >
            <h1 className="font-bold">NEEMA COLLECTIONS</h1>
            <p> +254 797 528 444</p>
            <p>Sawa Mall, Shop C8, 3rd floor </p>
            <p>Moi Avenue, Nairobi</p>
            <p>Kenya</p>
        </div>
        <div>
            <h1 className="font-bold">MY ACCOUNT</h1>
            <p>My account</p>
            <p>Manage my orders</p>
        </div>
        <div>
            <h1 className="font-bold">USEFUL LINKS</h1>
            <p> About Us</p>
            <p>Blogs</p>
            <p>FAQs</p>
        </div>
        <div>
            <h1 className="font-bold">CUSTOMER SERVICE</h1>
            <p> Terms & Conditions</p>
            <p>Privacy Policy</p>
        </div>
      </div>
      <div className="bg-gray-medium flex flex-row justify-around pt-4 pb-4 text-white mx-auto">
        <div>
            <p>Your choice, is our best option</p>
        </div>
        <div className="flex flex-row justify-around">
            <img src={Mpesa} className="h-8 w-20 "/>
            <img src={Stripe} className="h-8 w-20 ml-4"/>
        </div>
        <div>
            <p>Copyright-2024 Neema Collection</p>
            
            <p>Designed by KashTech Solutions</p>
        </div>
      </div>
    </div>
  )
}

export default Footer