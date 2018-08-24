const state = {
    showBack: false,
    languageText: {
        "id": "zh-CN",
        "title": "简体中文",
        "data": {
            "mainPage": {
                "title": "主页",
                "textTransformTitle": "文本转换",
                "textTransformInfo": "Json格式化、Base64、MD5、URI",
                "colorTransformTitle": "颜色转换",
                "colorTransformInfo": "RGB,HEX,CSS格式互转、颜色常量、颜色拾取",
                "photoTransformTitle": "图片转换",
                "photoTransformInfo": "图片与Base64互转",
                "regexTestTitle": "正则测试",
                "regexTestInfo": "正则表达式测试、常用正则",
                "hostEditTitle": "Host 编辑",
                "hostEditInfo": "编辑修改系统Host、Ping",
                "systemInfoTitle": "系统信息",
                "systemInfoInfo": "IP地址、内存使用情况等"
            },
            "colorTransform": {
                "title": "颜色转换"
            },
            "hostEdit": {
                "title": "Host编辑"
            },
            "photoTransform": {
                "title": "图片转换"
            },
            "regexTest": {
                "title": "正则测试"
            },
            "systemInfo": {
                "title": "系统信息"
            },
            "textTransform": {
                "title": "文本转换"
            },
            "other": {}
        }
    }
};

const getters = {
    showBack(state) {
        return state.showBack;
    },
    languageText(state) {
        return state.languageText;
    },
    languageTextData(state) {
        return state.languageText.data;
    }
};

const mutations = {
    setShowBack(state, showBack) {
        state.showBack = showBack;
    },
    setLanguageText(state, languageText) {
        state.languageText = languageText;
    }
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions
}
