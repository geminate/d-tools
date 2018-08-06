<template>
    <div>
        <div class="regex-test">
            <el-tabs v-model="activeName">
                <el-tab-pane label="正则测试" name="test">
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
                </el-tab-pane>
                <el-tab-pane label="常用正则" name="use">

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import os from 'os';

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
        }
    }
</script>

<style lang="less">
    .regex-test {
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
</style>
<style lang="less" scoped>
    .regex-test {
        padding: 0px 66px;
        max-width: 900px;
        margin: 0 auto;

        .label {
            display: block;
            font-size: 16px;
            margin-bottom: 10px;
        }

        .text-container {
            overflow: hidden;
            margin-bottom: 20px;

            .text {
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
</style>