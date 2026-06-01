import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
   return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 font-sans text-center">
        <div className="text-6xl mb-4">
            ✅
        </div>
        
        <h1 className="text-3xl font-bold text-green-600 mb-3">
            Order Placed Successfully!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md">
            Thank you for your purchase. We have received your order and are currently processing it.
        </p>
        
        <Link 
            to="/" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-sm"
        >
            Continue Shopping
        </Link>
    </div>
   );
};

export default OrderSuccess;