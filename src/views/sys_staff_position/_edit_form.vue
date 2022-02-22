<template>
    <div>
        <TCModal
            id="edit_form"
            :title="UI.title"
            ref="modal"
            body_min_height="fit-content"
            dialog_width="90vw"
        >
            <template #body>
                <div class="align-items-center row">
                    <div class="col-4 row">
                        <TCFormGroup
                            class="col-3"
                            label="部門"
                            required
                        ></TCFormGroup>
                        <TCFormGroup class="col-9" required>
                            <TCDropdown
                                v-model="records.user_department_id"
                                :options="department_options"
                                :emptyValue="{ value: '', text: '' }"
                                required
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row">
                        <TCFormGroup
                            class="col-3"
                            label="職位名稱"
                            required
                        ></TCFormGroup>
                        <TCFormGroup class="col-9" required>
                            <input
                                v-model="records.name"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row">
                        <TCFormGroup
                            class="col-3"
                            label="職位編號"
                            required
                        ></TCFormGroup>
                        <TCFormGroup class="col-9" required>
                            <input
                                v-model="records.position_no"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>

                    <div class="col-4 row">
                        <TCFormGroup
                            class="col-3"
                            label="層級"
                            required
                        ></TCFormGroup>
                        <TCFormGroup class="col-9" required>
                            <TCDropdown
                                v-model="records.level"
                                :options="grade_options"
                                :allow-empty="false"
                                required
                            />
                        </TCFormGroup>
                    </div>
                </div>
                <div class="row align-items-center mt-5">
                    <div
                        @click="changePage(false)"
                        class="col-2"
                        :class="{
                            topSelectTrue: !isClickChangeFn,
                            topSelectFalse: isClickChangeFn,
                        }"
                    >
                        <span style="font-weight: bold; line-height: 50px"
                            >功能權限設置</span
                        >
                    </div>
                    <div
                        @click="changePage(true)"
                        class="col-2"
                        :class="{
                            topSelectTrue: isClickChangeFn,
                            topSelectFalse: !isClickChangeFn,
                        }"
                    >
                        <span style="font-weight: bold; line-height: 50px"
                            >數據權限設置</span
                        >
                    </div>
                    <div class="col-12" style="border: 0.5px solide black">
                        <div
                            style="
                                height: 50px;
                                overflow-y: auto;
                                background-color: #ecf5ff;
                                padding: 0 16px;
                                border-left: 0.5px solid #dddddd;
                                border-right: 0.5px solid #dddddd;
                                display: flex;
                            "
                        >
                            <span
                                v-if="!isClickChangeFn"
                                style="
                                    font-size: 14px;
                                    font-weight: bold;
                                    line-height: 50px;
                                    margin-right: auto;
                                "
                                >模組功能權限設置</span
                            >

                            <!-- <div
                                v-show="!isClickChangeFn"
                                class="input-group mb-3"
                                style="align-self: center; display: flex"
                            >
                                <input
                                    id="searchPermission"
                                    v-model="permissionsSearchStr"
                                    type="text"
                                    class="form-control"
                                    placeholder="搜尋模組關鍵字"
                                    aria-label="搜尋模組關鍵字"
                                    aria-describedby="filterBTN"
                                    @keyup.enter="filterPermissionData()"
                                />
                                <div class="input-group-append ml-2">
                                    <button
                                        @click="filterPermissionData()"
                                        class="btn btn-outline-secondary"
                                        type="button"
                                        style="
                                            background-color: #1cb8ff;
                                            color: white;
                                        "
                                        id="filterBTN"
                                    >
                                        搜尋
                                    </button>
                                </div>
                            </div> -->

                            <!-- 選擇戶口或層級 -->
                        </div>

                        <div
                            v-if="isClickChangeFn && picked == 'selec_acc'"
                            style="
                                height: 44px;
                                overflow-y: auto;
                                background-color: #f7f7f7;
                                padding: 0 16px;
                                border-left: 0.5px solid #dddddd;
                                border-right: 0.5px solid #dddddd;
                                display: flex;
                            "
                        >
                            <span style="margin-right: auto"></span>
                            <div>
                                <button
                                    onclick="select_acc.add_acc()"
                                    class="btn btn-primary px-5"
                                >
                                    可跟進戶口
                                </button>
                                <button
                                    onclick="select_acc.remove_acc()"
                                    class="btn btn-primary ml-2 px-5"
                                >
                                    除外戶口
                                </button>
                            </div>
                        </div>
                        <!-- 選擇可跟進之戶組戶口 -->
                        <div
                            v-show="!isClickChangeFn"
                            id="permissionTreeDiv"
                            style="
                                height: 400px;
                                overflow-y: auto;
                                background-color: white;
                                padding: 3px 16px;
                                border-left: 0.5px solid #dddddd;
                                border-right: 0.5px solid #dddddd;
                                border-bottom: 0.5px solid #dddddd;
                            "
                        >
                            <el-tree
                                :data="treeData"
                                show-checkbox
                                node-key="id"
                                :props="defaultProps"
                                @check="checkTreeCheckbox"
                                :default-checked-keys="checkPermission"
                                ref="tree"
                            >
                            </el-tree>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <button class="btn btn-new4" type="button" @click="submit()">
                    保存
                </button>
                <button class="btn btn-new4" type="button" @click="hide(0)">
                    離開
                </button>
            </template>
        </TCModal>
    </div>
