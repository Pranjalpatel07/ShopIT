import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    // Return early or render a placeholder if the product data is missing
    if (!product) return null; 

    return (
        <div className="group flex flex-col relative bg-zinc-900 border border-white/5 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:ring-1 hover:ring-orange-500/30">
            
            <div className="overflow-hidden">
                <img 
                    src={product.imageUrl || '/placeholder-image.jpg'} 
                    alt={product.name || 'Product Image'} 
                    className="w-full h-60 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
                />
            </div>
            
            <div className="flex-1 flex flex-col justify-between p-5 text-left bg-linear-to-t from-zinc-900 from-80% to-transparent relative z-10">
                <h3 className="text-[1.1rem] text-white mb-2.5 truncate">
                    {product.name}
                </h3>
                
                <p className="text-[22px] font-bold text-orange-500 mb-3.75">
                    ₹{product.price?.toFixed(2) || '0.00'}
                </p>

                <Link 
                    to={`/products/${product._id}`} 
                    className="inline-block px-4 py-2 bg-amber-600 text-white text-center rounded transition-colors duration-200 hover:bg-gray-800"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;