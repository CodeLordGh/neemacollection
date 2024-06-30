import Pic1 from "../assets/catalogue/pic1.jpeg"

const OrderList = ({ OrderDate, OrderNumber, Price, image, Title, Status }) => {
  return (
    <div className="pt-4  bg-gray-light h-full w-full absolute bg-cover">
      <div className="bg-off-white w-5/6 mx-auto rounded-xl pb-2">
        <div className="flex flex-row justify-around">
          <h1>Order Date:</h1>
          <h2>Order Number:</h2>
          <h1>Price: </h1>
        </div>
        <div className="mt-4 flex flex-row justify-around">
          <img src={Pic1} className="h-16 w-16"/>
          <div className="ml-4">
            <p> Title:</p>
          </div>
          <p>status:</p>
        </div>
      </div>
    </div>
  )
}

export default OrderList