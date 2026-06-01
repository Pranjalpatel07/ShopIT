import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:5000',
    withCredentials: true
})

export async function getProduct() {
    try {
        const response = await api.get('/api/products')
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getProductById(id) {
   try{
    const response = await api.get(`/api/products/${id}`)
    return response.data;
   } catch (error) {
        throw error;
   }
}