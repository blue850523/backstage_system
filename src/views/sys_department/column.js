import i18n from '@/common/plugins/vue-i18n'
// i18n.tc('GENERAL.DEPARTMENT')
const columnArray = () => {
    return [
        {
            label: i18n.tc('sys_department.name'),
            key: "name",
            scale:1 
        },
        {
            label: i18n.tc('sys_department.created_at'),
            key: "created_at",
            scale:1
        },
        {
            label: i18n.tc('sys_department.updated_at'),
            key: "updated_at",
            scale:1
        },
    ]
}

export default columnArray
