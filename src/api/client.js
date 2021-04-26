import axios from '@/api/axios';

const getAllClients = () => {
    return axios.get(`/clients/all`).then(response => response.data);
}

const getClients = (limit, offset) => {
    return axios.get(`/clients?limit=${limit}&offset=${offset}`).then(response => response.data);
}

const getClientById = (clientId) => {
    return axios.get(`/clients/${clientId}`).then(response => response.data);
}

const getClientsCount = () => {
    return axios.get(`/clients/count`).then(response => response.data);
}

const createClient = formData => {
    return axios.post('/clients', formData).then(response => response.data);
}

const updateClient = (id, formData) => {
    return axios.put(`/clients/${id}`, formData).then(response => response.data);
}

const deleteClient = id => {
    return axios.delete(`/clients/${id}`);
}

export default {
    getAllClients,
    getClients,
    getClientById,
    getClientsCount,
    createClient,
    updateClient,
    deleteClient
}