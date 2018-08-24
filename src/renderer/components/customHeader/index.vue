<template>
    <div class="custom-header">
        <i v-show="this.$route.meta.haveBack" class="fa fa-angle-left back" @click="onBackClick"></i>
        {{title}}
        <div class="language-container">
            <el-dropdown @command="changeDropdown">
                <span class="el-dropdown-link">
                {{userLanguage.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{name:'English',sign:'en_US'}">English</el-dropdown-item>
                    <el-dropdown-item :command="{name:'简体中文',sign:'zh_CN'}">简体中文</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import electron from 'electron';
    import {setting} from '@/utils';

    export default {
        name: 'customHeader',
        props: ['hasBack'],
        data() {
            return {
                userLanguage: {}
            }
        },
        computed: {
            ...mapGetters(['languageText']),
            title() {
                return this.$t(this.$route.meta.titleI18n);
            }
        },
        methods: {
            ...mapMutations(['setLanguageText']),
            onBackClick() {
                this.$router.back();
            },
            initUserSetting() {
                let userLanguage = setting.get("language");
                (!userLanguage || !userLanguage.name) && (userLanguage = {name: '简体中文', sign: 'zh_CN'});
                this.setLanguage(userLanguage);
            },
            changeDropdown(language) {
                this.setLanguage(language);
            },
            setLanguage(language) {
                setting.set("language", language);
                this.userLanguage = language;
                this.$i18n.locale = language.sign;
            }
        },
        mounted() {
            this.initUserSetting();// Read user language setting
        }
    }
</script>

<style lang="less" scoped>
    .custom-header {
        height: 90px;
        line-height: 90px;
        font-size: 25px;
        text-align: center;
    }

    i.back {
        position: absolute;
        left: 30px;
        top: 10px;
        height: 70px;
        line-height: 70px;
        font-size: 35px;
        width: 90px;
        cursor: pointer;

        &:hover {
            background-color: gainsboro;
        }
    }

    .language-container {
        cursor: pointer;
        position: absolute;
        top: 24px;
        right: 20px;
        line-height: 1.5;
    }
</style>