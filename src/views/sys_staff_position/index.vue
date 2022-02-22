<template>
    <div class="accmanage">
        <div class="vc-panel" id="main-panel">
            <div class="vc-panel-heading">
                <span class="vc-panel-title">職位管理</span>
                <div class="pull-right">
                    <button
                        id="AccManagement_AccManage_Btn_CreateAcc"
                        class="btn btn-new"
                        @click="createDepartment"
                    >
                        新增職位
                    </button>
                </div>
            </div>

            <div class="vc-panel-body">
                <form
                    id="search-panel"
                    class="vc-panel-body-search watermark-container"
                >
                    <WaterMark />

                    <div
                        class="subTitle"
                        style="justify-content: space-between"
                    >
                        選擇搜尋條件
                    </div>

                    <div
                        class="vc-panel-body-search-row row row-cols-4 gx-0 gy-1"
                    >
                        <FilterSelectField
                            label="部門"
                            name="filter_department"
                            id="id_department"
                            :options="Department"
                            v-model="filters.user_department_id"
                        />
                        <FilterInputField
                            label="職位名稱"
                            name="filter_name"
                            id="id_name"
                            v-model="filters.name"
                        />
                        <FilterInputField
                            label="職位編號"
                            name="filter_position_no"
                            id="id_position_no"
                            v-model="filters.position_no"
                        />
                    </div>

                    <div class="vc-panel-body-search-row row g-0">
                        <div class="col text-end">
                            <button
                                class="btn btn-primary"
                                type="button"
                                @click="search()"
                                style="margin-right: 4px"
                            >
                                搜尋
                            </button>
                            <button class="btn btn-primary" type="reset">
                                重置
                            </button>
                        </div>
                    </div>
                </form>

                <div id="list-panel" class="vc-panel-body-list">
                    <div
                        class="subTitle"
                        style="justify-content: space-between"
                    >
                        檢視搜尋結果
                        <div class="text-end">
                            <button
                                class="btn btn-new5"
                                style="margin-left: 4px"
                                @click="select_display_fields"
                            >
                                篩選顯示
                            </button>

                            <button
                                class="btn btn-new2"
                                style="margin-left: 4px"
                            >
                                列印
                            </button>

                            <button
                                class="btn btn-new3"
                                style="margin-left: 4px"
                            >
                                匯出EXCEL
                            </button>
                        </div>
                    </div>
                    <div class="vc-panel-body-list-table">
                        <div class="table-container watermark-container">
                            <WaterMark />
                            <div
                                class="table-responsive nopadding thead"
                                ref="thead"
                            >
                                <table class="table table-bordered">
                                    <thead>
                                        <tr class="table-title-bar">
                                            <th
                                                class="text-center field-scale-1"
                                            >
                                                操作
                                            </th>
                                            <th
                                                v-for="field in filter_fields"
                                                :key="field.key"
                                                class="text-center"
                                                :class="`field-scale-${field.scale}`"
                                            >
                                                {{ field.label }}
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div
                                class="table-responsive nopadding tbody"
                                ref="tbody"
                                @scroll="sync_thead_scroll()"
                            >
                                <table class="table table-bordered table-hover">
                                    <tbody>
                                        <tr
                                            v-for="(record, index) in list"
                                            :key="index"
                                            :class="{
                                                selectedTr: selected_index.includes(
                                                    index
                                                ),
                                            }"
                                            @click="handle_acitve_tr(index)"
                                        >
                                            <td
                                                class="text-center field-scale-1"
                                            >
                                                <button
                                                    type="button"
                                                    class="btn btn-w btn-mr4"
                                                    @click="
                                                        editDepartment(
                                                            record.user_position_id
                                                        )
                                                    "
                                                >
                                                    修改
                                                </button>
                                            </td>
                                            <td
                                                v-for="field in filter_fields"
                                                :key="field.key"
                                                class="text-left"
                                                :class="`field-scale-${field.scale}`"
                                            >
                                                <span
                                                    :class="{
                                                        'text-danger':
                                                            record[field.key] ==
                                                            '有效',
                                                    }"
                                                >
                                                    {{ record[field.key] }}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- //searchService抓取page&limit 並搜尋 -->
            <Pagination ref="page" @searchService="pageSearch" />
        </div>
        <div>
            <!--hidden_fields接值，fields傳入column值 -->
            <DisplayColumn
                @hidden_fields="getHiddenFields"
                :fields="fields"
                ref="displayColumn"
            />
            <EditForm ref="editForm" />
        </div>
    </div>
</template>
<script>
import FilterInputField from "@/components/tc_components/filter_input_field.vue";
import FilterDateFiled from "@/components/tc_components/filter_date_field.vue";
import FilterSelectField from "@/components/tc_components/filter_select_field.vue";
import EditForm from "./_edit_form.vue";
import getFields from "./column";

const API = {
    getDepartmentList: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/department/list`,
    getPositionList: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/position/list`,
};

export default {
    name: "assistant",
    components: {
        FilterInputField,
        FilterDateFiled,
        FilterSelectField,
        EditForm,
    },

    data: function () {
        return {
            selected_index: [],
            fields: [],
            list: [],
            filters: {
                name: "",
                position_no: "",
                user_department_id: "",
                page: 1,
                limit: 20,
            },
            Position: [],
            hidden_fields: [],
            operation_width: "100px",
            Department: [],
            permissions: [],
        };
    },
    created() {
        this.getColumns();
        this.getDepartment();
        this.permissions = getModulePermissions();
        console.log(`this.permissions`, this.permissions)
    },
    computed: {
        get_operation_col_style() {
            return {
                width: this.operation_width,
            };
        },
        filter_fields() {
            let fields = this.fields;
            let selectFields = [];
            fields.forEach((params) => {
                if (!this.hidden_fields.includes(params.key)) {
                    selectFields = [...selectFields, params];
                }
            });
            return selectFields;
        },
    },
    methods: {
        pageSearch(data) {
            this.filters = { ...this.filters, ...data };
            this.search();
        },
        getColumns() {
            this.fields = getFields();
        },
        async getDepartment() {
            await SysUI.axios("GET", API.getDepartmentList, this.filters).then(
                async (params) => {
                    let Departments = await params.data.data;
                    Departments.forEach((department) => {
                        department.value = department.department_id;
                    });
                    this.Department = [{ value: "", name: "" }, ...Departments];
                    this.$refs.editForm.getDepartmentOption(Departments);
                }
            );
        },
        getHiddenFields(hidden_fields) {
            this.hidden_fields = hidden_fields;
        },
        search: async function () {
            if (!(await SysUI.input_pin(true))) return;

            await SysUI.axios("GET", API.getPositionList, this.filters).then(
                async (params) => {
                    this.$refs.page.setDataFromAPI(params.data.pagination);
                    this.list = await params.data.data;
                    this.selected_index = [];
                }
            );
        },
        sync_thead_scroll() {
            $(this.$refs.thead).scrollLeft($(this.$refs.tbody).scrollLeft());
        },
        select_display_fields: function () {
            this.$refs.displayColumn.show();
        },
        handle_acitve_tr(index) {
            if (this.selected_index.indexOf(index) == -1) {
                this.selected_index.push(index);
            } else {
                this.selected_index.splice(
                    this.selected_index.indexOf(index),
                    1
                );
            }
        },
        createDepartment: function () {
            this.$refs.editForm.create_record();
        },
        editDepartment: function (id) {
            this.$refs.editForm.edit_record(id);
        },
    },
};
</script>
<style lang="scss"></style>
