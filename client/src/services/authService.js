import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:5000',
    withCredentials: true
})

export async function userRegister({ name, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            name, email, password
        })
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function userLogin({ email, password }) {
    try {
        const response = await api.post('/api/auth/login', {
            email, password,
            withCredentials: true
        })
        localStorage.setItem('token', response.data.token);
        return response.data;

    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
}