// $(document).ready( function() {
//   Array.from(document.querySelectorAll('.watermarked')).forEach(function(el) {
//   el.dataset.watermark = (el.dataset.watermark + '          ').repeat(1000);
// });
//
// 	Array.from(document.querySelectorAll('.watermarked_new')).forEach(function(el) {
//   el.dataset.watermark = (el.dataset.watermark + '          ').repeat(6000);
// });
// });

$(document).ready(function () {
    watermark_init();
});

function watermark_init() {
    setTimeout(function () {
        // console.log('watermark_init');

        Array.from(document.querySelectorAll('.watermarked')).forEach(function (el) {
            el.dataset.watermark = generate_watermark(el, 1000);
        });

        Array.from(document.querySelectorAll('.watermarked_new')).forEach(function (el) {
            el.dataset.watermark = generate_watermark(el, 6000);
        });

    }, 50);

    function generate_watermark(el, times) {
        var space = '          ';
        var watermark = el.dataset.watermark.split(space)[0];
        watermark = (new Array(times)).fill(watermark).join(space);
        return watermark + space;
    }
}