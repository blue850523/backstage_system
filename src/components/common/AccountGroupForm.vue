<template>
    <TCModal class="account_group_form" id="account_group_form" :title="title" ref="modal" :dialog_width="'600px'" :modal-body-style="{'min-height': 'fit-content', 'max-height': 'auto', 'overflow': 'auto'}">
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
                <div class="col-5 row nopadding">
                    <div class="col-4 nopadding">
                        <label class="control-label">戶組編號</label>
                    </div>
                    <div class="col-7 nopadding">
                        <input class="form-control" v-model="search_account_group_no">
                    </div>
                </div>
                <div class="col-2">
                    <button class="btn btn-p" @click="get_account_group_list()">搜尋</button>
                </div>
            </div>

            <div class="table-area">
                <div class="nopadding thead">
                    <table class="table table-bordered">
                        <thead>
                            <tr class="table-title-bar">
                                <th style="width: 15rem;">戶口編號</th>
                                <th>姓名</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="nopadding tbody">
                    <table class="table table-bordered table-hover">
                        <tbody>
                            <tr 
                                v-for="it in account_group_list" 
                                :key="it.account_no" 
                                :class="{selectedTr: it.account_no === select_account_group_data.account_no}"  
                                @click="select_account_group(it)">
                                <td style="width: 15rem;">{{ it.account_no }}</td>
                                <td>{{ it.name }}</td>
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
    getAccountGroupList: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/list`
}

export default {
    name: "account_group_form",
    components: {
        TCModal,
        WaterMarker,
    },
    data: function () {
        return {
            title: "戶組",
            select_account_group_data: {},

            search_name: "",
            search_account_group_no: "",
            account_group_list: [
                {
                    account_no: "1",
                    name: "John",
                    account_id: 1
                },
                {
                    account_no: "2",
                    name: "John",
                    account_id: 2
                },
                {
                    account_no: "3",
                    name: "John",
                    account_id: 3
                }
            ],
        }
    },
    methods: {
        /**
         * @param {String} title 可送可不送, 有送就會改標題
         * @param {String} account_group_no 可送可不送, 有送就會把 account_group_no 帶進搜尋欄位
         */
        async edit_record (title = "", account_group_no = "") {
            this.reset();
            if (title !== "")
                this.title = title;

            if (account_group_no !== "") {
                this.search_account_group_no = account_group_no;
            }
            await this.get_account_group_list();

            return this.show();
        },
        async get_account_group_list () {
            return;

            try {
                let response = await this.axios.get(API.getAccountGroupList).then((res) => res);
            } catch (error) {
                console.log("error", error.response);
                await SysUI.alert(this.title, error.response.data.message);
                return;
            }
        },
        select_account_group (record) {
            this.select_account_group_data = record;
        },
        save () {
            this.hide(this.select_account_group_data);
        },
        show () {
            return this.$refs.modal.show();
        },
        hide (select_account_group_data = {}) {
            if (select_account_group_data.account_no) {
                return this.$refs.modal.hide(this.select_account_group_data);
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
.account_group_form {
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