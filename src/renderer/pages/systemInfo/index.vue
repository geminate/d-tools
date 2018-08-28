<template>
    <div>
        <div class="system-info">
            <el-table ref="table" :data="systemInfo" :show-header="false" cell-class-name="info-td">
                <el-table-column prop="name" align="right" width="120"></el-table-column>
                <el-table-column prop="value">
                    <template slot-scope="scope">
                        <pre @dblclick="copy" v-if="scope.row.text">{{ scope.row.value}}</pre>
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
<i18n>
    {
    "en_US": {
    "localIp": "Local ip :",
    "hostName": "Host name :",
    "osVersion": "OS version :",
    "osType": "OS type :",
    "cpuInfo": "CPU info :",
    "memoryInfo": "Memory info :",
    "totalMemory":"Total memory",
    "available":"Available"
    },

    "zh_CN": {
    "localIp": "本地 IP :",
    "hostName": "主机名 :",
    "osVersion": "操作系统版本 :",
    "osType": "操作系统类型 :",
    "cpuInfo": "CPU 信息 :",
    "memoryInfo": "内存信息 :",
    "totalMemory":"总内存",
    "available":"可用"
    }
    }
</i18n>
<script>
    import os from 'os';
    import {copyToClipboard} from '@/utils';

    export default {
        name: 'systemInfo',
        data() {
            return {
                address: '',
                hostName: '',
                platform: '',
                release: '',
                cpuInfo: '',
                memoryInfo: {
                    value: '',
                    percent: 0
                }
            }
        },
        computed: {
            systemInfo() {
                return [{
                    name: this.$t('localIp'),
                    value: this.address,
                    text: true
                }, {
                    name: this.$t('hostName'),
                    value: this.hostName,
                    text: true
                }, {
                    name: this.$t('osVersion'),
                    value: this.platform,
                    text: true
                }, {
                    name: this.$t('osType'),
                    value: this.release,
                    text: true
                }, {
                    name: this.$t('cpuInfo'),
                    value: this.cpuInfo,
                    text: true
                }, {
                    name: this.$t('memoryInfo'),
                    value: this.memoryInfo.value,
                    percent: this.memoryInfo.percent,
                    text: true,
                    progress: true
                }]
            }
        },
        methods: {
            copy(e) {
                copyToClipboard(e.target.innerText, this);
            },
            getAddress() {
                const interfaces = os.networkInterfaces();
                for (var devName in interfaces) {
                    var iface = interfaces[devName];
                    for (var i = 0; i < iface.length; i++) {
                        var alias = iface[i];
                        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                            this.address = alias.address;
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
                this.cpuInfo = reStr;
            },
            getHostName() {
                this.hostName = os.hostname();
            },
            getPlatform() {
                this.platform = os.platform();
            },
            getRelease() {
                this.release = os.release();
            },
            getMemInfo() {
                const obj = {
                    value: `${this.$t('totalMemory')} : ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB      ${this.$t('available')} : ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB ( ${(os.freemem() / os.totalmem() * 100).toFixed(2)}% )`,
                    percent: Number(((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2))
                };
                this.memoryInfo.value = obj.value;
                this.memoryInfo.percent = obj.percent;
            }
        },
        mounted() {
            this.getAddress();
            this.getHostName();
            this.getPlatform();
            this.getRelease();
            this.getCpuInfo();

            this.getMemInfo();
            const timer = setInterval(() => {
                this.getMemInfo();
            }, 500);
            this.$once('hook:beforeDestroy', () => {
                clearInterval(timer);
            });
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