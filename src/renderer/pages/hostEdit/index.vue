<template>
    <div>
        <div class="host-edit">
            <el-tabs v-model="activeName">
                <el-tab-pane label="文本模式" name="text">
                    <div class="text-edit">
                        <textarea v-model="hostsText"></textarea>
                        <div class="btn-container">
                            <el-button type="success" @click="saveText">保存</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="表格模式" name="table">
                    <div class="table-edit">
                        <template v-if="hostsCount<30">
                            <el-table :data="localHosts" stripe :show-header="false">
                                <el-table-column min-width="27">
                                    <template slot-scope="scope">
                                        <el-input size="mini" type="text" v-model="scope.row.ip"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column min-width="30">
                                    <template slot-scope="scope">
                                        <el-input size="mini" type="text" v-model="scope.row.domain"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column min-width="10">
                                    <template slot-scope="scope">
                                        <el-button class="btn-remove" size="mini" type="danger" icon="el-icon-delete"
                                                   circle @click="removeRow(scope.$index)"></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button class="btn-add" size="mini" type="success" icon="el-icon-plus" circle
                                       @click="addRow"></el-button>
                            <div class="btn-container">
                                <el-button type="success" @click="saveTable">保存</el-button>
                            </div>
                        </template>
                        <template v-else>
                            <div class="too-many-info">
                                当前 hosts 文件条数过多( ≥30 ), 已禁用表格模式
                            </div>
                        </template>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="ping" name="ping">
                    <div class="ping-edit">
                        <el-input placeholder="请输入IP或域名" size="small" class="ip-input" v-model="pingIp"></el-input>
                        <el-button class="btn-add" size="small " type="success" @click="startPing" v-if="!pingStatus">
                            Ping
                        </el-button>
                        <el-button class="btn-add" size="small " type="danger" @click="stopPing" v-if="pingStatus">Stop
                        </el-button>
                        <textarea class="ping-result" ref="textarea">
                                {{pingResult}}
                        </textarea>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import fs from 'fs';
    import os from 'os';
    import readline from 'readline';
    import {Loading} from 'element-ui';
    import {exec} from 'child_process';
    import iconv from 'iconv-lite';
    import kill from 'tree-kill';

    const sys_hosts_path = process.platform === 'win32' ? `${process.env.windir || 'C:\\WINDOWS'}\\system32\\drivers\\etc\\hosts` : '/etc/hosts';

    export default {
        name: 'hostEdit',
        data() {
            return {
                activeName: "text",
                hostsCount: 0,
                hostsText: "",
                localHosts: [],
                pingIp: "",
                pingResult: "",
                pingProcess: "",
                pingStatus: false
            }
        },
        watch: {
            pingResult: function () {
                this.$refs.textarea.scrollTop = this.$refs.textarea.scrollHeight;
            }
        },
        methods: {
            startPing() {
                this.pingResult = "";
                this.pingStatus = true;
                if (this.pingIp.trim() != "") {
                    this.pingProcess = exec(`ping ${this.pingIp} -t`, {encoding: 'binary'});
                    this.pingProcess.stdout.on('data', (data) => {
                        this.pingResult += `${iconv.decode(new Buffer(data, 'binary'), 'cp936')}\n`;
                    });
                    this.pingProcess.on('close', (code) => {
                        this.pingStatus = false;
                        this.pingResult += `已终止  code:${code}`;
                    });
                }
            },
            stopPing() {
                kill(this.pingProcess.pid);
            },
            removeRow(i) {
                this.localHosts.splice(i, 1);
            },
            addRow() {
                this.localHosts.push({ip: "", domain: "", error: false});
            },
            saveTable() {
                let flag = true;
                this.localHosts.forEach((item) => {
                    if (item.ip.trim() == "" || item.domain.trim() == "") {
                        flag = false;
                        item.error = true;
                    } else {
                        item.error = false;
                    }
                });
                if (flag) {
                    let str = '';
                    this.localHosts.forEach((item) => {
                        str += `${item.ip} ${item.domain}${os.EOL}`;
                    });
                    this.save(str);
                }
            },
            saveText() {
                const replace = this.hostsText.replace(/\n/g, os.EOL);
                this.save(replace);
            },
            save(str) {
                const loading = Loading.service({fullscreen: true});
                fs.writeFile(sys_hosts_path, str, (err) => {
                    loading.close();
                    if (err) {
                        this.$message({message: `保存失败,当前用户无 hosts 修改权限`, type: 'error'});
                    } else {
                        this.$message({message: `保存成功`, type: 'success'});
                        this.refreshHosts();
                    }
                });
            },
            refreshHosts() {
                this.hostsText = "";
                this.localHosts = [];
                this.hostsCount = 0;
                const lineReader = readline.createInterface({
                    input: fs.createReadStream(sys_hosts_path),
                    crlfDelay: Infinity
                });
                lineReader.on('line', (line) => {
                    this.hostsText += line + '\n';
                    line = this.filterAnnotation(line);
                    if (line != null && line.trim() != "") {
                        this.hostsCount++;
                        if (this.hostsCount < 30) {
                            this.analyseHost(line);
                        }
                    }
                })
            },
            filterAnnotation(text) {
                if (text != null && text.indexOf("#") != -1) {
                    text = text.slice(0, text.indexOf("#"))
                }
                return text;
            },
            analyseHost(text) {
                const textArr = this.trimArraySpace(text.replace(/\t/g, " ").split(" "));
                if (textArr.length >= 2) {
                    this.localHosts.push({ip: textArr[0], domain: textArr[1], error: false});
                }
            },
            trimArraySpace(array) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == "" || typeof(array[i]) == "undefined") {
                        array.splice(i, 1);
                        i = i - 1;
                    }
                }
                return array;
            }
        },
        mounted() {
            this.refreshHosts();
        }
    }
</script>

<style lang="less" scoped>
    .host-edit {
        padding: 0px 66px;
        max-width: 900px;
        margin: 0 auto;
    }

    .text-edit {
        width: 100%;
        height: 100%;
        padding-bottom: 30px;

        textarea {
            padding: 5px;
            margin: 0px;
            width: 100%;
            height: calc(~'100vh - 300px');
            min-height: 400px;
            white-space: nowrap;
            font-size: 12px;
            border: 1px dashed #409EFF;
            border-radius: 6px;
        }

        .btn-container {
            text-align: center;
            margin-top: 20px;
        }
    }

    .table-edit {
        width: 100%;
        height: 100%;
        padding-bottom: 30px;

        .too-many-info {
            text-align: center;
            font-size: 14px;
            margin-top: 5px;
        }

        .btn-add, .btn-remove {
            float: right;
        }

        .btn-add {
            margin: 10px;
        }

        .btn-container {
            text-align: center;
            margin-top: 50px;
        }
    }

    .ping-edit {

        .ip-input {
            display: inline-block;
            width: 150px;
            margin-bottom: 15px;
        }

        .ping-result {
            width: 100%;
            height: calc(100vh - 300px);
            min-height: 400px;
            font-size: 14px;
            overflow: auto;
            padding: 5px;
            font-size: 12px;
            border: 1px dashed #409EFF;
            border-radius: 6px;
        }
    }
</style>