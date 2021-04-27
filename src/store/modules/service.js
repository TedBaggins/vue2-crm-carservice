import serviceApi from '@/api/service';

const state = {
    data: null,
    isLoading: false,
    error: null,
    servicesCount: null,
    limit: 10
}

export const actionTypes = {
    getServices: '[service] getServices',
    getAllServices: '[service] getAllServices',
    getServicesCount: '[service] getServicesCount',
    deleteService: '[service] deleteService',
    addService: '[service] addService',
    editService: '[service] editService'
}

const actions = {
    [actionTypes.getServices](ctx, {offset}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getServicesStart);
            serviceApi
                .getServices(state.limit, offset)
                .then(services => {
                    ctx.commit(mutationTypes.getServicesSuccess, services);
                    services.sort((a, b) => a.name > b.name ? 1 : -1); // sort by fio
                    resolve(services);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getServicesFailure);
                });
        });
    },
    [actionTypes.getAllServices](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getAllServicesStart);
            serviceApi
                .getAllServices()
                .then(services => {
                    ctx.commit(mutationTypes.getAllServicesSuccess, services);
                    resolve(services);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getAllServicesFailure);
                });
        });
    },
    [actionTypes.getServicesCount](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getServicesCountStart);
            serviceApi
                .getServicesCount()
                .then(data => {
                    ctx.commit(mutationTypes.getServicesCountSuccess, data.count);
                    resolve(data.count);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getServicesCountFailure);
                });
        });
    },
    [actionTypes.deleteService](ctx, {id}) {
        return new Promise((resolve, reject) => {
            ctx.commit(mutationTypes.deleteServiceStart);
            serviceApi
                .deleteService(id)
                .then(() => {
                    ctx.commit(mutationTypes.deleteServiceSuccess);
                    resolve();
                })
                .catch((error) => {
                    ctx.commit(mutationTypes.deleteServiceFailure);
                    reject(error.response.data);
                });
        });
    },
    [actionTypes.addService](ctx, {formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.addServiceStart);
            serviceApi
                .createService(formData)
                .then(data => {
                    ctx.commit(mutationTypes.addServiceSuccess);
                    resolve(data);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.addServiceFailure);
                });
        });
    },
    [actionTypes.editService](ctx, {id, formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.editServiceStart);
            serviceApi
                .updateService(id, formData)
                .then(() => {
                    ctx.commit(mutationTypes.editServiceSuccess);
                    resolve();
                })
                .catch(() => {
                    ctx.commit(mutationTypes.editServiceFailure);
                });
        });
    }
}

export const mutationTypes = {
    getServicesStart: '[service] getServicesStart',
    getServicesSuccess: '[service] getServicesSuccess',
    getServicesFailure: '[service] getServicesFailure',

    getAllServicesStart: '[service] getAllServicesStart',
    getAllServicesSuccess: '[service] getAllServicesSuccess',
    getAllServicesFailure: '[service] getAllServicesFailure',

    getServicesCountStart: '[service] getServicesCountStart',
    getServicesCountSuccess: '[service] getServicesCountSuccess',
    getServicesCountFailure: '[service] getServicesCountFailure',

    deleteServiceStart: '[service] deleteServiceStart',
    deleteServiceSuccess: '[service] deleteServiceSuccess',
    deleteServiceFailure: '[service] deleteServiceFailure',

    addServiceStart: '[service] addServiceStart',
    addServiceSuccess: '[service] addServiceSuccess',
    addServiceFailure: '[service] addServiceFailure',

    editServiceStart: '[service] editServiceStart',
    editServiceSuccess: '[service] editServiceSuccess',
    editServiceFailure: '[service] editServiceFailure',
}

const mutations = {
    [mutationTypes.getServicesStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getServicesSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getServicesFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.getAllServicesStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getAllServicesSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getAllServicesFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.getServicesCountStart](state) {
        state.isLoading = true;
        state.servicesCount = null;
    },
    [mutationTypes.getServicesCountSuccess](state, payload) {
        state.isLoading = false;
        state.servicesCount = payload;
    },
    [mutationTypes.getServicesCountFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.deleteServiceStart]() {},
    [mutationTypes.deleteServiceSuccess]() {},
    [mutationTypes.deleteServiceFailure]() {},

    [mutationTypes.addServiceStart]() {},
    [mutationTypes.addServiceSuccess]() {},
    [mutationTypes.addServiceFailure]() {},

    [mutationTypes.editServiceStart]() {},
    [mutationTypes.editServiceSuccess]() {},
    [mutationTypes.editServiceFailure]() {},
}

const getters = {
    getServiceById: state => id => {
        return state.data.filter(service => {
            return service.id == id;
        })
    },
    getServicesCount: state => () => {
        return state.servicesCount;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}