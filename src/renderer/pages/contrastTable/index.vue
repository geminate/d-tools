<template>
    <div>
        <div class="contrast-table">
            <div class="search-container">
                <el-input :placeholder="$t('searchPlaceholder')" v-model="searchInput" size="mini"
                          suffix-icon="el-icon-search"></el-input>
            </div>
            <el-tabs v-model="activeName">
                <el-tab-pane :label="$t('httpContentType')" name="httpContentType">
                    <el-table :data="contentTypeData" size="mini" style="width: 100%">
                        <el-table-column prop="ext" :label="$t('ext')"></el-table-column>
                        <el-table-column prop="type" label="Content-Type(Mime-Type)"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="$t('htmleEscape')" name="htmlEscape">
                    <el-table :data="htmlEscapeData" size="mini" style="width: 100%">
                        <el-table-column prop="char" :label="$t('char')"></el-table-column>
                        <el-table-column prop="decimal" :label="$t('decimal')"></el-table-column>
                        <el-table-column prop="escape" :label="$t('escape')"></el-table-column>
                    </el-table>
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
    "searchPlaceholder":"key words",
    "ext":"file extension",
    "char":"char",
    "decimal":"decimal",
    "escape":"escape"
    },
    "zh_CN": {
    "httpContentType":"HTTP Content-type",
    "htmleEscape":"HTML 转义字符",
    "searchPlaceholder":"请输入搜索内容",
    "ext":"文件扩展名",
    "char":"字符",
    "decimal":"十进制",
    "escape":"转义字符"
    }}
</i18n>

<script>
    import contentType from './contentType.json';
    import htmlEscape from './htmlEscape.json'

    export default {
        name: 'hostEdit',
        data() {
            return {
                activeName: 'httpContentType',
                contentTypeData: contentType,
                htmlEscapeData: htmlEscape,
                htmlEscapeBottom: [],
                searchInput: ''
            }
        },
        watch: {
            searchInput(newText, oldText) {
                const contentTypeData = [];
                contentType.forEach(({ext, type}) => {
                    if (ext.indexOf(newText) != -1 || type.indexOf(newText) != -1) {
                        contentTypeData.push({ext, type});
                    }
                });
                const htmlEscapeData = [];
                htmlEscape.forEach(({char, decimal, escape}) => {
                    if (char.indexOf(newText) != -1 || decimal.indexOf(newText) != -1 || escape.indexOf(newText) != -1) {
                        htmlEscapeData.push({char, decimal, escape});
                    }
                });
                this.contentTypeData = contentTypeData;
                this.htmlEscapeData = htmlEscapeData;
            },
            activeName() {
                this.searchInput = "";
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