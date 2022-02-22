window.require = window.require || window.parent.require
if (window.require && typeof module === 'object') {
    // window.$ = window.jQuery = window.require('jquery');
    window.jQuery = window.$ = module.exports;
}

let TC_EXE = null;
if (window.require) {
    const {ipcRenderer} = window.require('electron');
    let TC_EXE_API_CALLER = {
        api: function (api, params) {
            return new Promise((resolve, reject) => {
                ipcRenderer.send(api, params);
                ipcRenderer.once(api, function (event, response) {
                    console.log(api, response);
                    resolve(response);
                });
            });
        },
    };

    TC_EXE = new Proxy(TC_EXE_API_CALLER, {
        get(target, p, receiver) {
            return function (params) {
                return target.api(p, params);
            }
        }
    });

}
window.TC_EXE = TC_EXE;
// console.log('TC_EXE', window.TC_EXE);

setTimeout(function () {
    window.$('body').on('click', '[href], button', function (e) {
        // console.log('click', e);
        if (e.altKey) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
    })
}, 100);

export default TC_EXE