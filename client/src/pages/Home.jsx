import React, {useEffect, useState} from "react";
import ProductCard from '../components/ProductCart.jsx'
import { getProducts } from "../services/AdminService.js";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <main className="home-container">
            <section className="hero-banner">
                <div className="hero-copy">
                    <span className="eyebrow">Fresh arrivals</span>
                    <h1>Welcome to ShopIt</h1>
                    <p>Shop the latest deals and curated products in a beautiful, modern marketplace.</p>
                </div>
            </section>

            <section>
                <div className="section-heading">
                    <div>
                        <h2>Featured Products</h2>
                        <p className="section-description">Browse popular products that customers love.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-state">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="no-products">No products available right now. Please check back later.</div>
                ) : (
                    <div className="product-grid">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}

export default Home;
