import axios from '@/api/axios';

const createOrderService = formData => {
    return axios.post('/ordersservices', formData).then(response => response.data);
}

const deleteOrderService = (id) => {
    return axios.delete(`/ordersservices/${id}`);
}

export default {
    createOrderService,
    deleteOrderService
}