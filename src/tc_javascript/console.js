console.log = (function (oriFunc) {
    return function () {
        if (location.href.includes("http://localhost")) {
            oriFunc.call(console, ...arguments);
        }
    };
})(console.log);
