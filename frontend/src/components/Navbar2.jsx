import { Link } from "react-router-dom"
import Logo from "../assets/NeemaCollection-Logo-color_white.svg";
import Cart from "../assets/cart.svg";
import Person from "../assets/person.svg"


const Navbar = () => {
  return (
    <div className="h-14 bg-gray flex flex-row ">
      <img src={Logo} className="h-14 w-52"/>
      <h1 className="text-white mx-auto my-auto">Search</h1>
      <div className="flex flex-row">
        <img src={Person} className="h-10 my-auto"/>
        <h1 className="text-white my-auto ml-5">Kshs. 250</h1>
        <img src={Cart} className="h-10 my-auto ml-5 mr-5"/>
      </div>
  
    </div>
  )
}

export default Navbar