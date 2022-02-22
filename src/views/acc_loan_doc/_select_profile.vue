<template>
    <div>
        <TCModal
            id="select_profile"
            :title="UI.title"
            ref="modal"
            body_min_height="fit-content"
            dialog_width="600px"
        >
            <template #body>
                <div class="align-items-center row container">
                    <table class="table table-hover" v-if="profiles.length">
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>戶口角色</th>
                                <th>出生年月日</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                @click="selectProfile(profile)"
                                v-for="(profile, index) in profiles"
                                :key="index"
                                style="cursor: pointer"
                            >
                                <td>{{ profile.name_full }}</td>
                                <td></td>
                                <td>{{ profile.solar_birthday }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else>
                        請先輸入戶口編號
                    </div>
                </div>
            </template>
            <template #footer> </template>
        </TCModal>
    </div>
</template>
<script>
import TCModal from "@/components/tc_components/tc-modal.vue";
import TCFormGroup from "@/components/tc_components/tc-form-group.vue";

export default {
    name: "select_profile",
    components: {
        TCModal,
        TCFormGroup,
    },
    data() {
        return {
            UI: {
                title: "簽署人",
            },
            profiles: [],
        };
    },
    methods: {
        selectProfile(profile) {
            this.$emit("sendProfile", profile);
            this.hide()
        },
        hide: function () {
            return this.$refs.modal.hide();
        },
        show: function (profiles) {
            this.profiles = profiles;
            return this.$refs.modal.show();
        },
    },
};
</script>
<style lang="scss"></style>
