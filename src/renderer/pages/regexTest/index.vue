<template>
    <div>
        <div ref="regexText" class="regex-test">
            <el-tabs v-model="activeName">
                <el-tab-pane label="正则测试" name="test">
                    <div class="test-pane">
                        <div class="input-container">
                            <label class="label">正则表达式：</label>
                            <el-input size="small" placeholder="正则表达式" v-model="regText">
                                <el-button slot="append" @click="test">匹配</el-button>
                            </el-input>
                            <el-checkbox v-model="global">全局</el-checkbox>
                        </div>
                        <div class="text-container">
                            <div class="text">
                                <label class="label">文本内容：</label>
                                <textarea placeholder="请输入要测试的文本" v-model="text"></textarea>
                            </div>
                            <div class="match">
                                <label class="label">匹配结果：</label>
                                <textarea readonly v-model="result"></textarea>
                            </div>
                        </div>
                        <div class="input-container">
                            <label class="label">替换内容：</label>
                            <el-input size="small" placeholder="请输入要替换为的文本" v-model="resultText">
                                <el-button slot="append" @click="replace">替换</el-button>
                            </el-input>
                        </div>
                        <div class="text-container">
                            <div class="replace">
                                <label class="label">文本内容：</label>
                                <textarea readonly v-model="replaceResult"></textarea>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="常用正则" name="frequently">
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
                global: false,
                frequentlyData: [
                    {label: '中文字符', value: `[\\u4e00-\\u9fa5]`},
                    {
                        label: 'Email地址',
                        value: `[\\w!#$%&'*+/=?^_\`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_\`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?`
                    },
                    {label: '网址URL', value: `[a-zA-z]+://[^\\s]*`},
                    {label: '中国电话号码', value: '\\d{3}-\\d{8}|\\d{4}-\\{7,8}'},
                    {label: 'QQ号', value: `[1-9][0-9]{4,}`},
                    {label: '中国邮政编码', value: '[1-9]\\d{5}(?!\\d)'},
                    {label: '身份证号', value: '^(\\d{6})(\\d{4})(\\d{2})(\\d{2})(\\d{3})([0-9]|X)$'},
                    {label: '正整数', value: '^[1-9]\\d*$'},
                    {label: '负整数', value: '^-[1-9]\\d*$'},
                    {label: '非负整数', value: '^[1-9]\\d*|0$'},
                    {label: '非正整数', value: '^-[1-9]\\d*|0$'},
                    {label: '正浮点数', value: '^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$'},
                    {label: '负浮点数', value: '^-[1-9]\\d*\\.\\d*|-0\\.\\d*[1-9]\\d*$'},
                ]
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
            }
        },
        methods: {
            test() {
                if (this.global && this.reg) {
                    const match = this.text.match(this.reg);
                    if (match) {
                        this.result = `共找到${match.length}处匹配${os.EOL}`;
                        match.forEach((item) => {
                            this.result += item + os.EOL;
                        })
                    } else {
                        this.result = `无匹配`;
                    }
                } else if (this.reg) {
                    const exec = this.reg.exec(this.text);
                    if (exec) {
                        this.result = `匹配位置：${exec.index}${os.EOL}匹配内容：${exec[0]}`;
                    } else {
                        this.result = `无匹配`;
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
                    copyToClipboard(e.target.value);
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
                    line-height: 32px;
                    display: block;
                    float: left;
                    width: 35%;
                    text-align: right;
                }

                .el-input {
                    float: left;
                    width: 60%;
                }
            }
        }
    }
</style>