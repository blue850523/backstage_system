<template>
    <div class="header_wrap">
        <div class="header_body container-fluid">
            <div class="left_area">
                <select class="form-select header_select" v-model="location_id" @change="change_location_id()">
                    <option value="1">貴賓廳1</option>
                    <option value="2">貴賓廳2</option>
                </select>
            </div>

            <div class="right_area">
                <div class="version_area">
                    <div class="version_border">
                        版本 0.0.0.1
                    </div>
                </div>
                <div class="user_area">
                    <div class="user_border">
                        <div class="user_head">
                        </div>
                        <div class="staff_info">
                            <div>
                                {{ staff_no }}
                            </div>
                            <div>
                                ({{ staff_name }})
                            </div>
                        </div>
                    </div>
                </div>
                <a class="btn_exit" @click="logout()">
                    <div class="btn_exit_border">
                        <svg-icon icon-class="exit" class-name="exit" />
                        <span>
                            登出
                        </span>
                    </div>
                </a>
            </div>
        </div>

        <div class="page_tag_list">
            <div class="page_tabs">
                <nav class="nav nav-tabs">
                    <a 
                        class="nav-link"
                        :class="{'active': select_tag_index === index}" 
                        v-for="(it, index) in tag_list" 
                        :key="`tag_${index}`"
                        @click.stop="tag_click(index)">
                        {{ it.name }}
                        <span class="close_btn" v-if="tag_list.length > 1" @click.stop="close_tag(index)">
                            <i class="fa fa-times"></i>
                        </span>
                    </a>
                </nav>
                <a v-if="tag_list.length < 10" class="add_btn" @click="add_tag()">
                    <i class="fa fa-plus"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
const API = {
    logout: `${process.env.VUE_APP_DEV_LARAVEL}/api/auth/logout`,
}

export default {
    name: "header_wrap",
    data: function () {
        return {
            location_id: "",
            staff_name: sessionStorage["staff_name"],
            staff_no: sessionStorage["staff_no"],
        }
    },
    props: {
        tag_list: {
            type: Array,
            default: [],
        },
        select_tag_index: {
            type: Number,
            default: 0,
        }
    },
    created () {
        if (sessionStorage["location_id"] === undefined || sessionStorage["location_id"] === null) {
            sessionStorage["location_id"] = "1";
            this.$store.commit("SET_LOCATION_ID", "1");
            this.location_id = "1";
        } else {
            this.$store.commit("SET_LOCATION_ID", sessionStorage["location_id"]);
            this.location_id = sessionStorage["location_id"];
        }
    },
    methods: {
        change_location_id () {
            this.$store.commit("SET_LOCATION_ID", this.location_id);
            sessionStorage["location_id"] = this.location_id;
            this.$emit("emitChangeLocation");
        },
        async logout () {
            if (sessionStorage["user_token"] === 'test') {
                this.$router.push("/login", () => {});
                return;
            }

            try {
                let response = await this.axios.post(API.logout).then((res) => res);

                if (response.status === 200) {
                    this.$router.push("/login", () => {});
                } else {
                    await SysUI.alert("登出失敗", response.data.message);
                    return;
                }
            } catch (error) {
                console.log("error", error.response);
                await SysUI.alert("登出失敗", error.response.data.message);
                return;
            }
            // if (window.require) {
            //     window.require('electron').remote.app.exit();
            // }
        },
        tag_click (index) {
            this.$emit("emitTagClick", index);
        },
        close_tag (index) {
            this.$emit("emitCloseTag", index);
        },
        add_tag () {
            this.$emit("emitAddTag");
        }
    }
}
</script>

<style lang="scss" scoped>
.header_wrap {
    width: calc(100% - 20rem);
    height: 8.8rem;
    min-width: 124rem;
    margin-left: 20rem;
    font-size: 1.4rem;
    background: linear-gradient(266deg, #31a8ff, #3571ff);
    color: #FFF;
    position: relative;
    .header_body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0 0 1rem;
        margin: 0;
        height: 5.6rem;
        .header_select {
            position: relative;
            width: 13.2rem;
            height: 3.2rem !important;
            padding: 0.6rem 1.6rem !important;
            font-size: 1.4rem !important;
            color: #FFF !important;
            background-color: #25273333;
            border: none !important;
            option {
                background-color: #fff;
                color: #252733;
            }
        }
        .right_area {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 5.6rem;
            font-size: 1.2rem;
            .version_area {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                margin-right: -0.1rem;
                cursor: pointer;
                .version_border {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 3.2rem;
                    padding: 0 2.4rem;
                    border-left: 1px solid rgba(255, 255, 255, 0.3);
                }
            }
            .version_area:hover {
                background-color: #E1E1E1;
            }
            .user_area {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                margin-right: -0.1rem;
                cursor: pointer;
                .user_border {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 3.2rem;
                    padding: 0 2.4rem;
                    border-left: 1px solid rgba(255, 255, 255, 0.3);
                    .user_head {
                        width: 3.2rem;
                        height: 3.2rem;
                        margin-right: 1.6rem;
                        border-radius: 50%;
                        background-color: #FFF;
                    }
                    .staff_info {
                        font-size: 1.2rem;
                    }
                }
            }
            .user_area:hover {
                background-color: #E1E1E1;
            }
            .btn_exit {
                display: flex;
                align-items: center;
                justify-self: center;
                height: 100%;
                color: #FFF;
                text-decoration: none;
                cursor: pointer;
                .btn_exit_border {
                    display: flex;
                    align-items: center;
                    justify-self: center;
                    height: 3.2rem;
                    padding: 0 3.2rem 0 2.7rem;
                    border-left: 1px solid rgba(255, 255, 255, 0.3);
                    svg {
                        font-size: 1.8rem;
                        margin-right: 1rem;
                    }
                }
            }
            .btn_exit:hover {
                background-color: #E1E1E1;
            }
        }
    }
    .page_tag_list {
        font-size: 1.4rem;
        width: 100%;
        height: 3.2rem;
        color: #FFF;
        .page_tabs {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            nav {
                height: 100%;
                padding-left: 1rem;
                border: none;
                flex-wrap: nowrap;
                overflow: hidden;
                .nav-link {
                    position: relative;
                    height: 100%;
                    min-width: 12.4rem;
                    padding: .8rem 2.4rem;
                    margin: 0;
                    font-size: 1.2rem;
                    border-radius: 1rem 1rem 0 0;
                    border: none;
                    cursor: pointer;
                    color: #FFF;
                    background-color: rgba(255, 255, 255, 0.2);
                    .close_btn {
                        position: absolute;
                        right: .8rem;
                        width: 1.8rem;
                        height: 1.8rem;
                        border-radius: 50%;
                    }
                    .close_btn:hover {
                        background-color: #EEE;
                    }
                }
                .nav-link.active {
                    color: #3571ff;
                    background-color: #FFF;
                    font-weight: bold;
                }
            }
            .add_btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                margin-left: 1rem;
                font-size: 1.2rem;
                color: #FFF;
                cursor: pointer;
                z-index: 1;
            }
            .add_btn:hover {
                color: #3571ff;
                background: #FFF;
            }
        }
    }
}
</style>