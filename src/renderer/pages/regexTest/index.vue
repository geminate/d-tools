<template>
    <div>
        <div ref="regexText" class="regex-test">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="$t('regexTest')" name="test">
                    <div class="test-pane">
                        <div class="input-container">
                            <label class="label">{{$t('regex')}}：</label>
                            <el-input size="small" :placeholder="$t('regexInput')" v-model="regText">
                                <el-button slot="append" @click="test">{{$t('match')}}</el-button>
                            </el-input>
                            <el-checkbox v-model="global">{{$t('global')}}</el-checkbox>
                        </div>
                        <div class="text-container">
                            <div class="text">
                                <label class="label">{{$t('text')}}：</label>
                                <textarea :placeholder="$t('textInput')" v-model="text"></textarea>
                            </div>
                            <div class="match">
                                <label class="label">{{$t('result')}}：</label>
                                <textarea readonly v-model="result"></textarea>
                            </div>
                        </div>
                        <div class="input-container">
                            <label class="label">{{$t('replaceText')}}：</label>
                            <el-input size="small" :placeholder="$t('replaceInput')" v-model="resultText">
                                <el-button slot="append" @click="replace">{{$t('replace')}}</el-button>
                            </el-input>
                        </div>
                        <div class="text-container">
                            <div class="replace">
                                <label class="label">{{$t('text')}}：</label>
                                <textarea readonly v-model="replaceResult"></textarea>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="$t('frequently')" name="frequently">
                    <div class="frequently-pane">
                        <div class="item" v-for="(item,i) in frequentlyData">
                            <label class="label">{{item.label}}：</label>
                            <el-input readonly size="small" suffix-icon="el-icon-date" :value="item.value"></el-input>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<i18n>
    {
    "en_US": {
    "regexTest": "Regex test",
    "regex": "Regex",
    "regexInput": "Please input regex",
    "match": "Match",
    "global":"Global",
    "text":"Text",
    "textInput":"Please input text",
    "result":"Result",
    "replaceText":"Replace text",
    "replaceInput":"Please input replace text",
    "replace":"Replace",
    "frequently":"Frequently used",
    "noMatches":"No matches",
    "totalMatches01":"A total of ",
    "totalMatches02":" matches were found",
    "matchPlace":"Matching position:",
    "matchText":"Matching content:",
    "chinese":"CN characters",
    "url":"Web site URL",
    "cnPhone":"CN phone number",
    "qq":"QQ number",
    "cnPost":"CN post number",
    "cnID":"CN id number",
    "positiveInt":"Positive int",
    "negtiveInt":"Negtive int",
    "noNegtiveInt":"Nonnegative int",
    "noPositiveInt":"Nopositive int",
    "positiveFloat":"Positive float",
    "negtiveFloat":"Negtive float"
    },

    "zh_CN": {
    "regexTest": "正则测试",
    "regex": "正则表达式",
    "regexInput": "请输入正则表达式",
    "match": "匹配",
    "global":"全局",
    "text":"文本内容",
    "textInput":"请输入要测试的文本",
    "result":"匹配结果",
    "replaceText":"替换内容",
    "replaceInput":"请输入要替换为的文本",
    "replace":"替换",
    "frequently":"常用正则",
    "noMatches":"无匹配",
    "totalMatches01":"共找到",
    "totalMatches02":"处匹配",
    "matchPlace":"匹配位置：",
    "matchText":"匹配内容：",
    "chinese":"中文字符",
    "url":"网址URL",
    "cnPhone":"中国电话号码",
    "qq":"QQ号",
    "cnPost":"中国邮政编码",
    "cnID":"身份证号",
    "positiveInt":"正整数",
    "negtiveInt":"负整数",
    "noNegtiveInt":"非负整数",
    "noPositiveInt":"非正整数",
    "positiveFloat":"正浮点数",
    "negtiveFloat":"负浮点数"
    }}
