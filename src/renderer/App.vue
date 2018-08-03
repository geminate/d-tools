<template>
    <div class="main-container">
        <custom-header title="Home"></custom-header>
        <div class="content-container">
            <transition name="fade">
                <router-view class="router"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import {customHeader} from '@/components';

    export default {
        name: 'd-tools',
        components: {
            customHeader
        },
    }
</script>

<style>
    @import "assets/css/reset.css";
    @import "assets/css/main.css";

    #app {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    body {
        font-family: "Microsoft YaHei";
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
<style lang="less" scoped>

    .router {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .main-container {
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0px;
        top: 0px;
        -webkit-app-region: no-drag;
    }

    .content-container {
        height: calc(100% - 90px);
        position: relative;
        overflow: auto;
    }
</style>
