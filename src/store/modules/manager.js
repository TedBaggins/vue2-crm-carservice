import managerApi from '@/api/manager';

const state = {
    data: null,
    isLoading: false,
    error: null,
    managersCount: null,
    limit: 10
}

export const actionTypes = {
    getAllManagers: '[manager] getAllManagers',
    getManagers: '[manager] getManagers',
    getManagersCount: '[manager] getManagersCount',
    deleteManager: '[manager] deleteManager',
    addManager: '[manager] addManager',
    editManager: '[manager] editManager'
}

const actions = {
    [actionTypes.getAllManagers](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getAllManagersStart);
            managerApi
                .getAllManagers()
                .then(managers => {
                    ctx.commit(mutationTypes.getAllManagersSuccess, managers);
                    resolve(managers);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getAllManagersFailure);
                });
        });
    },
    [actionTypes.getManagers](ctx, {offset}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getManagersStart);
            managerApi
                .getManagers(state.limit, offset)
                .then(managers => {
                    ctx.commit(mutationTypes.getManagersSuccess, managers);
                    managers.sort((a, b) => a.fio > b.fio ? 1 : -1); // sort by fio
                    resolve(managers);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getManagersFailure);
                });
        });
    },
    [actionTypes.getManagersCount](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getManagersCountStart);
            managerApi
                .getManagersCount()
                .then(data => {
                    ctx.commit(mutationTypes.getManagersCountSuccess, data.count);
                    resolve(data.count);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getManagersCountFailure);
                });
        });
    },
    [actionTypes.deleteManager](ctx, {id}) {
        return new Promise((resolve, reject) => {
            ctx.commit(mutationTypes.deleteManagerStart);
            managerApi
                .deleteManager(id)
                .then(() => {
                    ctx.commit(mutationTypes.deleteManagerSuccess);
                    resolve();
                })
                .catch((error) => {
                    ctx.commit(mutationTypes.deleteManagerFailure);
                    reject(error.response.data);
                });
        });
    },
    [actionTypes.addManager](ctx, {formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.addManagerStart);
            managerApi
                .createManager(formData)
                .then(data => {
                    ctx.commit(mutationTypes.addManagerSuccess);
                    resolve(data);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.addManagerFailure);
                });
        });
    },
    [actionTypes.editManager](ctx, {id, formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.editManagerStart);
            managerApi
                .updateManager(id, formData)
                .then(() => {
                    ctx.commit(mutationTypes.editManagerSuccess);
                    resolve();
                })
                .catch(() => {
                    ctx.commit(mutationTypes.editManagerFailure);
                });
        });
    }
}

export const mutationTypes = {
    getAllManagersStart: '[manager] getAllManagersStart',
    getAllManagersSuccess: '[manager] getAllManagersSuccess',
    getAllManagersFailure: '[manager] getAllManagersFailure',

    getManagersStart: '[manager] getManagersStart',
    getManagersSuccess: '[manager] getManagersSuccess',
    getManagersFailure: '[manager] getManagersFailure',

    getManagersCountStart: '[manager] getManagersCountStart',
    getManagersCountSuccess: '[manager] getManagersCountSuccess',
    getManagersCountFailure: '[manager] getManagersCountFailure',

    deleteManagerStart: '[manager] deleteManagerStart',
    deleteManagerSuccess: '[manager] deleteManagerSuccess',
    deleteManagerFailure: '[manager] deleteManagerFailure',

    addManagerStart: '[manager] addManagerStart',
    addManagerSuccess: '[manager] addManagerSuccess',
    addManagerFailure: '[manager] addManagerFailure',

    editManagerStart: '[manager] editManagerStart',
    editManagerSuccess: '[manager] editManagerSuccess',
    editManagerFailure: '[manager] editManagerFailure',
}

const mutations = {
    [mutationTypes.getAllManagersStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getAllManagersSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getAllManagersFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.getManagersStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getManagersSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getManagersFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.getManagersCountStart](state) {
        state.isLoading = true;
        state.managersCount = null;
    },
    [mutationTypes.getManagersCountSuccess](state, payload) {
        state.isLoading = false;
        state.managersCount = payload;
    },
    [mutationTypes.getManagersCountFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.deleteManagerStart]() {},
    [mutationTypes.deleteManagerSuccess]() {},
    [mutationTypes.deleteManagerFailure]() {},

    [mutationTypes.addManagerStart]() {},
    [mutationTypes.addManagerSuccess]() {},
    [mutationTypes.addManagerFailure]() {},

    [mutationTypes.editManagerStart]() {},
    [mutationTypes.editManagerSuccess]() {},
    [mutationTypes.editManagerFailure]() {},
}

const getters = {
    getManagerById: state => id => {
        return state.data.filter(manager => {
            return manager.id == id;
        })
    },
    getManagersCount: state => () => {
        return state.managersCount;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}