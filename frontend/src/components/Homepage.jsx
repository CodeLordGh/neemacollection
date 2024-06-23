import  { useEffect, useState } from 'react';
import axios from "axios"
import Footer from "./Footer"


const Homepage = () => {
  useEffect( () => {
    const getProducts = async ()=> {
      const res = await axios.get('http://localhost:3001/api/products')
    .then(res => res.data)
    .catch(err => console.log(err));

    setProducts(res)
    }
    getProducts()
    }, [])
  const [products, setProducts] = useState([]);
  return (
    <div className="bg-off-white absolute w-full h-100vh p-4 bg-cover">
      <div className="w-7/12 mx-auto">
        {products.map((pro, index) => (
          <div key={index}>{pro.title}
          <img src={pro.image} alt="product image" /></div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;