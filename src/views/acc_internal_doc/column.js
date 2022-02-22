import i18n from '@/common/plugins/vue-i18n'
// i18n.tc('GENERAL.DEPARTMENT')
const columnArray = () => {
    return [
        {
            label: i18n.tc('acc_internal_doc.track_status'),
            key: "track_status",
            scale:1 
        },
        {
            label: i18n.tc('acc_internal_doc.account_no'),
            key: "account_no",
            scale:1 
        },
        {
            label: i18n.tc('acc_internal_doc.account_name'),
            key: "account_name",
            scale:1 
        },
        {
            label: i18n.tc('acc_internal_doc.doc_type'),
            key: "doc_type",
            scale:1 
        },
        {
            label: i18n.tc('acc_internal_doc.amount'),
            key: "amount",
            scale:1 
        },
        {
            label: i18n.tc('acc_internal_doc.signatory_name'),
            key: "signatory_name",
            scale:1 
        },
        {
            label: i18n.tc('acc_internal_doc.signatory_nationality'),
            key: "signatory_nationality",
            scale:1 
        },
        {
            label: i18n.tc('acc_internal_doc.effective_date'),
            key: "effective_date",
            scale:1 
        },
        {
            label: i18n.tc('acc_internal_doc.legal_department_remark'),
            key: "legal_department_remark",
            scale:1 
        },
        {
            label: i18n.tc('acc_internal_doc.center_remark'),
            key: "center_remark",
            scale:1 
        },
        {
            label: i18n.tc('acc_internal_doc.updated_by'),
            key: "updated_by",
            scale:1 
        },


    ]
}


export default columnArray
