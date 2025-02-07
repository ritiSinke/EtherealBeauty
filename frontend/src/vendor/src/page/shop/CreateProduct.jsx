import React, { useState } from 'react';
import { getBaseUrl } from "../../utils/baseURL";


const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    skin_type_suitability: '',
    image: null,  // Store image as a file
    brand: '',
    stock: '',  // Initialize stock as empty string
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null); // For image preview

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];  // Get the selected file
    if (file) {
      setProductData({
        ...productData,
        image: file,  // Store the image file in state
      });
      setPreview(URL.createObjectURL(file));  // Generate image preview
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if all required fields are filled in
    if (!productData.name || !productData.description || !productData.price || !productData.category || !productData.skin_type_suitability || !productData.brand || !productData.stock || !productData.image) {
      setMessage('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('skin_type_suitability', productData.skin_type_suitability);
    formData.append('brand', productData.brand);
    formData.append('stock', productData.stock);  // Include stock in the form data

    // Append the image file to FormData
    if (productData.image) {
      formData.append('image', productData.image);
    }

    const apiUrl = `${getBaseUrl()}/api/products/create-vendor-product`;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });


      const data = await response.json();

      if (response.ok) {
        setMessage('Product created successfully!');

        // Reset the form fields and image preview after successful submission
        setProductData({
          name: '',
          description: '',
          price: '',
          category: '',
          skin_type_suitability: '',
          image: null,
          brand: '',
          stock: '',  // Reset stock
        });
        setPreview(null); // Clear the preview

        // Hide the success message after 5 seconds
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage(data.message || 'Error creating product!');
      }
    } catch (error) {
      setMessage('Error creating product!');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Message Box above the form */}
      {message && (
        <div
          className={`p-4 mb-4 text-center text-lg font-semibold ${message.includes('Error') ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'} border rounded-md`}
        >
          {message}
        </div>
      )}

      <h2 className="text-2xl font-bold text-center mb-6">Create a New Product</h2>
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
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded mt-2 border border-gray-300 shadow-sm" />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-md  btn"
          disabled={isLoading}  // Disable button while loading
        >
          {isLoading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;