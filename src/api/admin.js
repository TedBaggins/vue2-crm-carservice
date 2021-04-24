import axios from '@/api/axios';

const getAllAdmins = () => {
    return axios.get(`/admins/all`).then(response => response.data);
}

const getAdmins = (limit, offset) => {
    return axios.get(`/admins?limit=${limit}&offset=${offset}`).then(response => response.data);
}

const getAdminsCount = () => {
    return axios.get(`/admins/count`).then(response => response.data);
}

const createAdmin = formData => {
    return axios.post('/admins', formData).then(response => response.data);
}

const updateAdmin = (id, formData) => {
    return axios.put(`/admins/${id}`, formData).then(response => response.data);
}

const deleteAdmin = id => {
    return axios.delete(`/admins/${id}`);
}

export default {
    getAllAdmins,
    getAdmins,
    getAdminsCount,
    createAdmin,
    updateAdmin,
    deleteAdmin
}