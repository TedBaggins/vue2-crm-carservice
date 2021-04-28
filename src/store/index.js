import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth';
import admin from '@/store/modules/admin';
import manager from '@/store/modules/manager';
import master from '@/store/modules/master';
import service from '@/store/modules/service';
import user from '@/store/modules/user';
import role from '@/store/modules/role';
import client from '@/store/modules/client';
import car from '@/store/modules/car';
import order from '@/store/modules/order';
import orderservice from '@/store/modules/orderservice';
import status from '@/store/modules/status';
import report from '@/store/modules/report';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth,
        admin,
        manager,
        master,
        service,
        user,
        role,
        client,
        car,
        order,
        orderservice,
        status,
        report
    }
})
