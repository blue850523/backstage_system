<template>
    <div class="accmanage">
        <div class="vc-panel" id="main-panel">
            <div class="vc-panel-heading">
                <span class="vc-panel-title">戶口管理</span>
                <div class="pull-right">
                    <button class="btn btn-new" @click="create_account()" v-if="permissions['1_1_1_1']">
                        新開戶口
                    </button>
                </div>
            </div>

            <div class="vc-panel-body" v-if="permissions['1_1']">
                <form id="search-panel" class="vc-panel-body-search watermark-container" @keyup.enter="search()" v-if="permissions['1_1_2']">
                    <WaterMark />
                    <div class="subTitle justify-content-between">
                        選擇搜尋條件
                    </div>

                    <div class="vc-panel-body-search-row row row-cols-4 gx-0 gy-1">
                        <FilterInputField
                            label="戶口編號"
                            id="filter_account_no"
                            name="filter_account_no"
                            maxlength="10"
                            only_number
                            v-model="filters.account_no"
                            v-if="permissions['1_1_2_1']"
                        />

                        <FilterAccountGroupField
                            label="戶組"
                            id="filter_account_group"
                            name="filter_account_group"
                            v-model="filters.account_group"
                            @emitOpenAccountGroupForm="getOpenAccountGroupForm('戶組', 'account_group')"
                            v-if="permissions['1_1_2_1_2']"
                        />

                        <FilterInputField
                            label="姓名"
                            id="filter_name_full"
                            name="filter_name_full"
                            v-model="filters.name_full"
                            v-if="permissions['1_1_2_2']"
                        />

                        <FilterInputField
                            label="證件編號"
                            id="filter_serial_no"
                            name="filter_serial_no"
                            v-model="filters.serial_no"
                            v-if="permissions['1_1_2_2_3']"
                        />

                        <FilterInputField
                            label="聯絡電話"
                            id="filter_telephone"
                            name="filter_telephone"
                            v-model="filters.telephone"
                            v-if="permissions['1_1_2_2_4']"
                        />

                        <FilterSelectField
                            label="戶口類型"
                            name="filter_account_type"
                            id="filter_account_type" 
                            :options="[
                                { value: '', option: ''},
                                { value: 1, option: '個人戶口'},
                                { value: 2, option: '聯名戶口'},
                                { value: 3, option: '公司內部戶口'},
                                { value: 4, option: '合作伙伴'},
                            ]"
                            v-model="filters.account_type"
                            v-if="permissions['1_1_2_2_5']"
                        />

                        <FilterInputField
                            label="層級"
                            id="filter_level"
                            name="filter_level"
                            v-model="filters.level"
                            v-if="permissions['1_1_2_2_6']"
                        />

                        <FilterInputField
                            label="介紹人"
                            id="filter_referrer_name"
                            name="filter_referrer_name"
                            v-model="filters.referrer_name"
                            v-if="permissions['1_1_2_2_7']"
                        />

                        <FilterLocationField
                            label="開戶廳"
                            id="filter_location_id"
                            name="filter_location_id"
                            v-model="filters.location_id"
                            @emitOpenLocationForm="getOpenLocationForm('開戶廳', 'location_id')"
                            v-if="permissions['1_1_2_1_1']"
                        />

                        <!-- 如有第二個選擇廳 -->
                        <!-- <FilterLocationField
                            label="開戶廳2"
                            id="filter_location_id2"
                            name="filter_location_id2"
                            v-model="filters.location_id2"
                            @emitOpenLocationForm="getOpenLocationForm('開戶廳2', 'location_id2')"
                        /> -->

                        <FilterDateFiled
                            label="生日日期"
                            id="filter_solar_birthday"
                            name="filter_solar_birthday"
                            v-model="filters.solar_birthday"
                            v-if="permissions['1_1_2_2_8']"
                        />

                        <FilterDateFiled
                            label="舊曆生日日期"
                            id="filter_lunar_birthday"
                            name="filter_lunar_birthday"
                            v-model="filters.lunar_birthday"
                            v-if="permissions['1_1_2_2_9']"
                        />

                        <FilterSelectField
                            label="戶口狀態"
                            name="filter_status"
                            id="filter_status" 
                            :options="[
                                { value: '', option: ''},
                                { value: 0, option: '正常'},
                                { value: 1, option: '凍結'},
                                { value: 2, option: '停用'},
                                { value: 3, option: '註銷'},
                            ]"
                            v-model="filters.status"
                            v-if="permissions['1_1_2_2_10']"
                        />

                        <FilterDateFiled
                            label="開戶日期"
                            id="filter_created_at"
                            name="filter_created_at"
                            v-model="filters.created_at"
                            v-if="permissions['1_1_2_2_11']"
                        />

                        <FilterDateFiled
                            label="開戶開始日期"
                            id="filter_created_at_start"
                            name="filter_created_at_start"
                            v-model="filters.created_at_start"
                            v-if="permissions['1_1_2_2_12']"
                        />

                        <FilterDateFiled
                            label="開戶結束日期"
                            id="filter_created_at_end"
                            name="filter_created_at_end"
                            v-model="filters.created_at_end"
                            v-if="permissions['1_1_2_2_13']"
                        />

                        <FilterSelectField
                            label="會員等級"
                            name="filter_account_grade_id"
                            id="filter_account_grade_id" 
                            :options="[
                                { value: '', option: ''},
                                { value: 1, option: '公爵'},
                                { value: 2, option: '侯爵'},
                                { value: 3, option: '伯爵'},
                                { value: 4, option: '子爵'},
                                { value: 5, option: '男爵'},
                            ]"
                            v-model="filters.account_grade_id"
                            v-if="permissions['1_1_2_2_14']"
                        />

                        <FilterSelectField
                            label="開戶類型"
                            name="filter_source_type"
                            id="filter_source_type" 
                            :options="[
                                { value: '', option: ''},
                                { value: 1, option: '網上開戶'},
                                { value: 2, option: '現場開戶'},
                            ]"
                            v-model="filters.source_type"
                            v-if="permissions['1_1_2_2_15']"
                        />

                        <FilterSelectField
                            label="凍結分類"
                            name="filter_freeze_type"
                            id="filter_freeze_type" 
                            :options="[
                                { value: '', option: ''},
                                { value: 1, option: '公司'},
                                { value: 2, option: '司法'},
                                { value: 3, option: '法院'},
                                { value: 4, option: '保安'},
                                { value: 5, option: '其他'},
                            ]"
                            v-model="filters.freeze_type"
                            v-if="permissions['1_1_2_2_16']"
                        />
                    </div>

                    <div class="vc-panel-body-search-row row g-0">
                        <div class="col text-end">
                            <button class="btn btn-p btn-mr4" type="button" @click="search()" v-if="permissions['1_1_2_1_3']">
                                搜尋
                            </button>
                            <button class="btn btn-p" type="reset" @click="reset()" v-if="permissions['1_1_2_1_4']">
                                重置
                            </button>
                        </div>
                    </div>
                </form>

                <div id="list-panel" class="vc-panel-body-list" v-if="permissions['1_1_3']">
                    <div class="subTitle justify-content-between">
                        檢視搜尋結果
                        <div class="text-end">
                            <button class="btn btn-new5 btn-mr4" @click="select_display_fields"  v-if="permissions['1_1_3_1_1']">
                                篩選顯示
                            </button>

                            <button class="btn btn-new2 btn-mr4" v-if="permissions['1_1_3_1_2']">
                                列印
                            </button>

                            <button class="btn btn-new3 btn-mr4" v-if="permissions['1_1_3_1_3']">
                                匯出EXCEL
                            </button>
                        </div>
                    </div>

                    <div class="vc-panel-body-list-table">
                        <div class="table-container watermark-container">
                            <WaterMark />
                            <div class="table-responsive nopadding thead" ref="thead">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr class="table-title-bar">
                                            <th class="text-center" :style="operation_col_width()" v-if="permissions['1_1_3_2_1']">
                                                操作
                                            </th>
                                            <th 
                                                v-for="field in filter_fields" 
                                                :key="field.key" 
                                                class="text-center"
                                                :class="`field-scale-${field.scale}`">
                                                {{ field.label }}
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="table-responsive nopadding tbody" ref="tbody" @scroll="sync_thead_scroll()">
                                <table class="table table-bordered table-hover">
                                    <tbody>
                                        <tr 
                                            v-for="(record, index) in list"
                                            :key="index"
                                            :class="{selectedTr: selected_index.includes(index), tr_red: record.status_id !== 0}" 
                                            @click="handle_acitve_tr(index)">
                                            <td class="text-center" :style="operation_col_width()" v-if="permissions['1_1_3_2_1']">
                                                <button class="btn btn-p btn-mr4" @click="detail_account(record)" v-if="permissions['1_1_3_1_4']">詳細</button>
                                                <button class="btn btn-w btn-mr4" @click="edit_account(record)" v-if="permissions['1_1_3_1_5']">修改</button>
                                                <button class="btn btn-d btn-mr4" @click="delete_account(record)" v-if="permissions['1_1_3_1_6']">刪除</button>

                                                <button class="btn btn-p btn-mr4" @click="open_account(record, false)" v-if="permissions['1_1_3_1_7'] && record.confirm_open === 1">開戶表</button>
                                                <button class="btn btn-p btn-mr4" @click="open_account(record, true)" v-if="permissions['1_1_3_1_7'] && record.confirm_open === 0">確定開戶表</button>
                                                <button class="btn btn-p btn-mr4" @click="edit_address(record)" v-if="permissions['1_1_3_1_8']">修改地址</button>
                                                <button class="btn btn-p btn-mr4" @click="set_risk(record)" v-if="permissions['1_1_3_1_9']">設定風險</button>
                                                <button class="btn btn-p btn-mr4" @click="edit_account_status(record)" v-if="permissions['1_1_3_1_10']">更改戶口狀態</button>
                                                <!-- <button class="btn btn-p btn-mr4">設定公司戶口組別</button> -->
                                            </td>
                                            <td
                                                v-for="field in filter_fields"
                                                :key="field.key"
                                                class="text-left"
                                                :class="`field-scale-${field.scale}`">
                                                {{ record[field.key] }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination v-if="permissions['1_1'] && permissions['1_1_2_1_3']" ref="page" @searchService="pageSearch" />
        </div>
        <PageRemark :html="footer_total" />
        <DisplayColumn
            @hidden_fields="getHiddenFields"
            :fields="fields"
            ref="displayColumn"
        />
        <AccountGroupForm ref="account_group_form" />
        <LocationForm 
            ref="location_form" 
            :location_list="location_list" 
        />
        <EditForm ref="edit_form" />
        <OpenAccountForm ref="open_account_form" />
        <EditAddressForm ref="edit_address_form" />
        <SetRiskForm ref="set_risk_form" />
        <EditAccountStatusForm ref="edit_account_status_form" />
    </div>
</template>

<script>
import FilterInputField from "@/components/tc_components/filter_input_field.vue";
import FilterAccountGroupField from "@/components/tc_components/filter_account_group_field.vue";
import FilterSelectField from "@/components/tc_components/filter_select_field.vue";
import FilterLocationField from "@/components/tc_components/filter_location_field.vue";
import FilterDateFiled from "@/components/tc_components/filter_date_field.vue";
import WaterMark from "@/components/tc_components/watermark.vue";
import Pagination from "@/components/tc_components/pagination.vue";
import PageRemark from "@/components/tc_components/page_remark.vue";
import AccountGroupForm from "@/components/common/AccountGroupForm.vue";
import LocationForm from "@/components/common/LocationForm.vue";
import getFields from "./column";
import EditForm from "./edit_form.vue";
import OpenAccountForm from "./open_account_form.vue";
import EditAddressForm from "./edit_address_form.vue";
import SetRiskForm from "./set_risk_form.vue";
import EditAccountStatusForm from "./edit_account_status_form.vue";

const API = {
    getLocationList: `${process.env.VUE_APP_DEV_LARAVEL}/api/common/location/list`,
    getAccountList: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/list`,
    deleteAccount: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/delete`,
};

export default {
    name: "accmanage",
    components: {
        FilterInputField,
        FilterAccountGroupField,
        FilterSelectField,
        FilterLocationField,
        FilterDateFiled,
        WaterMark,
        Pagination,
        PageRemark,
        AccountGroupForm,
        LocationForm,
        EditForm,
        OpenAccountForm,
        EditAddressForm,
        SetRiskForm,
        EditAccountStatusForm
    },
    data: function () {
        return {
            location_list: [],
            fields: [],
            list: [],
            filters: { 
                account_no: "",
                account_group: "",
                name_full: "",
                serial_no: "",
                telephone: "",
                account_type: "",
                level: "",
                referrer_name: "",
                location_id: [],
                solar_birthday: "",
                lunar_birthday: "",
                status: "",
                created_at: "",
                created_at_start: "",
                created_at_end: "",
                account_grade_id: "",
                source_type: "",
                freeze_type: "",
                page: 1, 
                limit: 20 
            },
            hidden_fields: [],
            operation_width: "600px",
            selected_index: [],
            footer_total: "",
            permissions: {},
        };
    },
    computed: {
        filter_fields () {
            let fields = this.fields;
            let selectFields = [];
            fields.forEach((params) => {
                if (!this.hidden_fields.includes(params.key)) {
                    selectFields = [...selectFields, params];
                }
            });
            return selectFields;
        }
    },
    created () {
        this.get_columns();
        this.set_permission();
        this.get_location_list();
    },
    methods: {
        operation_col_width () {
            return {
                "width": this.operation_width,
                "min-width": this.operation_width,
                "max-width": this.operation_width,
            }
        },
        pageSearch (data) {
            this.filters = { ...this.filters, ...data };
            this.search();
        },
        get_columns () {
            this.fields = getFields();
        },
        async get_location_list () {
            try {
                let response = await this.axios.get(API.getLocationList).then((res) => res);

                if (response.status == 200) {
                    this.location_list = response.data.data;
                } else {
                    await SysUI.alert("戶口管理", "取得廳列表錯誤, 請重新整理");
                    return;
                }
            } catch (error) {
                await SysUI.alert("戶口管理", "取得廳列表錯誤, 請重新整理");
                return;
            }
        },
        async getOpenAccountGroupForm (title, account_group_type) {
            let result = await this.$refs.account_group_form.edit_record(title);

            if (result) {
                this.filters[account_group_type] = result.account_no;
            }
        },
        async getOpenLocationForm (title, location_type) {
            let result = await this.$refs.location_form.edit_record(title, this.filters[location_type]);

            if (result) {
                this.filters[location_type] = result;
            }
        },
        async search () {
            try {
                let response = await this.axios.get(API.getAccountList, { 
                    params: { ...this.filters }
                }).then((res) => res);

                if (response.status === 200) {
                    this.list = response.data.data.data;
                    this.$refs.page.setDataFromAPI(response.data.data.pagination);
                    this.selected_index = [];
                } else {
                    console.log(response);
                    this.list = [];
                    this.selected_index = [];
                }
            } catch (error) {
                console.log(error);
            }
        },
        reset () {
            let {limit, page} = JSON.parse(JSON.stringify(this.filters));
            Object.assign(this.$data.filters, this.$options.data().filters);
            this.filters.limit = limit;
            this.filters.page = page;
        },
        async create_account () {
            // if (!(await SysUI.input_pin(true))) {
            //     SysUI.all_button_disabled(0);
            //     return;
            // }

            this.$refs.edit_form.permissions = this.permissions;

            let result = await this.$refs.edit_form.create_record();

            if (result) {
                this.search();
            }
        },
        async detail_account (record) {
            // if (!(await SysUI.input_pin(true))) {
            //     return;
            // }

            this.$refs.edit_form.permissions = this.permissions;

            this.$refs.edit_form.detail_record(record.id);
        },
        async edit_account (record) {
            this.$refs.edit_form.permissions = this.permissions;

            let result = await this.$refs.edit_form.edit_record(record.id);

            if (result) {
                this.search();
            }
        },
        async delete_account (record) {
            SysUI.all_button_disabled(1);

            if (!await SysUI.confirm("戶口管理", "確定刪除該戶主？")) {
                SysUI.all_button_disabled(0);
                return;
            }

            // if (!(await SysUI.input_pin(true))) {
            //     SysUI.all_button_disabled(0);
            //     return;
            // }

            try {
                let response = await this.axios.delete(API.deleteAccount, { data: {
                    account_id: record.id
                }}).then((res) => res);

                SysUI.all_button_disabled(0);

                if (response.status === 200) {
                    this.search();
                } else {
                    await SysUI.alert(this.UI.title, response.data.message);
                    return;
                }
            } catch (error) {
                SysUI.all_button_disabled(0);

                console.log("error", error.response);
                await SysUI.alert(this.UI.title, error.response.data.message);
                return;
            }
        },
        async open_account (record, is_create) {
            let result = await this.$refs.open_account_form.edit_record(record.account_no, record.id, is_create);

            if (result) {
                this.search();
            }
        },
        async edit_address (record) {
            let result = await this.$refs.edit_address_form.edit_record(record);

            if (result) {
                this.search();
            }
        },
        async set_risk (record) {
            let result = await this.$refs.set_risk_form.edit_record(record);

            if (result) {
                this.search();
            }
        },
        async edit_account_status (record) {
            let result = await this.$refs.edit_account_status_form.edit_record(record);

            if (result) {
                this.search();
            }
        },
        sync_thead_scroll () {
            $(this.$refs.thead).scrollLeft($(this.$refs.tbody).scrollLeft());
        },
        getHiddenFields(hidden_fields) {
            this.hidden_fields = hidden_fields;
        },
        select_display_fields () {
            this.$refs.displayColumn.show();
        },
        handle_acitve_tr (index){
            if (this.selected_index.indexOf(index) == -1) {
                this.selected_index.push(index);
            } else {
                this.selected_index.splice(this.selected_index.indexOf(index), 1)
            }
        },
        async set_permission () {
            this.permissions = getModulePermissions();

            let permission_list_area_map = {
                account_type_name: "1_1_3_2_2",
                source_type_name: "1_1_3_2_3",
                account_grade_name: "1_1_3_2_4",
                account_no: "1_1_3_2_5",
                name: "1_1_3_2_6",
                solar_birthday: "1_1_3_2_7",
                telephone: "1_1_3_2_8",
                level: "1_1_3_2_9",
                account_group_name: "1_1_3_2_10",
                origin_parent_account_no: "1_1_3_2_11",
                upper_line: "1_1_3_2_12",
                updated_by_staff_no: "1_1_3_2_13",
                location_name: "1_1_3_2_14",
                created_at: "1_1_3_2_15",
                status_name: "1_1_3_2_16",
                freeze_type_name: "1_1_3_2_17",
            };

            this.fields = this.fields.filter(it => {
                if (permission_list_area_map[it.key]) {
                    if (this.permissions[permission_list_area_map[it.key]])
                        return it;
                    else
                        this.hidden_fields.push(it.key);
                } else {
                    return it;
                }
            });
        }
    },
};
</script>
