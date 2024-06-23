import React from 'react';

const ProductItem = ({ image, name, price, buttonText }) => {
  return (
    <div>
      <div className="px-3 py-3 bg-white w-40 rounded-2xl font-bold">
      <img src={image} className="w-28 h-28 mx-auto" alt={name} />
      <p className="mt-2 text-center">{name}</p>
      <p className="mt-2 text-center">Price: {price}</p>
      <button className="mt-2 bg-light-pink px-2 py-2 text-white rounded-2xl ml-5">{buttonText}</button>
      </div>
    </div>
    
  );
};

export default ProductItem;