<template>
    <TCModal class="set_risk_form" id="set_risk_form" :title="UI.title" ref="modal" :dialog_width="'400px'" :modal-body-style="{'min-height': 'fit-content', 'overflow': 'auto'}">
        <template #body>
            <div class="row g-0">
                <div class="form-group row justify-content-center">
                    <div class="col-4 nopadding">
                        <label class="control-label">風險分級</label>
                    </div>
                    <div class="col-7 nopadding">
                        <select class="form-select" v-model="risk_level">
                            <option value="2">高</option>
                            <option value="1">中</option>
                            <option value="0">低</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row justify-content-center">
                    <div class="col-4 nopadding">
                        <label class="control-label">風險類別</label>
                    </div>
                    <div class="col-7 nopadding">
                        <input class="form-control" v-model="risk_type">
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
    editAccountRisk: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/edit-risk`,
};

export default {
    name: "set_risk_form",
    components: {
        TCModal,
    },
    data: function () {
        return {
            UI: {
                title: "設定風險",
            },
            account_id: "",
            risk_level: "",
            risk_type: "",
        }
    },
    methods: {
        edit_record (record) {
            this.account_id = record.id;
            this.risk_level = record.risk_level;
            this.risk_type = record.risk_type;
            return this.show();
        },
        async save () {
            SysUI.all_button_disabled(1);

            // if (!(await SysUI.input_pin(true))) {
            //     SysUI.all_button_disabled(0);
            //     return;
            // }

            try {
                let response = await this.axios.put(API.editAccountRisk, {
                    account_id: this.account_id,
                    risk_level: this.risk_level,
                    risk_type: this.risk_type,
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
.set_risk_form {
    .row {
        .form-group {
            margin: 1rem 0;
            .control-label {
                padding-left: 1.5rem;
            }
        }
    }
}
</style>