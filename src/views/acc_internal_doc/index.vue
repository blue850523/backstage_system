<template>
    <div class="accmanage">
        <div class="vc-panel" id="main-panel">
            <div class="vc-panel-heading">
                <span class="vc-panel-title">內部文件</span>
                <div class="pull-right">
                    <button
                        id="AccManagement_AccManage_Btn_CreateAcc"
                        class="btn btn-new"
                        @click="addInternal"
                    >
                        新增內部文件
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
                        <!-- 戶口編號 -->
                        <FilterInputField
                            :label="$t('acc_loan_doc.account_no')"
                            name="filter_account_no"
                            id="id_account_no"
                            v-model="filters.account_no"
                            only_number
                        />
                        <!-- 戶組 -->
                        <!-- <FilterInputField
                            :label="$t('acc_loan_doc.test')"
                            name="filter_name"
                            id="id_name"
                            v-model="filters.name"
                        /> -->
                        <!-- 文件類型 -->
                        <FilterInputField
                            :label="$t('acc_loan_doc.doc_type')"
                            name="filter_doc_type"
                            id="id_doc_type"
                            v-model="filters.doc_type"
                        />
                        <!-- 簽署人(含擔保) -->
                        <FilterInputField
                            :label="
                                $t('acc_loan_doc.signatory_or_guarantor_name')
                            "
                            name="filter_signatory_or_guarantor_name"
                            id="id_signatory_or_guarantor_name"
                            v-model="filters.signatory_or_guarantor_name"
                        />
                        <!-- 文件描述關聯 -->
                        <FilterInputField
                            :label="$t('acc_loan_doc.remark')"
                            name="filter_remark"
                            id="id_remark"
                            v-model="filters.remark"
                        />
                        <!-- 追蹤狀態 -->
                        <FilterSelectField
                            :label="$t('acc_loan_doc.track_status')"
                            name="filter_track_status"
                            id="id_track_status"
                            :options="track_status_options"
                            v-model="filters.track_status"
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
                                                    @click="edit(record.id)"
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
            <!-- this.$refs.page.setDataFromAPI(params.data.pagination)送pagination資料 -->
            <EditForm ref="editForm" />
        </div>
    </div>
</template>
<script>
import FilterInputField from "@/components/tc_components/filter_input_field.vue";
import FilterDateFiled from "@/components/tc_components/filter_date_field.vue";
import FilterSelectField from "@/components/tc_components/filter_select_field.vue";
import FilterCustomization from "@/components/tc_components/filter_customization.vue";
import EditForm from "./_edit_form.vue";
import getFields from "./column";
import { mapState } from "vuex";
const API = {
    getInternalList: `/api/account-management/account-document/account-internal-document/list`,
};

export default {
    name: "assistant",
    components: {
        FilterInputField,
        FilterDateFiled,
        FilterSelectField,
        EditForm,
        FilterCustomization,
    },

    data: function () {
        return {
            selected_index: [],
            fields: [],
            list: [],
            filters: { name: "", page: 1, limit: 20 },
            hidden_fields: [],
            operation_width: "100px",
            permissions: [],
            track_status_options: [
                {
                    value: 0,
                    text: "",
                },
                {
                    value: 1,
                    text: "已簽",
                },
                {
                    value: 2,
                    text: "未簽",
                },
                {
                    value: 3,
                    text: "到期待更新",
                },
                {
                    value: 4,
                    text: "過期",
                },
                {
                    value: 5,
                    text: "無需跟進",
                },
            ],
        };
    },
    created() {
        this.getColumns();
        this.permissions = getModulePermissions();
        console.log(`this.permissions`, this.permissions);
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
        receiveMsg(event) {
            console.log(`handleMessageEvent`, event);
        },
        pageSearch(data) {
            this.filters = { ...this.filters, ...data };
            this.search();
        },
        getColumns() {
            this.fields = getFields();
        },
        getHiddenFields(hidden_fields) {
            this.hidden_fields = hidden_fields;
        },
        search: async function () {
            if (!(await SysUI.input_pin(true))) return;

            await SysUI.axios("GET", API.getInternalList, this.filters).then(
                (params) => {
                    this.list = params.data.data;
                    this.$refs.page.setDataFromAPI(params.data.pagination);
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
        addInternal: function () {
            this.$refs.editForm.create_record();
        },
        edit(record) {
            this.$refs.editForm.edit_record(record);
        },
    },
};
</script>
<style lang="scss">
.effective_day {
    input {
        padding: 0.8rem 1.3rem;
        border: 1px solid #22354d;
        height: 3.6rem;
        font-size: 1.3rem;
        line-height: 1.5;
        border-radius: 3px;
        color: #555;
        &:focus {
            outline: none;
            border: 1px solid #4099ffd8;
            box-shadow: 0.01px 0.01px 3px 0.01px #409aff;
        }
    }
    span {
        div {
            border: 0.1px solid black;
            width: 1.5em;
            max-width: 22px;
            height: 1px;
            background: #979797;
            top: 16px;
            margin-top: 1.5em;
        }
    }
}
</style>
