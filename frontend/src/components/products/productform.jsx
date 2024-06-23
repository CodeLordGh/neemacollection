import React, { useState } from 'react';

const ProductForm = ({ addProduct }) => {
  const [product, setProduct] = useState({
    image: '',
    title: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product);
    setProduct({
      image: '',
      title: '',
      description: '',
      price: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col bg-light-pink p-4 rounded-2xl">
      <input
        type="text"
        name="image"
        value={product.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="mb-2 p-2 rounded"
      />
      <input
        type="text"
        name="title"
        value={product.title}
        onChange={handleChange}
        placeholder="Title"
        className="mb-2 p-2 rounded"
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
        className="mb-2 p-2 rounded"
      />
      <input
        type="text"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        className="mb-2 p-2 rounded"
      />
      <button type="submit" className="bg-gray text-white px-3 py-2 rounded-3xl">Add Product</button>
    </form>
  );
};

export default ProductForm;