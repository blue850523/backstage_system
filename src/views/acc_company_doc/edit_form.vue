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

            <div class="tab-content main-tab-content">
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
                                    <label class="control-label">公司所在地區</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="公司所在地區"
                                        v-model="record.company_area"
                                        required>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 上傳文件 -->
                <div class="tab-pane fade" id="step2">
                    2
                </div>
            </div>
        </template>

        <template #footer>
            <button class="btn btn-new4" type="button" @click="save()">{{ is_create ? "提交" : "儲存" }}</button>
            <button class="btn btn-new4" type="button" @click="hide()">離開</button>
        </template>
    </TCModal>
</template>

<script>
import TCModal from "@/components/tc_components/tc-modal.vue";

const API = {
    getAccountInfo: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/get-account-info`,
};

export default {
    name: "edit_form",
    components: {
        TCModal,
    },
    data: function () {
        return {
            UI: {
                title: "新增公司資料",
                title_create: "新增公司資料",
                title_edit: "修改公司資料",
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
                company_area: "",
                company_type: "",
                register_no: "",
                company_name: "",
                register_capital: "",
                establishment_date: "",
                stakeholder: "",
                stake: "",
                register_address: "",
                market_value: "",
                mortgage: "",
                ownership_confirm_date: "",
                remark: "",
                location_id: "",
                files: [],
            },
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
        edit_record () {
            this.is_create = false;
            this.is_detail = false;
            this.UI.title = this.UI.title_edit;
            this.init_step_tab_list();
            this.init_record();
            return this.show();
        },
        detail_record () {
            this.is_create = false;
            this.is_detail = true;
            this.UI.title = this.UI.title_detail;
            this.init_step_tab_list();
            this.init_record();
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
        async init_record () {
            if (!this.is_create) {

            } else {
                this.record.location_id = this.location_id;
            }
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
                    this.account_name = "";
                    this.record.account_id = "";
                    await SysUI.alert(this.UI.title, error.response.data.message);
                    return;
                }
            }
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

            try {
                let response = await this.axios.post(API.api, {

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