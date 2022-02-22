<template>
    <TCModal class="edit_address_form" id="edit_address_form" :title="UI.title" ref="modal" :dialog_width="'1600px'" :modal-body-style="{'min-height': 'fit-content', 'overflow': 'auto'}">
        <template #body>
            <div class="acc-list-area" v-show="profiles.length > 1">
                <button 
                    class="btn acc-list-btn" 
                    :class="{'active': index === select_acc_no_index}" 
                    v-for="(it, index) in profiles" 
                    :key="`acc_no_btn_${index}`" 
                    @click="select_acc_no_index = index">
                    戶主 {{ index + 1 }}
                </button>
            </div>

            <div v-for="(it, index) in profiles" :key="`acc_list_${index}`" v-show="select_acc_no_index === index">
                <div class="subTitle justify-content-between">
                    聯絡方式
                    <button class="btn btn-new" @click="add_address_click(index)">
                        增加地址
                    </button>
                </div>
                <div class="acc-address-area">
                    <button
                        class="btn acc-address-btn"
                        :class="{'active': index2 === active_address[index]}"
                        v-for="(it2, index2) in it.addresses" 
                        :key="`acc_address_${index}_${index2}`" 
                        @click="active_address[index] = index2; $forceUpdate()"
                    >
                        <span class="acc-address-delete-btn" v-if="index2 > 0" @click.stop="delete_address_click(index, index2)">
                            <i class="fa fa-minus-circle"></i>
                        </span>
                        地址 {{ index2 + 1 }}
                    </button>
                </div>
                <div v-for="(it2, index2) in it.addresses" :key="`acc_address_list_${index}_${index2}`" v-show="index2 === active_address[index]">
                    <div class="row g-0">
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">國家</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="國家"
                                        v-model="it2.country"
                                        @input="set_full_address(index, index2)">
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">省</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="省"
                                        v-model="it2.province"
                                        @input="set_full_address(index, index2)">
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">特別行政區/市</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="特別行政區/市"
                                        v-model="it2.city"
                                        @input="set_full_address(index, index2)">
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">街名</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="街名"
                                        v-model="it2.street"
                                        @input="set_full_address(index, index2)">
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">門牌號碼</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="門牌號碼"
                                        v-model="it2.no"
                                        @input="set_full_address(index, index2)">
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">大廈-樓層及單元</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="大廈-樓層及單元"
                                        v-model="it2.rest"
                                        @input="set_full_address(index, index2)">
                                </div>
                            </div>
                        </div>
                        <div class="col-12 g-0">
                            <div class="form-group row">
                                <div class="col-1 nopadding full-address-title">
                                    <label class="control-label">聯絡地址</label>
                                </div>
                                <div class="col-4 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="聯絡地址"
                                        v-model="it2.full_address"
                                        disabled>
                                </div>
                            </div>
                        </div>
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
    updateAccountAddress: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/edit-address`,
};

export default {
    name: "edit_address_form",
    components: {
        TCModal,
    },
    data: function () {
        return {
            UI: {
                title: "修改地址",
            },
            profiles: [],
            address_template: {
                country: "",
                province: "",
                city: "",
                street: "",
                no: "",
                rest: "",
                full_address: "",
                order: "",
            },
            select_acc_no_index: 0,
            active_address: [],
        }
    },
    methods: {
        edit_record (record) {
            this.profiles = JSON.parse(JSON.stringify(record.profiles));
            this.init_active_address();
            return this.show();
        },
        init_active_address () {
            this.profiles.forEach((it, index) => {
                this.active_address[index] = 0;
            });
            this.$forceUpdate();
        },
        add_address_click (index) {
            this.profiles[index].addresses.push(JSON.parse(JSON.stringify(this.address_template)));
            this.set_address_order();
        },
        delete_address_click (index, index2) {
            this.profiles[index].addresses.splice(index2, 1);
            this.set_address_order();
        },
        set_address_order () {
            this.profiles.forEach(it => {
                it.addresses.forEach((it2, index2) => {
                    it2.order = (index2 + 1).toString();
                });
            });
        },
        set_full_address (index, index2) {
            let address_data = this.profiles[index].addresses[index2];
            this.profiles[index].addresses[index2].full_address = address_data.country + address_data.province + address_data.city + address_data.street + address_data.no + address_data.rest;
        },
        async save () {
            SysUI.all_button_disabled(1);

            // if (!(await SysUI.input_pin(true))) {
            //     SysUI.all_button_disabled(0);
            //     return;
            // }

            try {
                let response = await this.axios.put(API.updateAccountAddress, {
                    profiles: this.profiles
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
.edit_address_form {
    .acc-address-area {
        margin-top: 2rem;
    }
    .acc-list-area, 
    .acc-address-area{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 2rem;
        padding: 0 1.5rem;
        .acc-list-btn, 
        .acc-address-btn {
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
        .acc-list-btn.active, 
        .acc-address-btn.active {
            color: #FFF;
            background-color: #006ace;
        }
        .acc-address-delete-btn {
            position: absolute;
            left: 0.5rem;
            top: 0.2rem;
            font-size: 2rem;
            color: #F03447;
        }
    }
    .row {
        position: relative;
        .form-group {
            margin: 1rem 0;
            .control-label {
                padding-left: 1.5rem;
            }
        }
    }
    .full-address-title {
        width: 11.1%;
    }
}
</style>