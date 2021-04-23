import axios from 'axios';
import authHeader from '@/services/auth.header';
import router from '@/router/index';
import store from '@/store/index';
import {actionTypes} from "../store/modules/auth";

axios.defaults.baseURL = 'http://localhost:3080/api';

axios.interceptors.request.use(config => {
    config.headers = authHeader();
    return config;
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if(error.response.status === 401) {
        store.dispatch(actionTypes.logout);
        if (router.history.current.name !== 'Login') {
            router.push({name: 'Login'});
        }
    } else if (error.response.status === 403) {
        router.push({name: 'Home'});
    } else if (error.response.status === 500) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
    return Promise.reject(error);
});

export default axios;