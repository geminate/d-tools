<template>
    <div>
        <div class="contrast-table">
            <div class="search-container">
                <el-input placeholder="请输入搜索内容" v-model="searchInput" size="mini">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <el-tabs v-model="activeName">
                <el-tab-pane :label="$t('httpContentType')" name="httpContentType">
                    <el-table :data="tableData" size="mini" style="width: 100%">
                        <el-table-column prop="ext" label="文件扩展名"></el-table-column>
                        <el-table-column prop="type" label="Content-Type(Mime-Type)"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="$t('htmleEscape')" name="htmleEscape">
                    2
                </el-tab-pane>
                <el-tab-pane :label="$t('httpStatus')" name="httpStatus">
                    3
                </el-tab-pane>
                <el-tab-pane :label="$t('keyCode')" name="keyCode">
                    4
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<i18n>
    {
    "en_US": {
    "httpContentType":"HTTP Content-type",
    "htmleEscape":"HTML escape characters",
    "httpStatus":"HTTP status codes",
    "keyCode":"Keyboard key code"
    },

    "zh_CN": {
    "httpContentType":"HTTP Content-type",
    "htmleEscape":"HTML 转义字符",
    "httpStatus":"HTTP 状态码",
    "keyCode":"键盘按键码"
    }}
</i18n>

<script>
    import contentType from './contentType.json'

    export default {
        name: 'hostEdit',
        data() {
            return {
                activeName: 'httpContentType',
                tableData: contentType,
                searchInput: ''
            }
        },
        methods: {},
        mounted() {

        }
    }
</script>

<style lang="less" scoped>
    .contrast-table {
        padding: 0px 66px;
        max-width: 900px;
        margin: 0 auto;
    }

    .search-container {
        position: fixed;
        right: 21px;
        top: 58px;
        width: 180px;
        z-index: 9;
    }
</style>