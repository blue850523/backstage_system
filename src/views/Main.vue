<template>
    <div class="main_page">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "main_page",
    components: {
    },
    data () {
        return {
        }
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            if (sessionStorage["user_token"] === undefined || sessionStorage["user_token"] === null) {
                this.$router.push("/login", () => {});
                return;
            } else {
                this.$router.push("/content", () => {});
            }

            this.$store.commit("SET_USER_TOKEN", sessionStorage["user_token"]);
            this.$store.commit("SET_STAFF_NAME", sessionStorage["staff_name"]);
            this.$store.commit("SET_STAFF_NO", sessionStorage["staff_no"]);
    
            if (typeof(sessionStorage["user_permissions"]) === "string") {
                let permission = sessionStorage["user_permissions"].split(",");
                this.$store.commit("SET_USER_PERMISSIONS", permission);
            } else {
                this.$store.commit("SET_USER_PERMISSIONS", sessionStorage["user_permissions"]);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.main_page {
    width: 100%;
    height: 100vh;
}
</style>