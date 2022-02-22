<template>
    <div>
        <TCModal
            id="edit_form"
            :title="UI.title"
            ref="modal"
            body_min_height="fit-content"
            dialog_width="1200px"
        >
            <template #body>
                <div class="align-items-center row">
                    <div class="col-4 row">
                        <TCFormGroup
                            class="col-4"
                            label="職員編號"
                            required
                        ></TCFormGroup>
                        <TCFormGroup class="col-8" required>
                            <input
                                placeholder="職員編號"
                                v-model="records.staff_no"
                                class="form-control"
                                :disabled="!is_create"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row">
                        <TCFormGroup
                            class="col-4"
                            label="用戶名"
                            required
                        ></TCFormGroup>
                        <TCFormGroup class="col-8" required>
                            <input
                                placeholder="用戶名"
                                v-model="records.username"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row">
                        <TCFormGroup
                            class="col-4"
                            label="姓名"
                            required
                        ></TCFormGroup>
                        <TCFormGroup class="col-8" required>
                            <input
                                placeholder="姓名"
                                v-model="records.name"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup class="col-4" label="別名"></TCFormGroup>
                        <TCFormGroup class="col-8">
                            <!-- <el-input   v-model="records.nickname"  type="text"></el-input> -->
                            <input
                                placeholder="別名"
                                v-model="records.nickname"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup
                            class="col-4"
                            label="部門"
                            required
                        ></TCFormGroup>
                        <TCFormGroup class="col-8" required>
                            <TCDropdown
                                :options="department_options"
                                required
                                @change="getDepartmentChange"
                                v-model="records.user_department_id"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup
                            class="col-4"
                            label="職位名稱"
                            required
                        ></TCFormGroup>
                        <TCFormGroup class="col-8" required>
                            <TCDropdown
                                :options="position_options"
                                required
                                v-model="records.user_position_id"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup
                            class="col-4"
                            label="密碼"
                            required
                        ></TCFormGroup>
                        <TCFormGroup class="col-8" required>
                            <input
                                placeholder="密碼"
                                v-model="records.password"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup
                            class="col-4"
                            label="Pin碼"
                            required
                        ></TCFormGroup>
                        <TCFormGroup class="col-8" required>
                            <input
                                placeholder="Pin碼"
                                v-model="records.pin"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup class="col-4" label="國籍"></TCFormGroup>
                        <TCFormGroup class="col-8">
                            <input
                                placeholder="國籍"
                                v-model="records.nationality"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup
                            class="col-4"
                            label="出生日期"
                        ></TCFormGroup>
                        <TCFormGroup class="col-8">
                            <DatePicker
                                type="date"
                                v-model="records.birthday"
                                value-type="format"
                                placeholder="出生日期"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup class="col-4" label="性別"></TCFormGroup>
                        <TCFormGroup class="col-8">
                            <TCDropdown
                                v-model="records.gender"
                                :options="gender_options"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup
                            class="col-4"
                            label="證件號碼"
                        ></TCFormGroup>
                        <TCFormGroup class="col-8">
                            <input
                                placeholder="證件號碼"
                                v-model="records.id_no"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup class="col-4" label="學歷"></TCFormGroup>
                        <TCFormGroup class="col-8">
                            <input
                                placeholder="學歷"
                                v-model="records.education"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup
                            class="col-4"
                            label="入職日期"
                        ></TCFormGroup>
                        <TCFormGroup class="col-8">
                            <DatePicker
                                type="date"
                                v-model="records.entry_date"
                                value-type="format"
                                placeholder="入職日期"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup
                            class="col-4"
                            label="拍卡卡號"
                            required
                        ></TCFormGroup>
                        <TCFormGroup class="col-8" required>
                            <input
                                placeholder="拍卡卡號"
                                v-model="records.pi_card_no"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup
                            class="col-4"
                            label="連絡電話"
                        ></TCFormGroup>
                        <TCFormGroup class="col-8">
                            <input
                                placeholder="連絡電話"
                                v-model="records.phone"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>

                    <div class="col-4 row mt-3">
                        <TCFormGroup
                            class="col-4"
                            label="電子信箱"
                        ></TCFormGroup>
                        <TCFormGroup class="col-8">
                            <input
                                placeholder="電子信箱"
                                v-model="records.email"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup
                            class="col-4"
                            label="基本薪金"
                        ></TCFormGroup>
                        <TCFormGroup class="col-8">
                            <input
                                placeholder="基本薪金"
                                v-model="records.salary"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup
                            class="col-4"
                            label="聯絡地址"
                        ></TCFormGroup>
                        <TCFormGroup class="col-8">
                            <input
                                placeholder="聯絡地址"
                                v-model="records.address"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup class="col-4" label="備註"></TCFormGroup>
                        <TCFormGroup class="col-8">
                            <input
                                placeholder="備註"
                                v-model="records.note"
                                class="form-control"
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3"></div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup
                            class="col-4"
                            label="默認廳"
                            required
                        ></TCFormGroup>
                        <TCFormGroup class="col-8" required>
                            <TCDropdown
                                :options="default_location_options"
                                v-model="records.default_location_id"
                                required
                            />
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup class="col-4" required>
                            <el-checkbox
                                v-model="isClickAll"
                                @change="selectAllLoc"
                                >全選</el-checkbox
                            >
                        </TCFormGroup>
                    </div>
                    <div class="col-4 row mt-3"></div>
                    <div class="col-4 row mt-3">
                        <TCFormGroup label="權限廳" class="col-4" required>
                        </TCFormGroup>
                        <TCFormGroup class="col-8" required>
                            <div class="mt-3">
                                <el-checkbox-group v-model="checkedLoc">
                                    <el-checkbox
                                        v-for="loc in locs"
                                        :label="loc.value"
                                        :key="loc.value"
                                        :value="loc.value"
                                        >{{ loc.name }}</el-checkbox
                                    >
                                </el-checkbox-group>
                            </div>
                        </TCFormGroup>
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
import TCFormGroup from "@/components/tc_components/tc-form-group.vue";
import TCDropdown from "@/components/tc_components/tc_dropdown.vue";
import i18n from "@/common/plugins/vue-i18n";
// i18n.tc('GENERAL.DEPARTMENT')
const API = {
    getDepartmentList: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/department/list`,
    getPositionList: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/position/list`,
    createUser: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/user/create`,
    updateUser: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/user/update`,
    userDetail: `${process.env.VUE_APP_DEV_LARAVEL}/api/system-management/user/detail`,
};
export default {
    name: "edit_form",
    components: {
        TCModal,
        TCFormGroup,
        TCDropdown,
    },
    created() {
        this.getDepartment();
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
            isClickAll: false,
            records: {},
            // 部門資料
            department_options: [],
            position_options: [],
            gender_options: [
                { name: "男", value: 0 },
                { name: "女", value: 1 },
            ],
            default_location_options: [],
            locs: [
                { name: "貴賓廳1", value: 1 },
                { name: "貴賓廳2", value: 2 },
            ],
            checkedLoc: [],
            checkedCount: 0,
            user_id: "",
        };
    },
    watch: {
        checkedLoc(newVal) {
            let tempLoc = [];
            newVal.forEach((params, index) => {
                tempLoc[index] = {
                    name: i18n.tc(`sys_staff.loc_${params}`),
                    value: params,
                };
            });
            this.default_location_options = tempLoc;
            this.records.permission_location_ids = newVal;
        },
    },
    methods: {
        hide: function () {
            this.record_init();
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
        async getDepartmentChange(id) {
            await SysUI.axios("GET", API.getPositionList, {
                user_department_id: id,
                page: 1,
                limit: 100,
            }).then(async (response) => {
                if (response?.httpStatus == 200) {
                    let Position = await response.data.data;
                    Position.forEach((position) => {
                        position.value = position.user_position_id;
                    });
                    this.position_options = Position;
                    this.records.user_department_id = id;
                } else {
                    this.$message({
                        top: 1000,
                        showClose: true,
                        duration: 5000,
                        message: response.message,
                        type: "error",
                    });
                }
            });
        },
        selectAllLoc(condition) {
            if (condition) {
                this.checkedLoc = [1, 2];
            } else {
                this.checkedLoc = [];
            }
        },
        save: async function () {
            console.log(`this.records`, this.records);
            if (!(await SysUI.input_pin(true))) return;

            let url, method;

            if (this.is_create) {
                url = API.createUser;
                method = "POST";
            } else {
                url = API.updateUser;
                method = "PUT";
                this.records.user_id = this.user_id;
            }
            await SysUI.axios(method, url, this.records).then(
                async (response) => {
                    if (response?.httpStatus == 200) {
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
        async getDepartment() {
            await SysUI.axios("GET", API.getDepartmentList, {
                page: 1,
                limit: 100,
            }).then(async (params) => {
                let Departments = await params.data.data;
                Departments.forEach((department) => {
                    department.value = department.department_id;
                });

                this.department_options = Departments;
            });
        },
        refresh_record: async function (id) {
            this.user_id =this.is_create? "":id;
            await SysUI.axios("GET", API.userDetail, {
                user_id: id,
            }).then(async (response) => {
                if (response?.httpStatus == 200) {
                    this.records = response.data;
                    this.checkedLoc = response.data.permission_location_ids.map(
                        (loc) => parseInt(loc)
                    );
                    this.checkedLoc.length==2&&(this.isClickAll=true)
                    await this.getDepartmentChange(
                        response.data.user_department_id
                    );

                } else {
                    this.records={}
                }
            });
        },
        record_init: function () {
            this.records = {};
            this.checkedLoc = [];
            this.isClickAll = false;
            this.department_options=[]
            this.position_options=[]
        },
        edit_record: async function (id) {
            await this.record_init();
            this.is_create = false;
            this.UI.title = this.UI.title_update;
            await this.refresh_record(id);
            return this.show();
        },
        create_record: async function (record) {
            await this.record_init();
            this.is_create = true;
            this.UI.title = this.UI.title_create;
            this.user_id = "";
            await this.refresh_record();
            return this.show();
        },
        show: function () {
            this.getDepartment();
            return this.$refs.modal.show();
        },
    },
};
</script>
<style lang="scss"></style>
