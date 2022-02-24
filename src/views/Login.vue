<template>
    <div class="login">
        <div class="login_logo">
            <!-- <img src="@/assets/image/vclogo_login.png" alt=""> -->
            <img src="@/assets/logo.png" alt="">
        </div>
        <div class="login_container">
            <div class="login_title">
                <h1>歡迎</h1>
                <h3>後台管理系統</h3>
            </div>
            <div class="form-group">
                <label class="form-label" for="input-username">職員編號</label>
                <input type="text" id="input-username" class="form-control login_input" v-model="username" placeholder="請輸入職員編號" :class="{'has-error': password_error}" @keyup.enter="login_click()">
            </div>
            <div class="form-group">
                <label class="form-label" for="input-password">密碼</label>
                <input type="password" id="input-password" class="form-control login_input" v-model="password" placeholder="請輸入密碼" :class="{'has-error': password_error}" @keyup.enter="login_click()">
            </div>
            <button class="btn btn-p login_button" @click="login_click()">
                登入
            </button>
            <!-- <el-select class="login_lang_select" v-model="locale_languages" @change="change_language()">
                <el-option
                    v-for="it in languages_options"
                    :key="it.value"
                    :label="$t(it.label)"
                    :value="it.value">
                </el-option>
            </el-select> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "login",
    components: {
    },
    data () {
        return {
            username: "",
            password: "",
            password_error: false,
            locale_languages: "",
            languages_options: [
                {
                    value: "zh",
                    label: "GENERAL.LANGUAGE_ZH",
                },
                {
                    value: "en",
                    label: "GENERAL.LANGUAGE_EN"
                }
            ]
        }
    },
    created () {
        this.login_init();
        this.locale_languages = this.$i18n.locale;
        sessionStorage["language"] = this.locale_languages;
    },
    methods: {
        async login_click () {
            let is_valid = await this.validate();

            if (!is_valid) {
                this.password_error = true;
                return;
            }
            
            // =====測試用=====
            if (this.username === "superadmin" && this.password === "superadmin12345") {
                sessionStorage["user_token"] = 'test';
                sessionStorage["staff_name"] = '超級管理員';
                sessionStorage["staff_no"] = 'superadmin';
                sessionStorage["user_permissions"] = ['*'];
    
                this.$store.commit("SET_USER_TOKEN", 'test');
                this.$store.commit("SET_STAFF_NAME", '超級管理員');
                this.$store.commit("SET_STAFF_NO", 'superadmin');
                this.$store.commit("SET_USER_PERMISSIONS", ['*']);

                this.$message.success({
                    duration: 3000,
                    offset: 28,
                    message: "登入成功",
                    center: true,
                });
    
                if (this.$store.state.user_token !== null)
                    this.$router.push("/content", () => {});
            } else {
                this.password_error = true;
                this.$message.closeAll();
                this.$message.error({
                    duration: 3000,
                    offset: 28,
                    message: "登入帳號密碼錯誤",
                    center: true,
                });
            }

            return;
            // =====測試用=====

            let url = `${process.env.VUE_APP_DEV_LARAVEL}/api/auth/login`;

            await this.axios.post(url, {
                staff_no: this.username,
                password: this.password,
            }).then((response) => {
                if (response.status == 200) {
                    let {data} = response.data;
                    sessionStorage["user_token"] = data.token;
                    sessionStorage["staff_name"] = data.staff_name;
                    sessionStorage["staff_no"] = data.staff_no;
                    sessionStorage["user_permissions"] = data.permission;
                    this.$store.commit("SET_USER_TOKEN", data.token);
                    this.$store.commit("SET_STAFF_NAME", data.staff_name);
                    this.$store.commit("SET_STAFF_NO", data.staff_no);
                    this.$store.commit("SET_USER_PERMISSIONS", data.permission);

                    this.axios.defaults.headers.common["User-Token"] = sessionStorage["user_token"];

                    this.$message.success({
                        duration: 3000,
                        offset: 28,
                        message: "登入成功",
                        center: true,
                    });

                    if (this.$store.state.user_token !== null) {
                        this.$router.push("/content", () => {});
                    }
                } else {
                    console.log(response);
                    this.password_error = true;
                    this.$message.closeAll();
                    this.$message.error({
                        duration: 3000,
                        offset: 28,
                        message: "登入帳號密碼錯誤",
                        center: true,
                    });
                }
            }).catch((error) => {
                console.log(error);
                this.password_error = true;
                this.$message.error({
                    duration: 3000,
                    offset: 28,
                    message: "登入帳號密碼錯誤",
                    center: true,
                });
            })
        },
        async validate () {
            if (this.username.length === 0 || this.password.length === 0) {
                return false;
            } else {
                return true;
            }
        },
        change_language () {
            sessionStorage["language"] = this.locale_languages;
            this.$i18n.locale = this.locale_languages;
        },
        login_init () {
            Object.assign(this.$data, this.$options.data());
            sessionStorage.clear();
            this.$store.commit("SET_USER_TOKEN", null);
            this.$store.commit("SET_STAFF_NAME", null);
            this.$store.commit("SET_STAFF_NO", null);
            this.$store.commit("SET_USER_PERMISSIONS", null);
            this.$store.commit("SET_LOCATION_ID", null);
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-image: url("~@/assets/image/BG.png");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    color: #FFF;
    .login_logo {
        margin-top: 14.16vh;
        img {
            height: 12.5rem;
        }
    }
    .login_container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .login_title {
            margin-top: 7.7vh;
            margin-bottom: 1.45vh;
            h1 {
                font-size: 4rem;
                font-weight: 600;
                line-height: 5.6rem;
            }
            h3 {
                font-size: 2rem;
                font-weight: 500;
                line-height: 2.8rem;
            }
        }
        .form-group {
            position: relative;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            width: 21.25vw;
            max-width: 30.6rem;
            margin-top: 3.125vh;
            .form-label {
                margin-left: 1.6rem;
                margin-bottom: .8rem;
                font-size: 1.6rem;
                font-weight: normal;
            }
            .form-control {
                padding: .7rem 1.6rem;
                border: .1rem solid transparent;
                border-radius: .3rem;
                background-color: #D5DAE733;
                font-size: 1.6rem;
                line-height: 2.2rem;
                color: #FFF;
            }
            .form-control::placeholder {
                color: #FFFFFF33;
            }
            .has-error {
                border-color: #F03447;
            }
        }
        .login_button {
            width: 21.25vw;
            max-width: 30.6rem;
            height: 3.6rem;
            margin-top: 5.93vh;
            padding: .7rem;
            border-radius: 5rem;
            font-size: 1.6rem !important;
            line-height: 2.2rem;
        }
        .login_lang_select {
            margin-top: 6.45vh;
            .el-input__inner {
                border: none;
                background: transparent;
                text-align: center;
                width: 160px;
                color: #FFFFFFB3;
                font-size: 1.6rem;
            }
        }
    }
}
</style>
<style>
.login .el-input__inner {
    border: none;
    background: transparent;
    text-align: center;
    width: 160px;
    color: #FFFFFFB3;
    font-size: 1.6rem;
}

.el-select-dropdown {
    padding: 1.6rem .4rem;
    border: none;
    border-radius: 1.6rem;
}

.el-select-dropdown__item {
    padding: 0 1.2rem;
    height: 2.5rem;
    font-size: 1.2rem;
    line-height: 2.5rem;
    border-radius: .3rem;
}

.el-select-dropdown__item.selected {
    color: #3571ff;
}

.el-select-dropdown__item:focus,
.el-select-dropdown__item:not(.is-disabled):hover {
    background-color: #EBF2FF;
    color: #3571ff;
}
</style>