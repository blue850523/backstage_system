<template>
    <div id="DisplayColumn" class="modal fade" tabindex="-1" style="display: none;">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title">篩選顯示</span>
                    <div class="d-flex justify-content-end">
                        <button
                            type="button"
                            class="btn btn-p"
                            @click="select_all()"
                        >
                            全部剔選
                        </button>
                        <button
                            type="button"
                            class="btn btn-p"
                            @click="unselect_all()"
                            style="margin-left: 5px"
                        >
                            取消全選
                        </button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row align-items-start">
                        <div
                            v-for="(field, index) in fields"
                            :key="index"
                            class="col-md-2 field-item">
                            <label class="checkbox-label">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    :checked="is_field_display(field)"
                                    @change="toggle_field(field)"
                                    :disabled="is_field_required(field)"
                                />
                                {{ field.label }}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        data-dismiss="modal"
                        class="btn btn-new4"
                        @click="hide"
                        type="button"
                        style="min-width: 90px"
                    >
                        確定
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "DisplayColumn",
    props: {
        fields: {
            type: Array,
        },
        table_hidden_fields: {
            type: Array,
        },
    },
    data() {
        return {
            // fields: [],
            hidden_fields: [],
        };
    },
    methods: {
        show: function () {
            var vm = this;
            // vm.hidden_fields = vm.table_hidden_fields;
            var modal = $("#DisplayColumn");
            SysUI.set_backdrop(modal, true);
            modal.modal("show");
        },
        hide: function () {
            $("#DisplayColumn").modal("hide");
        },
        is_field_display: function (field) {
            return (
                this.hidden_fields.indexOf(field.key) === -1 ||
                this.is_field_required(field)
            );
        },
        is_field_required: function (field) {
            return field.required === "true";
        },
        toggle_field: function (field) {
            
            var index = this.hidden_fields.indexOf(field.key);

            if (index === -1) {
                this.hidden_fields.push(field.key);
            } else {
                this.hidden_fields.splice(index, 1);
            }
            
            this.submit();
        },
        select_all: function () {
            this.fields.forEach((it) => {
                let index = this.hidden_fields.indexOf(it.key);
                if (index != -1) this.hidden_fields.splice(index, 1);
            });
            this.submit();
        },
        unselect_all: function () {
            this.fields.forEach((it) => {
                let index = this.hidden_fields.indexOf(it.key);
                if (it.required != "true" && index == -1)
                    this.hidden_fields.push(it.key);
            });
            this.submit();
        },
        submit: function () {
            this.$emit('hidden_fields', this.hidden_fields)
        },

    },
};
</script>
<style lang="scss" scoped>
.field-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem 0 1rem 1rem;
    .form-check-input {
        margin-right: .5rem;
    }
}
</style>
