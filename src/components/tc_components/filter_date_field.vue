<template>
    <div :class="size">
        <div class="form-group row nopadding">
            <div class="nopadding" :class="label_size">
                <div class="filter-title">
                    <label class="control-label" :for="id">{{ label }}</label>
                </div>
            </div>
            <div class="nopadding" :class="input_size">
                <DatePicker 
                    :type="type" 
                    :name="name" 
                    :id="id" 
                    value-type="format" 
                    :placeholder="label"
                    v-model="dateVal"
                    @input="input()"
                />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "filter_input_field",
    data() {
        return {
            dateVal: ""
        }
    },
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
        input_size: {
            type: String,
            default: "col-5",
        },
        //指定模式
        //date|datetime|year|month|time|week
        type: {
            type: String,
            default: "date",
        },
        value: {
            type: String,
            default: "",
        },
    },
    methods: {
        input: function () {
            this.$emit("input", this.dateVal);
        },
    }
};
</script>
<style lang=""></style>
