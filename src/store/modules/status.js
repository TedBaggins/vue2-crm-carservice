import statusApi from '@/api/status';

const state = {
    data: null,
    isLoading: false,
    error: null,
}

export const actionTypes = {
    getAllStatuses: '[status] getAllStatuses',
}

const actions = {
    [actionTypes.getAllStatuses](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getAllStatusesStart);
            statusApi
                .getAllStatuses()
                .then(statuses => {
                    ctx.commit(mutationTypes.getAllStatusesSuccess, statuses);
                    resolve(statuses);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getAllStatusesFailure);
                });
        });
    },
}

export const mutationTypes = {
    getAllStatusesStart: '[status] getAllStatusesStart',
    getAllStatusesSuccess: '[status] getAllStatusesSuccess',
    getAllStatusesFailure: '[status] getAllStatusesFailure',
}

const mutations = {
    [mutationTypes.getAllStatusesStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getAllStatusesSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getAllStatusesFailure](state) {
        state.isLoading = false;
    },
}

const getters = {
    getStatusById: state => id => {
        return state.data.filter(status => {
            return status.id == id;
        })
    },
    getStatusByName: state => name => {
        return state.data.filter(status => {
            return status.name == name;
        })
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}