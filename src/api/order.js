import axios from '@/api/axios';

const getOrders = (limit, offset) => {
    return axios.get(`/orders?limit=${limit}&offset=${offset}`).then(response => response.data);
}

const getSubmittedOrders = (limit, offset) => {
    return axios.get(`/orders/submitted?limit=${limit}&offset=${offset}`).then(response => response.data);
}

const getOrderById = (orderId) => {
    return axios.get(`/orders/${orderId}`).then(response => response.data);
}

const getOrdersCount = () => {
    return axios.get(`/orders/count`).then(response => response.data);
}

const getSubmittedOrdersCount = () => {
    return axios.get(`/orders/count/submitted`).then(response => response.data);
}

const createOrder = formData => {
    return axios.post('/orders', formData).then(response => response.data);
}

const updateOrder = (id, formData) => {
    return axios.put(`/orders/${id}`, formData).then(response => response.data);
}

const deleteOrder = id => {
    return axios.delete(`/orders/${id}`);
}

const changeOrderStatus = (id, formData) => {
    return axios.put(`/orders/${id}/changestatus`, formData).then(response => response.data);
}

export default {
    getOrders,
    getSubmittedOrders,
    getOrderById,
    getOrdersCount,
    getSubmittedOrdersCount,
    createOrder,
    updateOrder,
    deleteOrder,
    changeOrderStatus
}