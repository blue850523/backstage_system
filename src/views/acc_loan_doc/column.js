import i18n from '@/common/plugins/vue-i18n'
// i18n.tc('GENERAL.DEPARTMENT')
const columnArray = () => {
    return [
        {
            label: i18n.tc('acc_loan_doc.track_status'),
            key: "track_status",
            scale:1 
        },
        // {
        //     label: i18n.tc('acc_loan_doc.upper_line'),
        //     key: "upper_line",
        //     scale:1 
        // },
        {
            label: i18n.tc('acc_loan_doc.account_no'),
            key: "account_no",
            scale:1 
        },
        {
            label: '姓名',
            key: "account_name",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.doc_type'),
            key: "doc_type",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.amount'),
            key: "amount",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.lessor_company'),
            key: "lessor_company",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.signatory_name'),
            key: "signatory_name",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.signatory_nationality_title'),
            key: "signatory_nationality",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.guarantor_name'),
            key: "guarantor_name",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.signed_date'),
            key: "signed_date",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.duration'),
            key: "duration",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.expire_date'),
            key: "expire_date",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.has_poa'),
            key: "has_poa",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.cheque_bank'),
            key: "cheque_bank",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.cheque_number'),
            key: "cheque_number",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.cheque_amount'),
            key: "cheque_amount",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.has_transfer_record'),
            key: "has_transfer_record",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.creditor_updated_by'),
            key: "creditor_updated_by",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.legal_department_remark'),
            key: "legal_department_remark",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.center_remark'),
            key: "center_remark",
            scale:1 
        },
        {
            label: i18n.tc('acc_loan_doc.updated_by'),
            key: "updated_by",
            scale:1 
        },


    ]
}


export default columnArray
