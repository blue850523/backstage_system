<template>
    <div id="page-remark" class="page_remark noselect" v-cloak style="text-align: right;" v-html="html">
    </div>
</template>

<script>
export default {
    name: "page_remark",
    props: {
        html: {
            type: String,
            default: "",
        }
    }
}
</script>