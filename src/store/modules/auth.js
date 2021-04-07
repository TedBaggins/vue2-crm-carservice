import AuthService from '@/services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

const state = initialState;

export const actionTypes = {
    login: '[auth] login',
    logout: '[auth] logout'
}

const actions = {
    [actionTypes.login]({commit}, user) {
        return AuthService.login(user).then(
            user => {
                commit(mutationTypes.loginSuccess, user);
                return Promise.resolve(user);
            },
            error => {
                commit(mutationTypes.loginFailure);
                return Promise.reject(error);
            }
        );
    },
    [actionTypes.logout]({commit}) {
        AuthService.logout();
        commit(mutationTypes.logout);
    }
}

export const mutationTypes = {
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',
    logout: '[auth] logout'
}

const mutations = {
    [mutationTypes.loginSuccess](state, user) {
        state.status.loggedIn = true;
        state.user = user;
    },
    [mutationTypes.loginFailure](state) {
        state.status.loggedIn = false;
        state.user = null;
    },
    [mutationTypes.logout](state) {
        state.status.loggedIn = false;
        state.user = null;
    }
}

export default {
    state,
    mutations,
    actions,
};