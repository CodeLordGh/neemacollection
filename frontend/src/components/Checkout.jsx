import Capture1 from "../assets/capture-1.png"
import Capture2 from "../assets/capture-2.png"
import Rating from "./Rating"

const Checkout = () => {
   return (
    <div className=" flex justify-center flex-row bg-gray-light bg-cover w-full h-screen my-auto font-Outfit">
        <div>
          <div className="flex flex-row">
            <h1 className="text-6xl mt-36 text-gray font-thin">&lt;</h1>
            <img src={Capture1} className="mx-auto w-96 h-56 mt-20 arrow-left"/> 
            <h1 className="text-6xl mt-36 text-gray font-thin">&gt;</h1>
          </div>
          <div className="flex flex-row mt-10 ml-20">
            <img src={Capture1} className="h-20 w-20" />
            <img src={Capture2} className="h-20 w-20 ml-20" />
          </div>
        </div>
        <div className="ml-10">
          <h1 className="font-bold text-xl mt-16 text-gray">Pink and Black Polka Dot Brief Set</h1>
          <p className="mt-4 text-yellow text-shadow-xl ">Ksh. 1200</p>
          <p className="w-72 mt-4 mb-4 text-sm text-gray">The comfortable and stylish brief set features a playful polka dot pattern in pink black. Made from cotton, this set is perfect for everyday wear</p>
          <Rating />
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Size..."
              className="bg-white text-gray mt-4 px-1 py-1 w-60 rounded focus:outline-none"
            />
            <button className="bg-gray text-white mt-4 px-1 py-1 w-60 rounded font-bold">Add to cart</button>
           </div>
           <div className="mt-4">
              <button className="text-gray bg-white px-4 py-1 w-24 rounded font-bold">Gallery</button>
              <button className="text-gray bg-white px-4 py-1 ml-10 w-24 rounded font-bold">Share</button>
           </div>
        </div>

    </div>
  )
}

export default Checkout