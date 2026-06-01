import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/Authcontext.jsx';
import { useNavigate } from 'react-router-dom';
// import {createProduct} from '../services/AdminService.js';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please select an image');
    
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      
      if (res.status === 201 || res.status === 200) {
        alert('Product created successfully with Cloudinary Image URL!');
        navigate('/shop');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error creating product');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full p-3 bg-zinc-950 border border-zinc-800 rounded-md text-white text-[15px] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-zinc-500";

  return (
    <div className="max-w-150 mx-auto my-10 bg-zinc-900 p-10 rounded-xl border border-white/5 shadow-xl">
      <h2 className="text-orange-500 mb-6 text-2xl font-semibold">Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Product Name" 
          required 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          className={inputClasses} 
        />
        <textarea 
          placeholder="Description" 
          required 
          rows="4"
          onChange={(e) => setFormData({...formData, description: e.target.value})} 
          className={`${inputClasses} resize-none`} 
        />
        <input 
          type="number" 
          placeholder="Price" 
          required 
          onChange={(e) => setFormData({...formData, price: e.target.value})} 
          className={inputClasses} 
        />
        <input 
          type="text" 
          placeholder="Category" 
          required 
          onChange={(e) => setFormData({...formData, category: e.target.value})} 
          className={inputClasses} 
        />
        <input 
          type="number" 
          placeholder="Stock Quantity" 
          required 
          onChange={(e) => setFormData({...formData, stock: e.target.value})} 
          className={inputClasses} 
        />
        
        <div className="p-4 border border-dashed border-orange-500 rounded-lg bg-orange-500/5 mt-2 hover:bg-orange-500/10 transition-colors">
          <label className="block mb-3 text-zinc-400 font-medium">
            Upload Product Image (Cloudinary)
          </label>
          <input 
            type="file" 
            accept="image/*" 
            required 
            onChange={(e) => setImage(e.target.files[0])} 
            className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 transition-colors cursor-pointer w-full"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className={`btn mt-4 w-full py-3 rounded-md text-white font-medium transition-colors ${
            loading 
              ? 'bg-orange-500/50 cursor-not-allowed' 
              : 'bg-orange-500 hover:bg-orange-600'
          }`}
        >
          {loading ? 'Uploading & Creating...' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;