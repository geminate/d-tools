<template>
    <div>
        <div class="text-transform">
            <div class="row">
                <label class="title">{{$t('encryptAndDecrypt')}}</label>
                <div class="radio-container">
                    <el-radio size="mini" v-model="codeType" label="1" border>Base64</el-radio>
                    <el-radio size="mini" v-model="codeType" label="2" border>MD5</el-radio>
                    <el-radio size="mini" v-model="codeType" label="3" border>URI</el-radio>
                    <el-radio size="mini" v-model="codeType" label="4" border>URIComponent</el-radio>
                    <el-radio size="mini" v-model="codeType" label="5" border>Unicode</el-radio>
                </div>
                <div class="btn-container">
                    <el-button size="mini" type="success" @click="encode">{{$t('encrypt')}}</el-button>
                    <el-button size="mini" type="info" @click="decode" :disabled="!canDecode">{{$t('decrypt')}}
                    </el-button>
                </div>
            </div>
            <div class="row">
                <label class="title" v-html="this.$t('formatTitle')"></label>
                <div class="radio-container">
                    <el-radio size="mini" v-model="formatType" label="1" border>JSON</el-radio>
                </div>
                <div class="btn-container">
                    <el-button size="mini" type="success" @click="format">{{$t('format')}}</el-button>
                    <el-button size="mini" type="info" @click="zip">{{$t('zip')}}</el-button>
                </div>
            </div>
            <el-button class="undo-btn" icon="fa fa-undo" size="mini" type="warning" @click="undo" :disabled="!canUndo">
                {{$t('revoke')}}
            </el-button>
            <textarea @input="saveInitText" id="text" v-model="text" @dblclick="copy"></textarea>
            <pre class="message" :class="messageClass">{{message}}</pre>
        </div>
    </div>
</template>

<i18n>
    {
    "en_US": {
    "encryptAndDecrypt": "en/decrypt:",
    "formatTitle": "format:",
    "encrypt": "encrypt",
    "decrypt": "decrypt",
    "format": "format",
    "zip": "zip",
    "revoke": "revoke",
    "encryptSuccess": "encrypt success",
    "decryptSuccess": "decrypt success",
    "formatSuccess": "format success",
    "zipSuccess": "zip success"
    },

    "zh_CN": {
    "encryptAndDecrypt": "加密解密：",
    "formatTitle": "格&ensp;式&ensp;化：",
    "encrypt": "加密",
    "decrypt": "解密",
    "format": "格式化",
    "zip": "压缩",
    "revoke": "撤销",
    "encryptSuccess": "加密成功",
    "decryptSuccess": "解密成功",
    "formatSuccess": "格式化成功",
    "zipSuccess": "压缩成功"
    }}
</i18n>

<script>
    import jsl from '@/assets/js/jsonFormat.min.js';
    import {Base64} from 'js-base64';
    import {createHash} from 'crypto';
    import {copyToClipboard} from '@/utils';

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
            copy(e) {
                copyToClipboard(e.target.value, this);
            },
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
                this.codeType == '5' && this.unicodeEncode();
            },
            decode() {
                this.initMessage();
                this.history.push(this.text);
                this.codeType == '1' && this.base64Decode();
                this.codeType == '3' && this.uriDecode();
                this.codeType == '4' && this.uriComponentDecode();
                this.codeType == '5' && this.unicodeDecode();
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
                    this.setMessage(`Json ${this.$t('formatSuccess')}！`, "success");
                } catch (pe) {
                    this.setMessage(pe.message, "error");
                }
            },
            zipJson() {
                this.text = jsl.zip(this.text);
                this.setMessage(`Json ${this.$t('zipSuccess')}！`, "success");
            },
            base64Encode() {
                this.text = Base64.encode(this.text);
                this.setMessage(`Base64 ${this.$t('encryptSuccess')}！`, "success");
            },
            base64Decode() {
                this.text = Base64.decode(this.text);
                this.setMessage(`Base64 ${this.$t('decryptSuccess')}！`, "success");
            },
            md5Encode() {
                const md5 = createHash('md5');
                md5.update(this.text);
                this.text = md5.digest('hex');
                this.setMessage(`MD5 ${this.$t('encryptSuccess')}！`, "success");
            },
            uriEncode() {
                this.text = encodeURI(this.text);
                this.setMessage(`URI ${this.$t('encryptSuccess')}！`, "success");
            },
            uriDecode() {
                this.text = decodeURI(this.text);
                this.setMessage(`URI ${this.$t('decryptSuccess')}！`, "success");
            },
            uriComponentEncode() {
                this.text = encodeURIComponent(this.text);
                this.setMessage(`URIComponent ${this.$t('encryptSuccess')}！`, "success");
            },
            uriComponentDecode() {
                this.text = decodeURIComponent(this.text);
                this.setMessage(`URIComponent ${this.$t('decryptSuccess')}！`, "success");
            },
            unicodeEncode() {
                let result = '';
                for (let i = 0; i < this.text.length; i++) {
                    result += "\\u" + this.text.charCodeAt(i).toString(16);
                }
                this.text = result;
            },
            unicodeDecode() {
                this.text = unescape(this.text.replace(/\\u/g, '%u'));
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