//products.jsx
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Products = () => {
  const [activeProdAct, setActiveProdAct] = useState("/dashboard/products");

  const productActs = [
    {
      name: "products",
      link: "productslist",
    },
    {
      name: "Add product",
      link: "add",
    },
  ];

  return (
    <div>
      <ul className="px-4 flex justify-between text-lg font-bold underline mb-1 mt-3 text-[#FA61D0]">
        {productActs.map((product) => (
          <Link
            key={product.name} // Add a unique key here
            to={product.link}
            className={`px-4 cursor-pointer ${
              product.name === activeProdAct
                ? "bg-[#FA61D0] text-white px-2 py-1 rounded-md"
                : ""
            }`}
            onClick={() => {
              // navigate to the activeProdAct
              setActiveProdAct(product.link)}}
          >
            {product.name}
          </Link>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default Products;
