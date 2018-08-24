import Vue from 'vue';
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'zh_CN',
    messages: {
        en_US: {
            "mainPage": "Home",
            "photoTransform": "Image transform",
            "colorTransform": "Color transform",
            "regexTest": "Regex test",
            "textTransform": "Text transform",
            "hostEdit": "Host edit",
            "systemInfo": "System info",
            "alreadyCopy": "Copied to clipboard: ",
            ...enLocale
        },
        zh_CN: {
            "mainPage": "首页",
            "photoTransform": "图片转换",
            "colorTransform": "颜色转换",
            "regexTest": "正则测试",
            "textTransform": "文本转换",
            "hostEdit": "Host编辑",
            "systemInfo": "系统信息",
            "alreadyCopy": "已复制至剪贴板：",
            ...zhLocale
        }
    }
});

export default i18n;