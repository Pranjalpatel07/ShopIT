import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:5000',
    withCredentials: true
})

export async function fetchAdminStats() {
    try {
        const response = await api.get('/api/analytics', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching admin stats:", error.message);
        throw new Error("Failed to fetch admin statistics");
    }
}

// Product Routes

export async function createProduct(productData) {
    try {
        const response = await api.post('/api/products', productData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response;
    } catch (error) {
        console.error("Error creating product:", error.message);
        throw new Error("Failed to create product");
    }
}

export async function getProducts() {
    try {
        const response = await api.get('/api/products', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error.message);
        throw new Error("Failed to fetch products");
    }
}

export async function getProductById(id) {
    try {
        const response = await api.get(`/api/products/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error.message);
        throw new Error("Failed to fetch product");
    }
}

export async function deleteProduct(productId) { 
    try {
        const response = await api.delete(`/api/products/${productId}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response;
    } catch (error) {   
        console.error("Error deleting product:", error.message);
        throw new Error("Failed to delete product");
    }   
}

export async function updateProduct(productId, updatedData) {    
    try {
        const response = await api.put(`/api/products/${productId}`, updatedData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response;
    } catch (error) {
        console.error("Error updating product:", error.message);
        throw new Error("Failed to update product");
    }
}

// All the order Routes 

export async function getAllOrders() {    
    try {
        const response = await api.get(`/api/orders`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response;
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        throw new Error("Failed to fetch orders");
    }
}

export async function updateOrderStatus(orderId, status) {
    try {
        const response = await api.put(`/api/orders/${orderId}/status`, { status }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });     
        return response;
    }
    catch (error) {
        console.error("Error updating order status:", error.message);
        throw new Error("Failed to update order status");
    }
}

export async function getMyOrders() {
    try{
        const response = await api.get('/api/orders/myorders',{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
    
}

// fetch all users (admin only)

export async function fetchAllUsers() {
    try {
        const response = await api.get('/api/auth/users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response;
    } catch (error) {
        console.error("Error fetching users:", error.message);
        throw new Error("Failed to fetch users");
    }
}