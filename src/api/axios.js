import axios from 'axios';
import authHeader from '@/services/auth.header';

axios.defaults.baseURL = 'http://localhost:3080/api';

axios.interceptors.request.use(config => {
    config.headers = authHeader();
    return config;
});

export default axios;