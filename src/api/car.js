import axios from '@/api/axios';

const getClientCars = (clientId) => {
    return axios.get(`/cars/client/${clientId}`).then(response => response.data);
}

const createCar = formData => {
    return axios.post('/cars', formData).then(response => response.data);
}

const updateCar = (id, formData) => {
    return axios.put(`/cars/${id}`, formData).then(response => response.data);
}

const deleteCar = id => {
    return axios.delete(`/cars/${id}`);
}

export default {
    getClientCars,
    createCar,
    updateCar,
    deleteCar
}