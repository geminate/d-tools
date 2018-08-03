<template>
    <div>
        <div class="text-transform">
            <div class="row">
                <label class="title">加密解密：</label>
                <div class="radio-container">
                    <el-radio size="mini" v-model="codeType" label="1" border>Base64</el-radio>
                    <el-radio size="mini" v-model="codeType" label="2" border>MD5</el-radio>
                    <el-radio size="mini" v-model="codeType" label="3" border>URI</el-radio>
                    <el-radio size="mini" v-model="codeType" label="4" border>URIComponent</el-radio>
                </div>
                <div class="btn-container">
                    <el-button size="mini" type="success" @click="encode">加密</el-button>
                    <el-button size="mini" type="info" @click="decode" :disabled="!canDecode">解密</el-button>
                </div>
            </div>
            <div class="row">
                <label class="title">格&ensp;式&ensp;化：</label>
                <div class="radio-container">
                    <el-radio size="mini" v-model="formatType" label="1" border>JSON</el-radio>
                </div>
                <div class="btn-container">
                    <el-button size="mini" type="success" @click="format">展开</el-button>
                    <el-button size="mini" type="info" @click="zip">压缩</el-button>
                </div>
            </div>
            <el-button class="undo-btn" icon="fa fa-undo" size="mini" type="warning" @click="undo" :disabled="!canUndo">
                撤销
            </el-button>
            <textarea @input="saveInitText" id="text" v-model="text"></textarea>
            <pre class="message" :class="messageClass">{{message}}</pre>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import jsl from '@/assets/js/jsonFormat.min.js';
    import {Base64} from 'js-base64';
    import {createHash} from 'crypto';

    export default {
        name: 'textTransform',
        data() {
            return {
                codeType: '1',
                formatType: '1',
                text: "",
                message: "",
                messageClass: "",
                history: []
            }
        },
        computed: {
            canUndo() {
                return this.history.length > 0;
            },
            canDecode() {
                return this.codeType != '2';
            }
        },
        methods: {
            undo() {
                if (this.history.length > 0) {
                    this.text = this.history.pop();
                }
            },
            saveInitText() {
                this.history = [];
            },
            initMessage() {
                this.message = "";
                this.messageClass = "";
            },
            setMessage(message, className) {
                this.message = message;
                this.messageClass = className;
            },
            encode() {
                this.initMessage();
                this.history.push(this.text);
                this.codeType == '1' && this.base64Encode();
                this.codeType == '2' && this.md5Encode();
                this.codeType == '3' && this.uriEncode();
                this.codeType == '4' && this.uriComponentEncode();
            },
            decode() {
                this.initMessage();
                this.history.push(this.text);
                this.codeType == '1' && this.base64Decode();
                this.codeType == '3' && this.uriDecode
                this.codeType == '4' && this.uriComponentDecode();
            },
            format() {
                this.initMessage();
                this.history.push(this.text);
                this.formatType == '1' && this.formatJson();
            },
            zip() {
                this.initMessage();
                this.history.push(this.text);
                this.formatType == '1' && this.zipJson();
            },
            formatJson() {
                try {
                    this.text = jsl.format.formatJson(this.text);
                    jsl.parser.parse(this.text);
                    this.setMessage("Json 格式化成功！", "success");
                } catch (pe) {
                    this.setMessage(pe.message, "error");
                }
            },
            zipJson() {
                this.text = jsl.zip(this.text);
                this.setMessage("Json 压缩成功！", "success");
            },
            base64Encode() {
                this.text = Base64.encode(this.text);
                this.setMessage("Base64 加密成功！", "success");
            },
            base64Decode() {
                this.text = Base64.decode(this.text);
                this.setMessage("Base64 解密成功！", "success");
            },
            md5Encode() {
                const md5 = createHash('md5');
                md5.update(this.text);
                this.text = md5.digest('hex');
                this.setMessage("MD5 加密成功！", "success");
            },
            uriEncode() {
                this.text = encodeURI(this.text);
                this.setMessage("URI 编码成功！", "success");
            },
            uriDecode() {
                this.text = decodeURI(this.text);
                this.setMessage("URI 解码成功！", "success");
            },
            uriComponentEncode() {
                this.text = encodeURIComponent(this.text);
                this.setMessage("URIComponent 编码成功！", "success");
            },
            uriComponentDecode() {
                this.text = decodeURIComponent(this.text);
                this.setMessage("URIComponent 解码成功！", "success");
            }
        }
    }
</script>

<style lang="less" scoped>
    .text-transform {
        padding: 0px 66px 60px 66px;
        max-width: 900px;
        margin: 0 auto;

        textarea {
            padding: 5px;
            margin: 0px;
            width: 100%;
            height: calc(~'100vh - 400px');
            min-height: 350px;
            white-space: nowrap;
            font-size: 12px;
            border: 1px dashed #409EFF;
            border-radius: 6px;
        }

        .row {
            width: 100%;
            padding: 5px 0px 5px 5px;
            overflow: auto;
            display: flex;

            label.title {
                flex: 0 0 100px;
                display: inline-block;
                text-align: right;
            }

            .radio-container {
                flex: 1 1 auto;
                display: inline-block;

                .el-radio {
                    margin: 0px 5px 5px 5px;
                    width: 140px;
                }
            }

            .btn-container {
                flex: 0 0 170px;
                text-align: right;

                .el-button {
                    width: 75px;
                    margin: 0px 0px 5px 5px;
                }

                @media screen and (max-width: 580px) {
                    & {
                        flex: 0 0 50px;
                    }
                }
            }
        }

        .undo-btn {
            float: right;
            margin-bottom: 10px;
        }

        .message {
            font-size: 14px;
            margin-top: 5px;
            display: block;

            &.error {
                color: #F56C6C;
            }

            &.success {
                color: #67C23A;
            }
        }
    }
</style>