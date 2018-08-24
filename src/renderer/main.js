import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'
import axios from 'axios';
import i18n from './i18n/i18n';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
});

new Vue({
    components: {App},
    router,
    store,
    i18n,
    template: '<App/>'
}).$mount('#app');
