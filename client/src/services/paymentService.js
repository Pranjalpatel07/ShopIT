import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:5000',
    withCredentials: true
});

export async function createPaymentOrder(amount) {
    try {
        const response = await axios.post('/api/payment/order', {
            amount
        });
        return response;
    } catch (error) {
        console.error("Order creation error:", error.message);
        throw new Error("Failed to proceed with payment");
    }
}

export async function verifyPaymentTransaction(paymentDetails) {
    try {
        const response = await api.post("/api/payment/verify", paymentDetails);
        return response.data;
    } catch (error) {
        console.error("Verification error:", error.message);
        throw new Error("Cannot verify payment");
    }
}