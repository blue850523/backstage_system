<template>
    <TCModal class="order_name_form" id="order_name_form" :title="title" ref="modal" :dialog_width="'1200px'" :modal-body-style="{'min-height': 'fit-content', 'max-height': 'auto', 'overflow': 'auto'}">
        <template #body>
            <div class="order_name_container watermark-container">
                <WaterMarker />
                <div class="row g-0 order_name_list">
                    <div class="form-group col-2">
                        <input 
                            class="form-check-input" 
                            type="checkbox" 
                            id="all_order_name_checkbox" 
                            @click="all_order_name_click($event)">
                        <label class="control-label" for="all_order_name_checkbox">全選</label>
                    </div>
                    <div class="form-group col-10 row g-0 align-items-start">
                        <div class="form-group col-2" v-for="(it, index) in order_name_list" :key="`order_name_item_${index}`">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                :value="it.order_name_id" 
                                :id="`order_name_checkbox_${index}`" 
                                v-model="select_order_name_id">
                            <label class="control-label" :for="`order_name_checkbox_${index}`">{{ it.name }}</label>
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
    name: "order_name_form",
    components: {
        TCModal,
        WaterMarker,
    },
    data: function () {
        return {
            title: "項目名稱",
            select_order_name_id: [],
            order_name_list: [
                {
                    name: "貸款",
                    order_name_id: 1
                },
                {
                    name: "利息",
                    order_name_id: 2
                },
                {
                    name: "佣金",
                    order_name_id: 3
                },
                {
                    name: "存卡",
                    order_name_id: 4
                },
                {
                    name: "開工留意",
                    order_name_id: 5
                },
                {
                    name: "場面",
                    order_name_id: 6
                },
                {
                    name: "注意",
                    order_name_id: 7
                },
                {
                    name: "補充文件",
                    order_name_id: 8
                },
                {
                    name: "集團備註",
                    order_name_id: 9
                },
            ]
        }
    },
    methods: {
        edit_record (title = "", order_name_id) {
            this.reset();
            if (title != "") {
                this.title = title;
            } else {
                this.title = "項目名稱";
            }
            this.select_order_name_id = JSON.parse(JSON.stringify(order_name_id));
            return this.show();
        },
        all_order_name_click ($event) {
            let checked = $event.target.checked + 0;

            let all_order_name_ids = this.order_name_list.map(it => it.order_name_id);

            if (checked === 1) {
                all_order_name_ids.forEach(it => {
                    if (this.select_order_name_id.indexOf(it) === -1) {
                        this.select_order_name_id.push(it)
                    }
                });
            } else {
                all_order_name_ids.forEach(it => {
                    if (this.select_order_name_id.indexOf(it) !== -1) {
                        this.select_order_name_id.splice(this.select_order_name_id.indexOf(it), 1);
                    }
                });
            }
        },
        save () {
            this.select_order_name_id.sort();
            this.hide(1);
        },
        show () {
            return this.$refs.modal.show();
        },
        hide (need_return_data = 0) {
            if (need_return_data) {
                return this.$refs.modal.hide(this.select_order_name_id);
            } else {
                return this.$refs.modal.hide();
            }
        },
        reset () {
            $("#all_order_name_checkbox").prop("checked", false);
        }
    }
}
</script>

<style lang="scss">
.order_name_form {
    .order_name_container {
        padding: 1.5rem;
        border-radius: 3px;
        background-color: #F5F5F5;
        .order_name_list {
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