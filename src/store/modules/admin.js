import adminApi from '@/api/admin';

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const actionTypes = {
    getAdmins: '[admin] getAdmins',
    deleteAdmin: '[admin] deleteAdmin',
    addAdmin: '[admin] addAdmin',
    editAdmin: '[admin] editAdmin'
}

const actions = {
    [actionTypes.getAdmins](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getAdminsStart);
            adminApi
                .getAdmins()
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
    [actionTypes.deleteAdmin](ctx, {id}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.deleteAdminStart);
            adminApi
                .deleteAdmin(id)
                .then(() => {
                    ctx.commit(mutationTypes.deleteAdminSuccess);
                    resolve();
                })
                .catch(() => {
                    ctx.commit(mutationTypes.deleteAdminFailure);
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
    getAdminsStart: '[admin] getAdminsStart',
    getAdminsSuccess: '[admin] getAdminsSuccess',
    getAdminsFailure: '[admin] getAdminsFailure',

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
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}