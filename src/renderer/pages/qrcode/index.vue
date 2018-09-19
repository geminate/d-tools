<template>
<div class="qrcode">
    <el-input type="textarea" v-model="text"></el-input>
    <div class="qrcode-config">
        <div class="input-container">
            <label>{{$t('size')}}</label>
            <el-input v-model="size"></el-input>
        </div>
        <div class="input-container">
            <label>{{$t('color')}}</label>
            <el-color-picker v-model="color"></el-color-picker>
        </div>
        <el-button type="primary" @click="generateQrcode">{{$t('generate')}}</el-button>
    </div>
    <p>{{$t('result')}}</p>
    <div class="qrcode-result">
        <canvas :width="size" :height="size" id="canvas"></canvas>
        <p class="error-text">{{errorText}}</p>
    </div>
</div>
</template>

<i18n>
    {
    "en_US": {
    "size": "size:",
    "color": "color:",
    "generate": "generate",
    "result": "result"
    },

    "zh_CN": {
    "size": "大小：",
    "color": "颜色：",
    "generate": "生成",
    "result": "结果"
    }}
</i18n>

<script>
const QRCode = require('qrcode');
export default {
    data() {
        return {
            text: '',
            size: 200,
            color: '#ffffff',
            errorText: ''
        }
    },
    methods: {
        generateQrcode() {
            const canvas = document.getElementById('canvas');
            QRCode.toCanvas(canvas, this.text, {width: this.size, color: {light: this.color}}, (error) => {
                if (error) {
                    canvas.getContext('2d').clearRect(0, 0, this.size, this.size);
                    this.errorText = error.toString();
                    return;
                }
                this.errorText = '';
            })
        }
    }
}
</script>

<style lang="less">
.qrcode {
    padding: 0px 66px;
    max-width: 900px;
    margin: 0 auto;
    textarea {
        padding: 5px;
        margin: 0px;
        width: 100%;
        height: calc(~'100vh - 550px');
        min-height: 350px;
        white-space: nowrap;
        font-size: 12px;
        border: 1px dashed #409EFF;
        border-radius: 6px;
    }
    &-config, .input-container {
        display: flex;
        align-items: center;
    }
    .input-container {
        margin: 20px 40px 20px 0;
        label {width: 60px;}
        .el-input {width: 100px;}
    }
    p {
        height: 48px;
        line-height: 48px;
        font-size: 16px;
        font-weight: 600;
        border-bottom: 1px solid #cccccc;
    }
    &-result {
        display: flex;
        flex-direction: column;
        align-items: center;
        canvas {
            margin: 20px 0;
        }
        .error-text {
            color: red;
            font-size: 14px;
            border: none;
        }
    }
}
</style>

