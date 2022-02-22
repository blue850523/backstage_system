<template>
    <TCModal class="edit_form" id="edit_form" :title="UI.title" ref="modal" :dialog_width="'1600px'" :modal-body-style="{'min-height': 'fit-content', 'overflow': 'auto'}">
        <template #body>
            <div class="row g-0 type-area">
                <div class="col-1">
                    <div class="form-group row nopadding required" :class="{'text-d': error.type}">
                        <label class="control-label text-end">項目名稱</label>
                    </div>
                </div>
                <div class="col-11">
                    <div class="row check-box-area">
                        <div class="form-group col-1" v-for="(it, index) in type_list" :key="`type_item_${index}`">
                            <template v-if="it.value == 9">
                                <template v-if="check_permission('group_remark')">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        :value="it.value" 
                                        :id="`type_checkbox_${index}`"
                                        v-model="type_ids"
                                        :disabled="is_detail">
                                    <label class="control-label" :for="`type_checkbox_${index}`">{{ it.name }}</label>
                                </template>
                            </template>
                            <template v-else>
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    :value="it.value" 
                                    :id="`type_checkbox_${index}`"
                                    v-model="type_ids"
                                    :disabled="is_detail">
                                <label class="control-label" :for="`type_checkbox_${index}`">{{ it.name }}</label>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-0 account-area">
                <div class="col-4 row nopadding form-group required">
                    <div class="col-3 row nopadding">
                        <label class="control-label text-end account-type-label" :class="{'text-d': error.account}">
                            <input 
                                class="form-check-input" 
                                type="radio" 
                                value="1" 
                                v-model="create_type"
                                @change="change_create_type('1')"
                                :disabled="is_detail">
                            戶口編號
                        </label>
                    </div>
                    <div class="col-9 row nopadding account-group">
                        <div class="col-10 nopadding account-input">
                            <input 
                                class="form-control"
                                placeholder="戶口編號" 
                                @blur="get_account_info('account')"
                                @keyup.enter="add_account('account')"
                                @input="account_name = ''; account_id = ''"
                                v-model="account_no"
                                :disabled="is_detail || create_type != '1'"
                                v-tc-number>
                            <input 
                                class="form-control"
                                placeholder="戶主名稱" 
                                v-model="account_name"
                                disabled>
                        </div>
                        <div class="col-2 nopadding account-btn">
                            <button class="btn btn-p btn-ml4" @click="add_account('account')" v-if="!is_detail" :disabled="create_type != '1'">
                                加入
                            </button>
                        </div>
                        <div class="col-12 account-list">
                            <div class="account-list-item" v-for="(it, index) in accounts" :key="`account_list_${it.account_no}`">
                                <span class="acc-list-delete-btn" @click="delete_account('account', index)">
                                    <i class="fa fa-minus-circle"></i>
                                </span>
                                <label>
                                    {{ it.account_no + " " + it.account_name }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-0 account-area">
                <div class="col-4 row nopadding form-group required">
                    <div class="col-3 row nopadding">
                        <label class="control-label text-end account-type-label" :class="{'text-d': error.account_group_account}">
                            <input 
                                class="form-check-input" 
                                type="radio" 
                                value="2" 
                                v-model="create_type"
                                @change="change_create_type('2')"
                                :disabled="is_detail">
                            戶組
                        </label>
                    </div>
                    <div class="col-9 row nopadding account-group">
                        <div class="col-10 nopadding account-input">
                            <input 
                                class="form-control"
                                placeholder="戶組編號" 
                                @blur="get_account_info('account_group_account')"
                                @keyup.enter="add_account('account_group_account')"
                                @input="account_group_account_name = ''; account_group_account_id = ''"
                                v-model="account_group_account_no"
                                :disabled="is_detail || create_type != '2'"
                                v-tc-number>
                            <input 
                                class="form-control"
                                placeholder="戶組名稱" 
                                v-model="account_group_account_name"
                                disabled>
                        </div>
                        <div class="col-2 nopadding account-btn">
                            <button class="btn btn-p btn-ml4" @click="add_account('account_group_account')" v-if="!is_detail" :disabled="create_type != '2'">
                                加入
                            </button>
                        </div>
                        <div class="col-12 account-list">
                            <div class="account-list-item" v-for="(it, index) in account_group_accounts" :key="`account_group_account_list_${it.account_group_account_no}`">
                                <span class="acc-list-delete-btn" @click="delete_account('account_group_account', index)">
                                    <i class="fa fa-minus-circle"></i>
                                </span>
                                <label>
                                    {{ it.account_group_account_no + " " + it.account_group_account_name }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-4 row nopadding form-group" v-show="create_type == '2'">
                    <div class="col-3 row nopadding">
                        <label class="control-label text-end account-type-label">
                            除外戶口編號
                        </label>
                    </div>
                    <div class="col-9 row nopadding account-group">
                        <div class="col-10 nopadding account-input">
                            <input 
                                class="form-control"
                                placeholder="戶口編號" 
                                @blur="get_account_info('excluded_account')"
                                @keyup.enter="add_account('excluded_account')"
                                @input="excluded_account_no = ''; excluded_account_id = ''"
                                v-model="excluded_account_no"
                                :disabled="is_detail || create_type != '2' || account_group_accounts.length === 0"
                                v-tc-number>
                            <input 
                                class="form-control"
                                placeholder="戶主名稱" 
                                v-model="excluded_account_name"
                                disabled>
                        </div>
                        <div class="col-2 nopadding account-btn">
                            <button class="btn btn-p btn-ml4" @click="add_account('excluded_account')" v-if="!is_detail" :disabled="create_type != '2' || account_group_accounts.length === 0">
                                加入
                            </button>
                        </div>
                        <div class="col-12 account-list">
                            <div class="account-list-item" v-for="(it, index) in excluded_accounts" :key="`excluded_account_list_${it.excluded_account_no}`">
                                <span class="acc-list-delete-btn" @click="delete_account('excluded_account', index)">
                                    <i class="fa fa-minus-circle"></i>
                                </span>
                                <label>
                                    {{ it.excluded_account_no + " " + it.excluded_account_name }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-4 row nopadding form-group" v-show="create_type == '2'">
                    <div class="col-3 row nopadding">
                        <label class="control-label text-end account-type-label">
                            除外戶組
                        </label>
                    </div>
                    <div class="col-9 row nopadding account-group">
                        <div class="col-10 nopadding account-input">
                            <input 
                                class="form-control"
                                placeholder="戶組編號" 
                                @blur="get_account_info('excluded_account_group_account')"
                                @keyup.enter="add_account('excluded_account_group_account')"
                                @input="excluded_account_group_account_no = ''; excluded_account_group_account_id = ''"
                                v-model="excluded_account_group_account_no"
                                :disabled="is_detail || create_type != '2' || account_group_accounts.length === 0"
                                v-tc-number>
                            <input 
                                class="form-control"
                                placeholder="戶組名稱" 
                                v-model="excluded_account_group_account_name"
                                disabled>
                        </div>
                        <div class="col-2 nopadding account-btn">
                            <button class="btn btn-p btn-ml4" @click="add_account('excluded_account_group_account')" v-if="!is_detail" :disabled="create_type != '2' || account_group_accounts.length === 0">
                                加入
                            </button>
                        </div>
                        <div class="col-12 account-list">
                            <div class="account-list-item" v-for="(it, index) in excluded_account_group_accounts" :key="`excluded_account_group_account_list_${it.excluded_account_group_account_no}`">
                                <span class="acc-list-delete-btn" @click="delete_account('excluded_account_group_account', index)">
                                    <i class="fa fa-minus-circle"></i>
                                </span>
                                <label>
                                    {{ it.excluded_account_group_account_no + " " + it.excluded_account_group_account_name }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-0 content-area">
                <div class="form-group row nopadding required">
                    <div class="col-1 row nopadding">
                        <label class="control-label text-end">內容</label>
                    </div>
                    <div class="col-7 nopadding">
                        <textarea 
                            class="form-control"
                            rows="5"
                            v-model="content"
                            required
                            :disabled="is_detail">
                        </textarea>
                    </div>
                </div>
            </div>

            <div class="row g-0 location-area">
                <div class="col-1">
                    <div class="form-group row nopadding">
                        <label class="control-label text-end">顯示廳館</label>
                    </div>
                </div>
                <div class="col-11 row location-list">
                    <div class="form-group col-2">
                        <input 
                            class="form-check-input" 
                            type="checkbox" 
                            id="all_show_location_checkbox" 
                            @click="all_location_click($event)"
                            :disabled="is_detail">
                        <label class="control-label" for="all_show_location_checkbox">全集團</label>
                    </div>
                    <div class="form-group col-10 row g-0 align-items-start">
                        <div class="form-group col-2" v-for="(it, index) in location_list" :key="`location_item_${index}`">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                :value="it.location_id" 
                                :id="`show_location_checkbox_${index}`" 
                                v-model="show_location_ids"
                                :disabled="is_detail">
                            <label class="control-label" :for="`show_location_checkbox_${index}`">{{ it.name }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-0 department-area">
                <div class="col-1">
                    <div class="form-group row nopadding required" :class="{'text-d': error.department}">
                        <label class="control-label text-end">可查閱部門</label>
                    </div>
                </div>
                <div class="col-11 row department-list">
                    <div class="form-group col-2">
                        <input 
                            class="form-check-input" 
                            type="checkbox" 
                            id="all_permission_department_checkbox" 
                            @click="all_department_click($event)"
                            :disabled="is_detail">
                        <label class="control-label" for="all_permission_department_checkbox">全部門</label>
                    </div>
                    <div class="form-group col-10 row g-0 align-items-start">
                        <div class="form-group col-2" v-for="(it, index) in department_list" :key="`department_item_${index}`">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                :value="it.department_id" 
                                :id="`permission_department_checkbox_${index}`" 
                                v-model="permission_department_ids"
                                :disabled="is_detail">
                            <label class="control-label" :for="`permission_department_checkbox_${index}`">{{ it.name }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-0 date-area">
                <div class="form-group col-3 row nopadding" v-if="!is_create">
                    <div class="col-4 row nopadding">
                        <label class="control-label text-end">是否完成</label>
                    </div>
                    <div class="col-7 nopadding">
                        <select class="form-select" v-model="status" :disabled="is_detail">
                            <option value="1">已完成</option>
                            <option value="0">未完成</option>
                        </select>
                    </div>
                </div>

                <div class="form-group col-3 row nopadding required">
                    <div class="col-4 row nopadding">
                        <label class="control-label text-end">開始時間</label>
                    </div>
                    <div class="col-7 nopadding">
                        <DatePicker 
                            v-model="start_time" 
                            :input-attr="{required: 'true'}"
                            placeholder="開始時間"
                            format="YYYY-MM-DD HH:mm"
                            value-type="format"
                            :disabled="is_detail"/>
                    </div>
                </div>

                <div class="form-group col-2 row nopadding">
                    <div class="col-6 row nopadding">
                        <label class="control-label text-end">有效天數</label>
                    </div>
                    <div class="col-6 nopadding">
                        <input 
                            class="form-control"
                            placeholder="有效天數" 
                            v-model="effective_date" 
                            @change="change_effective_date()"
                            :disabled="is_detail"
                            v-tc-number>
                    </div>
                </div>

                <div class="form-group col-3 row nopadding">
                    <div class="col-4 row nopadding">
                        <label class="control-label text-end">完成時間</label>
                    </div>
                    <div class="col-7 nopadding complete-time-area">
                        <span class="text-d complete-time-error" v-if="error.complete_time">完成時間小於開始時間</span>
                        <DatePicker 
                            v-model="complete_time" 
                            placeholder="完成時間"
                            format="YYYY-MM-DD HH:mm"
                            value-type="format"
                            :disabled="is_detail"/>
                    </div>
                </div>

                <div class="col-1 nopadding text-start">
                    <button class="btn btn-p" @click="complete_time = ''" v-if="!is_detail">
                        清空
                    </button>
                </div>
            </div>
        </template>

        <template #footer>
            <button class="btn btn-new4" type="button" @click="save()" v-if="!is_detail">{{ is_create ? "提交" : "儲存" }}</button>
            <button class="btn btn-new4" type="button" @click="hide()">離開</button>
        </template>
    </TCModal>
</template>

<script>
import TCModal from "@/components/tc_components/tc-modal.vue";
import moment from 'moment';

const API = {
    getLocationList: `${process.env.VUE_APP_DEV_LARAVEL}/api/common/location/list`,
    getDepartmentList: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/department/list`,
    getAccountInfo: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/get-account-info`,
    createOrderNote: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/remind/create`,
    getOrderNoteDetail: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/remind/detail`,
    updateOrderNote: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/remind/update`,
};

export default {
    name: "edit_form",
    components: {
        TCModal,
    },
    data: function () {
        return {
            UI: {
                title: "新增提醒",
                title_create: "新增提醒",
                title_edit: "修改提醒",
                title_detail: "提醒詳細",
            },
            permissions: {},
            location_id: sessionStorage["location_id"],
            is_create: false,
            is_detail: false,
            type_list: [
                {
                    name: "貸款",
                    value: 1
                },
                {
                    name: "利息",
                    value: 2
                },
                {
                    name: "佣金",
                    value: 3
                },
                {
                    name: "存卡",
                    value: 4
                },
                {
                    name: "開工留意",
                    value: 5
                },
                {
                    name: "場面",
                    value: 6
                },
                {
                    name: "注意",
                    value: 7
                },
                {
                    name: "補充文件",
                    value: 8
                },
                {
                    name: "集團備註",
                    value: 9
                },
            ],
            location_list: [],
            department_list: [],
            account_no: "",
            account_name: "",
            account_id: "",
            account_group_account_no: "",
            account_group_account_name: "",
            account_group_account_id: "",
            excluded_account_no: "",
            excluded_account_name: "",
            excluded_account_id: "",
            excluded_account_group_account_no: "",
            excluded_account_group_account_name: "",
            excluded_account_group_account_id: "",
            create_type: "1",
            type_ids: [],
            accounts: [],
            account_group_accounts: [],
            excluded_accounts: [],
            excluded_account_group_accounts: [],
            content: "",
            show_location_ids: [],
            permission_department_ids: [],
            status: "",
            start_time: "",
            effective_date: "",
            complete_time: "",
            error: {
                type: false,
                account: false,
                account_group_account: false,
                department: false,
                complete_time: false,
            }
        }
    },
    methods: {
        async create_record () {
            this.is_create = true;
            this.is_detail = false;
            this.UI.title = this.UI.title_create;
            await this.get_location_list();
            await this.get_department_list();
            this.start_time = moment().format("YYYY-MM-DD HH:mm");
            $("#all_show_location_checkbox").click();
            return this.show();
        },
        async edit_record () {
            this.is_create = false;
            this.is_detail = false;
            this.UI.title = this.UI.title_edit;
            await this.get_location_list();
            await this.get_department_list();
            return this.show();
        },
        async detail_record () {
            this.is_create = false;
            this.is_detail = true;
            this.UI.title = this.UI.title_detail;
            await this.get_location_list();
            await this.get_department_list();
            return this.show();
        },
        async get_location_list () {
            try {
                let response = await this.axios.get(API.getLocationList).then((res) => res);

                if (response.status == 200) {
                    this.location_list = response.data.data;
                } else {
                    await SysUI.alert(this.UI.title, "取得廳列表錯誤, 請重新整理");
                    return;
                }
            } catch (error) {
                await SysUI.alert(this.UI.title, "取得廳列表錯誤, 請重新整理");
                return;
            }
        },
        async get_department_list () {
            try {
                let response = await this.axios.get(API.getDepartmentList, {
                    params: {
                        name: "",
                        page: 1,
                        limit: 100
                    }
                }).then((res) => res);

                if (response.status == 200) {
                    this.department_list = response.data.data.data;
                } else {
                    await SysUI.alert("提醒管理", "取得部門列表錯誤, 請重新整理");
                    return;
                }
            } catch (error) {
                await SysUI.alert("提醒管理", "取得部門列表錯誤, 請重新整理");
                return;
            }
        },
        check_permission (type) {
            let permission_map = {
                create: {
                    group_remark: "1_4_1_1_1",
                },
                detail: {
                    group_remark: "1_4_3_1_4_1"
                },
                edit: {
                    group_remark: "1_4_3_1_5_1"
                }
            }

            if (this.is_create) {
                return this.permissions[permission_map.create[type]];
            } else {
                if (this.is_detail) {
                    return this.permissions[permission_map.detail[type]];
                } else {
                    return this.permissions[permission_map.edit[type]];
                }
            }
        },
        change_create_type (type) {
            if (type === "1") {
                this.account_group_account_no = "";
                this.account_group_account_name = "";
                this.account_group_account_id = "";
                this.excluded_account_no = "";
                this.excluded_account_name = "";
                this.excluded_account_id = "";
                this.excluded_account_group_account_no = "";
                this.excluded_account_group_account_name = "";
                this.excluded_account_group_account_id = "";
                this.account_group_accounts = [];
                this.excluded_accounts = [];
                this.excluded_account_group_accounts = [];
            } else {
                this.account_no = "";
                this.account_name = "";
                this.account_id = "";
                this.accounts = [];
            }
        },
        async get_account_info (type) {
            if (this[`${type}_no`] !== "") {
                let loadingInstance = this.$loading({
                    background: "rgba(0,0,0,0.4)",
                    text: "請求資料中..",
                });

                try {
                    let response = await this.axios.get(API.getAccountInfo, { params: {
                        account_no: this[`${type}_no`]
                    }}).then((res) => res);

                    loadingInstance.close();

                    if (response.status === 200) {
                        if (response.data.data.account_id) {
                            this[`${type}_no`] = response.data.data.account_no;
                            this[`${type}_name`] = response.data.data.full_name;
                            this[`${type}_id`] = response.data.data.account_id;
                            return;
                        } else {
                            this[`${type}_no`] = "";
                            this[`${type}_name`] = "";
                            this[`${type}_id`] = "";
                            await SysUI.alert(this.UI.title, "戶口編號不存在");
                            return;
                        }
                    }
                } catch (error) {
                    loadingInstance.close();

                    this[`${type}_no`] = "";
                    this[`${type}_name`] = "";
                    this[`${type}_id`] = "";
                    console.log("error", error.response);
                    await SysUI.alert(this.UI.title, error.response.data.message);
                    return;
                }
            }
        },
        async add_account (type) {
            await this.get_account_info(type);

            if (this[`${type}_id`] !== "") {
                let obj = {};
                obj[`${type}_no`] = this[`${type}_no`];
                obj[`${type}_name`] = this[`${type}_name`];
                obj[`${type}_id`] = this[`${type}_id`];

                let accounts_ids = this[`${type}s`].map(it => it[`${type}_id`]);
                if (accounts_ids.indexOf(this[`${type}_id`]) === -1) {
                    this[`${type}s`].push(obj);
                }

                this[`${type}_no`] = "";
                this[`${type}_name`] = "";
                this[`${type}_id`] = "";
            }
        },
        delete_account (type, index) {
            this[`${type}s`].splice(index, 1);
        },
        all_location_click ($event) {
            let checked = $event.target.checked + 0;

            let all_location_ids = this.location_list.map(it => it.location_id);

            if (checked === 1) {
                all_location_ids.forEach(it => {
                    if (this.show_location_ids.indexOf(it) === -1) {
                        this.show_location_ids.push(it)
                    }
                });
            } else {
                all_location_ids.forEach(it => {
                    if (this.show_location_ids.indexOf(it) !== -1) {
                        this.show_location_ids.splice(this.show_location_ids.indexOf(it), 1);
                    }
                });
            }
        },
        all_department_click ($event) {
            let checked = $event.target.checked + 0;

            let all_department_ids = this.department_list.map(it => it.department_id);

            if (checked === 1) {
                all_department_ids.forEach(it => {
                    if (this.permission_department_ids.indexOf(it) === -1) {
                        this.permission_department_ids.push(it)
                    }
                });
            } else {
                all_department_ids.forEach(it => {
                    if (this.permission_department_ids.indexOf(it) !== -1) {
                        this.permission_department_ids.splice(this.permission_department_ids.indexOf(it), 1);
                    }
                });
            }
        },
        change_effective_date () {
            if (this.start_time === "" || this.start_time === null) {
                this.complete_time = "";
            } else {
                if (this.effective_date !== "") {
                    this.complete_time = moment(this.start_time).add(this.effective_date, 'days').format("YYYY-MM-DD HH:mm");
                } else {
                    this.complete_time = "";
                }
            }
        },
        async validates () {
            let check = true;

            check = check_form_is_valid($(this.$el), true);

            Object.assign(this.$data.error, this.$options.data().error);

            if (this.type_ids.length === 0) {
                this.error.type = true;
                check = false;
            }
            
            if (this.create_type == "1") {
                if (this.accounts.length === 0) {
                    this.error.account = true;
                    check = false;
                }
            } else {
                if (this.account_group_accounts.length === 0) {
                    this.error.account_group_account = true;
                    check = false;
                }
            }

            if (this.permission_department_ids.length === 0) {
                this.error.department = true;
                check = false;
            }

            if (this.start_time > this.complete_time) {
                this.error.complete_time = true;
                check = false
            }

            return check;
        },
        async save () {
            // console.log("accounts", this.accounts);
            // console.log("account_group_accounts", this.account_group_accounts);
            // console.log("excluded_accounts", this.excluded_accounts);
            // console.log("excluded_account_group_accounts", this.excluded_account_group_accounts);

            let is_valid = await this.validates();
            if (!is_valid) {
                return;
            }

            let loadingInstance = this.$loading({
                background: "rgba(0,0,0,0.4)",
                text: "請求資料中..",
            });

            let url = this.is_create ? API.createOrderNote : API.updateOrderNote;
            let action = this.is_create ? 'post' : 'put'

            try {
                let response = await this.axios[action](url, {
                    type_ids: this.type_ids,
                    accounts: this.accounts,
                    account_group_accounts: this.account_group_accounts,
                    excluded_accounts: this.excluded_accounts,
                    excluded_account_group_accounts: this.excluded_account_group_accounts,
                    content: this.content,
                    show_location_ids: this.show_location_ids,
                    permission_department_ids: this.permission_department_ids,
                    start_time: this.start_time,
                    complete_time: this.complete_time,
                    location_id: this.location_id
                }).then((res) => res);

                loadingInstance.close();

                if (response.status == 200) {
                    this.hide(1);
                } else {
                    await SysUI.alert(this.UI.title, response.data.message);
                    return;
                }
            } catch (error) {
                loadingInstance.close();

                console.log("error", error.response);
                await SysUI.alert(this.UI.title, error.response.data.message);
                return;
            }
        },
        show () {
            return this.$refs.modal.show();
        },
        hide (need_refresh = 0) {
            this.reset();
            return this.$refs.modal.hide(need_refresh);
        },
        reset () {
            Object.assign(this.$data, this.$options.data());
            remove_form_has_error($(this.$el));
            $("#all_show_location_checkbox").prop("checked", false);
            $("#all_permission_department_checkbox").prop("checked", false);
        }
    }
}
</script>

<style lang="scss" scoped>
.edit_form {
    .type-area {
        > .col-1 .control-label {
            margin-top: 1.5rem;
        }
        .check-box-area {
            padding: 1rem 0;
            margin: 0;
            border-radius: 3px;
            background-color: #F5F5F5;
            .form-group {
                display: flex;
                align-items: flex-start;
                width: 10%;
                .form-check-input {
                    margin: .9rem 0 0;
                    min-width: 1.6rem;
                    min-height: 1.6rem;
                }
                .control-label {
                    width: auto;
                    padding-left: .5rem;
                }
            }
        }
    }

    .account-area {
        margin-top: 1.5rem;
        .account-type-label {
            position: relative;
            height: fit-content;
            .form-check-input {
                position: absolute;
                right: 9.5rem;
            }
        }
        .account-group {
            .account-input {
                display: flex;
                input:nth-child(1) {
                    flex: 3;
                    margin-right: 0.25rem;
                }
                input:nth-child(2) {
                    flex: 7;
                    margin-left: 0.25rem;
                }
            }
            .account-btn {
                display: flex;
                align-items: center;
            }
            .account-list {
                height: 10rem;
                padding: 0.5rem;
                margin: .5rem 0 0 0;
                border-radius: 3px;
                overflow: auto;
                text-align: left;
                background-color: #F5F5F5;
                .account-list-item {
                    display: flex;
                    align-items: center;
                    font-size: 1.4rem;
                    font-weight: bold;
                    .acc-list-delete-btn {
                        margin-right: .5rem;
                        font-size: 1.5rem;
                        cursor: pointer;
                        color: #F03447;
                    }
                }
            }
        }
    }

    .content-area {
        margin-top: 1.5rem;
        textarea {
            height: auto;
            resize: none;
        }
    }

    .location-area {
        margin-top: 1.5rem;
        > .col-1 .control-label {
            margin-top: 1.5rem;
        }
        .location-list {
            padding: 1rem 0;
            margin: 0;
            border-radius: 3px;
            align-items: flex-start;
            background-color: #F5F5F5;
            .form-group {
                display: flex;
                align-items: flex-start;
                .form-check-input {
                    margin: .9rem 0 0;
                    min-width: 1.6rem;
                    min-height: 1.6rem;
                }
                .control-label {
                    width: auto;
                    padding-left: .5rem;
                }
            }
        }
    }

    .department-area {
        margin-top: 1.5rem;
        > .col-1 .control-label {
            margin-top: 1.5rem;
        }
        .department-list {
            padding: 1rem 0;
            margin: 0;
            border-radius: 3px;
            align-items: flex-start;
            background-color: #F5F5F5;
            .form-group {
                display: flex;
                align-items: flex-start;
                .form-check-input {
                    margin: .9rem 0 0;
                    min-width: 1.6rem;
                    min-height: 1.6rem;
                }
                .control-label {
                    width: auto;
                    padding-left: .5rem;
                }
            }
        }
    }

    .date-area {
        margin-top: 1.5rem;
        .complete-time-area {
            position: relative;
            .complete-time-error {
                position: absolute;
                bottom: -2rem;
                right: 0;
                font-size: 1.3rem;
            }
        }
    }
}
</style>