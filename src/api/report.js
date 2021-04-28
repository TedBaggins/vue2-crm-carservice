import axios from '@/api/axios';

const createReport = formData => {
    return axios.post('/reports', formData).then(response => response.data);
}

const updateReport = (id, formData) => {
    return axios.put(`/reports/${id}`, formData).then(response => response.data);
}

const deleteReport = (id) => {
    return axios.delete(`/reports/${id}`);
}

export default {
    createReport,
    updateReport,
    deleteReport
}