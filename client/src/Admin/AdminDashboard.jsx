import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext.jsx';
import { useNavigate } from 'react-router-dom';
import {fetchAdminStats} from '../services/AdminService.js'

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetchAdminStats();
        
        setStats(res);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });
        }
      }
    };
    
    fetchStats();
  }, [user, navigate]);


  const cardClasses = "p-6 bg-zinc-900 border border-white/5 rounded-xl shadow-xl text-center flex flex-col justify-center gap-2 hover:border-zinc-700 transition-colors";
  const numberClasses = "text-4xl font-bold text-orange-500";
  const headingClasses = "text-zinc-400 text-base font-medium";

  return (
    <div className="p-5 max-w-5xl mx-auto my-10">
      
    
      <div className="flex items-center gap-4 mb-2">
        <img 
          src="/image/logo.png" 
          alt="Logo" 
          className="h-15 w-50 rounded-lg object-cover drop-shadow-[0_0px_10px_rgba(249,115,22,0.3)]"
        />
        <h2 className="text-3xl font-semibold text-white m-0">Admin Dashboard</h2>
      </div>
      <p className="text-zinc-400 mb-8 text-lg">
        Welcome back, <span className="text-white font-medium">{user?.name}</span>
      </p>
      
      {stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          <div className={cardClasses}>
            <h4 className={headingClasses}>Total Orders</h4>
            <div className={numberClasses}>{stats.totalOrders}</div>
          </div>
          <div className={cardClasses}>
            <h4 className={headingClasses}>Total Products</h4>
            <div className={numberClasses}>{stats.totalProducts}</div>
          </div>
          <div className={cardClasses}>
            <h4 className={headingClasses}>Total Users</h4>
            <div className={numberClasses}>{stats.totalUsers}</div>
          </div>
          <div className={cardClasses}>
            <h4 className={headingClasses}>Total Revenue</h4>
            <div className={numberClasses}>₹{stats.totalRevenue?.toFixed(2)}</div>
          </div>
        </div>
      ) : (
        <div className="text-center my-12 text-orange-500 text-lg font-medium animate-pulse">
          Loading metrics...
        </div>
      )}

      <div className="mt-10 p-8 bg-zinc-900 rounded-xl border border-white/5 shadow-lg">
        <h3 className="mb-6 text-orange-500 text-xl font-semibold">Administrative Controls</h3>
        
        <div className="flex flex-wrap gap-4">
          <button 
            className="btn bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md transition-colors font-medium" 
            onClick={() => navigate('/admin/add-product')}
          >
            + Add Product
          </button>
          
          <button 
            className="btn bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-md transition-colors font-medium" 
            onClick={() => navigate('/admin/products')}
          >
            📦 Manage Products
          </button>
          
          <button 
            className="btn bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-md transition-colors font-medium" 
            onClick={() => navigate('/admin/orders')}
          >
            🚚 Manage Orders
          </button>
          
          <button 
            className="btn bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-md transition-colors font-medium" 
            onClick={() => navigate('/admin/users')}
          >
            👥 Users Directory
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default AdminDashboard;