<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import ElementUI from "element-ui";
import nprogress from "nprogress";
import "./tc_javascript/nprogress.css";
export default {
    name: "app",
    components: {},
    created() {
        window.axios.interceptors.request.use(
            function (config) {
                nprogress.start();
                return config;
            },
            function (error) {
                nprogress.done();
                return Promise.reject(error);
            }
        );
        window.axios.interceptors.response.use(
            function (response) {
                nprogress.done();
                return response;
            },
            function (error) {
                nprogress.done();
                return Promise.reject(error);
            }
        );
        SysUI.axios = function (method, url, params, headers) {
            let loadingInstance = ElementUI.Loading.service({
                background: "rgba(0,0,0,0.4)",
                text: "請求資料中..",
            });
            // let baseURL = url.includes(`${process.env.VUE_APP_DEV_LARAVEL}`)
            //     ? ""
            //     : `${process.env.VUE_APP_DEV_LARAVEL}`;
            if (method.toUpperCase() == "GET") {
                return new Promise((res, rej) => {
                    window.axios
                        .get(url, {
                            params,
                            url,
                        })
                        .then((returnData) => {
                            loadingInstance.close();
                            returnData.data.httpStatus = returnData.status;
                            res(returnData.data);
                            SysUI.clo(`API路徑 =>${url.split("api")[1]}`);
                            SysUI.clo(["API回傳結果", returnData]);
                        })
                        .catch((err) => {
                            loadingInstance.close();
                            res(err.data);
                            rej(err.data);
                            if (err?.response?.data?.status == -1) {
                                SysUI.clo(
                                    `估計Axios是要用${
                                        err.response.data.data.message
                                            .split(": ")[1]
                                            .split(",")[0]
                                            .split(".")[0]
                                    }送資料。`,
                                    "background: #123; color: #ddd;font-size:24px;"
                                );
                            }
                        });
                });
            } else {
                return new Promise((res, rej) => {
                    let config = {
                        method,
                        url,
                        url,
                        data: params,
                    };
                    if (headers) {
                        config.headers = {
                            ...headers,
                            "User-Token": sessionStorage["user_token"],
                        };
                    }
                    window
                        .axios(config)
                        .then((returnData) => {
                            returnData.data.httpStatus = returnData.status;
                            res(returnData.data);
                            loadingInstance.close();
                            SysUI.clo(`API路徑 =>${url.split("api")[1]}`);
                            SysUI.clo([`API回傳結果 `, returnData]);
                        })
                        .catch((err) => {
                            res(err.data);
                            rej(err.data);
                            loadingInstance.close();
                            if (err?.response?.data?.status == -1) {
                                SysUI.clo(
                                    `估計Axios是要用${
                                        err.response.data.data.message
                                            .split(": ")[1]
                                            .split(",")[0]
                                            .split(".")[0]
                                    }送資料。`,
                                    "background: #123; color: #ddd;font-size:24px;"
                                );
                            }
                        });
                });
            }
        };
        //獲取子模組權限列表
        window.getModulePermissions = () => {
            //獲取prefix id
            let objectPermissions = {};
            let id = new URL(location.href).searchParams.get("iframeKey");
            let modalPermissions = _.flatten(
                _.filter(
                    _.split(sessionStorage["user_permissions"], ","),
                    (params) => {
                        const regex = new RegExp(`^${id}`, "g");
                        return params.match(regex);
                    }
                )
            );

            modalPermissions.forEach((element) => {
                objectPermissions[element] = true;
            });
            return objectPermissions;
        };
    },
};
</script>

<style lang="scss">
#app {
    font-family: "Font-Custom-Regular";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
