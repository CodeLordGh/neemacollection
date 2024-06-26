import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Navbar from "./components/Navbar2";
import Homepage from "./components/Homepage";
import Overview from "./components/dashboard/overview";
import Analitics from "./components/dashboard/analitics";
import Reports from "./components/dashboard/reports";
import Notifications from "./components/dashboard/notifications";
import Products from "./components/dashboard/products";
import AddProducts from "./components/products/addProducts";
import ProductList from "./components/products/productlist";
import Checkout from "./components/Checkout";
import axios from "axios";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/auth/signup" element={<Auth />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/dashboard" element={<RequireAdmin><Dashboard /></RequireAdmin>} >
          <Route
            index
            element={
              <Navigate to="overview" replace />
            }
          />
            <Route path="overview" element={<Overview />}/>
            <Route path="products/*" element={<Products />} >
            <Route
            index
            element={
              <Navigate to="productslist" replace />
            }
          />
              <Route path="productslist" element={<ProductList />} />
              <Route path="add" element={<AddProducts />} />
            </Route>
            <Route path="analitics" element={<Analitics />}/>
            <Route path="reports" element={<Reports />}/>
            <Route path="notifications" element={<Notifications />}/>
          </Route>            
          <Route path="/" element={<Homepage />} />
          <Route path="checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


// Higher-order component to protect routes
// function RequireAuth({ children }) {
//   const isLoggedIn = sessionStorage.getItem(jwt);
//   if (!isLoggedIn) {
//     return <Navigate to="/auth/login" replace />;
//   }
//   return children;
// }

// Higher-order component to protect admin routes
async function RequireAdmin ({ children }) {
  let authInfo
  
  await axios.get("http://localhost:3001/api/auth", {
    headers: `Authorization: Bearer ${localStorage.getItem("neematoken")}`
  }).then((res) => authInfo= res.data)
  .catch((err) => {
    console.log(err)
    alert(err.message)
    return
  })

  if (!authInfo.isAuthenticated ) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}

export default App;