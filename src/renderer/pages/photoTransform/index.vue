<template>
    <div>
        <div class="photo-transform">
            <div class="base64-container">
                <div class="el-upload el-upload--text el-upload-dragger img-container"
                     :class="{'is-dragover':isDragOver}"
                     @dragenter.stop.prevent="onDragIn"
                     @dragover.stop.prevent="onDragIn"
                     @dragleave.stop.prevent="onDragLeave"
                     @drop.stop.prevent="onDrop"
                     @click="chooseImg"
                     :style="{backgroundImage: 'url('+base64Data+')'}"
                >
                    <div class="fit-div" v-if="!base64Data">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text" v-html="infoText"></div>
                    </div>
                </div>
                <i class="fa fa-exchange icon-exchange"></i>
                <div class="text-container">
                    <textarea v-model="base64Data"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import fs from 'fs';
    import path from 'path';
    import {remote, clipboard} from 'electron';
    import mineType from 'mime-types';

    export default {
        name: 'photoTransform',
        data() {
            return {
                isDragOver: false,
                base64Data: ''
            }
        },
        computed: {
            infoText() {
                return this.isDragOver ? '放开鼠标左键开始转换' : '将图片拖到此处，或<em>点击上传</em>';
            }
        },
        methods: {
            onDragIn() {
                this.isDragOver = true;
            },
            onDragLeave() {
                this.isDragOver = false;
            },
            onDrop(e) {
                this.isDragOver = false;
                this.coverImgToBase64(e.dataTransfer.files[0].path);
            },
            chooseImg() {
                const imgPath = remote.dialog.showOpenDialog({
                    title: '请选择想要转换的图片',
                    filters: [
                        {name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'ico']},
                        {name: 'All Files', extensions: ['*']}],
                    properties: ['openFile']
                });
                if (imgPath != null && imgPath != 'undefined' && imgPath.length > 0) {
                    this.coverImgToBase64(imgPath[0]);
                }
            },
            coverImgToBase64(imgPath) {
                const fileSize = (fs.statSync(imgPath).size / 1024).toFixed(2);
                const extname = path.extname(imgPath).slice(1);
                if (!['jpg', 'jpeg', 'png', 'gif', 'ico'].includes(extname)) {
                    this.$notify({
                        message: `<b style="position: relative;top: -4px;font-weight: bold;">非图片格式`,
                        dangerouslyUseHTMLString: 'true',
                        position: 'bottom-right',
                        type: 'error'
                    });
                } else if (fileSize >= 2000) {
                    this.$notify({
                        message: `<b style="position: relative;top: -4px;font-weight: bold;">图片过大( ≥2MB )`,
                        dangerouslyUseHTMLString: 'true',
                        position: 'bottom-right',
                        type: 'error'
                    });
                }
                else {
                    this.base64Data = `data:${mineType.lookup(imgPath)};base64,${fs.readFileSync(imgPath).toString('base64')}`;
                }

            }
        },
    }
</script>
<style lang="less">
    .fit-div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -55%);
        transition: all 0.3s;
        width: 90%;

        .el-icon-upload {
            margin-top: 0px;
        }
    }
</style>
<style lang="less" scoped>
    .photo-transform {
        padding: 0px 30px;
        max-width: 1400px;
        margin: 0 auto;
        text-align: center;

        .base64-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            .img-container {
                width: calc(100vw * 0.35);
                height: calc(100vw * 0.175);
                max-width: 560px;
                max-height: 215px;
                background-repeat: no-repeat;
                background-position: 50% 30%;
                background-size: contain;
                overflow: visible;

                * {
                    pointer-events: none;
                }
            }

            .icon-exchange {
                margin: 0px 10px;
                color: rgb(192, 196, 204);
                font-size: 32px;
            }

            .text-container {
                position: relative;
                width: calc(100vw * 0.35);
                height: calc(100vw * 0.175);
                max-width: 560px;
                max-height: 215px;
                border: 1px dashed #d9d9d9;
                border-radius: 6px;

                &:hover, &:active {
                    border-color: #409EFF;
                }

                textarea {
                    width: 100%;
                    height: 100%;
                    resize: none;
                    border: none;
                }
            }
        }

        .img-info {
            position: absolute;
            bottom: -25px;
            text-align: center;
            width: 100%;
            font-size: 12px;
        }
    }

    @media screen and (max-width: 700px) {
        .photo-transform .base64-container {
            display: block;

            .img-container, .text-container {
                display: block;
                width: 100%;
                height: 380px;
                max-width: 100%;
                margin: 0;
            }

            .icon-exchange {
                display: block;
                margin: 10px 0px;
                transform: rotate(90deg);
            }
        }
    }
</style>