/**
 * 表單驗證required必填
 * 
 * @param {Element} form
 * @param {Boolean} need_return true = 會回傳true, false; false = 不會回傳值
 */
check_form_is_valid = function (form, need_return = true) {
    remove_form_has_error(form);
    let invalid_fields = form.find(".form-group *:invalid, input[required]:placeholder-shown");

    if (invalid_fields.length > 0) {
        invalid_fields.each((index, it) => {
            $(it).closest('.form-group').addClass("has-error");
        });
    }

    if (need_return)
        return invalid_fields.length === 0;
}

/**
 * 清除所有has-error class
 * 
 * @param {Element} form
 */
remove_form_has_error = function (form) {
    form.find(".has-error").removeClass("has-error");
}