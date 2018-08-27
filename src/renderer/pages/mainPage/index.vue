<template>
    <div>
        <div class="main-page">
            <content-box :title="$t('textTransformTitle')" :detail="$t('textTransformInfo')" href="/textTransform">
                <i class="fa fa-code"></i>
            </content-box>
            <content-box :title="$t('colorTransformTitle')" :detail="$t('colorTransformInfo')" href="/colorTransform">
                <i class="fa fa-magic"></i>
            </content-box>
            <content-box :title="$t('photoTransformTitle')" :detail="$t('photoTransformInfo')" href="/photoTransform">
                <i class="fa fa-picture-o"></i>
            </content-box>
            <content-box :title="$t('regexTestTitle')" :detail="$t('regexTestInfo')" href="/regexTest">
                <i class="fa fa-quote-left"></i>
            </content-box>
            <content-box :title="$t('hostEditTitle')" :detail="$t('hostEditInfo')" href="/hostEdit">
                <i class="fa fa-puzzle-piece"></i>
            </content-box>
            <content-box :title="$t('systemInfoTitle')" :detail="$t('systemInfoInfo')" href="/systemInfo">
                <i class="fa fa-info"></i>
            </content-box>
        </div>
    </div>
</template>

<i18n>
    {
    "en_US": {
    "textTransformTitle": "Text transform",
    "textTransformInfo": "Json format, Base64 ,MD5, URI",
    "colorTransformTitle": "Color transform",
    "colorTransformInfo": "RGB HEX CSS transform, Color constant ,Color picker",
    "photoTransformTitle": "Image transform",
    "photoTransformInfo": "Image to Base64, Base64 to Image",
    "regexTestTitle": "Regex test",
    "regexTestInfo": "Regex test, Frequently used Regex",
    "hostEditTitle": "Host Edit",
    "hostEditInfo": "Edit host, Ping",
    "systemInfoTitle": "System info",
    "systemInfoInfo": "IP addres, memory info"
    },

    "zh_CN": {
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
    }}
</i18n>

<script>
    import {contentBox} from '@/components';

    export default {
        name: 'mainPage',
        components: {
            contentBox
        }
    }
</script>

<style lang="less" scoped>
    .main-page {
        margin: 0 auto;
    }

    @media screen and (max-width: 700px) {
        .main-page {
            width: 100%;
        }
    }

    @media screen and (min-width: 700px) and (max-width: 826px) {
        .main-page {
            width: 550px;
        }
    }

    @media screen and (min-width: 826px) and (max-width: 1110px) {
        .main-page {
            width: 826px;
        }
    }

    @media screen and (min-width: 1110px) and (max-width: 1380px) {
        .main-page {
            width: 1110px;
        }
    }

    @media screen and (min-width: 1380px) {
        .main-page {
            width: 1380px;
        }
    }
</style>