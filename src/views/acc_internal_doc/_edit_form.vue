<template>
    <div>
        <TCModal
            id="edit_form"
            class="edit_form"
            :title="UI.title"
            ref="modal"
            :dialog_width="'1600px'"
            :modal-body-style="{
                'min-height': 'fit-content',
                'max-height': 'auto',
                overflow: 'auto',
            }"
        >
            <template #body>
                <div class="step-list-area">
                    <ul class="nav nav-pills step-list" role="tablist">
                        <li
                            class="nav-item step-btn"
                            v-for="(it, index) in step_tab_list"
                            :key="it.id"
                            role="presentation"
                        >
                            <button
                                class="nav-link"
                                :id="`${it.id}-tab`"
                                data-bs-toggle="pill"
                                :data-bs-target="`#${it.id}`"
                                type="button"
                                :aria-controls="`${it.id}`"
                                role="tab"
                            >
                                {{ index + 1 }}
                                <div class="step-title">{{ it.title }}</div>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="tab-content main-tab-content">
                    <!-- 填寫資料 -->
                    <div class="tab-pane fade" id="step1">
                        <div class="subTitle justify-content-between">戶口</div>

                        <div class="row gx-0 gy-1">
                            <div class="col-4 row">
                                <TCFormGroup
                                    class="col-4"
                                    label="戶口編號"
                                    required
                                ></TCFormGroup>
                                <TCFormGroup class="col-6" required>
                                    <input
                                        placeholder="戶口編號"
                                        v-model="records.document.account_no"
                                        class="form-control"
                                        @blur="getAccName($event)"
                                        v-tc-number
                                    />
                                </TCFormGroup>
                            </div>
                            <div class="col-4 row">
                                <TCFormGroup
                                    class="col-4"
                                    label="姓名"
                                ></TCFormGroup>
                                <TCFormGroup class="col-6">
                                    <input
                                        placeholder="姓名"
                                        v-model="records.document.account_name"
                                        class="form-control"
                                        disabled
                                    />
                                </TCFormGroup>
                            </div>
                        </div>

                        <div class="subTitle justify-content-between">文件</div>
                        <div class="row gx-0 gy-1">
                            <div class="col-4 row">
                                <TCFormGroup
                                    class="col-4"
                                    label="文件類型"
                                    required
                                ></TCFormGroup>
                                <TCFormGroup class="col-6" required>
                                    <input
                                        placeholder="文件類型"
                                        v-model="records.document.doc_type"
                                        class="form-control"
                                    />
                                </TCFormGroup>
                            </div>
                            <div class="col-4 row">
                                <TCFormGroup
                                    class="col-4"
                                    label="生效日期"
                                    required
                                ></TCFormGroup>
                                <TCFormGroup class="col-6">
                                    <DatePicker
                                        type="date"
                                        v-model="
                                            records.document.effective_date
                                        "
                                        value-type="format"
                                        placeholder="生效日期"
                                    />
                                </TCFormGroup>
                            </div>
                            <div class="col-4 row">
                                <TCFormGroup
                                    class="col-4"
                                    label="文件金額(萬)"
                                    required
                                ></TCFormGroup>
                                <TCFormGroup class="col-6" required>
                                    <input
                                        placeholder="文件金額(萬)"
                                        v-model="records.document.amount"
                                        class="form-control"
                                        v-tc-money
                                    />
                                </TCFormGroup>
                            </div>
                            <div class="col-4 row">
                                <TCFormGroup
                                    class="col-4"
                                    label="簽署人"
                                    required
                                    :clickable_label="true"
                                    @click.native="showSignatoryProfile"
                                >
                                </TCFormGroup>
                                <TCFormGroup class="col-6" required>
                                    <input
                                        placeholder="簽署人"
                                        v-model="
                                            records.document
                                                .signatory_profile_name
                                        "
                                        class="form-control"
                                        disabled
                                    />
                                </TCFormGroup>
                            </div>
                            <div class="col-4 row">
                                <TCFormGroup
                                    class="col-4"
                                    label="國籍"
                                ></TCFormGroup>
                                <TCFormGroup class="col-6">
                                    <input
                                        placeholder="國籍"
                                        class="form-control"
                                        disabled
                                        v-model="
                                            records.document
                                                .signatory_nationality
                                        "
                                    />
                                </TCFormGroup>
                            </div>
                            <div class="col-4 row">
                                <TCFormGroup
                                    class="col-4"
                                    label="擔保人"
                                    required
                                    :clickable_label="true"
                                    @click.native="showGuarantorProfile"
                                ></TCFormGroup>
                                <TCFormGroup class="col-6">
                                    <input
                                        placeholder="擔保人"
                                        v-model="
                                            records.document
                                                .guarantor_profile_name
                                        "
                                        class="form-control"
                                        disabled
                                    />
                                </TCFormGroup>
                            </div>
                        </div>

                        <div class="subTitle justify-content-between">其他</div>
                        <div class="row gx-0 gy-1">
                            <div class="col-4 row">
                                <TCFormGroup
                                    class="col-4"
                                    label="追蹤狀態"
                                    required
                                ></TCFormGroup>
                                <TCFormGroup class="col-6">
                                    <TCDropdown
                                        :allowEmpty="false"
                                        :options="track_status_option"
                                        v-model="records.document.track_status"
                                    />
                                </TCFormGroup>
                            </div>
                            <div class="col-4 row"></div>
                            <div class="col-4 row"></div>
                            <div class="col-4 row">
                                <TCFormGroup
                                    class="col-4"
                                    label="法律部備註"
                                ></TCFormGroup>
                                <TCFormGroup class="col-6">
                                    <input
                                        placeholder="法律部備註"
                                        v-model="
                                            records.document
                                                .legal_department_remark
                                        "
                                        class="form-control"
                                    />
                                </TCFormGroup>
                            </div>
                            <div class="col-4 row">
                                <TCFormGroup
                                    class="col-4"
                                    label="中賬追蹤備註"
                                ></TCFormGroup>
                                <TCFormGroup class="col-6">
                                    <input
                                        placeholder="中賬追蹤備註"
                                        v-model="records.document.center_remark"
                                        class="form-control"
                                    />
                                </TCFormGroup>
                            </div>
                        </div>
                    </div>

                    <!-- 上傳證件 -->
                    <div class="tab-pane fade" id="step2">
                        <div class="subTitle justify-content-between">
                            選擇證件類型
                        </div>

                        <div class="acc-image-area">
                            <div class="acc-image-btn-group">
                                <button class="btn acc-image-btn active">
                                    上傳文件
                                </button>
                                <button
                                    class="add-acc-image-btn"
                                    @click="add_image_option"
                                >
                                    <i class="fa fa-plus-circle"></i>
                                </button>
                            </div>
                        </div>

                        <div class="acc-image-area">
                            <button
                                class="btn acc-image-btn"
                                accept="image/png,image/gif,image/jpeg"
                                :name="'picBtn' + index"
                                :ref="'picBtn' + index"
                                :id="'picBtn' + index"
                                v-for="(image, index) in image_list"
                                :key="index"
                                :class="{
                                    active: image.isClick,
                                }"
                                @click="
                                    image_list.forEach(
                                        (p) => (p.isClick = false)
                                    );
                                    image.isClick = true;
                                    selectPicIndex = index;
                                "
                            >
                                <span
                                    class="acc-image-delete-btn"
                                    @click="delete_image_option(index, image)"
                                >
                                    <i class="fa fa-minus-circle"></i>
                                </span>
                                文件{{ index + 1 }}
                            </button>
                        </div>

                        <div class="subTitle justify-content-between">
                            上傳證件並檢視
                        </div>
                        <div
                            class="row gx-0 justify-content-center"
                            v-for="(image, index) in image_list"
                            :key="index"
                        >
                            <div
                                class="col-6 image-area"
                                v-show="
                                    index == selectPicIndex && image_list.length
                                "
                            >
                                <button
                                    class="btn btn-new2 image-upload"
                                    data-loading-text="Loading..."
                                    @click="clickFormInput(index)"
                                >
                                    <i class="fa fa-upload"></i>
                                    上傳文件
                                </button>
                                <form
                                    class="d-none"
                                    :id="'form' + index"
                                    enctype="multipart/form-data"
                                >
                                    <input
                                        type="file"
                                        :ref="'fileInput' + index"
                                        accept="image/png, image/gif, image/jpeg"
                                        @change="
                                            showImg($event, index, image.id)
                                        "
                                    />
                                </form>
                                <span
                                    @click="clearInputImg(image, index)"
                                    class="image-clean-btn"
                                >
                                    <i class="fa fa-minus-circle"></i>
                                </span>
                                <div class="image-tips">
                                    支援JPEG, PNG, PDF.最大不可超過20MB
                                </div>
                                <img v-if="image.src" :src="image.src" />
                                <img
                                    v-else
                                    src="@/assets/image/null_image.png"
                                />
                            </div>
                        </div>
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
        <SelectProfile
            @sendProfile="getSignatoryProfile"
            ref="signatoryProfile"
        ></SelectProfile>
        <SelectProfile
            @sendProfile="getGuarantorProfile"
            ref="guarantorProfile"
        ></SelectProfile>
    </div>
