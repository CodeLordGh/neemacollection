import  { useEffect, useState } from 'react';
import axios from "axios"
import Footer from "./Footer"


const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState("")
  const [products, setProducts] = useState([]);

  useEffect( () => {
    const getProducts = async ()=> {
      setIsLoading(true)
      const res = await axios.get('http://localhost:3001/api/products')
    .then(res => {
      setIsLoading(false)
      return res.data
    })
    .catch(err => {
      setIsLoading(false)
      alert(err.message)
      console.log(err)
    });

    setProducts(res)
    }
    getProducts()
    }, [])

    if(isLoading){
      return(
        <div>Loding...</div>
      )
    }
  
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