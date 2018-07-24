import Vue from 'vue';
import Router from 'vue-router';

import {mainPage, colorTransform, photoTransform, regexTest, textTransform, hostEdit, systemInfo} from '@/pages';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main-page',
            component: mainPage,
            meta: {
                title: '主页',
                haveBack: false
            }
        }, {
            path: '/photoTransform',
            name: 'photo-transform',
            component: photoTransform,
            meta: {
                title: '图片转换',
                haveBack: true
            }
        }, {
            path: '/colorTransform',
            name: 'color-transform',
            component: colorTransform,
            meta: {
                title: '颜色转换',
                haveBack: true
            }
        }, {
            path: '/regexTest',
            name: 'regex-test',
            component: regexTest,
            meta: {
                title: '正则测试',
                haveBack: true
            }
        }, {
            path: '/textTransform',
            name: 'text-transform',
            component: textTransform,
            meta: {
                title: '文本转换',
                haveBack: true
            }
        }, {
            path: '/hostEdit',
            name: 'host-edit',
            component: hostEdit,
            meta: {
                title: 'Host编辑',
                haveBack: true
            }
        }, {
            path: '/systemInfo',
            name: 'system-info',
            component: systemInfo,
            meta: {
                title: '系统信息',
                haveBack: true
            }
        }, {
            path: '*',
            redirect: '/'
        }
    ]
})
