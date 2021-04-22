import axios from '@/api/axios';

const getUsers = (limit, offset) => {
    return axios.get(`/users?limit=${limit}&offset=${offset}`).then(response => response.data);
}

const getUsersCount = () => {
    return axios.get(`/users/count`).then(response => response.data);
}

const deleteUser = id => {
    return axios.delete(`/users/${id}`);
}

export default {
    getUsers,
    getUsersCount,
    deleteUser
}