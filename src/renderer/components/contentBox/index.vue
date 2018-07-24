<template>
    <div class="content-box" @click="onClick">
        <div class="icon-container">
            <slot></slot>
        </div>
        <div class="text-container">
            <h2>{{title}}</h2>
            <p>{{detail}}</p>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';

    export default {
        name: 'contentBox',
        props: ['title', 'detail', 'href'],
        methods: {
            onClick() {
                this.$router.push({path: this.href});
            }
        }
    }
</script>

<style lang="less" scoped>
    .content-box {
        width: 252px;
        height: 88px;
        margin: 10px;
        padding: 14px;
        border: 2px solid transparent;
        display: inline-block;
        cursor: pointer;

        &:hover {
            border: 2px solid rgb(225, 225, 225);
        }

        .icon-container {
            width: 60px;
            height: 88px;
            float: left;
            color: rgb(0, 120, 215);
            font-size: 30px;
        }

        .text-container {
            width: calc(100% - 60px);
            height: 88px;
            float: left;

            h2 {
                font-size: 15px;
                margin-bottom: 6px;
            }

            p {
                font-size: 12px;
                color: rgb(50, 50, 50);
                line-height: 14px;
            }
        }
    }

    @media screen and (max-width: 700px) {
        .content-box {
            width: 100%;
            height: 88px;
            margin: 0px;
            border: none;
            display: block;

            &:hover {
                background-color: rgb(230, 230, 230);
                border: none;
            }
        }
    }
</style>