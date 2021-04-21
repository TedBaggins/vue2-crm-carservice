import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth';
import admin from '@/store/modules/admin';
import manager from '@/store/modules/manager';
import master from '@/store/modules/master';
import service from '@/store/modules/service';
import user from '@/store/modules/user';

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
        user
    }
})
