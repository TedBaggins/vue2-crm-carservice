import axios from '@/api/axios';

const getAllRoles = () => {
    return axios.get(`/roles/all`).then(response => response.data);
}

export default {
    getAllRoles,
}