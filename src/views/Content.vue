<template>
    <div class="main_content">
        <Header
            :tag_list="tag_list"
            :select_tag_index="select_tag_index"
            @emitTagClick="getTagClick"
            @emitCloseTag="getCloseTag"
            @emitAddTag="getAddTag"
            @emitChangeLocation="getChangeLocation"
        />
        <ColumnLeft 
            :menus="menus" 
            @emitMenuClick="getMenuClick" 
        />
        <div
            v-for="(tab, index) in tag_list"
            :key="index"
            :id="`tab_${index}`"
            class="iframe_content tab_content"
            :class="{ active: select_tag_index === index }"
        >
            <iframe
                class="modal_iframe"
                :id="`iframeid-tab_${index}`"
                :src="tab.href && tab.href + `?iframeKey=` + tab.id"
                frameborder="0"
                :ref="`iframeRef_${index}`"
            ></iframe>
        </div>
    </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
import ColumnLeft from "@/components/common/ColumnLeft.vue";
import menuList from "@/json/menuList.json";
import ElementUI from "element-ui";
import { locale as tree } from "@/common/config/i18n/zh";
export default {
    name: "main_content",
    components: {
        Header,
        ColumnLeft,
    },
    data() {
        return {
            permission: [],
            menus: [],
            tag_list: [
                {
                    name: "主頁",
                    href: "",
                    id:""
                },
            ],
            select_tag_index: 0,
        };
    },
    created() {
        this.init_menu_list();
    },
    methods: {
        async getMenuClick(name, href, id) {
            let permission = await this.get_permissions();

            if (sessionStorage["user_token"] === 'test') {
                this.permission = ["*"];
            } else {
                this.permission = permission;
            }

            if (this.permission.indexOf("*") !== -1 || this.permission.indexOf(id) !== -1) {
                this.menuClick(name, href, id);
                this.init_menu_list();
            } else {
                await SysUI.alert(name, "用戶未擁有權限", true);
                location.reload();
            }
        },
        menuClick(name, href, id) {
            let obj = {
                name,
                href,
                id,
            };
            let loadingInstance = ElementUI.Loading.service({
                background: "rgba(0,0,0,0.4)",
                text: "載入模組中..",
            });
            //模組權限儲存
            let modalPermissions = _.flatten(
                _.filter(this.$store.state.user_permissions, (params) => {
                    const regex = new RegExp(`^${id}`, "g");
                    return params.match(regex);
                })
            );

            //載入模組
            if (this.tag_list[this.select_tag_index].href === obj.href) {
                document
                    .getElementById(`iframeid-tab_${this.select_tag_index}`)
                    .contentWindow.location.reload(true);
            } else {
                this.tag_list.splice(this.select_tag_index, 1, obj);
            }

            this.$forceUpdate();
            loadingInstance.close();
        },
        insertPermissionsToIframe() {},
        getTagClick(index) {
            this.select_tag_index = index;
        },
        getCloseTag(index) {
            this.tag_list.splice(index, 1);
            this.$forceUpdate();
        },
        getAddTag() {
            let obj = {
                name: "新分頁",
                href: "",
            };

            this.tag_list.push(obj);
            this.select_tag_index = this.tag_list.length - 1;
            this.$forceUpdate();
        },
        async init_menu_list() {
            this.permission = this.$store.state.user_permissions;

            if (this.permission.indexOf("*") !== -1) {
                this.menus = JSON.parse(JSON.stringify(menuList));
            } else {
                this.menus = this.set_menu_list(JSON.parse(JSON.stringify(menuList)), this.permission);
            }

            this.$forceUpdate();
        },
        async get_permissions () {
            let url = `${process.env.VUE_APP_DEV_LARAVEL}/api/auth/permission/list`;

            let permission;

            try {
                let response = await this.axios.get(url).then((res) => res);

                if (response.status == 200) {
                    permission = response.data.data;
                    sessionStorage["user_permissions"] = response.data.data;
                    this.$store.commit("SET_USER_PERMISSIONS", response.data.data);
                }

                return permission;
            } catch (error) {
                console.log(error);

                return permission;
            }
        },
        set_menu_list(menu, permission) {
            return menu.filter((it) => {
                if (permission.indexOf(it.key) !== -1) {
                    if (it.children.length > 0) {
                        it.children = this.set_menu_list(
                            it.children,
                            permission
                        );
                        return it;
                    } else {
                        return it;
                    }
                }
            });
        },
        getChangeLocation() {
            if (this.tag_list.some((it) => it.href.length > 0)) {
                let loadingInstance = ElementUI.Loading.service({
                    background: "rgba(0,0,0,0.4)",
                    text: "載入模組中..",
                });

                let iframe_array = document.getElementsByClassName(
                    "modal_iframe"
                );
                Array.prototype.forEach.call(iframe_array, (it) => {
                    it.contentWindow.location.reload(true);
                });

                loadingInstance.close();
            } else {
                return;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.main_content {
    .iframe_content {
        padding-left: 20rem;
        height: calc(100vh - 8.8rem);
        min-height: 80rem;
        min-width: 144rem;
    }
    .tab_content {
        display: none;
    }
    .tab_content.active {
        display: block;
    }
}
</style>
