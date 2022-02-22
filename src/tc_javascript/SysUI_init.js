function SysUI_init($, API_HOST) {
    var searchParams = new URLSearchParams(location.search);
    let user_token = searchParams.get("user_token");
    let userid = searchParams.get("userid");
    let locid = searchParams.get("locid");

    const SysUI_API = {
        syspin: `/core/admin/index.php?route=common/syspin&user_token=${user_token}`,
        verify_pin: `${process.env.VUE_APP_MOCK_API_RED}/verify_pin`,
        print: `${API_HOST}/api/content/index.php?route=print/generate-html`,
        print_receipt: `${API_HOST}/api/content/index.php?route=print/generate-format`,
        receipt_layout: `${API_HOST}/api/content/index.php?route=sys-print/getPrintSettingDetail`,
        printer: `${API_HOST}/api/content/index.php?route=sys-print/getPrintSetting`,
        excel: `${API_HOST}/api/content/index.php?route=print/excel`,
        com_ban: `/core/admin/index.php?route=common/syscomban&user_token=${user_token}&userid=${userid}&locid=${locid}`,
        select_action_ppl: `/core/admin/index.php?route=common/sysactionppl&user_token=${user_token}`,
        get_profile_info_by_id: `/core/index.php?route=apis/customer/getprofileinfobyid&user_token=${user_token}`,
    };

    var SysUI = {
        common_params: {
            user_token: user_token,
            userid: userid,
            locid: locid,
        },
        set_backdrop: function (dialog, backdrop) {
            backdrop = backdrop === true || backdrop == null;

            if (backdrop) {
                dialog.css("background", "rgba(0,0,0,0.4)");
            } else {
                dialog.css("background", "transparent");
            }
        },
        set_common_event: function (dialog) {
            dialog.keypress(function (event) {
                if (event.keyCode === 13) {
                    dialog.find(".btn-confirm").click();
                }
            });
        },
    };

    SysUI.all_button_disabled = function (action = 1) {
        let disable = action == 0 ? false : true;
        $("button").prop("disabled", disable);
    };

    SysUI.pi_card = function (value) {
        // 拍卡機轉碼格式
        // ;xxxxxxxxxx?
        if (value.indexOf(";") == 0 && value.indexOf("?") == 11)
            return (value =
                parseInt(value.replace(";", "").replace("?", ""), 16) + "");
        else return value;
    };

    SysUI.input_pin = async function (
        backdrop,
        permission,
        min_grade,
        top_access = "0"
    ) {
        $("*").blur();

        // SysUI.all_button_disabled(1);

        var html = `<div class="pinbox">
        <div class="form-group">
        <span style="font-size:14px;">輸入PIN</span>
        <input type="password" name="userpin" value="" placeholder="輸入PIN" id="input-userpin" class="form-control userpin" autocomplete="off" style="margin-top:5px;"/>
            <div>
            <span style="color:red;" class="tcpin_error-{{ tabid }}"> </span>
            </div>
        
        </div>
    </div>
    <div style="text-align:right;padding-top:10px;margin-bottom:-15px;">`;
        return new Promise(function (resolve, reject) {
            var dialog = bootbox.dialog({
                title: "輸入PIN",
                closeButton: false,
                backdrop: false,
                message: html,
                close: null,
                buttons: {
                    success: {
                        label: "確定",
                        className: "btn btn-new4 hidden",
                        callback: function () {
                            var value = SysUI.pi_card(
                                dialog.find("#input-userpin").val()
                            );

                            (async function () {
                                // let response = await $.post(
                                //     SysUI_API.verify_pin,
                                //     {
                                //         // user_token: SysUI.common_params.user_token,
                                //         // user_id: SysUI.common_params.userid,
                                //         // loc_id: SysUI.common_params.locid,
                                //         // pin: value,
                                //         // permission: permission || SysUI.input_pin.page_permission,
                                //         // min_grade: min_grade,
                                //         // top_access: top_access,
                                //     }
                                // );
                                let response = {
                                    returnCode: "00",
                                    need_check_in: false,
                                };
                                // console.log(response);
                                if (response.returnCode === "00") {
                                    if (response.need_check_in) {
                                        await SysUI.alert(
                                            "簽到",
                                            response.message ?? "請打卡(???",
                                            true
                                        );
                                        let user_id = await SysUI.check_in(
                                            true
                                        );
                                        if (user_id === false) {
                                            SysUI.input_pin.last_user_id = null;
                                            resolve(false);
                                            return;
                                        }

                                        SysUI.input_pin.last_user_id = user_id;
                                    } else {
                                        // SysUI.input_pin.last_user_id =
                                        //     response.user_id;
                                        resolve(true);
                                    }
                                    // SysUI.input_pin.user_token =
                                    //     SysUI.common_params.user_token;
                                    // SysUI.input_pin.user_id =
                                    //     SysUI.common_params.userid;
                                    // SysUI.input_pin.loc_id =
                                    //     SysUI.common_params.locid;
                                    // SysUI.input_pin.pin = value;
                                    // SysUI.input_pin.permission =
                                    //     permission ||
                                    //     SysUI.input_pin.page_permission;
                                    // SysUI.input_pin.min_grade = min_grade;
                                    // SysUI.input_pin.top_access = top_access;
                                } else {
                                    SysUI.input_pin.last_user_id = null;
                                    await SysUI.alert(
                                        "驗證失敗",
                                        response.message ??
                                            "PIN碼或拍卡碼不正確",
                                        true
                                    );
                                    resolve(false);
                                }
                            })();
                        },
                    },
                    main: {
                        label: "離開",
                        className: "btn btn-new4 hidden",
                        callback: function () {
                            SysUI.input_pin.last_user_id = null;
                            resolve(false);
                        },
                    },
                },
            });

            SysUI.set_backdrop(dialog, backdrop);
            dialog.on("shown.bs.modal", function () {
                dialog.find("#input-userpin").focus();
            });

            // SysUI.all_button_disabled(0);
        });
    };
    SysUI.input_pin.last_user_id = userid;
    SysUI.input_pin.page_permission = null;

    SysUI.com_ban = async function (backdrop) {
        var html = await $.post(SysUI_API.com_ban);
        html = $(html);
        html.find("#button-back-tab i").remove();
        return new Promise(function (resolve, reject) {
            var dialog = bootbox.dialog({
                title: false,
                backdrop: false,
                className: "text-center",
                message: html.find(".media"),
                buttons: false,
            });
            SysUI.set_backdrop(dialog, backdrop);
            var btn_back = $("#button-back-tab");
            btn_back.click(function () {
                dialog.modal("hide");
                resolve(true);
            });
        });
    };

    SysUI.confirm = async function (
        title,
        message,
        backdrop,
        confirm_text,
        cancel_text
    ) {
        if (confirm_text == null) {
            confirm_text = "確定";
        }

        if (cancel_text == null) {
            cancel_text = "取消";
        }

        return new Promise(function (resolve, reject) {
            var dialog = bootbox.dialog({
                title: `${title}`,
                backdrop: false,
                closeButton: false,
                message: message,
                buttons: {
                    success: {
                        label: confirm_text,
                        className: "btn btn-new4 btn-confirm",
                        callback: function () {
                            resolve(true);
                        },
                    },
                    main: {
                        label: cancel_text,
                        className: "btn btn-new4 btn-cancel",
                        callback: function () {
                            resolve(false);
                        },
                    },
                },
            });

            SysUI.set_backdrop(dialog, backdrop);
            SysUI.set_common_event(dialog);
        });
    };

    SysUI.select_action_ppl = async function (
        acc_id,
        title,
        backdrop,
        showAddAssistant = true
    ) {
        if (!title) {
            title = "交易人";
        }

        if (!(acc_id > 0)) {
            return false;
        }

        let html = await $.post(
            SysUI_API.select_action_ppl + "&acc_id=" + acc_id,
            { acc_id: acc_id }
        );
        return new Promise(function (resolve, reject) {
            if (html) {
                let dialog = bootbox.dialog({
                    title: `${title}`,
                    backdrop: false,
                    message: html,
                    closeButton: false,
                    buttons: {
                        success: {
                            label: "確定",
                            className: "btn btn-new4",
                            callback: function () {
                                var id = $(".sysactionpplList2").val();
                                resolve(
                                    $.post(SysUI_API.get_profile_info_by_id, {
                                        pid: id,
                                    })
                                );
                            },
                        },
                        main: {
                            label: "取消",
                            className: "btn btn-new4",
                            callback: function () {
                                resolve(false);
                            },
                        },
                    },
                });

                SysUI.set_backdrop(dialog, backdrop);

                if (!showAddAssistant) {
                    $(".addAssistant").hide();
                }
            }
        });
    };

    SysUI.alert = function (title, msg_list, backdrop) {
        if (!Array.isArray(msg_list)) {
            msg_list = [msg_list];
        }

        return new Promise(function (resolve) {
            let dialog = bootbox.dialog({
                title: `${title}`,
                closeButton: false,
                className: "",
                backdrop: false,
                message: `<div style="color: #F03447">${msg_list.join(
                    "<br/>"
                )}</div>`,
                buttons: {
                    success: {
                        label: "確定",
                        className: "btn btn-default btn-new4 btn-confirm",
                        callback: function () {
                            resolve();
                        },
                    },
                },
            });
            SysUI.set_backdrop(dialog, backdrop);
            SysUI.set_common_event(dialog);
        });
    };

    SysUI.message = function (title, msg_list, backdrop) {
        if (!Array.isArray(msg_list)) {
            msg_list = [msg_list];
        }

        return new Promise(function (resolve) {
            let dialog = bootbox.dialog({
                title: `${title}`,
                className: "",
                closeButton: false,
                backdrop: false,
                message: `<div class="">${msg_list.join("<br/>")}</div>`,
                buttons: {
                    success: {
                        label: "確定",
                        className: "btn btn-default btn-new4 btn-confirm",
                        callback: function () {
                            resolve();
                        },
                    },
                },
            });
            SysUI.set_backdrop(dialog, backdrop);
            SysUI.set_common_event(dialog);
        });
    };

    SysUI.loading = {
        loader: null,
        open: function (backdrop, container, position) {
            if (!container) {
                container = "body";
            }
            if (!position) {
                position = "absolute";
            }

            var loader = (SysUI.loading.loader = $(`
                <div style="position: ${position};top: 0;left: 0;right: 0;bottom: 0;display: none;z-index: 20001;">
                    <div style="display: flex;height: 100%;align-items: center;justify-content: center">
                        <img src="/core/admin/content/view/image/Spinner-1s-200px.gif" class="img-responsive" style="max-height: 100%" />
                    </div>
                </div>
            `));
            $(container).append(loader);
            SysUI.set_backdrop(loader, backdrop);
            loader.fadeIn();
        },
        close: function () {
            var loader = SysUI.loading.loader;
            if (loader) {
                loader.fadeOut(400, function () {
                    loader.remove();
                });
            }
            SysUI.loading.loader = null;
        },
    };

    SysUI.check_in = function (backdrop) {
        return new Promise(async function (resolve) {
            let dialog = bootbox.dialog({
                title: "簽到",
                className: "",
                closeButton: false,
                backdrop: false,
                message: `<div class="row" style="display: flex; align-items: center;flex-wrap: wrap">
                <div class="col-md-4 form-group"><label>職員編號：</label></div>
                <div class="col-md-8 form-group"><input class="form-control" id="check_in_username" placeholder="職員編號"/></div>
            
                <div class="col-md-4 form-group"><label>密碼：</label></div>
                <div class="col-md-8 form-group"><input class="form-control" id="check_in_password" placeholder="密碼" type="password"/></div>
            
                <div class="col-md-4 form-group"><label>PIN碼：</label></div>
                <div class="col-md-8 form-group"><input class="form-control" id="check_in_pin" placeholder="PIN碼" type="password"/></div>
            </div>`,
                buttons: {
                    success: {
                        label: "提交",
                        className: "btn btn-new4 btn-confirm",
                        callback: function () {
                            console.log("test");
                            let check_in_username = $(
                                "#check_in_username"
                            ).val();
                            let check_in_password = $(
                                "#check_in_password"
                            ).val();
                            let check_in_pin = SysUI.pi_card(
                                $("#check_in_pin").val()
                            );
                            (async function () {
                                let response = await $.post(
                                    `${API_HOST}/api/content/index.php?route=user/check-in`,
                                    {
                                        user_token:
                                            SysUI.common_params.user_token,
                                        loc_id: SysUI.common_params.locid,
                                        user_id: SysUI.common_params.userid,
                                        username: check_in_username,
                                        password: check_in_password,
                                        pin: check_in_pin,
                                    }
                                );

                                if (response.returnCode === "00") {
                                    if (response.message) {
                                        await SysUI.message(
                                            "簽到",
                                            response.message,
                                            true
                                        );
                                    }
                                    resolve(response.user_id);
                                } else {
                                    await SysUI.alert(
                                        "簽到",
                                        response.message || "簽到失敗",
                                        true
                                    );
                                    resolve(false);
                                }
                            })();
                        },
                    },
                    main: {
                        label: "離開",
                        className: "btn btn-new4",
                        callback: function () {
                            resolve(false);
                        },
                    },
                },
            });
            SysUI.set_backdrop(dialog, backdrop);
            SysUI.set_common_event(dialog);
            dialog.on("shown.bs.modal", function () {
                dialog.find("#check_in_username").focus();
            });
        });
    };

    SysUI.print_list = async function (data, bypass = false) {
        if (!bypass) {
            if (table && table.list.length == 0) {
                await SysUI.alert("訊息", "請先搜尋紀錄");
                return;
            }
        }
        if (!(await SysUI.input_pin(true))) {
            return;
        }
        // this.params.limit = -1;
        SysUI.loading.open();
        let response = await $.post(SysUI_API.print, {
            data: data,
            ...SysUI.common_params,
        });
        SysUI.loading.close();
        console.log(response);
        if (response.returnCode === "00") {
            let file = await base64_to_file(
                response.file,
                response.mime,
                response.filename
            );
            if (TC_EXE) {
                const print_config = {
                    url: URL.createObjectURL(file),
                    silent: true,
                    deviceName: response.printer_name,
                    color: false,
                    landscape: true,
                };

                TC_EXE.print(print_config);
            } else {
                console.log("TC_EXE not find");
                window.open(URL.createObjectURL(file));
            }
        } else {
            await SysUI.alert("訊息", response.message || "失敗");
        }
    };

    SysUI.export_excel = async function (data, bypass = false) {
        if (!bypass) {
            if (table && table.list.length == 0) {
                await SysUI.alert("訊息", "請先搜尋紀錄");
                return;
            }
        } else {
            if (!("limit" in data.params)) {
                await SysUI.alert("訊息", "請先搜尋紀錄");
                return;
            }
        }
        if (!(await SysUI.input_pin(true))) {
            return;
        }
        // this.params.limit = -1;
        SysUI.loading.open();
        let response = await $.post(SysUI_API.excel, {
            data: data,
            ...SysUI.common_params,
        });
        SysUI.loading.close();
        console.log(response);
        if (response.returnCode === "00") {
            let file = await base64_to_file(
                response.file,
                response.mime,
                response.filename
            );
            if (TC_EXE) {
                TC_EXE.save_file(response);
            } else {
                console.log("TC_EXE not find");
                let aLink = document.createElement("a");
                aLink.download = response.filename;
                aLink.href = window.URL.createObjectURL(file);
                aLink.click();
                // window.open(URL.createObjectURL(file));
            }
        } else {
            await SysUI.alert("訊息", response.message || "失敗");
        }
    };

    SysUI.print_receipt = async function (content, setting_id, printer_index) {
        const user_data = {
            user_id: SysUI.common_params.userid,
            loc_id: SysUI.common_params.locid,
            user_token: SysUI.common_params.user_token,
        };

        const print_content = await $.post(SysUI_API.print_receipt, {
            ...user_data,
            data: {
                api: SysUI_API.receipt_layout,
                setting_id: setting_id,
                content: JSON.stringify(content),
            },
        });

        if (print_content.returnCode === "00") {
            const file = await base64_to_file(
                print_content.file,
                print_content.mime,
                print_content.filename
            );

            if (TC_EXE) {
                const printer = await $.post(SysUI_API.printer, user_data);
                const print_config = {
                    url: URL.createObjectURL(file),
                    silent: true,
                    color: false,
                    landscape: true,
                    deviceName: printer.printer_data[printer_index].printer_id,
                };

                if (printer.returnCode === "00") {
                    TC_EXE.print(print_config);
                } else {
                    console.log("no printer");
                }
            } else {
                console.log("TC_EXE not find");
                window.open(URL.createObjectURL(file));
            }
        }
    };

    SysUI.dangerConfirm = async function (
        title,
        message,
        backdrop,
        confirm_text,
        cancel_text
    ) {
        if (confirm_text == null) {
            confirm_text = "確定";
        }

        if (cancel_text == null) {
            cancel_text = "取消";
        }

        return new Promise(function (resolve, reject) {
            var dialog = bootbox.dialog({
                title: `${title}`,
                closeButton: false,
                backdrop: false,
                message: `<div class="text-danger" style="color: red">${message}</div>`,
                buttons: {
                    success: {
                        label: confirm_text,
                        className: "btn btn-new4 btn-confirm",
                        callback: function () {
                            resolve(true);
                        },
                    },
                    main: {
                        label: cancel_text,
                        className: "btn btn-new4 btn-cancel",
                        callback: function () {
                            resolve(false);
                        },
                    },
                },
            });

            SysUI.set_backdrop(dialog, backdrop);
            SysUI.set_common_event(dialog);
        });
    };
    SysUI.clo = (log, style = "font-weight: bold;") => {
        if (location.href.includes("http://localhost")) {
            if (typeof log == "string") {
                console.log("%c %s", style, log);
            } else {
                console.log("%c %s", style, ...log);
            }
        }
    };
    SysUI.RemarkLoading = {
        loader: null,
        open: function (backdrop, container, position, remark) {
            if (!container) {
                container = "body";
            }
            if (!position) {
                position = "absolute";
            }
            let dotAnimation = `
            <style>
                @keyframes identifier {
                    from {
                        opacity:0
                    }
                
                    to {
                        opacity:1
                    }
                }
            </style>`;
            $("body").append(dotAnimation);

            var loader = (SysUI.loading.loader = $(`
                <div style="position: ${position};top: 0;left: 0;right: 0;bottom: 0;display: none;z-index: 20001;">
                    <div style="display: flex;height: 100%;align-items: center;justify-content: center;font-weight:bold">
                        <img src="/core/admin/content/view/image/Spinner-1s-200px.gif" class="img-responsive" style="max-height: 100%" />
                        
                        <p style='color:white'>${remark}</p>
                        <p id='secDot' 
                        style='
                        color:white;
                        animation: identifier .5s infinite ease alternate ;'
                        >&nbsp...</p>
                    </div>
                </div>
            `));
            $(container).append(loader);
            SysUI.set_backdrop(loader, backdrop);
            loader.fadeIn();
            //
        },
        close: function () {
            var loader = SysUI.loading.loader;
            if (loader) {
                loader.fadeOut(400, function () {
                    loader.remove();
                });
            }
            SysUI.loading.loader = null;
        },
    };

    SysUI.receipt_checkbox = function (val, type) {
        return val === type ? "x" : "";
    };

    SysUI.init = SysUI_init;

    setTimeout(function () {
        let event = new CustomEvent("SysUI_init", {
            detail: 1,
        });
        document.body.dispatchEvent(event);
        console.log("SysUI_init dispatched");
    }, 1);
    return SysUI;
}

export default SysUI_init;
