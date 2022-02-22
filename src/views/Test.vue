<template>
    <div class="about">
        <button @click="test" class="btn btn-danger">5566</button>
        <p>456789</p>
    </div>
</template>
<script>
export default {
    name: "Test",
    data() {
        return {
            // SysUI_init()
        };
    },
    created() {
        this.getList();
    },
    mounted() {
        
    },
    methods: {
        test: function () {
            // bootbox.alert("Hello world!", function() {
            //       console.log("Alert Callback");
            //   });
            SysUI.dangerConfirm("title","msg")
        },
        getList: async function () {
            let records = await $.post(
                `${process.env.VUE_APP_API_HOST}/api/content/index.php?route=system-manage/department/list`
            );
            console.log(`records...............`, records);
        },
    },
};
</script>
