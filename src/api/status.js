import axios from '@/api/axios';

const getAllStatuses = () => {
    return axios.get(`/statuses/all`).then(response => response.data);
}

export default {
    getAllStatuses,
}