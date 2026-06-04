import React, {useE} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart, clearCart } from '../redux/cartSlice.js';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

   
    const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (token) {
        navigate('/checkout');
    } else {    
        alert('Please login to proceed to checkout');
        navigate('/login');
    }
    };

  
    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleUpdateQty = (item, qty) => {
        if (qty > 0) {
            dispatch(addToCart({ ...item, qty }));
        }
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    if (!cartItems || cartItems.length === 0) {
        return (
            <main className="max-w-7xl min-h-screen mx-auto px-5 flex flex-col items-center justify-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-500 mb-8 tracking-tight">
                    Your Cart is Empty
                </h1>
                <Link 
                    to="/" 
                    className="bg-amber-600 text-white px-8 py-4 text-lg font-bold rounded-xl hover:bg-gray-800 active:scale-95 transition-all shadow-md"
                >
                    Start Shopping
                </Link>
            </main>
        );
    }

    return (
        <main className="max-w-7xl min-h-screen mx-auto px-5 py-10 md:py-16">
            
           
            <div className="flex justify-between items-end mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    Shopping Cart
                </h1>
                <button 
                    onClick={handleClearCart}
                    className="text-gray-400 hover:text-red-500 font-medium transition-colors uppercase tracking-wider text-sm"
                >
                    Clear Cart
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-start">
                
                <div className="flex-1 w-full flex flex-col gap-6">
                    {cartItems.map((item) => (
                        <div 
                            key={item.productId} 
                            className="flex flex-col sm:flex-row items-center gap-6 bg-gray-900/50 p-5 rounded-2xl shadow-lg border border-gray-800"
                        >
                            
                            <div className="w-full sm:w-32 h-32 shrink-0 rounded-xl overflow-hidden shadow-inner bg-gray-800">
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 flex flex-col w-full">
                                <Link to={`/product/${item.productId}`}>
                                    <h2 className="text-2xl font-bold text-white mb-1 hover:text-amber-500 transition-colors line-clamp-1">
                                        {item.name}
                                    </h2>
                                </Link>
                                <p className="text-xl font-semibold text-amber-500 mb-4">
                                    ${item.price}
                                </p>
                                
                                <div className="flex items-center justify-between w-full">
                                    
                                    <div className="flex items-center gap-4 bg-gray-800 rounded-lg p-1">
                                        <button 
                                            onClick={() => handleUpdateQty(item, item.qty - 1)} 
                                            className="px-3 py-1 text-gray-400 hover:text-white transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="text-white font-medium w-4 text-center">
                                            {item.qty}
                                        </span>
                                        <button 
                                            onClick={() => handleUpdateQty(item, item.qty + 1)} 
                                            className="px-3 py-1 text-gray-400 hover:text-white transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button 
                                        onClick={() => handleRemove(item.productId)} 
                                        className="text-gray-400 hover:text-red-500 font-medium text-sm transition-colors uppercase tracking-wider"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                
                <div className="w-full lg:w-96 bg-gray-900/50 p-8 rounded-2xl shadow-2xl border border-gray-800 lg:sticky lg:top-8">
                    <span className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6 block">
                        Order Summary
                    </span>
                    
                    <div className="flex justify-between items-center mb-4 text-gray-400">
                        <span>Subtotal</span>
                        <span className="text-white font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-6 text-gray-400">
                        <span>Shipping</span>
                        <span className="text-green-500 font-medium">Free</span>
                    </div>
                    
                    <div className="border-t border-gray-800 pt-6 mb-8 flex justify-between items-end">
                        <span className="text-xl font-bold text-white">Total</span>
                        <span className="text-3xl font-extrabold text-amber-500">
                            ₹{totalPrice.toFixed(2)}
                        </span>
                    </div>

                    <button 
                        className="bg-amber-600 text-white px-8 py-4 text-lg font-bold rounded-xl hover:bg-gray-800 active:scale-95 transition-all w-full shadow-md"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </button>
                    
                    <div className="mt-6 text-center">
                        <Link 
                            to="/" 
                            className="text-gray-500 font-medium text-sm hover:text-gray-300 hover:underline transition-colors"
                        >
                            &larr; Continue Shopping
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default Cart;