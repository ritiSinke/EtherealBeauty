import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getBaseUrl } from '../../utils/baseURL';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    skin_type_suitability: '',
    brand: '',
    stock: '',
    image: '',  // Image filename from the database
  });

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);  // For image preview

  // Fetch the product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/products/${id}`);
        console.log(response.data);  // Log the response to inspect it

        const product = response.data;  // Directly access product data
        setProductData({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          skin_type_suitability: product.skin_type_suitability,
          brand: product.brand,
          stock: product.stock,
          image: product.image || '',  // Save image filename from DB
        });

        // Construct the image preview URL from the filename if available
        if (product.image) {
          const imgurl= `${getBaseUrl()}${product.image}`;
          setPreview(`${getBaseUrl()}${product.image}`);
          console.log(imgurl);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setMessage('Error fetching product details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Handle image change (for new image upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({
        ...productData,
        image: file,  // Set image file for upload
      });
      setPreview(URL.createObjectURL(file));  // Preview the new image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create FormData object for the API request
    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    try {
      const response = await axios.patch(`${getBaseUrl()}/api/products/update-product/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(response.data.message);
      navigate("/dashboard-products"); // Redirect to products list after update
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage('Error updating product');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {message && (
        <div
          className={`p-4 mb-4 text-center text-lg font-semibold ${message.includes('Error') ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'} border rounded-md`}
        >
          {message}
        </div>
      )}

      <h2 className="text-2xl font-bold text-center mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-lg font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Stock</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Skin Type Suitability</label>
          <input
            type="text"
            name="skin_type_suitability"
            value={productData.skin_type_suitability}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded mt-2 border border-gray-300 shadow-sm" />
            </div>
          )}
          {/* Show image from DB if no new image is selected */}
          {productData.image && !preview && (
            <div className="mt-2">
              <img src={`${getBaseUrl()}/uploads/${productData.image}`} alt="Existing Product" className="w-24 h-24 object-cover rounded mt-2 border border-gray-300 shadow-sm" />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-md bg-blue-500"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
