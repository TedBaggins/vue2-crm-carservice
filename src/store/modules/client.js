import clientApi from '@/api/client';

const state = {
    data: null,
    isLoading: false,
    error: null,
    clientsCount: null,
    limit: 10
}

export const actionTypes = {
    getAllClients: '[client] getAllClients',
    getClients: '[client] getClients',
    getClientsCount: '[client] getClientsCount',
    deleteClient: '[client] deleteClient',
    addClient: '[client] addClient',
    editClient: '[client] editClient'
}

const actions = {
    [actionTypes.getAllClients](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getAllClientsStart);
            clientApi
                .getAllClients()
                .then(clients => {
                    ctx.commit(mutationTypes.getAllClientsSuccess, clients);
                    resolve(clients);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getAllClientsFailure);
                });
        });
    },
    [actionTypes.getClients](ctx, {offset}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getClientsStart);
            clientApi
                .getClients(state.limit, offset)
                .then(clients => {
                    ctx.commit(mutationTypes.getClientsSuccess, clients);
                    resolve(clients);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getClientsFailure);
                });
        });
    },
    [actionTypes.getClientsCount](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getClientsCountStart);
            clientApi
                .getClientsCount()
                .then(data => {
                    ctx.commit(mutationTypes.getClientsCountSuccess, data.count);
                    resolve(data.count);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getClientsCountFailure);
                });
        });
    },
    [actionTypes.deleteClient](ctx, {id}) {
        return new Promise((resolve, reject) => {
            ctx.commit(mutationTypes.deleteClientStart);
            clientApi
                .deleteClient(id)
                .then(() => {
                    ctx.commit(mutationTypes.deleteClientSuccess);
                    resolve();
                })
                .catch((error) => {
                    ctx.commit(mutationTypes.deleteClientFailure);
                    reject(error.response.data);
                });
        });
    },
    [actionTypes.addClient](ctx, {formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.addClientStart);
            clientApi
                .createClient(formData)
                .then(data => {
                    ctx.commit(mutationTypes.addClientSuccess);
                    resolve(data);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.addClientFailure);
                });
        });
    },
    [actionTypes.editClient](ctx, {id, formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.editClientStart);
            clientApi
                .updateClient(id, formData)
                .then(() => {
                    ctx.commit(mutationTypes.editClientSuccess);
                    resolve();
                })
                .catch(() => {
                    ctx.commit(mutationTypes.editClientFailure);
                });
        });
    }
}

export const mutationTypes = {
    getAllClientsStart: '[client] getAllClientsStart',
    getAllClientsSuccess: '[client] getAllClientsSuccess',
    getAllClientsFailure: '[client] getAllClientsFailure',

    getClientsStart: '[client] getClientsStart',
    getClientsSuccess: '[client] getClientsSuccess',
    getClientsFailure: '[client] getClientsFailure',

    getClientsCountStart: '[client] getClientsCountStart',
    getClientsCountSuccess: '[client] getClientsCountSuccess',
    getClientsCountFailure: '[client] getClientsCountFailure',

    deleteClientStart: '[client] deleteClientStart',
    deleteClientSuccess: '[client] deleteClientSuccess',
    deleteClientFailure: '[client] deleteClientFailure',

    addClientStart: '[client] addClientStart',
    addClientSuccess: '[client] addClientSuccess',
    addClientFailure: '[client] addClientFailure',

    editClientStart: '[client] editClientStart',
    editClientSuccess: '[client] editClientSuccess',
    editClientFailure: '[client] editClientFailure',
}

const mutations = {
    [mutationTypes.getAllClientsStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getAllClientsSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getAllClientsFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.getClientsStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getClientsSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getClientsFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.getClientsCountStart](state) {
        state.isLoading = true;
        state.clientsCount = null;
    },
    [mutationTypes.getClientsCountSuccess](state, payload) {
        state.isLoading = false;
        state.clientsCount = payload;
    },
    [mutationTypes.getClientsCountFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.deleteClientStart]() {},
    [mutationTypes.deleteClientSuccess]() {},
    [mutationTypes.deleteClientFailure]() {},

    [mutationTypes.addClientStart]() {},
    [mutationTypes.addClientSuccess]() {},
    [mutationTypes.addClientFailure]() {},

    [mutationTypes.editClientStart]() {},
    [mutationTypes.editClientSuccess]() {},
    [mutationTypes.editClientFailure]() {},
}

const getters = {
    getClientById: state => id => {
        return state.data.filter(client => {
            return client.id == id;
        })
    },
    getClientsCount: state => () => {
        return state.clientsCount;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}