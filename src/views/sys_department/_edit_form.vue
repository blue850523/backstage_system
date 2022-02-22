<template>
    <div>
        <TCModal
            id="edit_form"
            :title="UI.title"
            ref="modal"
            body_min_height="fit-content"
            dialog_width="600px"
        >
            <template #body>
                <div class="align-items-center row">
                    <TCFormGroup
                        class="col-2"
                        label="部門"
                        required
                    ></TCFormGroup>
                    <TCFormGroup class="col-10" required>
                        <input v-model="records.name" class="form-control" />
                    </TCFormGroup>

                    <!-- <TCFormGroup
                        class="grid-col-md-3"
                        v-if="!is_create && user_group_id == '31'"
                    >ss
                        <label class="text-danger">
                            *此部門已綁定系統通知，請勿任意修改姓名，以免造成混淆。</label
                        >
                    </TCFormGroup> -->
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
import TCFormGroup from "@/components/tc_components/tc-form-group.vue";

const API = {
    addDepartment: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/department/create`,
    updateDepartment: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/department/update`,
};
export default {
    name: "edit_form",
    components: {
        TCModal,
        TCFormGroup,
    },
    mounted() {
        // this.$refs.modal.show();
    },
    data() {
        return {
            UI: {
                title: null,
                title_create: "新增部門",
                title_update: "修改部門",
            },
            is_create: false,
            department: "",
            user_group_id: "",
            records: {
                name: null,
                department_id: null,
            },
        };
    },
    methods: {
        hide: function () {
            this.record_init()
            return this.$refs.modal.hide();
        },
        submit: async function () {
            if (this.records.name == "") {
                this.$message({
                    top: 1000,
                    showClose: true,
                    duration: 5000,
                    message: "保存失敗，欄位不得為空",
                    type: "error",
                });
                return;
            }

            this.save();
        },
        save: async function () {
            if (!(await SysUI.input_pin(true))) return;

            let url = this.is_create ? API.addDepartment : API.updateDepartment;
            let method = this.is_create ? "POST" : "PUT";

            await SysUI.axios(method, url, this.records).then(
                async (response) => {
                    if (response.httpStatus==200) {
                        await this.hide();
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
        record_init: function () {
            this.records = {
                name: null,
                department_id: null,
            };
        },
        edit_record: async function (records) {
            let copyRecord = JSON.parse(JSON.stringify(records));
            this.records = null;
            this.is_create = false;
            this.UI.title = this.UI.title_update;
            this.records = copyRecord;
            return this.show();
        },
        create_record: async function (record) {
            this.record = null;
            this.is_create = true;
            this.UI.title = this.UI.title_create;
            this.user_group_id = "";
            return this.show();
        },
        show: function () {
            return this.$refs.modal.show();
        },
    },
};
</script>
<style lang="scss"></style>
