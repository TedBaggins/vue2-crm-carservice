import carApi from '@/api/car';

const state = {
    data: null,
    isLoading: false,
    error: null,
    carsCount: null,
    limit: 10
}

export const actionTypes = {
    getClientCars: '[car] getClientCars',
    addCar: '[car] addCar',
    editCar: '[car] editCar',
    deleteCar: '[car] deleteCar',
}

const actions = {
    [actionTypes.getClientCars](ctx, {clientId}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getClientCarsStart);
            carApi
                .getClientCars(clientId)
                .then(cars => {
                    ctx.commit(mutationTypes.getClientCarsSuccess, cars);
                    resolve(cars);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getClientCarsFailure);
                });
        });
    },
    [actionTypes.addCar](ctx, {formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.addCarStart);
            carApi
                .createCar(formData)
                .then(data => {
                    ctx.commit(mutationTypes.addCarSuccess);
                    resolve(data);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.addCarFailure);
                });
        });
    },
    [actionTypes.editCar](ctx, {id, formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.editCarStart);
            carApi
                .updateCar(id, formData)
                .then(() => {
                    ctx.commit(mutationTypes.editCarSuccess);
                    resolve();
                })
                .catch(() => {
                    ctx.commit(mutationTypes.editCarFailure);
                });
        });
    },
    [actionTypes.deleteCar](ctx, {id}) {
        return new Promise((resolve, reject) => {
            ctx.commit(mutationTypes.deleteCarStart);
            carApi
                .deleteCar(id)
                .then(() => {
                    ctx.commit(mutationTypes.deleteCarSuccess);
                    resolve();
                })
                .catch((error) => {
                    ctx.commit(mutationTypes.deleteCarFailure);
                    reject(error.response.data);
                });
        });
    },
}

export const mutationTypes = {
    getClientCarsStart: '[car] getClientCarsStart',
    getClientCarsSuccess: '[car] getClientCarsSuccess',
    getClientCarsFailure: '[car] getClientCarsFailure',

    addCarStart: '[car] addCarStart',
    addCarSuccess: '[car] addCarSuccess',
    addCarFailure: '[car] addCarFailure',

    editCarStart: '[car] editCarStart',
    editCarSuccess: '[car] editCarSuccess',
    editCarFailure: '[car] editCarFailure',

    deleteCarStart: '[car] deleteCarStart',
    deleteCarSuccess: '[car] deleteCarSuccess',
    deleteCarFailure: '[car] deleteCarFailure',
}

const mutations = {
    [mutationTypes.getClientCarsStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getClientCarsSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getClientCarsFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.addCarStart]() {},
    [mutationTypes.addCarSuccess]() {},
    [mutationTypes.addCarFailure]() {},

    [mutationTypes.editCarStart]() {},
    [mutationTypes.editCarSuccess]() {},
    [mutationTypes.editCarFailure]() {},

    [mutationTypes.deleteCarStart]() {},
    [mutationTypes.deleteCarSuccess]() {},
    [mutationTypes.deleteCarFailure]() {},
}

const getters = {
}

export default {
    state,
    actions,
    mutations,
    getters
}