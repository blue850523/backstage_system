<template>
    <div :class="size">
        <div class="form-group row nopadding">
            <div class="nopadding" :class="label_size">
                <div class="filter-title">
                    <label class="control-label" :for="id">{{ label }}</label>
                </div>
            </div>
            <div class="nopadding" :class="input_size">
                <select 
                    :id="id" 
                    :name="name" 
                    class="form-select" 
                    @change="$emit('input', $event.target.value)">
                    <option
                        v-for="(item, index) in options"
                        :key="index"
                        :value="item.value"
                    >
                        {{ item.option || item.name || item.text}}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "filter_select_field",
    props: {
        label: {
            type: String,
            default: "請傳入Label",
        },
        name: {
            type: String,
            default: "請傳入Name",
        },
        id: {
            type: String,
            default: "id" + this,
        },
        options: {
            type: Array,
            default: [{ value: 0, option: "test" }],
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
    },
};
</script>