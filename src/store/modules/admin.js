import adminApi from '@/api/admin';

const state = {
    data: null,
    isLoading: false,
    error: null,
    adminsCount: null,
    limit: 10
}

export const actionTypes = {
    getAllAdmins: '[admin] getAllAdmins',
    getAdmins: '[admin] getAdmins',
    getAdminsCount: '[admin] getAdminsCount',
    deleteAdmin: '[admin] deleteAdmin',
    addAdmin: '[admin] addAdmin',
    editAdmin: '[admin] editAdmin'
}

const actions = {
    [actionTypes.getAllAdmins](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getAllAdminsStart);
            adminApi
                .getAllAdmins()
                .then(admins => {
                    ctx.commit(mutationTypes.getAllAdminsSuccess, admins);
                    resolve(admins);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getAllAdminsFailure);
                });
        });
    },
    [actionTypes.getAdmins](ctx, {offset}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getAdminsStart);
            adminApi
                .getAdmins(state.limit, offset)
                .then(admins => {
                    ctx.commit(mutationTypes.getAdminsSuccess, admins);
                    admins.sort((a, b) => a.fio > b.fio ? 1 : -1); // sort by fio
                    resolve(admins);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getAdminsFailure);
                });
        });
    },
    [actionTypes.getAdminsCount](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getAdminsCountStart);
            adminApi
                .getAdminsCount()
                .then(data => {
                    ctx.commit(mutationTypes.getAdminsCountSuccess, data.count);
                    resolve(data.count);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getAdminsCountFailure);
                });
        });
    },
    [actionTypes.deleteAdmin](ctx, {id}) {
        return new Promise((resolve, reject) => {
            ctx.commit(mutationTypes.deleteAdminStart);
            adminApi
                .deleteAdmin(id)
                .then(() => {
                    ctx.commit(mutationTypes.deleteAdminSuccess);
                    resolve();
                })
                .catch((error) => {
                    ctx.commit(mutationTypes.deleteAdminFailure);
                    reject(error.response.data);
                });
        });
    },
    [actionTypes.addAdmin](ctx, {formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.addAdminStart);
            adminApi
                .createAdmin(formData)
                .then(data => {
                    ctx.commit(mutationTypes.addAdminSuccess);
                    resolve(data);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.addAdminFailure);
                });
        });
    },
    [actionTypes.editAdmin](ctx, {id, formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.editAdminStart);
            adminApi
                .updateAdmin(id, formData)
                .then(() => {
                    ctx.commit(mutationTypes.editAdminSuccess);
                    resolve();
                })
                .catch(() => {
                    ctx.commit(mutationTypes.editAdminFailure);
                });
        });
    }
}

export const mutationTypes = {
    getAllAdminsStart: '[admin] getAllAdminsStart',
    getAllAdminsSuccess: '[admin] getAllAdminsSuccess',
    getAllAdminsFailure: '[admin] getAllAdminsFailure',

    getAdminsStart: '[admin] getAdminsStart',
    getAdminsSuccess: '[admin] getAdminsSuccess',
    getAdminsFailure: '[admin] getAdminsFailure',

    getAdminsCountStart: '[admin] getAdminsCountStart',
    getAdminsCountSuccess: '[admin] getAdminsCountSuccess',
    getAdminsCountFailure: '[admin] getAdminsCountFailure',

    deleteAdminStart: '[admin] deleteAdminStart',
    deleteAdminSuccess: '[admin] deleteAdminSuccess',
    deleteAdminFailure: '[admin] deleteAdminFailure',

    addAdminStart: '[admin] addAdminStart',
    addAdminSuccess: '[admin] addAdminSuccess',
    addAdminFailure: '[admin] addAdminFailure',

    editAdminStart: '[admin] editAdminStart',
    editAdminSuccess: '[admin] editAdminSuccess',
    editAdminFailure: '[admin] editAdminFailure',
}

const mutations = {
    [mutationTypes.getAllAdminsStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getAllAdminsSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getAllAdminsFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.getAdminsStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getAdminsSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getAdminsFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.getAdminsCountStart](state) {
        state.isLoading = true;
        state.adminsCount = null;
    },
    [mutationTypes.getAdminsCountSuccess](state, payload) {
        state.isLoading = false;
        state.adminsCount = payload;
    },
    [mutationTypes.getAdminsCountFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.deleteAdminStart]() {},
    [mutationTypes.deleteAdminSuccess]() {},
    [mutationTypes.deleteAdminFailure]() {},

    [mutationTypes.addAdminStart]() {},
    [mutationTypes.addAdminSuccess]() {},
    [mutationTypes.addAdminFailure]() {},

    [mutationTypes.editAdminStart]() {},
    [mutationTypes.editAdminSuccess]() {},
    [mutationTypes.editAdminFailure]() {},
}

const getters = {
    getAdminById: state => id => {
        return state.data.filter(admin => {
            return admin.id == id;
        })
    },
    getAdminsCount: state => () => {
        return state.adminsCount;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}