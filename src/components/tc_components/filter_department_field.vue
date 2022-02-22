<template>
    <div :class="size">
        <div class="form-group row nopadding">
            <div class="nopadding" :class="label_size">
                <div class="filter-title">
                    <a href="#" class="control-label" @click="open_department_form()">
                        {{ label }}
                    </a>
                </div>
            </div>
            <div class="nopadding" :class="input_size">
                <input 
                    class="form-control" 
                    :placeholder="label" 
                    :value="select_department_label"
                    disabled
                />
                <input
                    type="hidden" 
                    class="form-control" 
                    :id="id"
                    :name="name"
                    :value="value" 
                    @input="input($event)"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "filter_department_field",
    data: function () {
        return {
        }
    },
    props: {
        label: {
            type: String,
            default: "可查閱部門",
        },
        name: {
            type: String,
            default: "請傳入name",
        },
        id: {
            type: String,
            default: "",
        },
        size: {
            type: String,
            default: "col-3",
        },
        label_size: {
            type: String,
            default: "col-5",
        },
        input_size: {
            type: String,
            default: "col-5",
        },
        value: {
            type: Array,
            default: [],
        },
    },
    computed: {
        select_department_label () {
            let label = "";

            if (this.value.length > 0) {
                label = `已選擇${this.value.length}個`;
            }

            return label;
        }
    },
    methods: {
        input: function ($event) {
            this.$emit("input", $event.target.value);
        },
        open_department_form () {
            this.$emit("emitOpenDepartmentForm", this.value);
        },
    },
};
</script>