import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext.jsx';
import { clearCart } from '../redux/cartSlice';
import { createPaymentOrder } from '../services/paymentService.js';
import axios from 'axios';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePayment = async () => {
    try {
      const orderRes = await createPaymentOrder(totalPrice);
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        const fallback = window.confirm("Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?");
        if (fallback) {
          return bypassPayment();
        } else {
          return alert("Payment failed to initialize");
        }
      }

      const options = {
        key: 'rzp_test_dummykey123',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Test Transaction',
        order_id: orderData.id,
        handler: async function (response) {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });
          if (verifyRes.ok) {
            const saveOrderRes = await fetch('/api/orders', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id
              })
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());
              navigate('/ordersuccess');
            } else {
              alert('Order saving failed');
            }
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999'
        },
        theme: {
          color: '#f97316'
        }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  const bypassPayment = async () => {
    try {
        const saveOrderRes = await axios.post('http://localhost:5000/api/orders',{
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: 'bypass_txn_' + Date.now()
      }, 
      {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          withCredentials: true
        }
      });
        dispatch(clearCart());
        navigate('/ordersuccess');
        
    } catch (error) {
        console.error(error.message);
        alert('Bypass order failed');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }
    handlePayment();
  };

  const handleBypassClick = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }
    
    if (!address.fullName || !address.street || !address.city || !address.postalCode || !address.country) {
      alert("Please fill in all shipping address fields before bypassing.");
      return;
    }

    bypassPayment();
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-zinc-900 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Checkout</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg- p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-300 mb-4 border-b pb-2">Shipping Address</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                value={address.fullName} 
                onChange={(e) => setAddress({...address, fullName: e.target.value})} 
                className="w-full px-4 py-3 bg-zinc-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <input 
                type="text" 
                placeholder="Street Address" 
                required 
                value={address.street} 
                onChange={(e) => setAddress({...address, street: e.target.value})} 
                className="w-full px-4 py-3 bg-zinc-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="City" 
                  required 
                  value={address.city} 
                  onChange={(e) => setAddress({...address, city: e.target.value})} 
                  className="w-full px-4 py-3 bg-zinc-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                <input 
                  type="text" 
                  placeholder="Postal Code" 
                  required 
                  value={address.postalCode} 
                  onChange={(e) => setAddress({...address, postalCode: e.target.value})} 
                  className="w-full px-4 py-3 bg-zinc-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              
              <input 
                type="text" 
                placeholder="Country" 
                required 
                value={address.country} 
                onChange={(e) => setAddress({...address, country: e.target.value})} 
                className="w-full px-4 py-3 bg-zinc-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-medium text-gray-300">Total to Pay:</h4>
              <span className="text-2xl font-bold text-gray-300">₹{totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="submit" 
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Pay Now
              </button>
              
              <button 
                type="button" 
                onClick={handleBypassClick}
                className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Bypass Transaction
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;