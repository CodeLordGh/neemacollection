import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState(null)

    useEffect(() => {
        const getOrders = async () => {
          setIsLoading(true);
        //   axios.defaults.withCredentials = true; // Set withCredentials to true
          const res = await axios.get('http://localhost:3001/api/orders', {
            withCredentials: true
          })
           .then(res => {
              setIsLoading(false);
              return res.data;
            })
           .catch(err => {
              setIsLoading(false);
              alert(err.message);
              console.log(err);
            });
          setOrders(res);
        };
        getOrders();
      }, []);
  return (
    <div>
      <h1>Orders</h1>
      {isLoading && <div>Loading...</div>}
      {!isLoading && orders.length === 0 && <div>No orders found</div>}
      {!isLoading && orders.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Orders