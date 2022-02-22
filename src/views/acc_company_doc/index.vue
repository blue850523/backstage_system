<template>
    <div class="accmanage">
        <div class="vc-panel" id="main-panel">
            <div class="vc-panel-heading">
                <span class="vc-panel-title">資產資料(公司)</span>
                <div class="pull-right">
                    <button class="btn btn-new" @click="create_company()">
                        新增公司
                    </button>
                </div>
            </div>

            <div class="vc-panel-body">
                <form id="search-panel" class="vc-panel-body-search watermark-container" @keyup.enter="search()">
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
                        />

                        <FilterAccountGroupField
                            label="戶組"
                            id="filter_account_group"
                            name="filter_account_group"
                            v-model="filters.account_group"
                            @emitOpenAccountGroupForm="getOpenAccountGroupForm('戶組', 'account_group')"
                        />

                        <FilterInputField
                            label="資產地區"
                            id="filter_company_area"
                            name="filter_company_area"
                            v-model="filters.company_area"
                        />

                        <FilterInputField
                            label="資產類型"
                            id="filter_estate_area"
                            name="filter_estate_area"
                            v-model="filters.estate_area"
                        />

                        <FilterInputField
                            label="業權人"
                            id="filter_stakeholder"
                            name="filter_stakeholder"
                            v-model="filters.stakeholder"
                        />

                        <FilterInputField
                            label="地址關鍵字"
                            id="filter_company_name"
                            name="filter_company_name"
                            v-model="filters.company_name"
                        />
                    </div>

                    <div class="vc-panel-body-search-row row g-0">
                        <div class="col text-end">
                            <button class="btn btn-p btn-mr4" type="button" @click="search()">
                                搜尋
                            </button>
                            <button class="btn btn-p" type="reset" @click="reset()">
                                重置
                            </button>
                        </div>
                    </div>
                </form>

                <div id="list-panel" class="vc-panel-body-list">
                    <div class="subTitle justify-content-between">
                        檢視搜尋結果
                        <div class="text-end">
                            <button class="btn btn-new5 btn-mr4" @click="select_display_fields">
                                篩選顯示
                            </button>

                            <button class="btn btn-new2 btn-mr4">
                                列印
                            </button>

                            <button class="btn btn-new3 btn-mr4">
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
                                            <th class="text-center" :style="operation_col_width()">
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
                                            <td class="text-center" :style="operation_col_width()">
                                                <button class="btn btn-p btn-mr4" @click="detail_company()">附件</button>
                                                <button class="btn btn-w btn-mr4" @click="edit_company()">修改</button>
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
                                            <td class="text-center" :style="operation_col_width()">
                                                <button class="btn btn-p btn-mr4" @click="detail_company(record)">附件</button>
                                                <button class="btn btn-w btn-mr4" @click="edit_company(record)">修改</button>
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
            <Pagination ref="page" @searchService="pageSearch" />
        </div>
        <PageRemark :html="footer_total" />
        <DisplayColumn
            @hidden_fields="getHiddenFields"
            :fields="fields"
            ref="displayColumn"
        />
        <AccountGroupForm ref="account_group_form" />
        <EditForm ref="edit_form" />
    </div>
</template>

<script>
import FilterInputField from "@/components/tc_components/filter_input_field.vue";
import FilterSelectField from "@/components/tc_components/filter_select_field.vue";
import FilterAccountGroupField from "@/components/tc_components/filter_account_group_field.vue";
import PageRemark from "@/components/tc_components/page_remark.vue";
import AccountGroupForm from "@/components/common/AccountGroupForm.vue";
import getFields from "./column";
import EditForm from "./edit_form.vue";

const API = {

};

export default {
    name: "acc_company_doc",
    components: {
        FilterInputField,
        FilterSelectField,
        FilterAccountGroupField,
        PageRemark,
        AccountGroupForm,
        EditForm
    },
    data: function () {
        return {
            fields: [],
            list: [],
            filters: {
                account_no: "",
                account_group: "",
                company_area: "",
                company_type: "",
                stakeholder: "",
                company_name: "",
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
        async getOpenAccountGroupForm (title, account_group_type) {
            let result = await this.$refs.account_group_form.edit_record(title);

            if (result) {
                this.filters[account_group_type] = result.account_no;
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
        async create_company () {
            let result = await this.$refs.edit_form.create_record();

            if (result) {
                this.search();
            }
        },
        async detail_company (record) {
            this.$refs.edit_form.detail_record();
        },
        async edit_company (record) {
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
                upper_line: "1_3_4_3_2_2",
                account_no: "1_3_4_3_2_3",
                account_name: "1_3_4_3_2_4",
                company_area: "1_3_4_3_2_5",
                company_type: "1_3_4_3_2_6",
                company_name: "1_3_4_3_2_7",
                stakeholder: "1_3_4_3_2_8",
                stake: "1_3_4_3_2_9",
                register_address: "1_3_4_3_2_10",
                market_value: "1_3_4_3_2_11",
                register_no: "1_3_4_3_2_12",
                establishment_date: "1_3_4_3_2_13",
                register_capital: "1_3_4_3_2_14",
                mortgage: "1_3_4_3_2_15",
                ownership_confirm_date: "1_3_4_3_2_16",
                remark: "1_3_4_3_2_17",
                staff_name: "1_3_4_3_2_18",
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
    }
}
</script>