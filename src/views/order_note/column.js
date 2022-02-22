
const columnArray = () => {
    return [
        {
            label: "戶口編號",
            key: "account_no",
            scale: 1,
        },
        {
            label: "姓名",
            key: "name",
            scale: 1,
        },
        {
            label: "項目",
            key: "type",
            scale: 2,
        },
        {
            label: "內容",
            key: "content",
            scale: 2,
        },
        {
            label: "開始日期",
            key: "start_time",
            scale: 2,
        },
        {
            label: "完成日期",
            key: "complete_time",
            scale: 2,
        },
        {
            label: "狀態",
            key: "status",
            scale: 1,
        },
        {
            label: "部門",
            key: "permission_departments",
            scale: 1,
        },
        {
            label: "職位",
            key: "staff_position",
            scale: 1,
        },
        {
            label: "所屬廳",
            key: "show_locations",
            scale: 2,
        },
        {
            label: "操作廳",
            key: "location",
            scale: 1,
        },
        {
            label: "最後修改時間",
            key: "updated_at",
            scale: 2,
        },
        {
            label: "經手人",
            key: "staff_name",
            scale: 1,
        }
    ]
}

export default columnArray
