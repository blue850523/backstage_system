<template>
    <div class="accmanage">
        <div class="vc-panel" id="main-panel">
            <div class="vc-panel-heading">
                <span class="vc-panel-title">提醒管理</span>
                <div class="pull-right">
                    <button class="btn btn-new" @click="create_order_note()" v-if="permissions['1_4_1_1']">
                        新增提醒
                    </button>
                </div>
            </div>

            <div class="vc-panel-body">
                <form id="search-panel" class="vc-panel-body-search watermark-container" @keyup.enter="search()" v-if="permissions['1_4_2']">
                    <WaterMark />
                    <div class="subTitle justify-content-between">
                        選擇搜尋條件
                    </div>

                    <div class="vc-panel-body-search-row row row-cols-4 gx-0 gy-1">
                        <FilterOrderNameField
                            label="項目名稱"
                            id="filter_type_ids"
                            name="filter_type_ids"
                            v-model="filters.type_ids"
                            @emitOpenOrderNameForm="getOpenOrderNameForm('項目名稱', 'type_ids')"
                            v-if="permissions['1_4_2_1_1']"
                        />

                        <FilterInputField
                            label="戶口編號"
                            id="filter_account_no"
                            name="filter_account_no"
                            maxlength="10"
                            only_number
                            v-model="filters.account_no"
                        />

                        <FilterAccountGroupField
                            label="戶組"
                            id="filter_account_group"
                            name="filter_account_group"
                            v-model="filters.account_group"
                            @emitOpenAccountGroupForm="getOpenAccountGroupForm('戶組', 'account_group')"
                            v-if="permissions['1_4_2_1_2']"
                        />

                        <FilterSelectField
                            label="戶口狀態"
                            name="filter_status"
                            id="filter_status" 
                            :options="[
                                { value: '', option: ''},
                                { value: 0, option: '未完成'},
                                { value: 1, option: '已完成'},
                            ]"
                            v-model="filters.status"
                        />

                        <FilterDateFiled
                            label="開始時間"
                            id="filter_start_date"
                            name="filter_start_date"
                            v-model="filters.start_date"
                        />

                        <FilterDateFiled
                            label="完成時間"
                            id="filter_complete_date"
                            name="filter_complete_date"
                            v-model="filters.complete_date"
                        />

                        <FilterInputField
                            label="關鍵字"
                            id="filter_keyword"
                            name="filter_keyword"
                            v-model="filters.keyword"
                        />

                        <FilterDepartmentField
                            label="可查閱部門"
                            id="filter_permission_department_ids"
                            name="filter_permission_department_ids"
                            v-model="filters.permission_department_ids"
                            @emitOpenDepartmentForm="getOpenDepartmentForm('可查閱部門', 'permission_department_ids')"
                            v-if="permissions['1_4_2_1_3']"
                        />

                        <FilterLocationField
                            label="顯示廳"
                            id="filter_show_location_ids"
                            name="filter_show_location_ids"
                            v-model="filters.show_location_ids"
                            @emitOpenLocationForm="getOpenLocationForm('顯示廳', 'show_location_ids')"
                            v-if="permissions['1_4_2_1_4']"
                        />

                        <FilterInputField
                            label="經手人"
                            id="filter_staff_name"
                            name="filter_staff_name"
                            v-model="filters.staff_name"
                        />
                    </div>

                    <div class="vc-panel-body-search-row row g-0">
                        <div class="col text-end">
                            <button class="btn btn-p btn-mr4" type="button" @click="search()" v-if="permissions['1_4_2_1_5']">
                                搜尋
                            </button>
                            <button class="btn btn-p" type="reset" @click="reset()" v-if="permissions['1_4_2_1_6']">
                                重置
                            </button>
                        </div>
                    </div>
                </form>

                <div id="list-panel" class="vc-panel-body-list" v-if="permissions['1_4_3']">
                    <div class="subTitle justify-content-between">
                        檢視搜尋結果
                        <div class="text-end">
                            <button class="btn btn-new5 btn-mr4" @click="select_display_fields" v-if="permissions['1_4_3_1_1']">
                                篩選顯示
                            </button>

                            <button class="btn btn-new2 btn-mr4" v-if="permissions['1_4_3_1_2']">
                                列印
                            </button>

                            <button class="btn btn-new3 btn-mr4" v-if="permissions['1_4_3_1_3']">
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
                                            <th class="text-center" :style="operation_col_width()" v-if="permissions['1_4_3_2_1']">
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
                                        <tr>
                                            <td class="text-center" :style="operation_col_width()" v-if="permissions['1_4_3_2_1']">
                                                <button class="btn btn-p btn-mr4" @click="detail_order_note()" v-if="permissions['1_4_3_1_4']">詳細</button>
                                                <button class="btn btn-w btn-mr4" @click="edit_order_note()" v-if="permissions['1_4_3_1_5']">修改</button>
                                            </td>
                                            <td
                                                v-for="field in filter_fields"
                                                :key="field.key"
                                                class="text-left"
                                                :class="`field-scale-${field.scale}`">
                                                {{ field.label }}
                                            </td>
                                        </tr>
                                        <tr 
                                            v-for="(record, index) in list"
                                            :key="index"
                                            :class="{selectedTr: selected_index.includes(index)}" 
                                            @click="handle_acitve_tr(index)">
                                            <td class="text-center" :style="operation_col_width()" v-if="permissions['1_4_3_2_1']">
                                                <button class="btn btn-p btn-mr4" @click="detail_order_note(record)" v-if="permissions['1_4_3_1_4']">詳細</button>
                                                <button class="btn btn-w btn-mr4" @click="edit_order_note(record)" v-if="permissions['1_4_3_1_5']">修改</button>
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
            <Pagination v-if="permissions['1_4'] && permissions['1_4_2_1_5']" ref="page" @searchService="pageSearch" />
        </div>
        <PageRemark :html="footer_total" />
        <DisplayColumn
            @hidden_fields="getHiddenFields"
            :fields="fields"
            ref="displayColumn"
        />
        <OrderNameForm ref="order_name_form" />
        <AccountGroupForm ref="account_group_form" />
        <DepartmentForm
            ref="department_form" 
            :department_list="department_list" 
        />
        <LocationForm 
            ref="location_form" 
            :location_list="location_list" 
        />
        <EditForm ref="edit_form" />
    </div>
