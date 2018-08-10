<template>
    <div>
        <div class="main-page">
            <content-box title="文本转换" detail="Json格式化、Base64、MD5、URI" href="/textTransform">
                <i class="fa fa-code"></i>
            </content-box>
            <content-box title="颜色转换" detail="RGB,HEX,CSS格式互转、颜色常量、颜色拾取" href="/colorTransform">
                <i class="fa fa-magic"></i>
            </content-box>
            <content-box title="图片转换" detail="图片与Base64互转" href="/photoTransform">
                <i class="fa fa-picture-o"></i>
            </content-box>
            <content-box title="正则测试" detail="正则表达式测试、常用正则" href="/regexTest">
                <i class="fa fa-quote-left"></i>
            </content-box>
            <content-box title="Host 编辑" detail="编辑修改系统Host、Ping" href="/hostEdit">
                <i class="fa fa-puzzle-piece"></i>
            </content-box>
            <content-box title="系统信息" detail="IP地址、内存使用情况等" href="/systemInfo">
                <i class="fa fa-info"></i>
            </content-box>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import {contentBox} from '@/components';

    export default {
        name: 'mainPage',
        components: {
            contentBox
        },
        data() {
            return {
                pageTitle: '主页',
            }
        },
        methods: {
            ...mapMutations(['setShowBack']),
        },
        mounted() {
            this.setShowBack(false);
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