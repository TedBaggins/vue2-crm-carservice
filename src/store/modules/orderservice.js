import orderServiceApi from '@/api/orderservice';

const state = {
    data: null,
    isLoading: false,
    error: null,
}

export const actionTypes = {
    addOrderService: '[orderservice] addOrderService',
    deleteOrderService: '[orderservice] deleteOrderService',
}

const actions = {
    [actionTypes.addOrderService](ctx, {formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.addOrderServiceStart);
            orderServiceApi
                .createOrderService(formData)
                .then(data => {
                    ctx.commit(mutationTypes.addOrderServiceSuccess);
                    resolve(data);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.addOrderServiceFailure);
                });
        });
    },
    [actionTypes.deleteOrderService](ctx, {id}) {
        return new Promise((resolve, reject) => {
            ctx.commit(mutationTypes.deleteOrderServiceStart);
            orderServiceApi
                .deleteOrderService(id)
                .then(() => {
                    ctx.commit(mutationTypes.deleteOrderServiceSuccess);
                    resolve();
                })
                .catch((error) => {
                    ctx.commit(mutationTypes.deleteOrderServiceFailure);
                    reject(error.response.data);
                });
        });
    },
}

export const mutationTypes = {
    addOrderServiceStart: '[orderservice] addOrderServiceStart',
    addOrderServiceSuccess: '[orderservice] addOrderServiceSuccess',
    addOrderServiceFailure: '[orderservice] addOrderServiceFailure',

    deleteOrderServiceStart: '[orderservice] deleteOrderServiceStart',
    deleteOrderServiceSuccess: '[orderservice] deleteOrderServiceSuccess',
    deleteOrderServiceFailure: '[orderservice] deleteOrderServiceFailure',
}

const mutations = {
    [mutationTypes.addOrderServiceStart]() {},
    [mutationTypes.addOrderServiceSuccess]() {},
    [mutationTypes.addOrderServiceFailure]() {},

    [mutationTypes.deleteOrderServiceStart]() {},
    [mutationTypes.deleteOrderServiceSuccess]() {},
    [mutationTypes.deleteOrderServiceFailure]() {},
}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}