</template>

<script>
import FilterInputField from "@/components/tc_components/filter_input_field.vue";
import FilterSelectField from "@/components/tc_components/filter_select_field.vue";
import FilterAccountGroupField from "@/components/tc_components/filter_account_group_field.vue";
import FilterOrderNameField from "@/components/tc_components/filter_order_name_field.vue";
import FilterDepartmentField from "@/components/tc_components/filter_department_field.vue";
import FilterLocationField from "@/components/tc_components/filter_location_field.vue";
import FilterDateFiled from "@/components/tc_components/filter_date_field.vue";
import PageRemark from "@/components/tc_components/page_remark.vue";
import AccountGroupForm from "@/components/common/AccountGroupForm.vue";
import OrderNameForm from "@/components/common/OrderNameForm.vue";
import DepartmentForm from "@/components/common/DepartmentForm.vue";
import LocationForm from "@/components/common/LocationForm.vue";
import getFields from "./column";
import EditForm from "./edit_form.vue";

const API = {
    getDepartmentList: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/department/list`,
    getLocationList: `${process.env.VUE_APP_DEV_LARAVEL}/api/common/location/list`,
};

export default {
    name: "order_note",
    components: {
        FilterInputField,
        FilterSelectField,
        FilterAccountGroupField,
        FilterOrderNameField,
        FilterDepartmentField,
        FilterLocationField,
        FilterDateFiled,
        PageRemark,
        AccountGroupForm,
        OrderNameForm,
        DepartmentForm,
        LocationForm,
        EditForm,
    },
    data: function () {
        return {
            department_list: [],
            location_list: [],
            fields: [],
            list: [],
            filters: {
                type_ids: [],
                account_no: "",
                account_group: "",
                status: "",
                start_date: "",
                complete_date: "",
                keyword: "",
                permission_department_ids: [],
                show_location_ids: [],
                staff_name: "",
                page: 1, 
                limit: 20 
            },
            hidden_fields: [],
            operation_width: "100px",
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
        this.get_department_list();
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
        async get_location_list () {
            try {
                let response = await this.axios.get(API.getLocationList).then((res) => res);

                if (response.status == 200) {
                    this.location_list = response.data.data;
                } else {
                    await SysUI.alert("提醒管理", "取得廳列表錯誤, 請重新整理");
                    return;
                }
            } catch (error) {
                await SysUI.alert("提醒管理", "取得廳列表錯誤, 請重新整理");
                return;
            }
        },
        async getOpenOrderNameForm (title, order_name_type) {
            let result = await this.$refs.order_name_form.edit_record(title, this.filters[order_name_type]);

            if (result) {
                this.filters[order_name_type] = result;
            }
        },
        async getOpenAccountGroupForm (title, account_group_type) {
            let result = await this.$refs.account_group_form.edit_record(title);

            if (result) {
                this.filters[account_group_type] = result.account_no;
            }
        },
        async getOpenDepartmentForm (title, department_type) {
            let result = await this.$refs.department_form.edit_record(title, this.filters[department_type]);

            if (result) {
                this.filters[department_type] = result;
            }
        },
        async getOpenLocationForm (title, location_type) {
            let result = await this.$refs.location_form.edit_record(title, this.filters[location_type]);

            if (result) {
                this.filters[location_type] = result;
            }
        },
        async search () {
            console.log(this.filters);
        },
        reset () {
            let {limit, page} = JSON.parse(JSON.stringify(this.filters));
            Object.assign(this.$data.filters, this.$options.data().filters);
            this.filters.limit = limit;
            this.filters.page = page;
        },
        async create_order_note () {
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
        async detail_order_note (record) {
            // if (!(await SysUI.input_pin(true))) {
            //     return;
            // }

            this.$refs.edit_form.permissions = this.permissions;

            this.$refs.edit_form.detail_record();
        },
        async edit_order_note (record) {
            this.$refs.edit_form.permissions = this.permissions;

            let result = await this.$refs.edit_form.edit_record();

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
                account_no: "1_4_3_2_2",
                name: "1_4_3_2_3",
                type: "1_4_3_2_4",
                content: "1_4_3_2_5",
                start_time: "1_4_3_2_6",
                complete_time: "1_4_3_2_7",
                status: "1_4_3_2_8",
                permission_departments: "1_4_3_2_9",
                staff_position: "1_4_3_2_10",
                show_locations: "1_4_3_2_11",
                location: "1_4_3_2_12",
                updated_at: "1_4_3_2_13",
                staff_name: "1_4_3_2_14",
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
