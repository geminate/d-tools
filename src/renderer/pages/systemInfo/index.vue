<template>
    <div>
        <div class="system-info">
            <el-table ref="table" :data="systemInfo" :show-header="false" cell-class-name="info-td">
                <el-table-column prop="name" align="right" width="120"></el-table-column>
                <el-table-column prop="value">
                    <template slot-scope="scope">
                        <pre v-if="scope.row.text">{{ scope.row.value}}</pre>
                        <el-progress v-if="scope.row.progress"
                                     :text-inside="true"
                                     :stroke-width="18"
                                     :percentage="scope.row.percent"
                                     style="margin-top: 5px;"
                        >
                        </el-progress>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import os from 'os';

    export default {
        name: 'systemInfo',
        data() {
            return {
                systemInfo: [{
                    name: '本地 IP :',
                    value: '',
                    text: true
                }, {
                    name: '主机名 :',
                    value: '',
                    text: true
                }, {
                    name: '操作系统版本 :',
                    value: '',
                    text: true
                }, {
                    name: '操作系统类型 :',
                    value: '',
                    text: true
                }, {
                    name: 'CPU 信息 :',
                    value: '',
                    text: true
                }, {
                    name: '内存信息 :',
                    value: '',
                    percent: 0,
                    text: true,
                    progress: true
                }]
            }
        },
        methods: {
            getAddress() {
                const interfaces = os.networkInterfaces();
                for (var devName in interfaces) {
                    var iface = interfaces[devName];
                    for (var i = 0; i < iface.length; i++) {
                        var alias = iface[i];
                        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                            return alias.address;
                        }
                    }
                }
            },
            getCpuInfo() {
                let reStr = ``;
                const cpuInfo = os.cpus();
                cpuInfo.forEach((item) => {
                    reStr += `${item.model} \n`;
                });
                return reStr;
            },
            getHostName() {
                return os.hostname();
            },
            getPlatform() {
                return os.platform();
            },
            getRelease() {
                return os.release();
            },
            getMemInfo() {
                const obj = {
                    value: `总内存 : ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB      可用 : ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB ( ${(os.freemem() / os.totalmem() * 100).toFixed(2)}% )`,
                    percent: Number(((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2))
                };
                this.systemInfo[5].value = obj.value;
                this.systemInfo[5].percent = obj.percent;
            }
        },
        mounted() {
            this.systemInfo[0].value = this.getAddress();
            this.systemInfo[1].value = this.getHostName();
            this.systemInfo[2].value = this.getPlatform();
            this.systemInfo[3].value = this.getRelease();
            this.systemInfo[4].value = this.getCpuInfo();

            this.getMemInfo();
            setInterval(() => {
                this.getMemInfo();
            }, 500);
        }
    }
</script>

<style lang="less">
    .el-table td.info-td {
        vertical-align: top;
    }

    .el-table td.info-td:first-of-type {
        width: 100px;
    }
</style>
<style lang="less" scoped>

    .system-info {
        padding: 0px 66px;
        max-width: 900px;
        margin: 0 auto;
    }

    @media screen and (max-width: 700px) {
        .system-info {
            padding: 0px 20px;
        }
    }


</style>