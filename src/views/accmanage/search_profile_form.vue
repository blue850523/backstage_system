<template>
    <TCModal class="search_profile_form" id="search_profile_form" :title="UI.title" ref="modal" :dialog_width="'600px'" :modal-body-style="{'min-height': 'fit-content', 'overflow': 'auto'}">
        <template #body>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr class="table-title-bar">
                        <th class="text-center">中文名</th>
                        <th class="text-center">英文名</th>
                        <th class="text-center">新曆生日日期</th>
                        <th class="text-center">關聯之戶口編號</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="it in record" :key="it.profile_id" :class="{selectedTr: it.profile_id === select_profile_data.profile_id}" @click="select_profile(it)">
                        <td class="text-center">{{ it.name_full }}</td>
                        <td class="text-center">{{ it.name_full_en }}</td>
                        <td class="text-center" style="width: 12rem;">{{ it.solar_birthday }}</td>
                        <td class="text-center" style="width: 12rem;">{{ it.account_no }}</td>
                    </tr>
                </tbody>
            </table>
        </template>

        <template #footer>
            <button class="btn btn-new4" type="button" @click="save()">確定</button>
            <button class="btn btn-new4" type="button" @click="hide()">離開</button>
        </template>
    </TCModal>
</template>

<script>
import TCModal from "@/components/tc_components/tc-modal.vue";

export default {
    name: "search_profile_form",
    components: {
        TCModal,
    },
    data: function () {
        return {
            UI: {
                title: "搜尋",
            },
            record: [],
            select_profile_data: {},
        }
    },
    methods: {
        search_record (record) {
            this.reset();
            this.record = record;
            return this.show();
        },
        select_profile (record) {
            this.select_profile_data = record;
        },
        async save () {
            this.hide(1);
        },
        show () {
            return this.$refs.modal.show();
        },
        hide (have_a_choice = 0) {
            if (have_a_choice) {
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

<style lang="scss" scoped>
.search_profile_form {
    tbody tr {
        cursor: pointer;
    }
}
</style>