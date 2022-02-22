import Vue from 'vue'

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
});

Vue.directive('tc-money', {
    componentUpdated: function (el, binding, vnode, oldVnode) {
        var modifiers = binding.modifiers;
        let positive = !!modifiers.positive;
        let dollar = !!modifiers.dollar;
        let thousand = !!modifiers.thousand;

        if (binding.arg instanceof Object) {
            if (!binding.arg.enabled) {
                return;
            }
        }

        if (!(el instanceof HTMLInputElement)) {
            el = el.querySelector('input');
        }

        if (el instanceof HTMLInputElement) {
            let decimal_places = 4;
            if (dollar) {
                decimal_places = 2;
            }

            if (thousand) {
                decimal_places = 1;
            }

            let regexp = "[\\d]+([.]?[\\d]{0," + decimal_places + "})?";
            if (!positive) {
                regexp = "[-]?(" + regexp + ")?"
            }
            regexp = new RegExp(regexp);

            var match = el.value.match(regexp);
            let value = match ? match[0] : "";

            if (value !== el.value) {
                var event = new Event('input', {bubbles: true});
                // var event2 = new Event('change', {bubbles: true});
                el.value = value;
                el.dispatchEvent(event);
                // el.dispatchEvent(event2);
            }
        }
    }
});

Vue.directive('tc-number', {
    componentUpdated: function (el, binding, vnode, oldVnode) {
        var modifiers = binding.modifiers;
        if (el instanceof HTMLInputElement) {
            let regex = /[\d]+/;
            if (modifiers.allow_negative) {
                regex = /[-]?([\d]+)?/;
            }
            let value = el.value + "";
            var match = value.match(regex);
            value = match ? match[0] : "";

            if (modifiers.normal) {
                if (value.indexOf('0') == 0 && value.length > 1) {
                    value = value.substring(1);
                }
                if (modifiers.allow_negative) {
                    if (value.indexOf('-') == 0 && value.indexOf('0') == 1 && value.length > 2) {
                        value = "-" + value.substring(2);
                    }
                }
            }

            if (value !== el.value) {
                var event = new Event('input', {bubbles: true});
                el.value = value;
                el.dispatchEvent(event);
            }
        }
    }
});

Vue.directive('tc-negative-number-red', function (el, binding, vnode, oldVnode) {
    let value = binding.value;
    if (value != null) {
        value = value + "";
        $(el).toggleClass('text-danger', value.indexOf('-') !== -1);
    }
});

Vue.directive('tc-detect', {
    bind: function (el, binding, vnode, oldVnode) {
        $(el).on('change', function (e) {
            let event = new CustomEvent('detect-change', {
                bubbles: true,
                detail: {
                    changed_el: e.target
                }
            })
            el.dispatchEvent(event);
        });
    },
});

// 只能輸入英數字
Vue.directive('tc-en-number', {
    componentUpdated: function (el, binding) {
        let modifiers = binding.modifiers;
        if (el instanceof HTMLInputElement) { // 判斷是否為HTML Input Element
            let regexp = new RegExp(/^[A-Za-z0-9]+/);
            if (modifiers.only_big) { // 只能輸入大寫
                regexp = new RegExp(/^[A-Z0-9]+/);
            }
            let value = el.value + "";
            var match = value.match(regexp);
            value = match ? match[0] : "";

            if (value !== el.value) { // 有出現英數字以外的字元時
                var event = new Event('input', {bubbles: true});
                el.value = value;
                el.dispatchEvent(event);
            }
        }
    }
});
//限制輸入1-100以內
Vue.directive('tc-hundred-number', {
    componentUpdated: function (el) {
        if (el instanceof HTMLInputElement) {
            let regexp = new RegExp(/^[1-9][0-9]?$/);

            let value = el.value + "";
            var match = value.match(regexp);
            value = match ? match[0] : "";
            
            if (value !== el.value) { // 有出現100以外的字元時
                var event = new Event('input', {bubbles: true});
                el.value = value;
                el.dispatchEvent(event);
                alert("只能設定1-99");
            }
        }
    }
});

Vue.directive('tc-limit-money', {
    componentUpdated: function (el, binding, vnode, oldVnode) {
        var modifiers = binding.modifiers;
        //vc-tc-limit-money.positive => 只保留正整數
        let positive = !!modifiers.positive;
        //vc-tc-limit-money.positive => 只保留小數點後兩位
        let dollar = !!modifiers.dollar;
        //vc-tc-limit-money.數字 => 只保留小數點前幾位 看帶數字多少
        let beforeDotLength=null

        for (const key in modifiers) {
            let regexpForNum = new RegExp(/^[0-9]+$/)
            if (key.match(regexpForNum)) {
                beforeDotLength=key
            }
        }
        if (binding.arg instanceof Object) {
            if (!binding.arg.enabled) {
                return;
            }
        }

        if (!(el instanceof HTMLInputElement)) {
            el = el.querySelector('input');
        }

        if (el instanceof HTMLInputElement) {
            let decimal_places = 4;
            if (dollar) {
                decimal_places = 2;
            }
            let regexp="[\\d]+([.]?[\\d]{0," + decimal_places + "})?";
            if (beforeDotLength) {
                regexp = `[\\d]{0,${beforeDotLength}}([.][\\d]{0,${decimal_places}})?`;
            }
            if (!positive) {
                regexp = "[-]?(" + regexp + ")?"
            }
            regexp = new RegExp(regexp);

            var match = el.value.match(regexp);
            let value = match ? match[0] : "";

            if (value !== el.value) {
                var event = new Event('input', {bubbles: true});
                // var event2 = new Event('change', {bubbles: true});
                el.value = value;
                el.dispatchEvent(event);
                // el.dispatchEvent(event2);
            }
        }
    }
});