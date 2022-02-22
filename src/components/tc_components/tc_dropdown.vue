<template>
    <select
        class="form-select"
        @change="
            change($event);
            validate;
        "
        :disabled="disabled"
    >
        <option :value="emptyValue" v-if="allowEmpty">{{ emptyText }}</option>

        <!-- default slot, so that for general purpose -->
        <!-- so far special purpose used in tc-dropdown-location-->
        <slot>
            <option
                v-for="(option, index) in options"
                :key="index"
                :value="option.value"
                :selected="option.value === value"
                :disabled="option.disabled"
            >
                {{ option.text || option.name }}
            </option>
        </slot>
    </select>
</template>
<script>
export default {
    name: "TCDropdown",
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: null,
        options: {
            type: Array,
            default: () => {
                return [
                    {
                        text: "請傳入資料 須包含text或name 以及value",
                        value: "",
                        disabled: false,
                    },
                ];
            },
        },
        allowEmpty: {
            type: Boolean,
            default: true,
        },
        emptyText: {
            type: String,
            default: "",
        },
        emptyValue: {
            type: [String, Number, Object, Boolean, null],
            default: null,
        },
        validate: Function,
        disabled: Boolean,
    },
    methods: {
        change: function ($event) {
            this.$emit("change", $event.target.value);
        },
    },
};
</script>
<style lang=""></style>
