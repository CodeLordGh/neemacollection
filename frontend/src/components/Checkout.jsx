import Capture1 from "../assets/capture-1.png"
import Capture2 from "../assets/capture-2.png"
import Rating from "./Rating"

const Checkout = () => {
   return (
    <div className="flex flex-row">
        <div>
          <img src={Capture1} className="h-56 w-56"/>
          <div className="flex flex-row mt-4">
            <img src={Capture1} className="h-20 w-20 "/>
            <img src={Capture2} className="h-20 w-20"/>
          </div>     
          <div>
            <h1>Pink and Black Polka Dot Brief Set</h1>
            <p>Ksh. 1200</p>
            <p>Brief description of the product</p>
            <Rating />
            <input/>
            <div>
              <button>Add to Cart</button>
              <div>
                <button>Gallery</button>
                <button>Share</button>
              </div>
            </div>          
          </div>   
        </div>
    </div>
  )
}

export default Checkout