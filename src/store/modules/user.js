import userApi from '@/api/user';

const state = {
    data: null,
    isLoading: false,
    error: null,
    usersCount: null,
    limit: 10
}

export const actionTypes = {
    getUsers: '[user] getUsers',
    getUsersCount: '[user] getUsersCount',
    deleteUser: '[user] deleteUser',
}

const actions = {
    [actionTypes.getUsers](ctx, {offset}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getUsersStart);
            userApi
                .getUsers(state.limit, offset)
                .then(users => {
                    ctx.commit(mutationTypes.getUsersSuccess, users);
                    resolve(users);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getUsersFailure);
                });
        });
    },
    [actionTypes.getUsersCount](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getUsersCountStart);
            userApi
                .getUsersCount()
                .then(data => {
                    ctx.commit(mutationTypes.getUsersCountSuccess, data.count);
                    resolve(data.count);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getUsersCountFailure);
                });
        });
    },
    [actionTypes.deleteUser](ctx, {id}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.deleteUserStart);
            userApi
                .deleteUser(id)
                .then(() => {
                    ctx.commit(mutationTypes.deleteUserSuccess);
                    resolve();
                })
                .catch(() => {
                    ctx.commit(mutationTypes.deleteUserFailure);
                });
        });
    },
}

export const mutationTypes = {
    getUsersStart: '[user] getUsersStart',
    getUsersSuccess: '[user] getUsersSuccess',
    getUsersFailure: '[user] getUsersFailure',

    getUsersCountStart: '[user] getUsersCountStart',
    getUsersCountSuccess: '[user] getUsersCountSuccess',
    getUsersCountFailure: '[user] getUsersCountFailure',

    deleteUserStart: '[user] deleteUserStart',
    deleteUserSuccess: '[user] deleteUserSuccess',
    deleteUserFailure: '[user] deleteUserFailure',
}

const mutations = {
    [mutationTypes.getUsersStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getUsersSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getUsersFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.getUsersCountStart](state) {
        state.isLoading = true;
        state.usersCount = null;
    },
    [mutationTypes.getUsersCountSuccess](state, payload) {
        state.isLoading = false;
        state.usersCount = payload;
    },
    [mutationTypes.getUsersCountFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.deleteUserStart]() {},
    [mutationTypes.deleteUserSuccess]() {},
    [mutationTypes.deleteUserFailure]() {},
}

const getters = {
    getUserById: state => id => {
        return state.data.filter(user => {
            return user.id == id;
        })
    },
    getUsersCount: state => () => {
        return state.usersCount;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}