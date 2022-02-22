<template>
    <TCModal class="location_form" id="location_form" :title="title" ref="modal" :dialog_width="'1200px'" :modal-body-style="{'min-height': 'fit-content', 'max-height': 'auto', 'overflow': 'auto'}">
        <template #body>
            <div class="location_container watermark-container">
                <WaterMarker />
                <div class="row g-0 location_list">
                    <div class="form-group col-2">
                        <input 
                            class="form-check-input" 
                            type="checkbox" 
                            id="all_location_checkbox" 
                            @click="all_location_click($event)">
                        <label class="control-label" for="all_location_checkbox">全集團</label>
                    </div>
                    <div class="form-group col-10 row g-0 align-items-start">
                        <div class="form-group col-2" v-for="(it, index) in location_list" :key="`location_item_${index}`">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                :value="it.location_id" 
                                :id="`location_checkbox_${index}`" 
                                v-model="select_location_id">
                            <label class="control-label" :for="`location_checkbox_${index}`">{{ it.name }}</label>
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
    name: "location_form",
    components: {
        TCModal,
        WaterMarker,
    },
    data: function () {
        return {
            title: "選擇廳",
            select_location_id: [],
        }
    },
    props: {
        location_list: {
            type: Array,
            default: [],
        }
    },
    methods: {
        edit_record (title = "", location_id) {
            this.reset();
            if (title != "") {
                this.title = title;
            } else {
                this.title = "選擇廳";
            }
            this.select_location_id = JSON.parse(JSON.stringify(location_id));
            return this.show();
        },
        all_location_click ($event) {
            let checked = $event.target.checked + 0;

            let all_location_ids = this.location_list.map(it => it.location_id);

            if (checked === 1) {
                all_location_ids.forEach(it => {
                    if (this.select_location_id.indexOf(it) === -1) {
                        this.select_location_id.push(it)
                    }
                });
            } else {
                all_location_ids.forEach(it => {
                    if (this.select_location_id.indexOf(it) !== -1) {
                        this.select_location_id.splice(this.select_location_id.indexOf(it), 1);
                    }
                });
            }
        },
        save () {
            this.select_location_id.sort();
            this.hide(1);
        },
        show () {
            return this.$refs.modal.show();
        },
        hide (need_return_data = 0) {
            if (need_return_data) {
                return this.$refs.modal.hide(this.select_location_id);
            } else {
                return this.$refs.modal.hide();
            }
        },
        reset () {
            $("#all_location_checkbox").prop("checked", false);
        }
    }
}
</script>

<style lang="scss">
.location_form {
    .location_container {
        padding: 1.5rem;
        border-radius: 3px;
        background-color: #F5F5F5;
        .location_list {
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