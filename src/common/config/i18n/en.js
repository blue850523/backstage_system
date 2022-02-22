export const locale = {
    GENERAL: {
        NAV_OPTIONS: ["Home", "About", "Contact"],
        WELCOME_WORD: "Welcome to your Vue.js application",
        OK: "ok",
        CONTINUE: "continue",
        CANCEL: "cancel",
        GUEST: "guest",
        DEPARTMENT: "Department",
        LANGUAGE_ZH: "Chiness (Traditional)",
        LANGUAGE_EN: "English (US)",
    },
    sys_department: {
        name: "Department",
        created_at: "Create time",
        updated_at: "Update Time",
    },
    sys_position: {
        permission_location: "權限廳",
        user_position_name: "職位",
        staff_no: "職員編號",
        name: "姓名",
        id_no: "證件號碼",
        phone: "電話",
        default_location: "默認廳",
        last_login_time: "最後登錄",
        accountant: "賬房",
        account_manager: "主任",
        manager: "經理",
        general_manager: "總經理",
    },
    sys_staff: {
        loc_1: "貴賓廳1",
        loc_2: "貴賓廳2",
    },
    permissions: {
        0: "所有權限",
        1: "戶口管理",
        // 戶口管理
        "1_1": "戶口管理",
            "1_1_1": "按鍵",
                "1_1_1_1": "新開戶口",
                    "1_1_1_1_1": "是否股東",
                    "1_1_1_1_2": "除了以上欄位之外所有欄位",

            "1_1_2": "搜尋區塊",
                "1_1_2_1": "按鍵",
                    "1_1_2_1_1": "開戶廳",
                    "1_1_2_1_2": "戶組",
                    "1_1_2_1_3": "搜尋",
                    "1_1_2_1_4": "重置",
                "1_1_2_2": "欄位",
                    "1_1_2_2_1": "戶口編號",
                    "1_1_2_2_2": "姓名",
                    "1_1_2_2_3": "證件編號",
                    "1_1_2_2_4": "聯絡電話",
                    "1_1_2_2_5": "戶口類型",
                    "1_1_2_2_6": "層級",
                    "1_1_2_2_7": "介紹人",
                    "1_1_2_2_8": "生日日期",
                    "1_1_2_2_9": "舊曆生日日期",
                    "1_1_2_2_10": "戶口狀態",
                    "1_1_2_2_11": "開戶日期",
                    "1_1_2_2_12": "開戶開始日期",
                    "1_1_2_2_13": "開戶結束日期",
                    "1_1_2_2_14": "會員等級",
                    "1_1_2_2_15": "開戶類型",
                    "1_1_2_2_16": "凍結分類",

            "1_1_3": "列表區塊",
                "1_1_3_1": "按鍵",
                    "1_1_3_1_1": "篩選顯示",
                    "1_1_3_1_2": "列印",
                    "1_1_3_1_3": "匯出EXCEL",
                    "1_1_3_1_4": "詳細",
                        "1_1_3_1_4_1": "是否股東",
                        "1_1_3_1_4_2": "除了以上欄位之外所有欄位",
                    "1_1_3_1_5": "修改",
                        "1_1_3_1_5_1": "是否股東",
                        "1_1_3_1_5_2": "除了以上欄位之外所有欄位",
                    "1_1_3_1_6": "刪除",
                    "1_1_3_1_7": "確定開戶表",
                    "1_1_3_1_8": "修改地址",
                    "1_1_3_1_9": "設定風險",
                    "1_1_3_1_10": "更改戶口狀態",
                "1_1_3_2": "欄位",
                    "1_1_3_2_1": "操作",
                    "1_1_3_2_2": "戶口類型",
                    "1_1_3_2_3": "開戶類型",
                    "1_1_3_2_4": "會員等級",
                    "1_1_3_2_5": "戶口編號",
                    "1_1_3_2_6": "姓名",
                    "1_1_3_2_7": "生日日期",
                    "1_1_3_2_8": "聯絡電話",
                    "1_1_3_2_9": "層級",
                    "1_1_3_2_10": "戶組",
                    "1_1_3_2_11": "原始戶組",
                    "1_1_3_2_12": "上線",
                    "1_1_3_2_13": "經手人",
                    "1_1_3_2_14": "開戶廳",
                    "1_1_3_2_15": "開戶日期",
                    "1_1_3_2_16": "戶口狀態",
                    "1_1_3_2_17": "凍結分類",

        // 戶口格仔表
        "1_2": "戶口格仔表",

        "1_3": "戶口文件檔",
        // 借貸文件
        "1_3_1": "借貸文件",
            "1_3_1_1": "按鍵",
                "1_3_1_1_1": "新增借貸文件",

            "1_3_1_2": "搜尋區塊",
                "1_3_1_2_1": "按鍵",
                    "1_3_1_2_1_1": "戶組",
                    "1_3_1_2_1_2": "文件類型",
                    "1_3_1_2_1_3": "搜尋",
                    "1_3_1_2_1_4": "重置",

            "1_3_1_3": "列表區塊",
                "1_3_1_3_1": "按鍵",
                    "1_3_1_3_1_1": "附件",
                    "1_3_1_3_1_2": "修改",
                    "1_3_1_3_1_3": "篩選顯示",
                    "1_3_1_3_1_4": "列印",
                    "1_3_1_3_1_5": "匯出EXCEL",
                "1_3_1_3_2": "欄位",
                    "1_3_1_3_2_1": "操作",
                    "1_3_1_3_2_2": "追蹤狀態",
                    "1_3_1_3_2_3": "上線",
                    "1_3_1_3_2_4": "戶口編號",
                    "1_3_1_3_2_5": "姓名",
                    "1_3_1_3_2_6": "文件類型",
                    "1_3_1_3_2_7": "文件金額",
                    "1_3_1_3_2_8": "公司出借方",
                    "1_3_1_3_2_9": "簽署人",
                    "1_3_1_3_2_10": "國籍",
                    "1_3_1_3_2_11": "擔保人",
                    "1_3_1_3_2_12": "簽署日期",
                    "1_3_1_3_2_13": "文件有效期",
                    "1_3_1_3_2_14": "追討有效天數",
                    "1_3_1_3_2_15": "授權書",
                    "1_3_1_3_2_16": "支票銀行",
                    "1_3_1_3_2_17": "支票號碼",
                    "1_3_1_3_2_18": "支票金額",
                    "1_3_1_3_2_19": "過數記錄",
                    "1_3_1_3_2_20": "更新新債權人",
                    "1_3_1_3_2_21": "法律部備註",
                    "1_3_1_3_2_22": "中賬追蹤備註",
                    "1_3_1_3_2_23": "經手人",

        // 內部文件
        "1_3_2": "內部文件",
            "1_3_2_1": "按鍵",
                "1_3_2_1_1": "新增內部文件",

            "1_3_2_2": "搜尋區塊",
                "1_3_2_2_1": "按鍵",
                    "1_3_2_2_1_1": "戶組",
                    "1_3_2_2_1_2": "文件類型",
                    "1_3_2_2_1_3": "搜尋",
                    "1_3_2_2_1_4": "重置",

            "1_3_2_3": "列表區塊",
                "1_3_2_3_1": "按鍵",
                    "1_3_2_3_1_1": "附件",
                    "1_3_2_3_1_2": "修改",
                    "1_3_2_3_1_3": "篩選顯示",
                    "1_3_2_3_1_4": "列印",
                    "1_3_2_3_1_5": "匯出EXCEL",
                "1_3_2_3_2": "欄位",
                    "1_3_2_3_2_1": "操作",
                    "1_3_2_3_2_2": "追蹤狀態",
                    "1_3_2_3_2_3": "上線",
                    "1_3_2_3_2_4": "戶口編號",
                    "1_3_2_3_2_5": "姓名",
                    "1_3_2_3_2_6": "文件類型",
                    "1_3_2_3_2_7": "文件金額",
                    "1_3_2_3_2_8": "簽署人",
                    "1_3_2_3_2_9": "國籍",
                    "1_3_2_3_2_10": "生效日期",
                    "1_3_2_3_2_11": "法律部備註",
                    "1_3_2_3_2_12": "中賬追蹤備註",
                    "1_3_2_3_2_13": "經手人",

        // 資產資料(不動產)
        "1_3_3": "資產資料(不動產)",
            "1_3_3_1": "按鍵",
                "1_3_3_1_1": "新增不動產",

            "1_3_3_2": "搜尋區塊",
                "1_3_3_2_1": "按鍵",
                    "1_3_3_2_1_1": "戶組",
                    "1_3_3_2_1_2": "資產地區",
                    "1_3_3_2_1_3": "資產類型",
                    "1_3_3_2_1_4": "搜尋",
                    "1_3_3_2_1_5": "重置",

            "1_3_3_3": "列表區塊",
                "1_3_3_3_1": "按鍵",
                    "1_3_3_3_1_1": "附件",
                    "1_3_3_3_1_2": "修改",
                    "1_3_3_3_1_3": "篩選顯示",
                    "1_3_3_3_1_4": "列印",
                    "1_3_3_3_1_5": "匯出EXCEL",
                "1_3_3_3_2": "欄位",
                    "1_3_3_3_2_1": "操作",
                    "1_3_3_3_2_2": "上線",
                    "1_3_3_3_2_3": "戶口編號",
                    "1_3_3_3_2_4": "姓名",
                    "1_3_3_3_2_5": "資產地區",
                    "1_3_3_3_2_6": "資產類型",
                    "1_3_3_3_2_7": "資產地址",
                    "1_3_3_3_2_8": "業權人",
                    "1_3_3_3_2_9": "持份",
                    "1_3_3_3_2_10": "登記編號",
                    "1_3_3_3_2_11": "第三方已抵押",
                    "1_3_3_3_2_12": "公司抵押權",
                    "1_3_3_3_2_13": "市值",
                    "1_3_3_3_2_14": "估價日期",
                    "1_3_3_3_2_15": "全份淨值",
                    "1_3_3_3_2_16": "業權最後確認日期",
                    "1_3_3_3_2_17": "備註",
                    "1_3_3_3_2_18": "經手人",

        // 資產資料(公司)
        "1_3_4": "資產資料(公司)",
            "1_3_4_1": "按鍵",
                "1_3_4_1_1": "新增公司",

            "1_3_4_2": "搜尋區塊",
                "1_3_4_2_1": "戶組",
                "1_3_4_2_2": "公司所在地區",
                "1_3_4_2_3": "公司類型",
                "1_3_4_2_4": "搜尋",
                "1_3_4_2_5": "重置",

            "1_3_4_3": "列表區塊",
                "1_3_4_3_1": "按鍵",
                    "1_3_4_3_1_1": "附件",
                    "1_3_4_3_1_2": "修改",
                    "1_3_4_3_1_3": "篩選顯示",
                    "1_3_4_3_1_4": "列印",
                    "1_3_4_3_1_5": "匯出EXCEL",
                "1_3_4_3_2": "欄位",
                    "1_3_4_3_2_1": "操作",
                    "1_3_4_3_2_2": "上線",
                    "1_3_4_3_2_3": "戶口編號",
                    "1_3_4_3_2_4": "姓名",
                    "1_3_4_3_2_5": "公司所在地區",
                    "1_3_4_3_2_6": "公司類型",
                    "1_3_4_3_2_7": "公司名稱",
                    "1_3_4_3_2_8": "持份者",
                    "1_3_4_3_2_9": "持份",
                    "1_3_4_3_2_10": "公司註冊地址",
                    "1_3_4_3_2_11": "市值",
                    "1_3_4_3_2_12": "登記編號",
                    "1_3_4_3_2_13": "成立日期",
                    "1_3_4_3_2_14": "註冊資本",
                    "1_3_4_3_2_15": "抵押",
                    "1_3_4_3_2_16": "業權最後確認日期",
                    "1_3_4_3_2_17": "備註",
                    "1_3_4_3_2_18": "經手人",

        // 提醒管理
        "1_4": "提醒管理",
            "1_4_1": "按鍵",
                "1_4_1_1": "新增提醒",
                    "1_4_1_1_1": "集團備註",
                    "1_4_1_1_2": "除了集團備註之外所有欄位",

            "1_4_2": "搜尋區塊",
                "1_4_2_1": "按鍵",
                    "1_4_2_1_1": "項目名稱",
                    "1_4_2_1_2": "戶組",
                    "1_4_2_1_3": "可查詢部門",
                    "1_4_2_1_4": "顯示廳",
                    "1_4_2_1_5": "搜尋",
                    "1_4_2_1_6": "重置",

            "1_4_3": "列表區塊",
                "1_4_3_1": "按鍵",
                    "1_4_3_1_1": "篩選顯示",
                    "1_4_3_1_2": "列印",
                    "1_4_3_1_3": "匯出EXCEL",
                    "1_4_3_1_4": "詳細",
                        "1_4_3_1_4_1": "集團備註",
                        "1_4_3_1_4_2": "除了集團備註之外所有欄位",
                    "1_4_3_1_5": "修改",
                        "1_4_3_1_5_1": "集團備註",
                        "1_4_3_1_5_2": "除了集團備註之外所有欄位",
                "1_4_3_2": "欄位",
                    "1_4_3_2_1": "操作",
                    "1_4_3_2_2": "戶口編號",
                    "1_4_3_2_3": "姓名",
                    "1_4_3_2_4": "項目",
                    "1_4_3_2_5": "內容",
                    "1_4_3_2_6": "開始日期",
                    "1_4_3_2_7": "完成日期",
                    "1_4_3_2_8": "狀態",
                    "1_4_3_2_9": "部門",
                    "1_4_3_2_10": "職位",
                    "1_4_3_2_11": "所屬廳",
                    "1_4_3_2_12": "操作廳",
                    "1_4_3_2_13": "最後修改時間",
                    "1_4_3_2_14": "經手人",

        2: "轉碼管理",
        "2_1": "即時轉碼",
        "2_2": "轉碼記錄",
        "2_3": "轉碼匯總",
        "2_4": "場次記錄",
        "2_5": "轉碼活動設定",

        3: "圍數管理",
        "3_1": "截更管理",
        "3_2": "截大數管理",
        "3_3": "籌碼互換",

        4: "買碼管理",
        "4_1": "買碼管理",

        5: "存款管理",
        "5_1": "存款管理",
        "5_2": "存款匯總",
        "5_3": "存款流水",
        "5_4": "集團存款流水",

        6: "貸款管理",
        "6_1": "貸款還款",
        "6_2": "貸款流水",
        "6_3": "貸款匯總",
        "6_4": "利息管理",
        "6_5": "戶口批額設定",
        "6_6": "批額設定流水",

        7: "飛數管理",
        "7_1": "飛數記錄",
        "7_2": "飛數匯總",

        8: "場面數管理",
        "8_1": "場面數記錄",
        "8_2": "場次記錄",
        "8_3": "場面數匯總",
        "8_4": "場面截數",

        9: "佣金出糧管理",
        "9_1": "佣金設定",
        "9_2": "客戶欠數表",
        "9_3": "欠數流水",
        "9_4": "佣金還欠數表",
        "9_5": "出佣單管理",
        "9_6": "津貼管理",
        "9_7": "津貼流水",

        10: "碼糧管理",
        "10_1": "即出碼糧",
        "10_2": "即出紀錄",

        11: "賭檯系統",
        "11_1": "賭房管理",
        "11_2": "賭檯記錄",
        "11_3": "上下數記錄",

        12: "話機管理",
        "12_1": "通話紀錄",
        "12_2": "錄音記錄",
        "12_3": "驗證記錄",

        13: "系統管理",
        "13_1": "列印設置",
        "13_2": "職員管理",
        "13_3": "職位管理",
        "13_4": "部門管理",

        14: "報表",
    },
};
