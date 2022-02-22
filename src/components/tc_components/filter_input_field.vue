<template>
    <div :class="size">
        <div class="form-group row nopadding">
            <div class="nopadding" :class="label_size">
                <div class="filter-title">
                    <label class="control-label" :for="id">{{ label }}</label>
                </div>
            </div>
            <div class="nopadding" :class="input_size">
                <input
                    :type="type"
                    :name="name"
                    :value="value"
                    :placeholder="label"
                    :maxlength="maxlength"
                    :id="id"
                    class="form-control"
                    @input="input($event)"
                />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "filter_input_field",
    props: {
        label: {
            type: String,
            default: "請傳入label",
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
        type: {
            type: String,
            default: "text",
        },
        value: {
            type: String,
            default: "",
        },
        maxlength: {
            type: String,
            default: "",
        },
        only_number: {
            type: Boolean,
            default: false,
        },
        only_big_en_and_number: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        input: function ($event) {
            if (this.only_number) {
                let value = $event.target.value
                let is_match = value.match(/[\d]+/g);
                $($event.target).val(is_match ? is_match[0] : "");
            } else {
                if (this.only_big_en) {
                    let value = $event.target.value;
                    $($event.target).val(value.replace(/[^\w\/]/ig,'').toUpperCase());
                }
            }
            this.$emit("input", $event.target.value);
        },
    },
};
</script>
