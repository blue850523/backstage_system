<template>
    <div class="modal fade" ref="modal" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1">
        <div class="modal-dialog modal-lg" :style="get_dialog_style()">
            <div class="modal-content watermark-container">
                <WaterMarker />
                <div class="modal-header">
                    <slot name="header">
                        <span class="modal-title">
                            {{ title }}
                        </span>
                    </slot>
                </div>

                <div ref="modal_body" class="modal-body" :style="get_modal_body_style()">
                    <!-- 勿刪 -->
                    <input style="display:none">
                    <input type="password" style="display:none">
                    <!-- 勿刪 -->
                    <slot name="body"></slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <button class="btn btn-new4" @click="hide()">
                            離開
                        </button>
                    </slot>
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
import WaterMarker from "./watermark.vue";
export default {
    name: "tc-modal",
    components: { 
        WaterMarker 
    },
    data: function () {
        return {
            p_resolve: null,
        };
    },
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        title: {
            type: String,
            default: "未獲取Tittle",
        },
        dialogStyle: Object,
        modalBodyStyle: Object,
        body_min_height: {
            type: String,
            default: "680px",
        },
        dialog_width: {
            type: String,
            default: "1600px",
        },
    },
    created: function () {},
    computed: {},
    methods: {
        get_dialog_style: function () {
            return Object.assign({
                "max-width": this.dialog_width,
            }, this.dialogStyle
            );
        },
        get_modal_body_style: function () {
            return Object.assign({ 
                "min-height": this.body_min_height, 
                "max-height": "680px"
            }, this.modalBodyStyle);
        },
        show: function () {
            var modal = $(this.$refs.modal);
            modal.modal("show");
            SysUI.set_backdrop(modal, true);
            $(this.$refs.modal_body).scrollTop(0);

            return new Promise((resolve) => (this.p_resolve = resolve));
        },
        hide: function (value) {
            $(this.$refs.modal).modal("hide");
            this.p_resolve(value);
        },
    },
};
</script>