</template>
<script>
import TCModal from "@/components/tc_components/tc-modal.vue";
import TCFormGroup from "@/components/tc_components/tc-form-group.vue";
import TCDropdown from "@/components/tc_components/tc_dropdown.vue";
import moment from "moment";
import nprogress from "nprogress";
import SelectProfile from "./_select_profile.vue";
const API = {
    getAccInfo: `/api/account-management/account/get-account-info`,
    getAccDetail: `/api/account-management/account/detail`,
    createLoanDoc: `/api/account-management/account-document/account-internal-document/create`,
    updateLoanDoc: `/api/account-management/account-document/account-internal-document/update`,
    detailLoanDoc: `/api/account-management/account-document/account-internal-document/detail`,
};
export default {
    name: "edit_form",
    components: {
        TCModal,
        TCFormGroup,
        TCDropdown,
        SelectProfile,
    },
    mounted() {
        // this.$refs.modal.show();
    },
    watch: {
        // "records.document.signed_date": function (newVal, oldVal) {
        //     if (this.records.document.duration && newVal) {
        //         this.countDate();
        //     }
        // },
        image_list: function (newVal, oldVal) {
            if (newVal.length == 0) {
                this.selectPicIndex = 0;
            }
            if (newVal != oldVal) {
                this.image_list.forEach((p, i) => {
                    if (p.isClick) {
                        this.selectPicIndex = i;
                    }
                });
            }
        },
    },
    data() {
        return {
            UI: {
                title: null,
                title_create: "新增內部文件",
                title_update: "修改內部文件",
            },
            is_create: false,
            step_tab_list: [
                {
                    id: "step1",
                    title: "填寫資料",
                },
                {
                    id: "step2",
                    title: "上傳文件",
                },
            ],
            track_status_option: [
                { name: "", value: 0 },
                { name: "已簽", value: 1 },
                { name: "未簽", value: 2 },
                { name: "無需跟進", value: 3 },
            ],
            records: {
                document: {
                    signed_date: "",
                    duration: "",
                    account_no: "",
                    location_id: sessionStorage["location_id"],
                    has_poa: 1,
                    has_transfer_record: 1,
                },
                files: {
                    old_file_ids: [],
                    new_files: [],
                },
            },
            image_list: [],
            selectPicIndex: 0,
            profiles: [],
        };
    },
    methods: {
        //TODO:填寫資料
        //*獲取戶口編號相關資訊
        getAccName: async function (event) {
            if (event.target.value) {
                this.getAccNameData(event.target.value);
            }
        },
        getAccNameData: async function (no) {
            await SysUI.axios("GET", API.getAccInfo, {
                account_no: no,
            }).then(async (response) => {
                if (response?.httpStatus == 200) {
                    let { account_id, account_no, full_name } = response.data;
                    this.records.document = {
                        ...this.records.document,
                        account_id,
                        account_no,
                        account_name: full_name,
                    };

                    await SysUI.axios("GET", API.getAccDetail, {
                        account_id: response.data.account_id,
                    }).then((res) => {
                        let doc = this.records.document;
                        doc.signatory_profile_name = doc.signatory_profile_id = doc.guarantor_profile_name = doc.guarantor_profile_id =
                            "";
                        this.profiles = res.data.record.profile;
                        this.$forceUpdate();
                    });
                } else {
                    this.$message({
                        top: 1000,
                        showClose: true,
                        duration: 500,
                        message: response?.message ?? "讀取失敗",
                        type: "error",
                    });
                }
            });
        },
        //日期計算
        countDate() {
            let duration = this.records.document.duration;
            let signed_date = this.records.document.signed_date;
            if (!signed_date) {
                return;
            }
            if (duration > 100000) {
                SysUI.alert("新增內部文件", "文件有效期不得超過100000", true);
                duration = "";
                return;
            }

            //計算追討到期日
            this.records.document.expired_date = moment(signed_date)
                .add(duration, "days")
                .format("YYYY-MM-DD");

            //計算追討有效天期
            let expired_day = moment(signed_date).from(moment());
            if (expired_day.includes("days ago")) {
                this.records.document.expired_day =
                    duration - parseInt(expired_day.split(" days ago")[0]);
            } else {
                this.records.document.expired_day = duration;
            }
            this.$forceUpdate();
        },
        //傳入與獲取簽署人&擔保人資料
        showSignatoryProfile() {
            this.$refs.signatoryProfile.show(this.profiles);
        },
        showGuarantorProfile() {
            this.$refs.guarantorProfile.show(this.profiles);
        },
        getGuarantorProfile(profile) {
            this.records.document.guarantor_profile_name = profile.name_full;
            this.records.document.guarantor_profile_id = profile.profile_id;
            this.$forceUpdate();
        },
        getSignatoryProfile(profile) {
            this.records.document.signatory_profile_name = profile.name_full;
            this.records.document.signatory_profile_id = profile.profile_id;
            this.$forceUpdate();
        },
        //TODO:上傳文件
        //*上傳文件+的點擊
        add_image_option() {
            if (this.image_list.length == 0) {
                this.image_list.push({ isClick: true });
            } else {
                this.image_list.push({ isClick: false });
            }
        },
        //*上傳文件-的點擊
        delete_image_option(index, image) {
            if (!this.is_create) {
                _.remove(this.records.files.old_file_ids, (p) => {
                    return image.id == p;
                });
            }
            this.image_list.splice(index, 1);
            console.log(" this.records.files", this.records.files);
        },
        //*透過上傳文件BTN點擊下面的Form
        clickFormInput(index) {
            $(this.$refs[`fileInput${index}`][0]).click();
        },
        //*上傳證件並檢視刪除圖片
        clearInputImg(image, index) {
            this.$refs[`fileInput${index}`][0].value = null;
            this.image_list[index].src = null;
            console.log(`image`, image);
            if (!this.is_create) {
                _.remove(this.records.files.old_file_ids, (p) => {
                    return image.id == p;
                });
            }
            console.log("this.records.files", this.records.files);
            this.$forceUpdate();
        },
        //*圖片有更動會執行fileReader轉圖片為base64 並將圖片放到image_list的src
        showImg($event, index, id) {
            nprogress.start();
            //在修改中更新圖片會排除old_file_ids的原圖片id
            if (!this.is_create) {
                _.remove(this.records.files.old_file_ids, (p) => {
                    return id == p;
                });
            }
            let fileReader = new FileReader();
            fileReader.readAsDataURL($event.target.files[0]);
            fileReader.onload = (e) => {
                this.image_list[index].src = e.target.result;
                this.$forceUpdate();
                nprogress.done();
            };
        },
        //TODO:保存離開功能
        submit: async function () {
            let records = this.records.document;

            if (await this.validate(records)) {
                this.save();
            }
        },
        validate: function (records) {
            let validateVal = [];
            records.account_no || validateVal.push("戶口編號 ");
            records.doc_type || validateVal.push("文件類型 ");
            records.amount || validateVal.push("文件金額 ");
            records.track_status || validateVal.push("追蹤狀態 ");
            if (validateVal.length > 0) {
                let msg = "";
                validateVal.forEach((val) => {
                    msg += val;
                });
                msg = msg + "不得為空";
                this.$message({
                    top: 1000,
                    showClose: true,
                    duration: 5000,
                    message: msg,
                    type: "error",
                });
                return false;
            } else {
                return true;
            }
        },
        save: async function () {
            if (!(await SysUI.input_pin(true))) return;
            let url,
                method,
                filesPrefix,
                records,
                hasPicIndexArray = [],
                header = {
                    "Content-Type": "multipart/form-data",
                },
                recordFormData = new FormData();

            if (!this.records.document.location_id) {
                this.records.document.location_id = 1;
            }

            //把this.records.document空值削掉，並轉成formData
            for (const key in this.records.document) {
                if (
                    this.records.document[key] ||
                    this.records.document[key] == 0
                ) {
                    recordFormData.append(
                        `document[${key}]`,
                        this.records.document[key]
                    );
                } else {
                    delete this.records.document[key];
                }
            }
            console.log(`this.records`, this.records);
            //新增&編輯判別
            if (this.is_create) {
                url = API.createLoanDoc;
                method = "POST";
                filesPrefix = "files";
            } else {
                url = API.updateLoanDoc;
                method = "PUT";
                filesPrefix = "files[new_files]";
                recordFormData.append(
                    `document_id`,
                    this.records?.document_id ?? ""
                );

                this.records.files.old_file_ids.forEach((p, i) => {
                    if (p) {
                        recordFormData.append(`files[old_file_ids][${i}]`, p);
                    }
                });
                //若PUT內部文件原檔案就沒圖片 或 原檔案只有一個但換掉後old_file_ids會空 就加一欄空值
                if (
                    this.records.file.length == 0 ||
                    this.records.files.old_file_ids.length == 0
                ) {
                    recordFormData.append(`files[old_file_ids][]`, [null]);
                }
            }

            this.image_list.forEach((p, index) => {
                if (this.$refs[`fileInput${index}`][0].files[0]) {
                    recordFormData.append(
                        `${filesPrefix}[${index}]`,
                        this.$refs[`fileInput${index}`][0].files[0],
                        this.$refs[`fileInput${index}`][0].files[0]?.name ?? ""
                    );
                    hasPicIndexArray.push(index);
                }
            });

            if (!hasPicIndexArray.length) {
                header = {};
                records = this.records;
                recordFormData.append(`files[]`, [null]);
            } else {
                records = recordFormData;
            }

            await SysUI.axios(method, url, records, header).then(
                async (response) => {
                    if (response.httpStatus == 200) {
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
        edit_record: async function (document_id) {
            this.record_init();
            this.is_create = false;
            this.UI.title = this.UI.title_update;
            this.records.document_id = document_id;
            await SysUI.axios("GET", API.detailLoanDoc, { document_id }).then(
                async (response) => {
                    if (response.httpStatus == 200) {
                        this.records.document = response.data.document;
                        this.records.file = response.data.file;
                        this.records.files = {
                            old_file_ids: [],
                            new_files: [],
                        };
                        response.data.file.forEach(({ path, id }, i) => {
                            this.image_list[i] = {
                                isClick: i == 0,
                                src: path,
                                id,
                            };
                            this.records.files.old_file_ids.push(id);
                        });

                        this.getAccNameData(response.data.document.account_no);
                        this.countDate();

                        this.$forceUpdate();
                        console.log("this.records", this.records);
                        return this.show();
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
        create_record: async function () {
            this.record_init();
            this.is_create = true;
            this.UI.title = this.UI.title_create;
            this.user_group_id = "";
            this.records.files = [];
            return this.show();
        },
        record_init: function () {
            this.records = {
                document: {
                    signed_date: "",
                    duration: "",
                    account_no: "",
                    location_id: sessionStorage["location_id"],
                    has_poa: 1,
                    has_transfer_record: 1,
                },
                files: {},
            };
            this.image_list = [];
            this.selectPicIndex = 0;
        },
        init_step_tab_list() {
            return $("#step1-tab").click();
        },
        show: function () {
            this.init_step_tab_list();
            return this.$refs.modal.show();
        },
        hide: function () {
            $(".main-tab-content").scrollTop(0);
            return this.$refs.modal.hide();
        },
    },
};
</script>
<style lang="scss">
.edit_form {
    .step-list-area {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2.5rem;
        .step-list {
            position: relative;
            // width: 50%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .step-btn {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30rem;
                height: 15rem;
                button {
                    width: 5rem;
                    height: 5rem;
                    font-size: 1.8rem;
                    font-weight: bold;
                    border: 2px solid #22354d;
                    border-radius: 50%;
                    color: #22354d;
                    background-color: #fff;
                    .step-title {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        color: #22354d;
                        width: 100%;
                    }
                }
                button.active {
                    color: #fff;
                    background-color: #22354d;
                }
            }
        }
        .step-list:before {
            content: "";
            position: absolute;
            width: calc(100% - 30rem);
            height: 0.2rem;
            background-color: #22354d;
        }
    }
    .main-tab-content {
        padding: 15px;
        max-height: 55vh;
        overflow: auto;
        #step1,
        #step2 {
            .row {
                position: relative;
                .form-group {
                    margin: 1rem 0;
                    .control-label {
                        padding-left: 1.5rem;
                    }
                }
            }
            .image-area {
                margin-left: 20vw;
                position: relative;
                padding: 1.5rem;
                // background: #e3e3e3;
                .image-clean-btn {
                    position: absolute;
                    right: 45%;
                    top: 1.7rem;
                    font-size: 2rem;
                    color: #f03447;
                    cursor: pointer;
                }
                .image-tips {
                    margin-top: 0.5rem;
                    font-size: 1.2rem;
                    opacity: 0.6;
                    color: #1e2734;
                }
                img {
                    margin-top: 0.5rem;
                    width: 40rem;
                    height: auto;
                }
            }
        }
        .acc-list-area,
        .acc-address-area,
        .acc-image-area {
            display: flex;
            flex-wrap: wrap;
            margin: 2rem 0;
            padding: 0 1.5rem;
            .acc-image-btn-group {
                position: relative;
            }
            .acc-list-btn,
            .acc-address-btn,
            .acc-image-btn {
                position: relative;
                min-width: 10rem;
                height: 3.5rem;
                margin-right: 4.5rem;
                margin-bottom: 1rem;
                padding: 0.7rem 2.5rem;
                border-radius: 5rem;
                font-size: 1.4rem;
                border: 1px solid #006ace;
                color: #006ace;
                background-color: transparent;
            }
            .acc-list-btn.active,
            .acc-address-btn.active,
            .acc-image-btn.active {
                color: #fff;
                background-color: #006ace;
            }
            .acc-list-delete-btn,
            .acc-address-delete-btn,
            .acc-image-delete-btn {
                position: absolute;
                left: 0.5rem;
                top: 0.2rem;
                font-size: 2rem;
                color: #f03447;
            }
            .add-acc-btn {
                margin-bottom: 1rem;
                font-size: 2rem;
                color: #006ace;
                background: none;
                border: none;
            }
            .add-acc-image-btn {
                position: absolute;
                left: 28.5%;
                bottom: -2.05rem;
                padding: 0;
                font-size: 2rem;
                color: #006ace;
                background: none;
                border: none;
            }
        }
    }
}
</style>
