import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://dmclavelproject.com' : 'http://localhost:8080'
});

export default axiosConfig;