<template>
    <TCModal class="select_profile_form" id="select_profile_form" :title="title" ref="modal" :dialog_width="'600px'" :modal-body-style="{'min-height': 'fit-content', 'max-height': 'auto', 'overflow': 'auto'}">
        <template #body>
            <div class="row g-0 search-row">
                <div class="col-5 row nopadding">
                    <div class="col-4 nopadding">
                        <label class="control-label">姓名</label>
                    </div>
                    <div class="col-7 nopadding">
                        <input class="form-control" v-model="search_name">
                    </div>
                </div>
                <div class="col-2">
                    <button class="btn btn-p" @click="get_account_profile_list()">搜尋</button>
                </div>
            </div>

            <div class="table-area">
                <div class="nopadding thead">
                    <table class="table table-bordered">
                        <thead>
                            <tr class="table-title-bar">
                                <th style="width: 15rem;">姓名</th>
                                <th style="width: 15rem;">戶口角色</th>
                                <th>出生年月日</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="nopadding tbody">
                    <table class="table table-bordered table-hover">
                        <tbody>
                            <tr 
                                v-for="it in profile_list" 
                                :key="it.profile_id" 
                                :class="{selectedTr: it.profile_id === select_profile_data.profile_id}"  
                                @click="click_profile_data(it)">
                                <td style="width: 15rem;">{{ it.name_full }}</td>
                                <td style="width: 15rem;"></td>
                                <td>{{ it.solar_birthday }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>

        <template #footer>
            <button class="btn btn-new4" type="button" @click="save()">確定</button>
            <button class="btn btn-new4" type="button" @click="hide()">離開</button>
        </template>
    </TCModal>
</template>

<script>
import TCModal from "@/components/tc_components/tc-modal.vue";
import WaterMarker from "@/components/tc_components/watermark.vue";

const API = {
    getAccountProflieList: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/detail`
}

export default {
    name: "select_profile_form",
    components: {
        TCModal,
        WaterMarker,
    },
    data: function () {
        return {
            title: "交易人",
            select_profile_data: {},

            search_name: "",
            profile_list: [],
        }
    },
    methods: {
        async edit_record (title = "", account_id) {
            this.reset();
            if (title !== "")
                this.title = title;
            this.account_id = account_id;
            await this.get_account_profile_list();

            return this.show();
        },
        async get_account_profile_list () {
            try {
                let response = await this.axios.get(API.getAccountProflieList, { params: {
                    account_id: this.account_id,
                }}).then((res) => res);

                this.profile_list = response.data.data.record.profile;
            } catch (error) {
                console.log("error", error.response);
                await SysUI.alert(this.title, error.response.data.message);
                return;
            }
        },
        click_profile_data (record) {
            this.select_profile_data = record;
        },
        save () {
            this.hide(this.select_profile_data);
        },
        show () {
            return this.$refs.modal.show();
        },
        hide (select_profile_data = {}) {
            if (select_profile_data.profile_id) {
                return this.$refs.modal.hide(this.select_profile_data);
            } else {
                return this.$refs.modal.hide();
            }
        },
        reset () {
            Object.assign(this.$data, this.$options.data());
        }
    }
}
</script>

<style lang="scss">
.select_profile_form {
    .search-row {
        align-items: center;
        .btn {
            min-width: 9rem;;
        }
    }
    .table-area {
        margin-top: 1rem;
        height: 34rem;
        .tbody {
            height: 30rem;
            overflow-y: auto;
            tr {
                cursor: pointer;
            }
        }
    }
}
</style>