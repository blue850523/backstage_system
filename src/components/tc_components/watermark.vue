<template>
    <div class="parent">
        <div class="watermarked_new" :data-watermark="watermark_name"></div>
    </div>
</template>
<script>
export default {
    name:"WaterMarker",
    created() {
        this.watermark_name = sessionStorage["staff_no"]
    },
    mounted() {
        (function watermark_init() {
            setTimeout(function () {
                Array.from(document.querySelectorAll(".watermarked")).forEach(
                    function (el) {
                        el.dataset.watermark = generate_watermark(el, 1000);
                    }
                );

                Array.from(
                    document.querySelectorAll(".watermarked_new")
                ).forEach(function (el) {
                    el.dataset.watermark = generate_watermark(el, 6000);
                });
            }, 50);

            function generate_watermark(el, times) {
                var space = "          ";
                var watermark = el.dataset.watermark.split(space)[0];
                watermark = new Array(times).fill(watermark).join(space);
                return watermark + space;
            }
        })();
    },
    data() {
        return {
            watermark_name:"尚未登入"
        }
    },
    watch:{
        
    },
    methods: {
        returnUserAcc:function () {  
            
        }
    },
};
</script>
<style lang="scss">
.watermarked {
    position: relative;
    overflow: hidden;
}

.watermarked img {
}

.watermarked::before {
    position: absolute;
    top: -75%;
    left: -75%;

    display: block;
    width: 200%;
    height: 200%;

    transform: rotate(-45deg);
    content: attr(data-watermark);
    font-size: 36px;
    opacity: 0.7;
    line-height: 6em;
    letter-spacing: 5px;
    color: #eee;
}

.watermarked_new {
    /*position: relative;
    overflow: hidden;*/
}

.watermarked_new img {
}

.watermarked_new::before {
    position: absolute;
    top: -125%;
    left: -125%;
    display: block;
    width: 200%;
    height: 200%;
    transform: rotate(-55deg);
    content: attr(data-watermark);
    font-size: 36px;
    opacity: 0.7;
    line-height: 1.5em;
    letter-spacing: 2px;
    color: #eee;
    // z-index: -1;
}

.watermarked_new_popup {
    /*position: relative;
    overflow: hidden;*/
}

.watermarked_new_popup img {
}

.watermarked_new_popup::before {
    position: absolute;
    top: -125%;
    left: -125%;
    display: block;
    width: 200%;
    height: 200%;
    transform: rotate(-55deg);
    content: attr(data-watermark);
    font-size: 36px;
    opacity: 0.7;
    line-height: 1.5em;
    letter-spacing: 2px;
    color: #eee;
    /*z-index: 999;*/
}

/*
.watermarked_new::before {
	position: absolute;
	top: -75%;
	left: -75%;
	display: block;
	width: 200%;
	height: 200%;
	transform: rotate(-45deg);
	content: attr(data-watermark);
	font-size: 36px;
	opacity: 0.7;
	line-height: 6em;
	letter-spacing: 5px;
	color: #eee;
}*/

.watermark-container {
    position: relative;
}

.watermark-container .parent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
}

.watermark-container > *:not(.parent) {
    position: relative;
    z-index: 1;
}
</style>
