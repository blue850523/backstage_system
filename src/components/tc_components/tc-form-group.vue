<template>
    <div class="form-group" :class="get_classes()">
        <label
            class="control-label"
            :class="get_label_class()"
            @click="clickable_label && $emit('label-click')"
            v-if="label && label.length"
            style="::before"
        >
            {{ label }}
        </label>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "tc_form_group",
    props: {
        hasError: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        grid_col_md_2: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: "",
        },
        clickable_label: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        get_classes: function () {
            return {
                "has-error": this.hasError,
                "has-custom-error": this.hasError,
                required: this.required,
                "grid-col-md-2": this.grid_col_md_2,
                "not-required":!this.required
            };
        },
        get_label_class: function () {
            return {
                "as-link": this.clickable_label,
            };
        },
    },
};
</script>
<style lang="scss">
label.as-link {
    color: #428bca;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
    text-decoration: none;
}

label.as-link:hover {
    color: #2a6496;
}

</style>
