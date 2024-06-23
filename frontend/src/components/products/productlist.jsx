import { useContext } from "react";
import { productsContext } from "../dashboard";

const ProductList = () => {

  const {products} = useContext(productsContext)

  if (!products) {
    return <div>No products available</div>;
  }

  return (
    <div className="mt-4">
      {
        products.map((product) => (
          <div
            key={product._id}
            className="flex justify-between mx-8"
          >
            <p>{product.title}</p>
            <p>{product.stock}</p>
             </div>
        ))
      }
    </div>
  );
};

export default ProductList;