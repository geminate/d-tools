<template>
    <div>
        <div ref="colorTransform" class="color-transform">
            <el-card class="box-card">
                <h1>CSS {{$t('format')}}</h1>
                <el-input v-model="cssModel" @input="onCssInput" placeholder="rgb(0,120,215)">
                    <i slot="suffix" class="fa fa-files-o" @click="copy(cssModel)"></i>
                </el-input>
            </el-card>
            <el-card class="box-card">
                <h1>Hex {{$t('format')}}</h1>
                <el-input v-model="hexModel" @input="onHexInput" placeholder="#0078d7">
                    <i slot="suffix" class="fa fa-files-o" @click="copy(hexModel)"></i>
                </el-input>
            </el-card>
            <el-card class="box-card">
                <h1>RGB {{$t('format')}}</h1>
                <div class="input-container">
                    <el-input v-model="rModel" @input="onRInput" placeholder="0 ~ 255">
                        <template slot="prepend">R</template>
                        <i slot="suffix" class="fa fa-files-o" @click="copy(rModel)"></i>
                    </el-input>
                </div>
                <div class="input-container">
                    <el-input v-model="gModel" @input="onGInput" placeholder="0 ~ 255">
                        <template slot="prepend">G</template>
                        <i slot="suffix" class="fa fa-files-o" @click="copy(gModel)"></i>
                    </el-input>
                </div>
                <div class="input-container">
                    <el-input v-model="bModel" @input="onBInput" placeholder="0 ~ 255">
                        <template slot="prepend">B</template>
                        <i slot="suffix" class="fa fa-files-o" @click="copy(bModel)"></i>
                    </el-input>
                </div>
            </el-card>
            <el-card class="box-card">
                <h1>{{$t('constant')}}</h1>
                <el-autocomplete
                        v-model="constModel"
                        :fetch-suggestions="querySearch"
                        :placeholder="`${$t('example')}: yellow`"
                        :trigger-on-focus="true"
                        class="el-input"
                        @select="handleSelect"
                >
                    <template slot-scope="{ item }">
                        <span class="auto-color" :style="{background:item.value}"></span>
                        <span class="auto-name">{{ item.value }}</span>
                    </template>
                    <i slot="suffix" class="fa fa-files-o" @click="copy(constModel)"></i>
                </el-autocomplete>
            </el-card>
            <el-card class="box-card preview-card">
                <h1>{{$t('picker')}}</h1>
                <el-color-picker v-model="preview" @change="onPreviewInput"></el-color-picker>
            </el-card>
        </div>
    </div>
</template>

<i18n>
    {
    "en_US": {
    "format": "format",
    "constant": "Constant color",
    "picker": "Preview and picker",
    "example": "example"
    },

    "zh_CN": {
    "format": "格式",
    "constant": "常量名",
    "picker": "预览、颜色拾取",
    "example": "例如"
    }}
</i18n>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import Color from 'color';
    import {clipboard} from 'electron';
    import {copyToClipboard} from '@/utils';
    import colorJson from '@/assets/json/color.json';

    export default {
        name: 'colorTransform',
        data() {
            return {
                cssModel: 'rgb(0,120,215)',
                hexModel: '#0078d7',
                rModel: '0',
                gModel: '120',
                bModel: '215',
                constModel: '',
                preview: '#0078d7'
            }
        },
        mounted() {
            this.$refs.colorTransform.querySelectorAll(".el-input__inner").forEach((item) => {
                item.addEventListener("dblclick", (e) => {
                    copyToClipboard(e.target.value, this);
                });
            });
        },
        watch: {
            constModel: function (value) {
                this.parseColor(value, 'const');
            }
        },
        methods: {
            parseColor(value, except) {
                try {
                    if (Array.isArray(value)) {
                        value = value.map((item) => {
                            return Number(item);
                        });
                    }
                    const color = Color(value);
                    except != 'r' && (this.rModel = color.red());
                    except != 'g' && (this.gModel = color.green());
                    except != 'b' && (this.bModel = color.blue());
                    except != 'css' && (this.cssModel = `rgb(${color.red()},${color.green()},${color.blue()})`);
                    except != 'hex' && (this.hexModel = color.hex());
                    except != 'preview' && (this.preview = color.hex());
                } catch (e) {
                }
            }
            ,
            onCssInput(value) {
                this.parseColor(value, 'css');
            }
            ,
            onHexInput(value) {
                this.parseColor(value, 'hex');
            }
            ,
            onRInput(value) {
                this.parseColor([this.rModel, this.gModel, this.bModel], 'r');
            }
            ,
            onGInput(value) {
                this.parseColor([this.rModel, this.gModel, this.bModel], 'g');
            }
            ,
            onBInput(value) {
                this.parseColor([this.rModel, this.gModel, this.bModel], 'b');
            },
            onPreviewInput(value) {
                this.parseColor(value, 'preview');
            },
            querySearch(queryString, cb) {
                const results = queryString ? colorJson.filter(this.createFilter(queryString)) : colorJson;
                cb(results);
            },
            createFilter(queryString) {
                return (colorJson) => {
                    return (colorJson.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect({value}) {
                this.parseColor(value, 'const');
            }
        }
    }
</script>

<style lang="less" scoped>
    .color-transform {
        max-width: 900px;
        margin: 0 auto;
    }

    .box-card {
        width: 40%;
        margin: 20px 5%;
        float: left;
    }

    .box-card.preview-card {
        margin-top: -5px;
    }

    h1 {
        margin-bottom: 10px;
    }

    .preview {
        width: 38px;
        height: 38px;
        border: 1px dashed gainsboro;
    }

    .input-container {
        margin-bottom: 15px;
    }

    i {
        position: relative;
        top: 11px;
        right: 6px;
        font-size: 16px;
        cursor: pointer;
    }

    p {
        font-size: 12px;
        margin: 5px;
    }

    .auto-color {
        width: 20px;
        height: 20px;
        display: inline-block;
        position: relative;
        top: 7px;
        margin-right: 10px;
    }
</style>