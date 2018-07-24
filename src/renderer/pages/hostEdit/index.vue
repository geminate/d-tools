<template>
    <div>
        <div class="host-edit">

        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import fs from 'fs';
    import readline from 'readline';

    const sys_hosts_path = process.platform === 'win32' ? `${process.env.windir || 'C:\\WINDOWS'}\\system32\\drivers\\etc\\hosts` : '/etc/hosts';

    export default {
        name: 'hostEdit',
        methods: {
            filterAnnotation(text) {
                if (text != null && text.indexOf("#") != -1) {
                    text = text.slice(0, text.indexOf("#"))
                }
                return text;
            },
            analyseHost(text) {
                const textArr = text.split(" ");
                console.log(textArr);
            }
        },
        mounted() {
            const lineReader = readline.createInterface({
                input: fs.createReadStream(sys_hosts_path)
            });
            lineReader.on('line', (line) => {
                line = this.filterAnnotation(line);
                if (line != null && line.trim() != "") {
                    this.analyseHost(line);
                    console.log(line);
                }
            })
        }
    }
</script>

<style lang="less" scoped>

</style>