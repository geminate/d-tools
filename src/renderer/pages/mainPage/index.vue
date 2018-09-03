<template>
    <div>
        <div class="main-page"
             @dragenter.stop.prevent="onDragIn"
             @drop.stop.prevent="onDrop"
             @dragover.stop.prevent="onDragIn"
             @dragleave.stop.prevent="onDragLeave">

            <content-box :title="$t('textTransformTitle')" :detail="$t('textTransformInfo')" href="/textTransform">
                <i class="fa fa-code"></i>
            </content-box>

            <content-box :title="$t('colorTransformTitle')" :detail="$t('colorTransformInfo')" href="/colorTransform">
                <i class="fa fa-magic"></i>
            </content-box>

            <content-box :title="$t('photoTransformTitle')" :detail="$t('photoTransformInfo')" href="/photoTransform">
                <i class="fa fa-picture-o"></i>
            </content-box>

            <content-box :title="$t('regexTestTitle')" :detail="$t('regexTestInfo')" href="/regexTest">
                <i class="fa fa-quote-left"></i>
            </content-box>

            <content-box :title="$t('hostEditTitle')" :detail="$t('hostEditInfo')" href="/hostEdit">
                <i class="fa fa-puzzle-piece"></i>
            </content-box>

            <content-box :title="$t('systemInfoTitle')" :detail="$t('systemInfoInfo')" href="/systemInfo">
                <i class="fa fa-info"></i>
            </content-box>

            <transition-group name="fade">
                <content-box type="custom"
                             v-for="(item,i) in shortcutList"
                             :key="i"
                             :title="item.title"
                             :detail="item.path"
                             @itemClick="openFile(item.path)"
                             @delClick="delItem(item)">
                    <i class="fa" :class="item.icon"></i>
                </content-box>
            </transition-group>

            <div class="add-container" key="addBox">
                <div class="add-box" @click="addClick">
                    <i class="fa fa-plus"></i>
                </div>
            </div>

        </div>
    </div>
</template>

<i18n>
    {
    "en_US": {
    "textTransformTitle": "Text transform",
    "textTransformInfo": "Json format, Base64 ,MD5, URI",
    "colorTransformTitle": "Color transform",
    "colorTransformInfo": "RGB HEX CSS transform, Color constant ,Color picker",
    "photoTransformTitle": "Image transform",
    "photoTransformInfo": "Image to Base64, Base64 to Image",
    "regexTestTitle": "Regex test",
    "regexTestInfo": "Regex test, Frequently used Regex",
    "hostEditTitle": "Host Edit",
    "hostEditInfo": "Edit host, Ping",
    "systemInfoTitle": "System info",
    "systemInfoInfo": "IP addres, memory info",
    "choose": "choose file"
    },

    "zh_CN": {
    "textTransformTitle": "文本转换",
    "textTransformInfo": "Json格式化、Base64、MD5、URI",
    "colorTransformTitle": "颜色转换",
    "colorTransformInfo": "RGB,HEX,CSS格式互转、颜色常量、颜色拾取",
    "photoTransformTitle": "图片转换",
    "photoTransformInfo": "图片与Base64互转",
    "regexTestTitle": "正则测试",
    "regexTestInfo": "正则表达式测试、常用正则",
    "hostEditTitle": "Host 编辑",
    "hostEditInfo": "编辑修改系统Host、Ping",
    "systemInfoTitle": "系统信息",
    "systemInfoInfo": "IP地址、内存使用情况等",
    "choose": "请选择想要添加的文件"
    }}
</i18n>

<script>
    import {contentBox} from '@/components';
    import opn from 'opn';
    import {setting} from '@/utils';
    import fs from 'fs';
    import path from 'path';
    import {remote} from 'electron';

    export default {
        name: 'mainPage',
        data() {
            return {
                shortcutList: []
            }
        },
        components: {
            contentBox
        },
        methods: {
            addClick() {
                const filePath = remote.dialog.showOpenDialog({
                    title: this.$t('choose'),
                    filters: [
                        {name: 'All Files', extensions: ['*']}],
                    properties: ['openFile']
                });
                if (filePath != null && filePath != 'undefined' && filePath.length > 0) {
                    this.addItem(filePath[0]);
                }
            },
            addItem(filePath) {
                const obj = {
                    icon: 'fa-file-text',
                    path: filePath,
                    title: path.parse(filePath).name
                };
                this.shortcutList.push(obj);
                setting.set("shortcutList", this.shortcutList);
            },
            openFile(path) {
                opn(path);
            },
            delItem(item) {
                const place = this.shortcutList.indexOf(item);
                if (place != -1) {
                    this.shortcutList.splice(place, 1);
                    setting.set("shortcutList", this.shortcutList);
                }
            },
            onDragIn() {
            },
            onDrop(e) {
                e.dataTransfer.files[0] && this.addItem(e.dataTransfer.files[0].path);
            },
            onDragLeave(e) {
            }
        },
        mounted() {
            setting.get("shortcutList") && (this.shortcutList = setting.get("shortcutList"));
        }
    }
</script>

<style lang="less" scoped>
    .main-page {
        margin: 0 auto;
        min-height: 100%;
    }

    .add-container {
        width: 252px;
        height: 88px;
        margin: 10px;
        display: inline-block;

        .add-box {
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border: 1px solid rgb(225, 225, 225);
            float: left;
            color: rgb(200, 200, 200);
            position: relative;
            top: 15px;
            left: 15px;
            border-radius: 4px;
            cursor: pointer;
        }
    }

    @media screen and (max-width: 700px) {

        .add-container {
            display: block;
            width: 100%;
            height: 88px;
            margin: 0;
            padding: 14px;

            .add-box {
                top: 0px;
                left: 0px;
            }
        }
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