</template>
<script>
import TCModal from "@/components/tc_components/tc-modal.vue";
import TCDropdown from "@/components/tc_components/tc_dropdown.vue";
import TCFormGroup from "@/components/tc_components/tc-form-group.vue";
import getTreeData from "./treeData";
const API = {
    createPosition: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/position/create`,
    updatePosition: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/position/update`,
    getCheckedPermissions: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/position/detail`,
};
export default {
    name: "edit_form",
    components: {
        TCModal,
        TCFormGroup,
        TCDropdown,
    },
    created() {
        this.treeData = getTreeData();
    },
    data() {
        return {
            defaultProps: {
                children: "children",
                label: "label",
            },
            UI: {
                title: null,
                title_create: "新增職位",
                title_update: "修改職位",
            },
            is_create: false,
            // API送出資料
            records: {
                user_department_id: "",
                name: null,
                position_no: null,
                level: 0,
                permission: null,
            },
            // 層級資料結構
            grade_options: [
                {
                    value: 0,
                    text: "",
                },
                {
                    value: 1,
                    text: "賬房",
                },
                {
                    value: 2,
                    text: "主任",
                },
                {
                    value: 3,
                    text: "經理",
                },
                {
                    value: 4,
                    text: "總經理",
                },
            ],
            // 樹狀資料
            treeData: [],
            // 部門資料
            department_options: [],
            // 修改&詳細有打勾的permission
            checkPermission: [],
            //打API給予的position permission
            originPositionTotalPermission: [],
            //進入頁面後使否點擊過權限
            isEverCheckPermission: false,
            //修改&詳細的user_position_id
            user_position_id: "",
            filterString: "",
            permissionsSearchStr: "",
            accSearchStr: "",
            importAcc: {
                accNo: [],
                accGroup: [],
            }, //可跟進戶口初始值
            canceledAcc: {
                accNo: [],
                accGroup: [],
            }, //除外戶口初始值
            layer: "", //綁定層級的曾數
            picked: "selec_acc", //選擇可跟進戶口戶組&&綁定層級之切換 有select_layer&&selec_acc可選擇
            isClickChangeFn: false, //功能權限及數據權限切換
            isSearchingPermission: false, //是否有搜尋過
        };
    },
    methods: {
        changePage: function (event) {
            this.isClickChangeFn = event;
        },
        checkTreeCheckbox: function (selectCheckedData, totalCheckedData) {
            this.records.permission = [
                ...totalCheckedData.checkedKeys,
                ...totalCheckedData.halfCheckedKeys,
            ];
            this.isEverCheckPermission = true;
        },
        hide: function () {
            return this.$refs.modal.hide();
        },
        submit: async function () {
            let records = this.records;
            if (await this.validate(records)) {
                this.save();
            }
        },
        validate: function (records) {
            let validateVal = [];
            records.user_department_id || validateVal.push("部門 ");
            records.name || validateVal.push("職位名稱 ");
            records.position_no || validateVal.push("職位編號 ");
            if (validateVal.length > 0) {
                let msg = "";
                validateVal.forEach((val) => {
                    msg += val;
                });
                msg = msg + "不得為空";
                this.$message({
                    top: 1000,
                    showClose: true,
                    duration: 5000,
                    message: msg,
                    type: "error",
                });
                return false;
            } else {
                return true;
            }
        },
        save: async function () {
            if (!(await SysUI.input_pin(true))) {
                return;
            }
            let url;
            let method;

            if (this.is_create) {
                url = API.createPosition;
                method = "POST";
            } else {
                url = API.updatePosition;
                method = "PUT";
                this.records.user_position_id = this.user_position_id;
            }
            await SysUI.axios(method, url, this.records).then(
                async (response) => {
                    if (response.httpStatus == 200) {
                        this.$message({
                            top: 1000,
                            showClose: true,
                            duration: 5000,
                            message: response.message,
                            type: "success",
                        });
                        this.hide();
                        await this.$parent.search();
                    } else {
                        this.$message({
                            top: 1000,
                            showClose: true,
                            duration: 5000,
                            message: response.message,
                            type: "error",
                        });
                    }
                }
            );
        },
        record_init: async function () {
            this.isEverCheckPermission = false;
            this.records = {
                user_department_id: "",
                name: null,
                position_no: null,
                level: 0,
                permission: null,
            };
            this.originPositionTotalPermission = [];
            this.user_position_id = "";
            this.checkPermission = [];
            this.treeData = getTreeData();
        },
        refresh_record: async function (id) {
            this.user_position_id = id;
            await SysUI.axios("GET", API.getCheckedPermissions, {
                user_position_id: id,
            }).then(async (response) => {
                if (response.httpStatus == 200) {
                    this.records = response.data;
                    this.originPositionTotalPermission =
                        //使tree input checked
                        await this.treeData[0].children.forEach((layer1) => {
                            this.checkTreeForeach(
                                layer1,
                                response.data.permission
                            );
                        });
                } else {
                    this.$message({
                        top: 1000,
                        showClose: true,
                        duration: 5000,
                        message: "獲取權限失敗",
                        type: "error",
                    });
                }
            });
        },
        checkTreeForeach: async function (data, permissions) {
            if (data.children.length > 0) {
                data.children.forEach((params) => {
                    this.checkTreeForeach(params, permissions);
                });
            } else {
                if (permissions.includes(data.id)) {
                    this.checkPermission = [...this.checkPermission, data.id];
                }
            }
        },
        edit_record: async function (id) {
            await this.record_init();
            this.is_create = false;
            this.UI.title = this.UI.title_update;
            await this.refresh_record(id);
            return this.show();
        },
        create_record: async function (id) {
            await this.record_init();
            this.is_create = true;
            this.UI.title = this.UI.title_create;

            return this.show();
        },
        getDepartmentOption: function (param) {
            this.department_options = param;
            this.department_options = [
                {
                    value: "",
                    text: "",
                },
                ...this.department_options,
            ];
        },
        show: function () {
            return this.$refs.modal.show();
        },
    },
};
</script>
<style lang="scss">
.topSelectTrue {
    background-color: white;
    padding: 0 16px;
    border-top: 3px solid #0a88ff;
    border-left: 0.5px solid #dddddd;
    border-right: 0.5px solid #dddddd;
    cursor: pointer;
}

.topSelectFalse {
    background-color: white;
    padding: 0 16px;
    cursor: pointer;
    color: #bbb;
    opacity: 0.7;
}
.el-tree-node__label {
    font-family: "Font-Custom-Regular" !important;
    font-weight: bold;
    color: #22354d;
}
.el-tree-node {
    margin-top: 1em;
    .is-checked {
        .el-checkbox__input {
            .el-checkbox__inner {
                background-color: #22354d;
                border-color: #22354d;
                border-width: 2px;
                width: 16px;
                height: 16px;
            }
        }
    }
    .is-indeterminate {
        .el-checkbox__inner {
            background-color: #22354d;
            border-color: #22354d;
            border-width: 2px;
            width: 16px;
            height: 16px;
        }
    }
    .is-focus {
        .el-checkbox__inner {
            border-color: #22354d;
            border-width: 2px;
            width: 16px;
            height: 16px;
        }
    }
    .el-checkbox__inner {
        border-color: #22354d;
        border-width: 2px;
        width: 16px;
        height: 16px;
    }
}
</style>
