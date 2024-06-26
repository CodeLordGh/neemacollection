import  { useEffect, useState } from 'react';
import axios from "axios"
import Footer from "./Footer"
import ProductItem from './products/productitem';
import ProductCard from './products/productcard';


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
    <div className="bg-off-white min-h-screen p-4 bg-cover">
      <div className="container mx-auto">
        {products.length > 0 && (
          <ProductCard 
          key={products[0].id}
          image={products[0].image}
          title={products[0].title}
          description={products[0].description}
          buttonText="SHOP NOW"

        />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 ml-14">
          {products.map((pro, index) => (
            <ProductItem
              key={index}
              image={pro.image}
              name={pro.title}
              price={pro.price}
              buttonText="SHOP NOW"
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;