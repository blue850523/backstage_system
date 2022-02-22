<template>
    <div :class="size">
        <div class="form-group row nopadding">
            <div class="nopadding" :class="label_size">
                <div class="filter-title">
                    <label class="control-label" :for="id">{{ label }}</label>
                </div>
            </div>
            <div class="nopadding" :class="customization_size">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "filter_customization",
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
            default: "col-md-3",
        },
        label_size: {
            type: String,
            default: "col-5",
        },
        customization_size: {
            type: String,
            default: "col-5",
        },
    },
};
</script>
<style lang=""></style>
