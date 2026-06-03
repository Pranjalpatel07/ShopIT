import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductByCategory } from '../services/AdminService.js';

const CategoriesPage = () => {
  const categories = [
    { id: 'electronics', name: 'Electronics', icon: '💻' },
    { id: 'accessories', name: 'Accessories', icon: '🎧' },
    { id: 'fashion', name: 'Fashion', icon: '👕' },
    { id: 'Shoes', name: 'Shoes', icon: '👟' },
  ];

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return sessionStorage.getItem('selectedCategory') || null;
  });
  
  const [products, setProducts] = useState(() => {
    const savedProducts = sessionStorage.getItem('categoryProducts');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
    setLoading(true);
    setError(null);
    setProducts([]); 
    
    sessionStorage.setItem('selectedCategory', categoryName);

    try {
      const data = await getProductByCategory(categoryName);
      const fetchedProducts = data.data || data;
      
      setProducts(fetchedProducts); 
      
      sessionStorage.setItem('categoryProducts', JSON.stringify(fetchedProducts));
    } catch (err) {
      console.error(err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 text-zinc-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
            Shop by Category
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-zinc-400 sm:mt-4">
            Select a category below to explore our products.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`flex items-center justify-center p-6 rounded-xl border text-lg font-medium transition-all duration-300 shadow-lg
                ${selectedCategory === cat.name
                  ? 'bg-amber-600 border-amber-500 text-white ring-4 ring-orange-500/30 transform scale-105'
                  : 'bg-zinc-900 border-white/5 text-zinc-400 hover:border-amber-500/50 hover:text-white'
                }`}
            >
              <span className="text-2xl mr-3">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <hr className="border-white/10 my-8" />

        <div>
          {!selectedCategory && (
            <div className="text-center py-12 bg-zinc-900 rounded-xl border border-dashed border-white/10">
              <p className="text-zinc-400 text-lg">Please select a category above to view products.</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
              <p className="mt-4 text-zinc-400 font-medium">Loading products...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-950/40 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-center max-w-md mx-auto">
              {error}
            </div>
          )}

          {!loading && selectedCategory && products.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">
                Showing results for <span className="text-orange-500">"{selectedCategory}"</span>
              </h2>
              
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div 
                    key={product._id} 
                    className="group flex flex-col relative bg-zinc-900 border border-white/5 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:ring-1 hover:ring-orange-500/30"
                  >

                    <div className="overflow-hidden w-full h-60 bg-zinc-950 flex items-center justify-center text-zinc-600">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
                        />
                      ) : (
                        <span className="text-sm">📦 No Image Available</span>
                      )}
                    </div>
                  
                    <div className="flex-1 flex flex-col justify-between p-5 text-left bg-linear-to-t from-zinc-900 from-80% to-transparent relative z-10">
                      <div>
                        <h3 className="text-[1.1rem] font-medium text-white mb-2 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                          {product.description || 'No description available.'}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-[22px] font-bold text-orange-500 mb-4">
                          ₹{product.price?.toFixed(2) || '0.00'}
                        </p>

                        <Link 
                          to={`/products/${product._id}`} 
                          className="block w-full px-4 py-2 bg-amber-600 text-white text-center font-medium rounded transition-colors duration-200 hover:bg-zinc-800"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && selectedCategory && products.length === 0 && !error && (
            <div className="text-center py-12 bg-zinc-900 rounded-xl border border-white/5">
              <p className="text-zinc-300 text-lg font-medium">No products found in the "{selectedCategory}" category.</p>
              <p className="text-zinc-500 text-sm mt-1">Try adding some products to your database first!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CategoriesPage;