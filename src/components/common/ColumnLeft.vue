<template>
    <div class="column_left">
        <div class="header_logo">
            <a @click="reload()">
                <img src="@/assets/image/vclogo.png" alt="" />
            </a>
        </div>
        <div class="sidebar">
            <el-menu class="el-menu-vertical-demo">
                <template v-for="it in menus">
                    <el-menu-item
                        v-if="it.children.length === 0"
                        :key="`item_${it.key}`"
                        :id="`item_${it.key}`"
                        :href="it.href"
                        :index="`${it.key}`"
                        @click="menu_click($event)"
                    >
                        <i class="fa" :class="it.icon"></i>
                        {{ it.name }}
                    </el-menu-item>
                    <el-submenu
                        v-else
                        :key="`item_${it.key}`"
                        :id="`item_${it.key}`"
                        :index="`${it.key}`"
                    >
                        <template slot="title">
                            <i class="fa" :class="it.icon"></i>
                            <span>{{ it.name }}</span>
                        </template>
                        <template v-for="it2 in it.children">
                            <el-menu-item
                                v-if="it2.children.length === 0"
                                :key="`item_${it2.key}`"
                                :id="`item_${it2.key}`"
                                :href="it2.href"
                                :index="`${it2.key}`"
                                @click="menu_click($event)"
                            >
                                <i class="fa" :class="it2.icon"></i>
                                {{ it2.name }}
                            </el-menu-item>
                            <el-submenu
                                v-else
                                :key="`item_${it2.key}`"
                                :id="`item_${it2.key}`"
                                :index="`${it2.key}`"
                            >
                                <template slot="title">
                                    <i class="fa" :class="it2.icon"></i>
                                    <span>{{ it2.name }}</span>
                                </template>
                                <template v-for="it3 in it2.children">
                                    <el-menu-item
                                        v-if="it3.children.length === 0"
                                        :key="`item_${it3.key}`"
                                        :id="`item_${it3.key}`"
                                        :href="it3.href"
                                        :index="`${it3.key}`"
                                        @click="menu_click($event)"
                                    >
                                        <i class="fa" :class="it2.icon"></i>
                                        {{ it3.name }}
                                    </el-menu-item>
                                    <el-submenu
                                        v-else
                                        :key="`item_${it3.key}`"
                                        :id="`item_${it3.key}`"
                                        :index="`${it3.key}`"
                                    >
                                        <template slot="title">
                                            <i class="fa" :class="it3.icon"></i>
                                            <span>{{ it3.name }}</span>
                                        </template>
                                    </el-submenu>
                                </template>
                            </el-submenu>
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    name: "column_left",
    data: function () {
        return {}
    },
    props: {
        menus: {
            type: Array,
            default: [],
        },
    },
    options: {
        styleIsolation: "shared",
    },
    methods: {
        reload() {
            location.reload();
        },
        menu_click(event) {
            let node = event.$vnode.elm;
            this.$emit("emitMenuClick", node.innerText.trim(), node.getAttribute("href"),node.getAttribute("id").split('item_')[1]);
        },
    },
};
</script>

<style lang="scss">
.column_left {
    position: fixed;
    top: 0;
    left: 0;
    width: 20rem;
    height: 100%;
    background-color: #252733;
    z-index: 10000;
    .header_logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 8.8rem;
        -webkit-user-drag: none !important;
        a {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            cursor: pointer;
            img {
                height: 80%;
            }
        }
    }
    .sidebar {
        overflow: hidden auto;
        height: calc(100% - 8.8rem);
        background-color: #252733;
        .el-menu {
            width: 100%;
            border: none;
            background-color: #252733;
            color: #fff;
            text-align: left;
            svg {
                margin-right: 1.6rem;
            }
            .el-menu-item {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0;
                margin: 0.2rem 0.8rem;
                height: auto !important;
                line-height: 1.5 !important;
                min-height: 3.6rem !important;
                min-width: 1.9rem !important;
                color: #fff;
                background-color: #252733;
                border: none;
                border-radius: 3px;
                word-break: break-all;
                white-space: break-spaces;
            }
            .el-menu-item:hover {
                background: linear-gradient(to left, #31a8ff, #3571ff);
            }
            .el-menu-item.is-active {
                background: linear-gradient(to left, #31a8ff, #3571ff);
            }
            .el-submenu .el-submenu__title {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0;
                margin: 0.2rem 0.8rem;
                height: auto !important;
                line-height: 1.5 !important;
                min-height: 3.6rem !important;
                min-width: 1.9rem !important;
                color: #fff;
                background-color: #252733;
                border: none;
                word-break: break-all;
                white-space: break-spaces;
            }
            .el-submenu .el-menu-item:last-child {
                margin-bottom: 0;
            }
        }
    }
    ::-webkit-scrollbar {
        width: 10px;
        background-color: rgba(200, 200, 200, 0);
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(128, 139, 156, 0.5);
    }
}
</style>
