import Vue from 'vue';
import Router from 'vue-router';

import {mainPage, colorTransform, photoTransform, regexTest, textTransform, hostEdit, systemInfo, qrcode} from '@/pages';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main-page',
            component: mainPage,
            meta: {
                titleI18n: 'mainPage',
                haveBack: false
            }
        }, {
            path: '/photoTransform',
            name: 'photo-transform',
            component: photoTransform,
            meta: {
                titleI18n: 'photoTransform',
                haveBack: true
            }
        }, {
            path: '/colorTransform',
            name: 'color-transform',
            component: colorTransform,
            meta: {
                titleI18n: 'colorTransform',
                haveBack: true
            }
        }, {
            path: '/regexTest',
            name: 'regex-test',
            component: regexTest,
            meta: {
                titleI18n: 'regexTest',
                haveBack: true
            }
        }, {
            path: '/textTransform',
            name: 'text-transform',
            component: textTransform,
            meta: {
                titleI18n: 'textTransform',
                haveBack: true
            }
        }, {
            path: '/hostEdit',
            name: 'host-edit',
            component: hostEdit,
            meta: {
                titleI18n: 'hostEdit',
                haveBack: true
            }
        }, {
            path: '/systemInfo',
            name: 'system-info',
            component: systemInfo,
            meta: {
                titleI18n: 'systemInfo',
                haveBack: true
            }
        }, {
            path: '/qrcode',
            name: 'qrcode',
            component: qrcode,
            meta: {
                titleI18n: 'qrcode',
                haveBack: true
            }
        }, {
            path: '*',
            redirect: '/'
        }
    ]
})
