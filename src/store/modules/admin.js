import adminApi from '@/api/admin';

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const actionTypes = {
    getAdmins: '[admin] getAdmins',
    deleteAdmin: '[admin] deleteAdmin'
}

const actions = {
    [actionTypes.getAdmins](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getAdminsStart);
            adminApi
                .getAdmins()
                .then(admins => {
                    ctx.commit(mutationTypes.getAdminsSuccess, admins);
                    resolve(admins);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getAdminsFailure);
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
}

export default {
    state,
    actions,
    mutations
}