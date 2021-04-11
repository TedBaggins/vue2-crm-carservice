import axios from '@/api/axios';

const getAdmins = () => {
    return axios.get(`/admins`).then(response => response.data);
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
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin
}