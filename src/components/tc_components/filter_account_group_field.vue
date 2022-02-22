<template>
    <div :class="size">
        <div class="form-group row nopadding">
            <div class="nopadding" :class="label_size">
                <div class="filter-title">
                    <a href="#" class="control-label" @click="open_account_group_form()">
                        {{ label }}
                    </a>
                </div>
            </div>
            <div class="nopadding" :class="input_size">
                <input
                    class="form-control" 
                    :placeholder="label" 
                    :maxlength="maxlength"
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
    name: "filter_account_group_field",
    data: function () {
        return {
        }
    },
    props: {
        label: {
            type: String,
            default: "戶組",
        },
        name: {
            type: String,
            default: "account_group",
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
            type: String,
            default: "",
        },
        maxlength: {
            type: String,
            default: "10",
        },
        only_number: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        input: function ($event) {
            if (this.only_number) {
                let value = $event.target.value
                let is_match = value.match(/[\d]+/g);
                $($event.target).val(is_match ? is_match[0] : "");
            }
            this.$emit("input", $event.target.value);
        },
        open_account_group_form () {
            this.$emit("emitOpenAccountGroupForm", this.value);
        },
    },
};
</script>