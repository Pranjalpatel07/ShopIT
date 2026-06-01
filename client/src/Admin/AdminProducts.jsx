import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext.jsx';
import { Link } from 'react-router-dom';
import {getProducts, deleteProduct} from '../services/AdminService.js'

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you strictly sure you want to delete this?')) {
      try {
        const res = await deleteProduct(id);
        
        if (res.status === 200) {
          setProducts(products.filter(p => p._id !== id));
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <div className="max-w-300 mx-auto my-10 p-8 bg-zinc-900 rounded-xl border border-white/5 text-zinc-50 shadow-xl">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-orange-500 text-2xl font-semibold">Manage Products</h2>
        <Link 
          to="/admin/add-product" 
          className="btn bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors font-medium"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-175">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">ID</th>
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">NAME</th>
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">PRICE</th>
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">CATEGORY</th>
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">STOCK</th>
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-b border-white/10 hover:bg-zinc-800/50 transition-colors">
                <td className="p-4 text-zinc-300 font-mono text-sm">{product._id.substring(0, 8)}...</td>
                <td className="p-4 text-zinc-300 font-medium">{product.name}</td>
                <td className="p-4 text-emerald-500 font-medium">₹{product.price.toFixed(2)}</td>
                <td className="p-4 text-zinc-300">{product.category}</td>
                <td className="p-4 text-zinc-300">
                  <span className={`px-2 py-1 rounded-md text-sm font-bold ${product.stock > 0 ? 'bg-zinc-800 text-zinc-300' : 'bg-red-500/10 text-red-500'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-4">
                  <Link 
                    to={`/admin/edit-product/${product._id}`} 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md mr-3 transition-colors inline-block text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(product._id)} 
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-zinc-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;