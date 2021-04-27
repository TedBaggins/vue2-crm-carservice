import axios from '@/api/axios';

const getServices = (limit, offset) => {
    return axios.get(`/services?limit=${limit}&offset=${offset}`).then(response => response.data);
}

const getAllServices = () => {
    return axios.get(`/services/all`).then(response => response.data);
}

const getServicesCount = () => {
    return axios.get(`/services/count`).then(response => response.data);
}

const createService = formData => {
    return axios.post('/services', formData).then(response => response.data);
}

const updateService = (id, formData) => {
    return axios.put(`/services/${id}`, formData).then(response => response.data);
}

const deleteService = id => {
    return axios.delete(`/services/${id}`);
}

export default {
    getServices,
    getAllServices,
    getServicesCount,
    createService,
    updateService,
    deleteService
}