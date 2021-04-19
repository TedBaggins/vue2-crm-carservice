import axios from '@/api/axios';

const getManagers = (limit, offset) => {
    return axios.get(`/managers?limit=${limit}&offset=${offset}`).then(response => response.data);
}

const getManagersCount = () => {
    return axios.get(`/managers/count`).then(response => response.data);
}

const createManager = formData => {
    return axios.post('/managers', formData).then(response => response.data);
}

const updateManager = (id, formData) => {
    return axios.put(`/managers/${id}`, formData).then(response => response.data);
}

const deleteManager = id => {
    return axios.delete(`/managers/${id}`);
}

export default {
    getManagers,
    getManagersCount,
    createManager,
    updateManager,
    deleteManager
}