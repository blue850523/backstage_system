<template>
    <TCModal class="edit_form" id="edit_form" :title="UI.title" ref="modal" :dialog_width="'1600px'" :modal-body-style="{'min-height': 'fit-content', 'overflow': 'auto'}">
        <template #body>
            <div class="step-list-area" v-show="!is_detail">
                <ul class="nav nav-pills step-list" role="tablist">
                    <li class="nav-item step-btn" v-for="(it, index) in step_tab_list" :key="it.id" role="presentation">
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

            <div class="tab-content main-tab-content" :style="!is_detail ? '' : 'max-height: 100%'">
                <!-- 填寫資料 -->
                <div class="tab-pane fade" id="step1" v-show="!is_detail">
                    <div class="subTitle justify-content-between">
                        戶口
                    </div>

                    <div class="row g-0">
                        <div class="col-4 g-0">
                            <div class="form-group row required">
                                <div class="col-4 nopadding">
                                    <label class="control-label">戶口編號</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="戶口編號"
                                        v-model="account_no"
                                        @change="get_account_info()"
                                        @input="account_name = ''; record.account_id = ''" 
                                        required
                                        v-tc-number>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">姓名</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="姓名"
                                        v-model="account_name"
                                        disabled>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="subTitle justify-content-between">
                        資產
                    </div>
                    <div class="row g-0">
                        <div class="col-4 g-0">
                            <div class="form-group row required">
                                <div class="col-4 nopadding">
                                    <label class="control-label">資產地區</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="資產地區"
                                        v-model="record.estate_area"
                                        required>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row required">
                                <div class="col-4 nopadding">
                                    <label class="control-label">資產類型</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="資產類型"
                                        v-model="record.estate_type"
                                        required>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">登記編號</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="登記編號"
                                        v-model="record.register_no">
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row required">
                                <div class="col-4 nopadding">
                                    <label class="control-label">資產地址</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="資產地址"
                                        v-model="record.estate_address"
                                        required>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row required">
                                <div class="col-4 nopadding">
                                    <a href="#" class="control-label" @click="select_profile('業權人', 'owner')">業權人</a>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="業權人"
                                        v-model="record.owner"
                                        required>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">業權最後確認日期</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <DatePicker 
                                        placeholder="業權最後確認日期"
                                        type="date" 
                                        value-type="format"
                                        v-model="record.ownership_confirm_date"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">持份</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="持份"
                                        v-model="record.stake"
                                        v-tc-number>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">第三方已抵押</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="第三方已抵押"
                                        v-model="record.third_party_pledged"
                                        v-tc-number>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">公司抵押權</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="公司抵押權"
                                        v-model="record.mortgage"
                                        v-tc-number>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">市值</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="市值"
                                        v-model="record.market_value"
                                        v-tc-number>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">全份淨值</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="全份淨值"
                                        v-model="record.net_worth"
                                        v-tc-number>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">估價日期</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <DatePicker 
                                        placeholder="估價日期"
                                        type="date" 
                                        value-type="format"
                                        v-model="record.valuation_date"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">備註</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="備註"
                                        v-model="record.remark">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 上傳文件 -->
                <div class="tab-pane fade" id="step2">
                    <div class="subTitle justify-content-between">
                        {{ is_detail ? "點選圖片放大或下載文件" : "選擇上傳文件" }}
                    </div>

                    <div class="acc-image-area" v-if="!is_detail">
                        <div class="acc-image-btn-group">
                            <button class="btn acc-image-btn active">
                                上傳文件
                            </button>
                            <button
                                class="add-acc-image-btn"
                                @click="add_file()">
                                <i class="fa fa-plus-circle"></i>
                            </button>
                        </div>
                    </div>
                    <div class="acc-image-area">
                        <button 
                            class="btn acc-image-btn"
                            :class="{'active': index === select_file_index}"
                            v-for="(it, index) in files_data"
                            :key="`acc_file_${index}`"
                            @click="select_file_index = index">
                            <span class="acc-image-delete-btn" v-if="!is_detail" @click="delete_file(index)">
                                <i class="fa fa-minus-circle"></i>
                            </span>
                            {{ "文件" + (index + 1) }}
                        </button>
                    </div>

                    <div v-for="(it, index) in files_data" :key="`acc_file_info_${index}`" v-show="index === select_file_index">
                        <div class="subTitle justify-content-between" v-if="!is_detail">
                            上傳證件並檢視
                        </div>
                        <div class="row g-0 justify-content-center">
                            <div class="image-area">
                                <template v-if="!is_detail">
                                    <button 
                                        class="btn btn-new2 image-upload" 
                                        data-loading-text="Loading..."
                                        @click="upload_file(index)">
                                        <i class="fa fa-upload"></i>
                                        上傳文件
                                    </button>
                                    <span class="image-clean-btn" @click="clean_file(index)">
                                        <i class="fa fa-minus-circle"></i>
                                    </span>
                                    <div class="image-tips">支援JPEG, PNG, PDF.最大不可超過20MB</div>
                                </template>
                                <img 
                                    v-if="files_data[index].url !== ''" 
                                    :src="files_data[index].url"
                                    :class="{'icon': files_data[index].url.indexOf('PDF_icon') !== -1}"
                                />
                                <img
                                    v-else
                                    src="@/assets/image/null_image.png"
                                />
                                <div class="image-tips">{{ files_data[index].display_name }}</div>
                                <input 
                                    class="d-none"
                                    type="file" 
                                    ref="file" 
                                    accept="image/x-png, image/jpeg, application/pdf">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <button class="btn btn-new4" type="button" @click="save()" v-if="!is_detail">{{ is_create ? "提交" : "儲存" }}</button>
            <button class="btn btn-new4" type="button" @click="hide()">離開</button>
        </template>

        <SelectProfileForm ref="select_profile_form" />
    </TCModal>
