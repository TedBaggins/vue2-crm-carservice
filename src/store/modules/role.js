import roleApi from '@/api/role';

const state = {
    data: null,
    isLoading: false,
    error: null,
}

export const actionTypes = {
    getAllRoles: '[role] getAllRoles',
}

const actions = {
    [actionTypes.getAllRoles](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getAllRolesStart);
            roleApi
                .getAllRoles()
                .then(roles => {
                    ctx.commit(mutationTypes.getAllRolesSuccess, roles);
                    resolve(roles);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getAllRolesFailure);
                });
        });
    },
}

export const mutationTypes = {
    getAllRolesStart: '[role] getAllRolesStart',
    getAllRolesSuccess: '[role] getAllRolesSuccess',
    getAllRolesFailure: '[role] getAllRolesFailure',
}

const mutations = {
    [mutationTypes.getAllRolesStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getAllRolesSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getAllRolesFailure](state) {
        state.isLoading = false;
    },
}

const getters = {
    getRoleById: state => id => {
        return state.data.filter(role => {
            return role.id == id;
        })
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}