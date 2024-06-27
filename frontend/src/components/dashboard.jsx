//dashboard.jsx
import { createContext, useEffect, useState } from "react";
 import { Link, Outlet, useLocation } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001", {
  logLevel: 'warn', // or 'error'
});

export const productsContext = createContext()
const Dashboard = () => {
  let [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("neematoken")

  const location = useLocation().pathname

const [insights, setInsights] = useState([{}])
  // On page load, get list of products from the backend using WebSocket
  useEffect(() => {
    const interval = setInterval(async () => {      
      try {
        socket.emit("get_all_products");
        socket.on("get_all_products_response", (response) => {
          if (response.message) {
            setError(response.message);
          } else {
            setProducts(response);
            setInsights(
              [
                {
                  name: "Total Sales",
                  value: "KHs 45,231.89",
                  percentage: "+20.1% from last month",
                },
                {
                  name: "Total Orders",
                  value: "+124",
                  percentage: "+8.1% from last month",
                },
                {
                  name: "Total Products",
                  value: response.length,
                  percenatge: "",
                },
                {
                  name: "Total Customers",
                  value: "+2350",
                  percentage: "+180.1% from last month",
                },
              ]
            )
          }
        });
      } catch (error) {
        setError(error.message);
      }
    }, 3000);
  
    return () => {
      clearInterval(interval);
      socket.off("get_all_products_response");
    };
  }, [token]);

  if(error) {
    return <div>Error fetching! make sure you&apos;re logged in!</div>
  }

  const components = [

     "overview", "reports","notifications","products"
  ];
  return (
    <productsContext.Provider value={{products}}>
      <div className="text-[#333]">
      <div className="flex bg-[#F6EDF3] gap-3 h-[calc(100vh-72px)] ">
        <aside className="max-w-[30%] min-w-[20%] text-white h-[calc(100vh-72px)] flex flex-col justify-between border-r-4 border-t-4 border-b-4 rounded-tr-2xl rounded-br-2xl">
          <div>
            <h1 className="text-[#333] font-extrabold text-3xl pl-4 mb-4">
              Dashboard
            </h1>
            <ul>
              {components.map((component) => (
                <li
                  key={component}
                  className={`px-4 py-2 ${
                    component === location ? "bg-[#FA61D0]" : ""
                  } text-[#333]`}
                >
                  <Link
                    to={component}
                  >
                    {component.charAt(0).toUpperCase() + component.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center mb-5">
            <button className="bg-[#FA61D0] text-white py-3 px-6 rounded-2xl">
              Logout
            </button>
          </div>
        </aside>
        <main className="w-full h-[calc(100vh-72px)]">
          <div className=" flex gap-4 mb-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="flex-1 flex justify-between flex-col bg-white h-5vh rounded-2xl px-2 py-3"
              >
                <p>{insight.name}</p>
                <p>{insight.value}</p>
                <p>{insight.percentage}</p>
              </div>
            ))}
          </div>
          <div className="w-full border-x-4 border-y-4 rounded-2xl h-[calc(100%-120px)]">
            <Outlet />
          </div>
        </main>
      </div>
      <div className="flex items-center justify-center w-full bg-[#F6EDF3] h-24">
        <p>© 2024 Neema Collection</p>
      </div>
    </div>
    </productsContext.Provider>
  );
};

export default Dashboard;
