import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/notes',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const checkConnection = async () => {
    try {
        const response = await AxiosInstance.get('/');
        return response.status === 200;
    } catch (error) {
        console.error('Connection check failed:', error);
        return false;
    }
};