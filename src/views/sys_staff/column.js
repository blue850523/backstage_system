import i18n from "@/common/plugins/vue-i18n";
// i18n.tc('GENERAL.DEPARTMENT')
const columnArray = () => {
    return [
        {
            label: i18n.tc("sys_position.permission_location"),
            key: "permission_location",
            scale: 1,
        },
        {
            label: i18n.tc("sys_position.user_position_name"),
            key: "user_position_name",
            scale: 1,
        },
        {
            label: i18n.tc("sys_position.staff_no"),
            key: "staff_no",
            scale: 1,
        },
        {
            label: i18n.tc("sys_position.name"),
            key: "name",
            scale: 1,
        },
        {
            label: i18n.tc("sys_position.id_no"),
            key: "id_no",
            scale: 1,
        },
        {
            label: i18n.tc("sys_position.phone"),
            key: "phone",
            scale: 1,
        },
        {
            label: i18n.tc("sys_position.default_location"),
            key: "default_location",
            scale: 1,
        },

        {
            label: i18n.tc("sys_position.accountant"),
            key: "accountant",
            scale: 1,
        },
        {
            label: i18n.tc("sys_position.account_manager"),
            key: "account_manager",
            scale: 1,
        },
        {
            label: i18n.tc("sys_position.manager"),
            key: "manager",
            scale: 1,
        },
        {
            label: i18n.tc("sys_position.general_manager"),
            key: "general_manager",
            scale: 1,
        },
        {
            label: i18n.tc("sys_position.last_login_time"),
            key: "last_login_time",
            scale: 1,
        },
    ];
};

export default columnArray;
