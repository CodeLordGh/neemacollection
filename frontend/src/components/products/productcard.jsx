import React from 'react';

const ProductCard = ({ image, title, description, buttonText }) => {
  return (
    <div className="mt-4 bg-light-pink flex flex-row mx-auto w-auto h-64 text-gray rounded-2xl font-pacifico ">
      <img src={image} className="w-40 h-40 mx-auto my-auto" alt={title} />
      <div className="text-center my-auto mx-auto w-56">
        <h1 className="font-bold">{title}</h1>
        <p className="mt-4">{description}</p>
        <button className="mt-4 font-bold bg-gray text-white px-3 py-2 rounded-3xl">{buttonText}</button>
      </div>
    </div>
  );
};

export default ProductCard;