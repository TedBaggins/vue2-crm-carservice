import reportApi from '@/api/report';

const state = {
    data: null,
    isLoading: false,
    error: null,
    limit: 10
}

export const actionTypes = {
    addReport: '[report] addReport',
    editReport: '[report] editReport',
    deleteReport: '[report] deleteReport',
}

const actions = {
    [actionTypes.addReport](ctx, {formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.addReportStart);
            reportApi
                .createReport(formData)
                .then(data => {
                    ctx.commit(mutationTypes.addReportSuccess);
                    resolve(data);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.addReportFailure);
                });
        });
    },
    [actionTypes.editReport](ctx, {id, formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.editReportStart);
            reportApi
                .updateReport(id, formData)
                .then(() => {
                    ctx.commit(mutationTypes.editReportSuccess);
                    resolve();
                })
                .catch(() => {
                    ctx.commit(mutationTypes.editReportFailure);
                });
        });
    },
    [actionTypes.deleteReport](ctx, {id}) {
        return new Promise((resolve, reject) => {
            ctx.commit(mutationTypes.deleteReportStart);
            reportApi
                .deleteReport(id)
                .then(() => {
                    ctx.commit(mutationTypes.deleteReportSuccess);
                    resolve();
                })
                .catch((error) => {
                    ctx.commit(mutationTypes.deleteReportFailure);
                    reject(error.response.data);
                });
        });
    },
}

export const mutationTypes = {
    addReportStart: '[report] addReportStart',
    addReportSuccess: '[report] addReportSuccess',
    addReportFailure: '[report] addReportFailure',

    editReportStart: '[report] editReportStart',
    editReportSuccess: '[report] editReportSuccess',
    editReportFailure: '[report] editReportFailure',

    deleteReportStart: '[report] deleteReportStart',
    deleteReportSuccess: '[report] deleteReportSuccess',
    deleteReportFailure: '[report] deleteReportFailure',
}

const mutations = {
    [mutationTypes.addReportStart]() {},
    [mutationTypes.addReportSuccess]() {},
    [mutationTypes.addReportFailure]() {},

    [mutationTypes.editReportStart]() {},
    [mutationTypes.editReportSuccess]() {},
    [mutationTypes.editReportFailure]() {},

    [mutationTypes.deleteReportStart]() {},
    [mutationTypes.deleteReportSuccess]() {},
    [mutationTypes.deleteReportFailure]() {},
}

const getters = {
}

export default {
    state,
    actions,
    mutations,
    getters
}