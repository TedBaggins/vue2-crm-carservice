import axios from 'axios';
import authHeader from '@/services/auth.header';
// import { actionTypes } from "@/store/modules/auth";

axios.defaults.baseURL = 'http://localhost:3080/api';

axios.interceptors.request.use(config => {
    config.headers = authHeader();
    return config;
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if(error.response.status === 401) {
        return new Promise((resolve, reject) => {
            localStorage.removeItem('user');
            this.$router.push({name: 'Login'});
            reject(error);
        });
    } else if (error.response.status === 500) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
});

export default axios;