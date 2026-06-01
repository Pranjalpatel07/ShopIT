import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import {getProductById, updateProduct} from '../services/AdminService.js'

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ 
    name: '', description: '', price: '', category: '', stock: '' 
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        const data = res;
        setFormData({ 
          name: data.name, 
          description: data.description, 
          price: data.price, 
          category: data.category, 
          stock: data.stock 
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    if (image) data.append('image', image);

    try {
      const res = await updateProduct(id, data);

      if (res.status === 200) {
        alert('Product updated successfully!');
        navigate('/admin/products');
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert(error.response?.data?.message || 'Error updating product');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full p-3 bg-zinc-950 border border-zinc-800 rounded-md text-white text-[15px] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-zinc-500";

  return (
    <div className="max-w-150 mx-auto my-10 bg-zinc-900 p-10 rounded-xl border border-white/5 shadow-xl">
      <h2 className="text-orange-500 mb-6 text-2xl font-semibold">Edit Product</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Product Name" 
          required 
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          className={inputClasses} 
        />
        <textarea 
          placeholder="Description" 
          required 
          rows="4" 
          value={formData.description} 
          onChange={(e) => setFormData({...formData, description: e.target.value})} 
          className={`${inputClasses} resize-none`} 
        />
        <input 
          type="number" 
          placeholder="Price" 
          required 
          value={formData.price} 
          onChange={(e) => setFormData({...formData, price: e.target.value})} 
          className={inputClasses} 
        />
        <input 
          type="text" 
          placeholder="Category" 
          required 
          value={formData.category} 
          onChange={(e) => setFormData({...formData, category: e.target.value})} 
          className={inputClasses} 
        />
        <input 
          type="number" 
          placeholder="Stock" 
          required 
          value={formData.stock} 
          onChange={(e) => setFormData({...formData, stock: e.target.value})} 
          className={inputClasses} 
        />
        
        <div className="p-4 border border-dashed border-orange-500 rounded-lg bg-orange-500/5 mt-2 hover:bg-orange-500/10 transition-colors">
          <label className="block mb-3 text-zinc-400 font-medium">Replace Image (Optional)</label>
          <input 
            type="file" 
            accept="image/*" 
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
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;