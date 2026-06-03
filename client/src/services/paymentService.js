import axios from "axios";

// Using the configured Axios instance for consistent base URLs
export const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:5000',
    withCredentials: true
});

// Helper to automatically attach the Auth header from Context Token or fallback
const getAuthHeader = (token) => {
    const activeToken = token || localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    };
};

export async function createPaymentOrder(amount) {
    try {
        const response = await api.post('/api/payment/order', { amount });
        // Axios wraps the backend payload directly in response.data
        return response.data; 
    } catch (error) {
        console.error("Order creation error:", error.response?.data || error.message);
        throw new Error("Failed to proceed with payment");
    }
}

export async function verifyPaymentTransaction(paymentDetails, token) {
    try {
        const response = await api.post("/api/payment/verify", paymentDetails, getAuthHeader(token));
        return response.data;
    } catch (error) {
        console.error("Verification error:", error.response?.data || error.message);
        throw new Error("Cannot verify payment");
    }
}

export async function saveSuccessfulOrder(cartItems, totalPrice, address, paymentId, token) {
    try {
        // Map data structure seamlessly here to protect database layer
        const mappedItems = cartItems.map(item => ({
            productId: item.productId || item._id,
            price: item.price,
            quantity: item.qty
        }));

        const response = await api.post('/api/orders', {
            items: mappedItems,
            totalAmount: totalPrice,
            address,
            paymentId
        }, getAuthHeader(token));
        
        return response.data;
    } catch (error) {
        console.error("Save order error:", error.response?.data || error.message);
        throw new Error("Order saving failed");
    }
}