import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import {getMyOrders} from '../services/AdminService.js'

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(Array.isArray(res.orders) ? res.orders : []);
      } catch (error) {
        console.error(error);
        // Token obsolete or 401: clear and bounce
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/login');
        } else {
          setOrders([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-500/10 text-emerald-500';
      case 'Shipped':
        return 'bg-blue-500/10 text-blue-500';
      default:
        return 'bg-amber-500/10 text-amber-500';
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto my-10 p-8 bg-zinc-900 rounded-xl border border-white/5 text-zinc-50">
      

      <div className="flex justify-between items-start border-b border-white/10 pb-8 mb-8">
        <div>
          <h2 className="text-white text-4xl mb-2 font-semibold">My Profile</h2>
          <p className="text-zinc-400 text-lg mb-1">
            <strong className="text-zinc-300">Name:</strong> {user.name}
          </p>
          <p className="text-zinc-400 text-lg mb-4">
            <strong className="text-zinc-300">Email:</strong> {user.email}
          </p>
          <span className="bg-orange-500/10 text-orange-500 px-3 py-1.5 rounded-lg text-sm font-bold inline-block">
            Account Type: {user.role.toUpperCase()}
          </span>
        </div>
        <button 
          onClick={handleLogout} 
          className="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Logout
        </button>
      </div>

  
      <h3 className="text-orange-500 mb-5 text-2xl font-semibold">Order History</h3>
      
      {loading ? (
        <p className="text-zinc-400">Fetching your orders...</p>
      ) : orders.length === 0 ? (
        <div className="bg-zinc-950 p-8 rounded-lg text-center border border-zinc-800">
          <p className="text-zinc-400 mb-4">You haven't placed any orders yet.</p>
          <Link 
            to="/shop" 
            className="btn inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-5">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 flex flex-wrap justify-between items-center gap-5 hover:border-zinc-700 transition-colors"
            >
              <div>
                <p className="text-zinc-400 text-sm mb-1">
                  Order ID: <span className="text-white ml-1">{order._id}</span>
                </p>
                <p className="text-zinc-400 text-sm mb-1">
                  Placed On: <span className="text-white ml-1">{new Date(order.createdAt).toLocaleDateString()}</span>
                </p>
                <p className="text-zinc-400 text-sm">
                  Total: <strong className="text-emerald-500 ml-1">₹{order.totalAmount.toFixed(2)}</strong>
                </p>
              </div>
              <div>
                <span className={`px-4 py-2 rounded-full font-bold text-sm ${getStatusClasses(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;