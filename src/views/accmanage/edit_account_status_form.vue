<template>
    <TCModal class="edit_account_status_form" id="edit_account_status_form" :title="UI.title" ref="modal" :dialog_width="'500px'" :modal-body-style="{'min-height': 'fit-content', 'overflow': 'auto'}">
        <template #body>
            <div class="row gx-0 gy-1">
                <div class="form-group row justify-content-center">
                    <div class="col-3 nopadding">
                        <label class="control-label">戶口狀態</label>
                    </div>
                    <div class="col-8 nopadding">
                        <select class="form-select" v-model="status" @change="reason = ''">
                            <option :value="0">正常</option>
                            <option :value="1">凍結</option>
                            <option :value="2">停用</option>
                            <option :value="3">註銷</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row justify-content-center" v-show="status === 1">
                    <div class="col-3 nopadding">
                        <label class="control-label">禁止操作</label>
                    </div>
                    <div class="col-8 disabled-area row">
                        <div class="col-12">
                            <label class="control-label disabled-item">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    @click="all_disabled_click($event)">
                                全選
                            </label>
                        </div>
                        <div class="col-6" v-for="(it, index) in disabled_list" :key="`operation_${index}`">
                            <label class="control-label disabled-item">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    :value="it.value"
                                    v-model="operation">
                                {{ it.label }}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group row justify-content-center required" :class="{'has-error': error.type}" v-show="status === 1">
                    <div class="col-3 nopadding">
                        <label class="control-label">凍結分類</label>
                    </div>
                    <div class="col-8 nopadding">
                        <select class="form-select" v-model="type">
                            <option :value="1">公司</option>
                            <option :value="2">司法</option>
                            <option :value="3">法院</option>
                            <option :value="4">保安</option>
                            <option :value="5">其他</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row justify-content-center required" :class="{'has-error': error.reason}">
                    <div class="col-3 nopadding">
                        <label class="control-label">{{ status === 1 ? "凍結原因" : "備註" }}</label>
                    </div>
                    <div class="col-8 nopadding">
                        <input class="form-control" :placeholder="status === 1 ? '凍結原因' : '備註'" v-model="reason">
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <button class="btn btn-new4" type="button" @click="save()">儲存</button>
            <button class="btn btn-new4" type="button" @click="hide()">離開</button>
        </template>
    </TCModal>
</template>

<script>
import TCModal from "@/components/tc_components/tc-modal.vue";

const API = {
    editAccountStatus: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/edit-status`,
};

export default {
    name: "edit_account_status_form",
    components: {
        TCModal,
    },
    data: function () {
        return {
            UI: {
                title: "更改戶口狀態",
            },
            account_id: "",
            status: null,
            operation: [],
            type: null,
            reason: "",
            error: {
                type: false,
                reason: false,
            },
            disabled_list: [
                {
                    value: "deposit",
                    label: "存款管理",
                },
                {
                    value: "credit",
                    label: "貸款管理",
                },
                {
                    value: "change",
                    label: "轉碼管理",
                },
                {
                    value: "spending",
                    label: "消費管理",
                },
                {
                    value: "fly",
                    label: "飛數管理",
                },
                {
                    value: "commission",
                    label: "佣金管理",
                },
            ]
        }
    },
    methods: {
        edit_record (record) {
            $(".edit_account_status_form input[type='checkbox']").prop("checked", false);
            this.account_id = record.id;
            this.status = record.status.status;
            this.operation = record.status.operation;
            this.type = record.status.type;
            this.reason = record.status.reason;
            return this.show();
        },
        all_disabled_click ($event) {
            let checked = $event.target.checked + 0;

            let all_operation = this.disabled_list.map(it => it.value);

            if (checked === 1) {
                this.operation = all_operation;
            } else {
                this.operation = [];
            }

            this.$forceUpdate();
        },
        async validates () {
            let has_error = false;

            if (this.status === 1 && !this.type) {
                this.error.type = true;
                has_error = true;
            } else {
                this.error.type = false;
            }

            if (this.reason === "") {
                this.error.reason = true;
                has_error = true;
            } else {
                this.error.reason = false;
            }

            return !has_error;
        },
        async save () {
            SysUI.all_button_disabled(1);

            // if (!(await SysUI.input_pin(true))) {
            //     SysUI.all_button_disabled(0);
            //     return;
            // }

            let is_valid = await this.validates();
            if (!is_valid) {
                SysUI.all_button_disabled(0);
                return;
            }

            try {
                let response = await this.axios.put(API.editAccountStatus, {
                    account_id: this.account_id,
                    status: this.status,
                    operation: this.operation,
                    type: this.type,
                    reason: this.reason,
                }).then((res) => res);

                SysUI.all_button_disabled(0);

                if (response.status == 200) {
                    this.hide(1);
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
        show () {
            return this.$refs.modal.show();
        },
        hide (need_refresh = 0) {
            this.reset();
            return this.$refs.modal.hide(need_refresh);
        },
        reset () {
            Object.assign(this.$data, this.$options.data());
        }
    }
}
</script>

<style lang="scss" scoped>
.edit_account_status_form {
    .row {
        .form-group {
            margin: 1rem 0;
            .control-label {
                padding-left: 1.5rem;
            }
        }
    }

    .disabled-area {
        padding: 1rem 0;
        border-radius: 3px;
        background-color: #F5F5F5;
        > div {
            text-align: left;
        }
        .disabled-item {
            width: auto !important;
        }
    }
}
</style>