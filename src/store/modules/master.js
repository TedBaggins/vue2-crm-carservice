import masterApi from '@/api/master';

const state = {
    data: null,
    isLoading: false,
    error: null,
    mastersCount: null,
    limit: 10
}

export const actionTypes = {
    getAllMasters: '[master] getAllMasters',
    getMasters: '[master] getMasters',
    getMastersCount: '[master] getMastersCount',
    deleteMaster: '[master] deleteMaster',
    addMaster: '[master] addMaster',
    editMaster: '[master] editMaster'
}

const actions = {
    [actionTypes.getAllMasters](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getAllMastersStart);
            masterApi
                .getAllMasters()
                .then(masters => {
                    ctx.commit(mutationTypes.getAllMastersSuccess, masters);
                    resolve(masters);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getAllMastersFailure);
                });
        });
    },
    [actionTypes.getMasters](ctx, {offset}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getMastersStart);
            masterApi
                .getMasters(state.limit, offset)
                .then(masters => {
                    ctx.commit(mutationTypes.getMastersSuccess, masters);
                    masters.sort((a, b) => a.fio > b.fio ? 1 : -1); // sort by fio
                    resolve(masters);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getMastersFailure);
                });
        });
    },
    [actionTypes.getMastersCount](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getMastersCountStart);
            masterApi
                .getMastersCount()
                .then(data => {
                    ctx.commit(mutationTypes.getMastersCountSuccess, data.count);
                    resolve(data.count);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getMastersCountFailure);
                });
        });
    },
    [actionTypes.deleteMaster](ctx, {id}) {
        return new Promise((resolve, reject) => {
            ctx.commit(mutationTypes.deleteMasterStart);
            masterApi
                .deleteMaster(id)
                .then(() => {
                    ctx.commit(mutationTypes.deleteMasterSuccess);
                    resolve();
                })
                .catch((error) => {
                    ctx.commit(mutationTypes.deleteMasterFailure);
                    reject(error.response.data);
                });
        });
    },
    [actionTypes.addMaster](ctx, {formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.addMasterStart);
            masterApi
                .createMaster(formData)
                .then(data => {
                    ctx.commit(mutationTypes.addMasterSuccess);
                    resolve(data);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.addMasterFailure);
                });
        });
    },
    [actionTypes.editMaster](ctx, {id, formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.editMasterStart);
            masterApi
                .updateMaster(id, formData)
                .then(() => {
                    ctx.commit(mutationTypes.editMasterSuccess);
                    resolve();
                })
                .catch(() => {
                    ctx.commit(mutationTypes.editMasterFailure);
                });
        });
    }
}

export const mutationTypes = {
    getAllMastersStart: '[master] getAllMastersStart',
    getAllMastersSuccess: '[master] getAllMastersSuccess',
    getAllMastersFailure: '[master] getAllMastersFailure',

    getMastersStart: '[master] getMastersStart',
    getMastersSuccess: '[master] getMastersSuccess',
    getMastersFailure: '[master] getMastersFailure',

    getMastersCountStart: '[master] getMastersCountStart',
    getMastersCountSuccess: '[master] getMastersCountSuccess',
    getMastersCountFailure: '[master] getMastersCountFailure',

    deleteMasterStart: '[master] deleteMasterStart',
    deleteMasterSuccess: '[master] deleteMasterSuccess',
    deleteMasterFailure: '[master] deleteMasterFailure',

    addMasterStart: '[master] addMasterStart',
    addMasterSuccess: '[master] addMasterSuccess',
    addMasterFailure: '[master] addMasterFailure',

    editMasterStart: '[master] editMasterStart',
    editMasterSuccess: '[master] editMasterSuccess',
    editMasterFailure: '[master] editMasterFailure',
}

const mutations = {
    [mutationTypes.getAllMastersStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getAllMastersSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getAllMastersFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.getMastersStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getMastersSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getMastersFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.getMastersCountStart](state) {
        state.isLoading = true;
        state.mastersCount = null;
    },
    [mutationTypes.getMastersCountSuccess](state, payload) {
        state.isLoading = false;
        state.mastersCount = payload;
    },
    [mutationTypes.getMastersCountFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.deleteMasterStart]() {},
    [mutationTypes.deleteMasterSuccess]() {},
    [mutationTypes.deleteMasterFailure]() {},

    [mutationTypes.addMasterStart]() {},
    [mutationTypes.addMasterSuccess]() {},
    [mutationTypes.addMasterFailure]() {},

    [mutationTypes.editMasterStart]() {},
    [mutationTypes.editMasterSuccess]() {},
    [mutationTypes.editMasterFailure]() {},
}

const getters = {
    getMasterById: state => id => {
        return state.data.filter(master => {
            return master.id == id;
        })
    },
    getMastersCount: state => () => {
        return state.mastersCount;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}