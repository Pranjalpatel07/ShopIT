import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext.jsx';
import { clearCart } from '../redux/cartSlice';
import { 
  createPaymentOrder, 
  verifyPaymentTransaction, 
  saveSuccessfulOrder 
} from '../services/paymentService.js';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [isBypassing, setIsBypassing] = useState(false); 

  useEffect(() => {
    if (window.Razorpay) {
      setIsSdkLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsSdkLoaded(true);
    script.onerror = () => console.error('Razorpay SDK failed to load.');
    document.body.appendChild(script);
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePayment = async () => {
    if (!isSdkLoaded && !window.Razorpay) {
      alert("Razorpay SDK is still loading. If it takes too long, please check your internet connection.");
      return;
    }

    try {
      let orderData;
      try {
        orderData = await createPaymentOrder(totalPrice);
      } catch (err) {
        const fallback = window.confirm("Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?");
        if (fallback) {
          return bypassPayment();
        } else {
          return alert("Payment failed to initialize");
        }
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1234567890abcdef',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Test Transaction',
        order_id: orderData.id,
        handler: async function (response) {
          try {
            await verifyPaymentTransaction(response, user?.token);
            await saveSuccessfulOrder(cartItems, totalPrice, address, response.razorpay_payment_id, user?.token);
            
            dispatch(clearCart());
            navigate('/ordersuccess');
          } catch (error) {
            alert(error.message || 'Payment or saving verification failed');
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
      setIsBypassing(true);
      await saveSuccessfulOrder(cartItems, totalPrice, address, 'bypass_txn_' + Date.now(), user?.token);
      dispatch(clearCart());
      navigate('/ordersuccess');
    } catch (error) {
      console.error(error);
      alert('Bypass order failed');
    } finally {
      setIsBypassing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      alert("Please login first");
      navigate('/login');
      return;
    }
    handlePayment();
  };

  const handleBypassClick = (e) => {
    e.preventDefault();
    if (!user || !user.token) {
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
        <h2 className="text-3xl font-extrabold text-gray-100 text-center mb-8">Checkout</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 rounded-lg border border-gray-700 bg-zinc-850">
            <h3 className="text-lg font-semibold text-gray-300 mb-4 border-b border-gray-700 pb-2">Shipping Address</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                disabled={isBypassing} 
                value={address.fullName} 
                onChange={(e) => setAddress({...address, fullName: e.target.value})} 
                className="w-full px-4 py-3 bg-zinc-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50"
              />
              <input 
                type="text" 
                placeholder="Street Address" 
                required 
                disabled={isBypassing}
                value={address.street} 
                onChange={(e) => setAddress({...address, street: e.target.value})} 
                className="w-full px-4 py-3 bg-zinc-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="City" 
                  required 
                  disabled={isBypassing}
                  value={address.city} 
                  onChange={(e) => setAddress({...address, city: e.target.value})} 
                  className="w-full px-4 py-3 bg-zinc-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50"
                />
                <input 
                  type="text" 
                  placeholder="Postal Code" 
                  required 
                  disabled={isBypassing}
                  value={address.postalCode} 
                  onChange={(e) => setAddress({...address, postalCode: e.target.value})} 
                  className="w-full px-4 py-3 bg-zinc-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50"
                />
              </div>
              
              <input 
                type="text" 
                placeholder="Country" 
                required 
                disabled={isBypassing}
                value={address.country} 
                onChange={(e) => setAddress({...address, country: e.target.value})} 
                className="w-full px-4 py-3 bg-zinc-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-700 pt-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-medium text-gray-300">Total to Pay:</h4>
              <span className="text-2xl font-bold text-gray-100">₹{totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="submit" 
                disabled={isBypassing}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!isSdkLoaded && !window.Razorpay ? 'Loading Gateway...' : 'Pay Now'}
              </button>
              
              <button 
                type="button" 
                onClick={handleBypassClick}
                disabled={isBypassing} 
                className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isBypassing ? (
                  <>
                  
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Bypassing...
                  </>
                ) : (
                  'Bypass Transaction'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;