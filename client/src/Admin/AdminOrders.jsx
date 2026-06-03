import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext.jsx';
import axios from 'axios';
import { getAllOrders , updateOrderStatus} from '../services/AdminService.js';

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.token) return;
      
      try {
        const res = await getAllOrders();
        setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    
    fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      const res = await updateOrderStatus(id, status);
      
      if (res.status === 200) {
        setOrders(orders.map(order => order._id === id ? { ...order, status } : order));
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  // Helper function to colorize the select dropdown text
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-emerald-500';
      case 'Shipped': return 'text-blue-500';
      default: return 'text-amber-500';
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-300 mx-auto my-10 p-8 bg-zinc-900 rounded-xl border border-white/5 text-zinc-50 shadow-xl">
      <h2 className="text-orange-500 mb-6 text-2xl font-semibold">Manage Orders</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-175">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">ORDER ID</th>
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">USER</th>
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">TOTAL</th>
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">DATE</th>
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-white/10 hover:bg-zinc-800/50 transition-colors">
                <td className="p-4 text-zinc-300 font-mono text-sm">{order._id.substring(0, 8)}...</td>
                <td className="p-4 text-zinc-300">{order.user?.name || <span className="text-zinc-500 italic">Deleted User</span>}</td>
                <td className="p-4 text-emerald-500 font-medium">₹{order.totalAmount.toFixed(2)}</td>
                <td className="p-4 text-zinc-300">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <select 
                    value={order.status} 
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className={`bg-zinc-950 p-2 border border-zinc-800 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all cursor-pointer font-medium ${getStatusColor(order.status)}`}
                  >
                    <option value="Pending" className="text-amber-500">Pending</option>
                    <option value="Shipped" className="text-blue-500">Shipped</option>
                    <option value="Delivered" className="text-emerald-500">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
            
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-zinc-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;