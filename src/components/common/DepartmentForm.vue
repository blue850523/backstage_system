<template>
    <TCModal class="department_form" id="department_form" :title="title" ref="modal" :dialog_width="'1200px'" :modal-body-style="{'min-height': 'fit-content', 'max-height': 'auto', 'overflow': 'auto'}">
        <template #body>
            <div class="department_container watermark-container">
                <WaterMarker />
                <div class="row g-0 department_list">
                    <div class="form-group col-2">
                        <input 
                            class="form-check-input" 
                            type="checkbox" 
                            id="all_department_checkbox" 
                            @click="all_department_click($event)">
                        <label class="control-label" for="all_department_checkbox">全部門</label>
                    </div>
                    <div class="form-group col-10 row g-0 align-items-start">
                        <div class="form-group col-2" v-for="(it, index) in department_list" :key="`department_item_${index}`">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                :value="it.department_id" 
                                :id="`department_checkbox_${index}`" 
                                v-model="select_department_id">
                            <label class="control-label" :for="`department_checkbox_${index}`">{{ it.name }}</label>
                        </div>
                    </div>
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

export default {
    name: "department_form",
    components: {
        TCModal,
        WaterMarker,
    },
    data: function () {
        return {
            title: "可查閱部門",
            select_department_id: [],
        }
    },
    props: {
        department_list: {
            type: Array,
            default: [],
        }
    },
    methods: {
        edit_record (title = "", department_id) {
            this.reset();
            if (title != "") {
                this.title = title;
            } else {
                this.title = "可查閱部門";
            }
            this.select_department_id = JSON.parse(JSON.stringify(department_id));
            return this.show();
        },
        all_department_click ($event) {
            let checked = $event.target.checked + 0;

            let all_department_ids = this.department_list.map(it => it.department_id);

            if (checked === 1) {
                all_department_ids.forEach(it => {
                    if (this.select_department_id.indexOf(it) === -1) {
                        this.select_department_id.push(it)
                    }
                });
            } else {
                all_department_ids.forEach(it => {
                    if (this.select_department_id.indexOf(it) !== -1) {
                        this.select_department_id.splice(this.select_department_id.indexOf(it), 1);
                    }
                });
            }
        },
        save () {
            this.select_department_id.sort();
            this.hide(1);
        },
        show () {
            return this.$refs.modal.show();
        },
        hide (need_return_data = 0) {
            if (need_return_data) {
                return this.$refs.modal.hide(this.select_department_id);
            } else {
                return this.$refs.modal.hide();
            }
        },
        reset () {
            $("#all_department_checkbox").prop("checked", false);
        }
    }
}
</script>

<style lang="scss">
.department_form {
    .department_container {
        padding: 1.5rem;
        border-radius: 3px;
        background-color: #F5F5F5;
        .department_list {
            align-items: flex-start;
            .form-group {
                display: flex;
                align-items: flex-start;
                .form-check-input {
                    margin: .9rem 0 0;
                    min-width: 1.6rem;
                    min-height: 1.6rem;
                }
                .control-label {
                    width: auto;
                    padding-left: .5rem;
                }
            }
        }
    }
}
</style>