</i18n>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import os from 'os';
    import {remote, clipboard} from 'electron';
    import {copyToClipboard} from '@/utils';

    export default {
        name: 'regexTest',
        data() {
            return {
                activeName: 'test',
                regText: '',
                text: '',
                result: '',
                resultText: '',
                replaceResult: '',
                global: false
            }
        },
        computed: {
            reg() {
                try {
                    new RegExp(`${this.regText}`);
                } catch (e) {
                    this.result = e.message;
                    return false;
                }
                if (this.global) {
                    return new RegExp(`${this.regText}`, 'g');
                } else {
                    return new RegExp(`${this.regText}`);
                }
            },
            frequentlyData() {
                return [
                    {label: this.$t('chinese'), value: `[\\u4e00-\\u9fa5]`},
                    {
                        label: 'Email',
                        value: `[\\w!#$%&'*+/=?^_\`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_\`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?`
                    },
                    {label: this.$t('url'), value: `[a-zA-z]+://[^\\s]*`},
                    {label: this.$t('cnPhone'), value: '\\d{3}-\\d{8}|\\d{4}-\\{7,8}'},
                    {label: this.$t('qq'), value: `[1-9][0-9]{4,}`},
                    {label: this.$t('cnPost'), value: '[1-9]\\d{5}(?!\\d)'},
                    {label: this.$t('cnID'), value: '^(\\d{6})(\\d{4})(\\d{2})(\\d{2})(\\d{3})([0-9]|X)$'},
                    {label: this.$t('positiveInt'), value: '^[1-9]\\d*$'},
                    {label: this.$t('negtiveInt'), value: '^-[1-9]\\d*$'},
                    {label: this.$t('noNegtiveInt'), value: '^[1-9]\\d*|0$'},
                    {label: this.$t('noPositiveInt'), value: '^-[1-9]\\d*|0$'},
                    {label: this.$t('positiveFloat'), value: '^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$'},
                    {label: this.$t('negtiveFloat'), value: '^-[1-9]\\d*\\.\\d*|-0\\.\\d*[1-9]\\d*$'},
                ]
            }
        },
        methods: {
            test() {
                if (this.global && this.reg) {
                    const match = this.text.match(this.reg);
                    if (match) {
                        this.result = `${this.$t('totalMatches01')}${match.length}${this.$t('totalMatches02')}${os.EOL}`;
                        match.forEach((item) => {
                            this.result += item + os.EOL;
                        })
                    } else {
                        this.result = `${this.$t('noMatches')}`;
                    }
                } else if (this.reg) {
                    const exec = this.reg.exec(this.text);
                    if (exec) {
                        this.result = `${this.$t('matchPlace')}${exec.index}${os.EOL}${this.$t('matchText')}${exec[0]}`;
                    } else {
                        this.result = `${this.$t('noMatches')}`;
                    }

                }
            },
            replace() {
                this.test();
                this.replaceResult = this.text.replace(this.reg, this.resultText);
            }
        },
        mounted() {
            this.$refs.regexText.querySelectorAll(".el-input__inner,textarea").forEach((item) => {
                item.addEventListener("dblclick", (e) => {
                    copyToClipboard(e.target.value, this);
                });
            });
        }
    }
</script>

<style lang="less">
    .regex-test {

        .test-pane {
            .el-input {
                width: 80%;
                margin-right: 15px;
            }

            .el-checkbox {
                display: inline-block;
            }

            .el-checkbox__label {
                margin-left: 5px;
            }
        }
    }
</style>
<style lang="less" scoped>
    .regex-test {
        padding: 0px 66px;
        max-width: 900px;
        margin: 0 auto;

        .test-pane {

            .label {
                display: block;
                font-size: 16px;
                margin-bottom: 10px;
            }

            .text-container {
                overflow: hidden;
                margin-bottom: 20px;

                .text {
                    font-size: 14px;
                    float: left;
                    width: 48%;
                    margin-top: 10px;
                }

                .match {
                    margin-top: 10px;
                    width: 48%;
                    float: right;
                }

                .replace {
                    margin-top: 10px;
                    width: 100%;
                }

                textarea {
                    padding: 5px;
                    width: 100%;
                    height: 22vh;
                    font-size: 12px;
                    border: 1px dashed #409EFF;
                    border-radius: 6px;

                    &[readonly] {
                        background: #FAFAFA
                    }
                }
            }
        }

        .frequently-pane {
            .item {
                width: 50%;
                float: left;
                margin-bottom: 10px;
                padding: 0px 10px;
                box-sizing: border-box;
                height: 32px;

                .label {
                    font-size: 12px;
                    line-height: 32px;
                    display: block;
                    float: left;
                    width: 45%;
                    text-align: right;

                }

                .el-input {
                    float: left;
                    width: 55%;
                }
            }
        }
    }
</style>