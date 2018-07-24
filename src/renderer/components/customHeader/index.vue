<template>
    <div class="custom-header">
        <i v-show="this.$route.meta.haveBack" class="fa fa-angle-left" @click="onBackClick"></i>
        {{this.$route.meta.title}}
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';

    export default {
        name: 'customHeader',
        props: ['hasBack'],
        computed: {
            ...mapGetters(['getShowBack', 'getPageTitle'])
        },
        methods: {
            onBackClick() {
                this.$router.back();
            }
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

    i {
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
</style>