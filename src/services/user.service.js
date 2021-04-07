import axios from 'axios';
import authHeader from '@/services/auth.header';

const API_URL = 'http://localhost:3080/api/test/';

class UserService {
    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
    getManagerBoard() {
        return axios.get(API_URL + 'manager', { headers: authHeader() });
    }
    getMasterBoard() {
        return axios.get(API_URL + 'master', { headers: authHeader() });
    }
}

export default new UserService();