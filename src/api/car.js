import axios from '@/api/axios';

const getClientCars = (clientId) => {
    return axios.get(`/cars/client/${clientId}`).then(response => response.data);
}

export default {
    getClientCars
}