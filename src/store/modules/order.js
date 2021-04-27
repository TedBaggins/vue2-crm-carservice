import orderApi from '@/api/order';

const state = {
    data: null,
    selectedOrder: null,
    isLoading: false,
    error: null,
    ordersCount: null,
    limit: 10
}

export const actionTypes = {
    getOrders: '[order] getOrders',
    getOrdersCount: '[order] getOrdersCount',
    getOrderById: '[order] getOrderById',
    deleteOrder: '[order] deleteOrder',
    addOrder: '[order] addOrder',
    editOrder: '[order] editOrder'
}

const actions = {
    [actionTypes.getOrders](ctx, {offset}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getOrdersStart);
            orderApi
                .getOrders(state.limit, offset)
                .then(orders => {
                    ctx.commit(mutationTypes.getOrdersSuccess, orders);
                    resolve(orders);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getOrdersFailure);
                });
        });
    },
    [actionTypes.getOrdersCount](ctx) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getOrdersCountStart);
            orderApi
                .getOrdersCount()
                .then(data => {
                    ctx.commit(mutationTypes.getOrdersCountSuccess, data.count);
                    resolve(data.count);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getOrdersCountFailure);
                });
        });
    },
    [actionTypes.getOrderById](ctx, {orderId}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.getOrderByIdStart);
            orderApi
                .getOrderById(orderId)
                .then(order => {
                    ctx.commit(mutationTypes.getOrderByIdSuccess, order);
                    resolve(order);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.getOrderByIdFailure);
                });
        });
    },
    [actionTypes.addOrder](ctx, {formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.addOrderStart);
            orderApi
                .createOrder(formData)
                .then(data => {
                    ctx.commit(mutationTypes.addOrderSuccess);
                    resolve(data);
                })
                .catch(() => {
                    ctx.commit(mutationTypes.addOrderFailure);
                });
        });
    },
    [actionTypes.editOrder](ctx, {id, formData}) {
        return new Promise(resolve => {
            ctx.commit(mutationTypes.editOrderStart);
            orderApi
                .updateOrder(id, formData)
                .then(() => {
                    ctx.commit(mutationTypes.editOrderSuccess);
                    resolve();
                })
                .catch(() => {
                    ctx.commit(mutationTypes.editOrderFailure);
                });
        });
    },
    [actionTypes.deleteOrder](ctx, {id}) {
        return new Promise((resolve, reject) => {
            ctx.commit(mutationTypes.deleteOrderStart);
            orderApi
                .deleteOrder(id)
                .then(() => {
                    ctx.commit(mutationTypes.deleteOrderSuccess);
                    resolve();
                })
                .catch((error) => {
                    ctx.commit(mutationTypes.deleteOrderFailure);
                    reject(error.response.data);
                });
        });
    },
}

export const mutationTypes = {
    getOrdersStart: '[order] getOrdersStart',
    getOrdersSuccess: '[order] getOrdersSuccess',
    getOrdersFailure: '[order] getOrdersFailure',

    getOrdersCountStart: '[order] getOrdersCountStart',
    getOrdersCountSuccess: '[order] getOrdersCountSuccess',
    getOrdersCountFailure: '[order] getOrdersCountFailure',

    getOrderByIdStart: '[order] getOrderByIdStart',
    getOrderByIdSuccess: '[order] getOrderByIdSuccess',
    getOrderByIdFailure: '[order] getOrderByIdFailure',

    addOrderStart: '[order] addOrderStart',
    addOrderSuccess: '[order] addOrderSuccess',
    addOrderFailure: '[order] addOrderFailure',

    editOrderStart: '[order] editOrderStart',
    editOrderSuccess: '[order] editOrderSuccess',
    editOrderFailure: '[order] editOrderFailure',

    deleteOrderStart: '[order] deleteOrderStart',
    deleteOrderSuccess: '[order] deleteOrderSuccess',
    deleteOrderFailure: '[order] deleteOrderFailure',
}

const mutations = {
    [mutationTypes.getOrdersStart](state) {
        state.isLoading = true;
        state.data = null;
    },
    [mutationTypes.getOrdersSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    [mutationTypes.getOrdersFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.getOrdersCountStart](state) {
        state.isLoading = true;
        state.ordersCount = null;
    },
    [mutationTypes.getOrdersCountSuccess](state, payload) {
        state.isLoading = false;
        state.ordersCount = payload;
    },
    [mutationTypes.getOrdersCountFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.getOrderByIdStart](state) {
        state.isLoading = true;
        state.selectedOrder = null;
    },
    [mutationTypes.getOrderByIdSuccess](state, payload) {
        state.isLoading = false;
        state.selectedOrder = payload;
    },
    [mutationTypes.getOrderByIdFailure](state) {
        state.isLoading = false;
    },

    [mutationTypes.addOrderStart]() {},
    [mutationTypes.addOrderSuccess]() {},
    [mutationTypes.addOrderFailure]() {},

    [mutationTypes.editOrderStart]() {},
    [mutationTypes.editOrderSuccess]() {},
    [mutationTypes.editOrderFailure]() {},

    [mutationTypes.deleteOrderStart]() {},
    [mutationTypes.deleteOrderSuccess]() {},
    [mutationTypes.deleteOrderFailure]() {},
}

const getters = {
    getOrderById: state => id => {
        return state.data.filter(order => {
            return order.id == id;
        })
    },
    getOrdersCount: state => () => {
        return state.ordersCount;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}