</template>

<script>
import TCModal from "@/components/tc_components/tc-modal.vue";
import SelectProfileForm from "@/components/common/SelectProfileForm.vue";

const API = {
    getAccountInfo: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/get-account-info`,
    createRealEstate: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account-document/real-estate/create`,
    getRealStateDetail: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account-document/real-estate/detail`
};

export default {
    name: "edit_form",
    components: {
        TCModal,
        SelectProfileForm
    },
    data: function () {
        return {
            UI: {
                title: "新增不動產資料",
                title_create: "新增不動產資料",
                title_edit: "修改不動產資料",
                title_detail: "查看附件",
            },
            location_id: sessionStorage["location_id"],
            is_create: false,
            is_detail: false,
            step_tab_list: [
                {
                    id: "step1",
                    title: "填寫資料"
                },
                {
                    id: "step2",
                    title: "上傳文件"
                },
            ],
            account_no: "",
            account_name: "",
            record: {
                account_id: "",
                estate_area: "",
                estate_type: "",
                register_no: "",
                estate_address: "",
                owner: "",
                ownership_confirm_date: "",
                stake: "",
                third_party_pledged: "",
                mortgage: "",
                market_value: "",
                net_worth: "",
                valuation_date: "",
                remark: "",
                location_id: "",
            },
            files_data: [],
            select_file_index: 0,
        }
    },
    methods: {
        create_record () {
            this.is_create = true;
            this.is_detail = false;
            this.UI.title = this.UI.title_create;
            this.init_step_tab_list();
            this.init_record();
            return this.show();
        },
        edit_record (id) {
            this.is_create = false;
            this.is_detail = false;
            this.UI.title = this.UI.title_edit;
            this.init_step_tab_list();
            this.init_record(id);
            return this.show();
        },
        detail_record (id) {
            this.is_create = false;
            this.is_detail = true;
            this.UI.title = this.UI.title_detail;
            this.init_step_tab_list();
            this.init_record(id);
            return this.show();
        },
        init_step_tab_list () {
            if (this.is_detail) {
                this.step_tab_list.splice(0, 1);
                $("#step2-tab").click();
            } else {
                $("#step1-tab").click();
            }
        },
        async init_record (id = null) {
            if (!this.is_create) {
                try {
                    let response = await this.axios.get(API.getRealStateDetail, { params: {
                        real_estate_id: id
                    }}).then((res) => res);

                    if (response.status === 200) {
                        console.log(response);
                        this.files_data = response.data.data.files;
                    } else {
                        await SysUI.alert(this.UI.title, response.data.message);
                        return;
                    }
                } catch (error) {
                    console.log("error", error.response);
                    await SysUI.alert(this.UI.title, error.response.data.message);
                    return;
                }
            } else {
                this.record.location_id = this.location_id;
            }

            this.$forceUpdate();
        },
        async get_account_info () {
            if (this.account_no !== "") {
                try {
                    let response = await this.axios.get(API.getAccountInfo, { params: {
                        account_no: this.account_no
                    }}).then((res) => res);

                    if (response.status === 200) {
                        if (response.data.data.account_id) {
                            this.account_name = response.data.data.full_name;
                            this.record.account_id = response.data.data.account_id;

                            return
                        }
                    }
                } catch (error) {
                    console.log("error", error.response);
                    this.account_no = "";
                    this.account_name = "";
                    this.record.account_id = "";
                    await SysUI.alert(this.UI.title, error.response.data.message);
                    return;
                }
            }
        },
        async select_profile (title, type) {
            if (this.record.account_id == "") {
                await SysUI.message(title, "請先輸入戶口編號");
                return;
            }

            let result = await this.$refs.select_profile_form.edit_record(title, this.record.account_id);

            if (result) {
                this.record[type] = result.name_full;
            }
        },
        add_file () {
            this.files_data.push({
                file_id: "", // 新增不會有
                display_name: "",
                url: "",
            });
        },
        delete_file (index) {
            this.files_data.splice(index, 1);
        },
        upload_file (index) {
            let input_file = document.createElement("input");
            input_file.type = "file";
            input_file.name = "image";
            input_file.accept = "image/x-png, image/jpeg, application/pdf";
            input_file.click();

            input_file.addEventListener("change", () => {
                let file_info = input_file.files[0];
                let file_size = file_info.size;
                let file_type = file_info.type;

                console.log(file_size / 1024 / 1024 + "MB");
                console.log(file_type);

                if (file_size / 1024 / 1024 < 20) {
                    if (file_type.indexOf("image/") === 0) {
                        this.$refs.file[index] = input_file;
                        this.files_data[index].display_name = file_info.name;
                        let reader = new FileReader();
                        reader.readAsDataURL(file_info);
                        reader.onload = (e) => {
                            this.files_data[index].url = e.target.result
                            this.$forceUpdate();
                        }
                    } else if (file_type.indexOf("application/pdf") === 0) {
                        this.$refs.file[index] = input_file;
                        this.files_data[index].display_name = file_info.name;
                        this.files_data[index].url = require("@/assets/image/PDF_icon.png");
                    } else {
                        SysUI.alert(this.UI.title, "檔案僅支援JPEG, PNG, PDF。");
                        return;
                    }
                } else {
                    SysUI.alert(this.UI.title, "檔案大小超過20MB。");
                    return;
                }
            });
        },
        clean_file (index) {
            this.$refs.file[index].value = null;
            this.files_data[index] = {
                file_id: "",
                display_name: "",
                url: "",
            };
            this.$forceUpdate();
        },
        form_data () {
            let form = document.createElement("form");
            form.id = "form_upload";
            form.enctype = "multipart/form-data";

            let form_data = new FormData(form);

            Object.keys(this.record).forEach(it => {
                if (it !== "files") {
                    if (it === "ownership_confirm_date" || it === "valuation_date" || it === "stake" || it === "third_party_pledged" || it === "mortgage" || it === "market_value" || it === "net_worth") {
                        if (this.record[it] !== "") {
                            form_data.append(it, this.record[it]);
                        }
                    } else {
                        form_data.append(it, this.record[it]);
                    }
                }
            });

            if (this.$refs.file) {
                this.$refs.file.forEach(it => {
                    if (it.files[0])
                        form_data.append('files[]', it.files[0], it.files[0].name);
                });
            }

            return form_data;
        },
        async validates () {
            let check = true;

            check = check_form_is_valid($(this.$el), true);

            return check;
        },
        async save () {
            let is_valid = await this.validates();
            if (!is_valid) {
                return;
            }

            let form_data = this.form_data();

            try {
                let response = await this.axios.post(API.createRealEstate, form_data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => res);

                if (response.status == 200) {
                    this.hide(1);
                } else {
                    await SysUI.alert(this.UI.title, response.data.message);
                    return;
                }
            } catch (error) {
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
            remove_form_has_error($(this.$el));
        }
    }
}
</script>

<style lang="scss" scoped>
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
                    border: 2px solid #22354D;
                    border-radius: 50%;
                    color: #22354D;
                    background-color: #FFF;
                    .step-title {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        color: #22354D;
                        width: 100%;
                    }
                }
                button.active {
                    color: #FFF;
                    background-color: #22354D;
                }
            }
        }
        .step-list:before {
            content: "";
            position: absolute;
            width: calc(100% - 30rem);
            height: .2rem;
            background-color: #22354D;
        }
    }
    .main-tab-content {
        padding: 1.5rem;
        max-height: 56vh;
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
        }

        #step2 {
            .image-area {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                padding: 1.5rem;
                .image-clean-btn {
                    position: absolute;
                    right: 30%;
                    top: 1.7rem;
                    font-size: 2rem;
                    color: #F03447;
                    cursor: pointer;
                }
                .image-tips {
                    margin-top: .5rem;
                    font-size: 1.2rem;
                    opacity: 0.6;
                    color: #1e2734;
                }
                img {
                    margin-top: .5rem;
                    width: 35rem;
                    height: auto;
                }
                img.icon {
                    width: 10rem;
                }
            }
        }

        .acc-image-area {
            display: flex;
            flex-wrap: wrap;
            margin: 2rem 0;
            padding: 0 1.5rem;
            .acc-image-btn-group {
                position: relative;
            }
            .acc-image-btn {
                position: relative;
                min-width: 10rem;
                height: 3.5rem;
                margin-right: 4.5rem;
                margin-bottom: 1rem;
                padding: .7rem 2.5rem;
                border-radius: 5rem;
                font-size: 1.4rem;
                border: 1px solid #006ace;
                color: #006ace;
                background-color: transparent;
            }
            .acc-image-btn.active {
                color: #FFF;
                background-color: #006ace;
            }
            .acc-image-delete-btn {
                position: absolute;
                left: 0.5rem;
                top: 0.2rem;
                font-size: 2rem;
                color: #F03447;
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