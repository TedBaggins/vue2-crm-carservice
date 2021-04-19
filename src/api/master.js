import axios from '@/api/axios';

const getMasters = (limit, offset) => {
    return axios.get(`/masters?limit=${limit}&offset=${offset}`).then(response => response.data);
}

const getMastersCount = () => {
    return axios.get(`/masters/count`).then(response => response.data);
}

const createMaster = formData => {
    return axios.post('/masters', formData).then(response => response.data);
}

const updateMaster = (id, formData) => {
    return axios.put(`/masters/${id}`, formData).then(response => response.data);
}

const deleteMaster = id => {
    return axios.delete(`/masters/${id}`);
}

export default {
    getMasters,
    getMastersCount,
    createMaster,
    updateMaster,
    deleteMaster
}