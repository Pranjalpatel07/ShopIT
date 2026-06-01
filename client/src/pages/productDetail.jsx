import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart } from '../redux/cartSlice.js';
import { getProductById } from "../services/productService.js";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProductById(id);
                setProduct(res);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({
                productId: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                qty: 1
            }));
            alert('Added to your cart!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
                Loading product details...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
                Product not Found
            </div>
        );
    }

    return (
        <main className="max-w-7xl min-h-screen mx-auto px-5 py-10 md:py-16">
            <div className="flex flex-col md:flex-row gap-20 md:gap-16 items-start">
                
                
                <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl w-full">
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-auto object-cover block transition-transform duration-300 hover:scale-105"
                    />
                </div>

                <div className="flex-1 flex flex-col justify-center w-full ">
                    <span className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Product Details
                    </span>
                    
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                        {product.name}
                    </h1>
                    
                    <p className="text-2xl font-semibold text-amber-500 mb-6">
                        ${product.price}
                    </p>
                    
                    <p className="text-lg leading-relaxed text-gray-400 mb-8">
                        {product.description || "Experience the perfect blend of style and functionality with this premium product, curated just for you."}
                    </p>

                    <div className="flex flex-col items-start gap-4 w-full">
                        <button 
                            className="bg-amber-600 text-white px-8 py-4 text-lg font-bold rounded-xl hover:bg-gray-800 active:scale-95 transition-all w-full max-w-sm shadow-md"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                        
                        <Link 
                            to="/" 
                            className="text-gray-500 font-medium text-sm hover:text-gray-300 hover:underline transition-colors mt-2"
                        >
                            &larr; Back to Home
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default ProductDetail;