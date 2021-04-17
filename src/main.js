import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ValidationObserver, ValidationProvider, extend} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import Paginate from 'vuejs-paginate'

// install rules
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('paginate', Paginate);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
