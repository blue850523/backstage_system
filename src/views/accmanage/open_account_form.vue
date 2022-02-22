<template>
    <TCModal class="open_account_form" id="open_account_form" :title="UI.title" ref="modal" :dialog_width="'1200px'" :modal-body-style="{'min-height': 'fit-content', 'overflow': 'auto'}">
        <template #body>
            <div class="open-form" id="print_area">
                <div class="open-form-title">
                    <div class="open-form-title-left">
                        <div class="open-form-title-group" v-if="profile.length > 0">
                            <label class="open-form-label">日期<br/>Date:</label>
                            <input class="open-form-input" :value="profile[select_acc_no_index].created_at.split(' ')[0]" disabled />
                        </div>
                        <div class="open-form-title-group" v-if="profile.length > 0">
                            <label class="open-form-label">時間<br/>Time:</label>
                            <input class="open-form-input" :value="profile[select_acc_no_index].created_at.split(' ')[1]" disabled />
                        </div>
                    </div>
                    <div class="open-form-title-center">
                        <div>開戶申請表</div>
                        <div>APPLICATION FORM</div>
                    </div>
                    <div class="open-form-title-right" v-if="profile.length > 1">
                        <button 
                            class="btn acc-list-btn"
                            :class="{'active': index === select_acc_no_index}" 
                            v-for="(it, index) in profile" 
                            :key="`acc_no_btn_${index}`" 
                            @click="select_acc_no_index = index">
                            戶主 {{ index + 1 }}
                        </button>
                    </div>
                </div>

                <div class="open-form-body" v-for="(it, index) in post_profile" :key="`open_form_body_${index}`" v-show="select_acc_no_index === index">
                    <template v-if="it">
                        <div class="open-form-body-title">
                            個人資料 Personal Information
                        </div>
                        <div class="open-form-group-sm">
                            <label class="open-form-label">*戶口號碼 Account No.:</label>
                            <input class="open-form-input" v-model="account_no" disabled />
                        </div>
                        <div class="open-form-group-sm">
                            <label class="open-form-label">介紹人 Referee:</label>
                            <input class="open-form-input" v-model="it.referrer_name" disabled />
                        </div>
                        <div class="open-form-group-xl">
                            <label class="open-form-label">稱呼 Gender:</label>
                            <input class="form-check-input" type="radio" value="0" v-model="it.name_suffix" disabled />
                            <label class="open-form-label">先生 Mr.</label>
                            <input class="form-check-input" type="radio" value="1" v-model="it.name_suffix" disabled />
                            <label class="open-form-label">女士 Ms.</label>
                            <input class="form-check-input" type="radio" value="2" v-model="it.name_suffix" disabled />
                            <label class="open-form-label">小姐 Miss</label>
                        </div>
                        <div class="open-form-group-sm">
                            <label class="open-form-label">*中文姓 Family Name:</label>
                            <input class="open-form-input" v-model="it.name_last" disabled />
                        </div>
                        <div class="open-form-group-sm">
                            <label class="open-form-label">*中文名 Given Name:</label>
                            <input class="open-form-input" v-model="it.name_first" disabled />
                        </div>
                        <div class="open-form-group-sm">
                            <label class="open-form-label">會員卡號 VIP No.:</label>
                            <input class="open-form-input" disabled />
                        </div>
                        <div class="open-form-group-sm">
                            <label class="open-form-label">*英文姓 Family Name:</label>
                            <input class="open-form-input" v-model="it.name_last_en" disabled />
                        </div>
                        <div class="open-form-group-sm">
                            <label class="open-form-label">*英文名 Given Name:</label>
                            <input class="open-form-input mg-right" v-model="it.name_mid_en" disabled />
                            <input class="open-form-input mg-left" v-model="it.name_first_en" disabled />
                        </div>
                        <div class="open-form-group-sm">
                            <label class="open-form-label">*語言 Language:</label>
                            <input class="open-form-input" :value="show_language(it.speaking_languages)" disabled />
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">*出生日期(年/月/日) Date of Birth:</label>
                            <input class="open-form-input mg-right" :value="it.solar_birthday.split('-')[0]" disabled />
                            <span>/</span>
                            <input class="open-form-input mg-right mg-left" :value="it.solar_birthday.split('-')[1]" disabled />
                            <span>/</span>
                            <input class="open-form-input mg-left" :value="it.solar_birthday.split('-')[2]" disabled />
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">出生地點 Place of Birth:</label>
                            <input class="open-form-input" v-model="it.birth_place" disabled />
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">職業/行業 Occupation/Industry:</label>
                            <input class="open-form-input" v-model="it.occupation" disabled />
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">*國籍 Nationality:</label>
                            <input class="open-form-input" :value="nationality_map[it.nationality_id - 1]" disabled />
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">身份證 ID:</label>
                            <input class="open-form-input" :value="it.file_id ? it.file_id.serial_no : ''" disabled />
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">有效日期(年/月/日) Expiry Date:</label>
                            <input class="open-form-input mg-right" :value="it.file_id ? it.file_id.available_date.split('-')[0] : ''" disabled />
                            <span>/</span>
                            <input class="open-form-input mg-right mg-left" :value="it.file_id ? it.file_id.available_date.split('-')[1] : ''" disabled />
                            <span>/</span>
                            <input class="open-form-input mg-left" :value="it.file_id ? it.file_id.available_date.split('-')[2] : ''" disabled />
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">護照號碼 Passport No.:</label>
                            <input class="open-form-input" :value="it.file_passport ? it.file_passport.serial_no : ''" disabled />
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">有效日期(年/月/日) Expiry Date:</label>
                            <input class="open-form-input mg-right" :value="it.file_passport ? it.file_passport.available_date.split('-')[0] : ''" disabled />
                            <span>/</span>
                            <input class="open-form-input mg-right mg-left" :value="it.file_passport ? it.file_passport.available_date.split('-')[1] : ''" disabled />
                            <span>/</span>
                            <input class="open-form-input mg-left" :value="it.file_passport ? it.file_passport.available_date.split('-')[2] : ''" disabled />
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">通行證 Permit:</label>
                            <input class="open-form-input" :value="it.file_pass ? it.file_pass.serial_no : ''" disabled />
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">有效日期(年/月/日) Expiry Date:</label>
                            <input class="open-form-input mg-right" :value="it.file_pass ? it.file_pass.available_date.split('-')[0] : ''" disabled />
                            <span>/</span>
                            <input class="open-form-input mg-right mg-left" :value="it.file_pass ? it.file_pass.available_date.split('-')[1] : ''" disabled />
                            <span>/</span>
                            <input class="open-form-input mg-left" :value="it.file_pass ? it.file_pass.available_date.split('-')[2] : ''" disabled />
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">電郵 Email Address:</label>
                            <input class="open-form-input" v-model="it.social_email" disabled />
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">微信號 Wechat ID:</label>
                            <input class="open-form-input" v-model="it.social_wechat" disabled />
                        </div>
                        <div class="open-form-group-xl">
                            <label class="open-form-label">*聯絡電話 Contact No.:</label>
                            <div class="open-form-telephone">
                                (<input class="open-form-input telephone-area" :value="it.telephones[0] ? it.telephones[0].area_code : ''" disabled />)
                                <input class="open-form-input telephone-number" :value="it.telephones[0] ? it.telephones[0].telephone : ''" disabled />
                            </div>;
                            <div class="open-form-telephone">
                                (<input class="open-form-input telephone-area" :value="it.telephones[1] ? it.telephones[1].area_code : ''" disabled />)
                                <input class="open-form-input telephone-number" :value="it.telephones[1] ? it.telephones[1].telephone : ''" disabled />
                            </div>
                        </div>
                        <div class="open-form-group-sm">
                            <label class="open-form-label">住址 Address: 國家 Country</label>
                            <input class="open-form-input" :value="it.address ? it.address.country : ''" disabled />
                        </div>
                        <div class="open-form-group-sm">
                            <label class="open-form-label">省 Province</label>
                            <input class="open-form-input" :value="it.address ? it.address.province : ''" disabled />
                        </div>
                        <div class="open-form-group-sm">
                            <label class="open-form-label">特別行政區/市(縣,區) City</label>
                            <input class="open-form-input" :value="it.address ? it.address.city : ''" disabled />
                        </div>
                        <div class="open-form-group-lg">
                            <label class="open-form-label">街名 Street</label>
                            <input class="open-form-input" :value="it.address ? it.address.street : ''" disabled />
                        </div>
                        <div class="open-form-group-sm">
                            <label class="open-form-label">門牌號 No.</label>
                            <input class="open-form-input" :value="it.address ? it.address.no : ''" disabled />
                        </div>
                        <div class="open-form-group-xl">
                            <label class="open-form-label">大廈(樓層及單元)Building(Floor and Room)</label>
                            <input class="open-form-input" :value="it.address ? it.address.rest : ''" disabled />
                        </div>
                        <div class="open-form-group-xl">
                            <label class="open-form-label">備註 Remark:</label>
                            <input class="open-form-input" disabled />
                        </div>
                        <div class="open-form-group-xl">
                            <label class="open-form-label">
                                本人(戶主)聲明：在此同意及已詳細理解本開戶申請表背面的開戶聲明、條款及細則。
                                <br/>
                                I, the applicant, declare that i hereby agree and comprehend in detail the declaration, terms and conditions which are on the back page of this application form.
                            </label>
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">貴賓服務部職員<br/>VIP Services Staff:</label>
                            <input class="open-form-input" disabled />
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">戶主簽署<br/>Signature:</label>
                            <input class="open-form-input" disabled />
                        </div>
                        <div class="open-form-group-md open-form-travel">
                            <label class="open-form-label">客戶<br/>Client</label>
                            <div class="open-form-travel-radio">
                                <label class="open-form-label">
                                    <input class="form-check-input" type="radio" disabled />
                                    可以<br/>Can
                                </label>
                                <label class="open-form-label">
                                    <input class="form-check-input" type="radio" disabled />
                                    不可以<br/>Cannot
                                </label>
                            </div>
                            <label class="open-form-label">出示出入境紀錄證明<br/>Present his/her Statement of Travel Record(s)</label>
                        </div>
                        <div class="open-form-group-md">
                            <label class="open-form-label">賬房部職員<br/>Cashier:</label>
                            <input class="open-form-input" disabled />
                        </div>
                    </template>
                </div>

                <div class="opem-form-detail">
                    <div class="open-form-body-title">
                        開戶聲明
                    </div>
                    <label class="open-form-deatil-label">玆因 貴公司為本人開立賬戶,作為博彩之用途,本人鄭重作出下列聲明:</label>
                    <br/>
                    <ol class="ol type-a">
                        <li>本人承諾當接觸、介紹及跟進有關博彩客戶(包括本人)之時,須履行客戶盡責調查及遵守公司一切有關防止清洗黑錢及法規之政 策、指引、程序及指示。本人同時承諾完全配合公司去滿足及達成一切有關防止清洗黑錢政策及法規之標準。如本人未能满足或 達到公司有關防止清洗黑錢及法規之政策、指引、程序及指示,公司有權在無需通知本人的情況下自行決定終止與本人的業務關 係。客戶服務部,賬房部及其他相關部門的職員已成功完成公司防止清洗黑錢指引內制定的一系列程序,但不限於了解客戶程序 及盡職調查問題。本人已完全知悉並同意本人戶口佣金是經本人與所屬上線協商及公司確認後所設定。如對佣金有任何疑問或異 議,應先向上線查詢及協商!</li>
                        <li class="bold">※ 不論是否以書面或電話、訊息授權他人在本人戶口提取款項或籌碼,本人均承認之全部,同等於本人所借之款項,並願負起清還有關全部之債款,同時聲明放棄辯護權;</li>
                        <li class="bold">※ 若本人有任何逾期欠款,貴公司有權在無需預先通知本人的情況下,扣除本人之佣金或已托管之款項(戶口內之款項),直至所有欠款及利息被完全抵銷為止;</li>
                        <li>被授權人有權以本人名義按照開戶表內之簽名樣式簽署借款單、托管款項單據、提取存碼、船票及佣金等;</li>
                        <li>本人對於賬戶之運作完全負責;</li>
                        <li>貴公司對吾等賬戶所發出之月結單,均是確信沒有爭議及對吾等具有約束力;</li>
                        <li>如本人所開之賬戶是處於赤字狀態,吾等均會對結欠金額負上共同和個別的連帶責任;</li>
                        <li>在不損害貴公司權益下,貴公司可自主決定向本人進行追討索償,而貴公司的索償,本人將不會被抗訴,相關之合理法律費用和 支出扣付吾等的賬戶;</li>
                        <li>同意本人賬戶受貴公司之開戶條款的約束和管制,並且遵循隨時修定之開戶條款,和簽署相關附加文件;</li>
                        <li>本人知道明白,逾期欠款,貴公司可以司法或其他合法途徑向本人追討,逾期須按澳門法定利率的五倍計算並支付遲延的違約金, 同時,本人並必須支付有關司法全部費用、律師費和因追討而產生之全部其他的費用;</li>
                        <li>本人同意貴公司為確保服務質素及保障客戶與博彩中介人雙方利益可於接待客戶時收集交易中所涉及的文件、聲音及影像。</li>
                    </ol>

                    <div class="open-form-body-title">
                        條款及細則
                    </div>
                    <ol class="ol type-1">
                        <li>為提供更優質的服務,由 2013 年 6 月 1 日開始,本集團代客戶保存之佣金(以出佣金當日起計算)及呆滯戶托管款項(以托管款項當日計算)之保存期將為期一年,如客戶於保存期逾期後而不作提取,本集團有權代客戶處理該托管之款項,並收取相對的服務費用。</li>
                        <li>申請人向本公司提供的個人資料及本公司收集的聲音及影像,僅為上述事項、證明及/或核實博彩交易真確性之用。為此目的,有關文件及個人資料將按照第 8/2005 號法律《個人資料保護法》的規定進行處理。非經法律規定的情況,本公司不向第三人披露有關資料(除本公司相關工作人員和法律顧問及司法用途之外)。另根據法律規定,客戶可向博彩中介人要求查閱及更正其個人資料。</li>
                        <li>本申請表之申請人聲明和條款及細則如有變動,或附加文件,及申請人之聲明書等,所有增加之附件,均為本申請表之不可分割的組成部份,同具法律效力。</li>
                        <li>中英文本如有歧異,一概以中文本為準。</li>
                    </ol>

                    <div class="open-form-body-title">
                        Declaration
                    </div>
                    <ol class="ol type-a">
                        <li>Owing to the reason that I have decided to open an account in your Company for gambling purpose,I hereby declare solemnly that I perform KYC procedures and fully comply with Company's policy, guideline, procedures and instructions related to AML and compliance when I/we approach, introduce and follow up with my players or myself. I undertake to cooperate fully with the Company to satisfy with the Company's AML and compliance standard. It's at the sole discretion of the Company to terminate any business relationship with me if the Company doesn't satisfy with my compliance to the Company's policy, guideline, procedures and instructions related to AML and compliance. Staffs of Customer Services Department, Cage Department and other relevant staffs have performed all procedures, including but not limited to “Know Your Customers” and due diligence questions according to the AML guideline of the Company. I have fully read and agreed that my commission is concluded by the
                            negotiation between my upper line and myself and confirmed by the company. I shall first consult with my upper line if there's any dissent arising in connection with the commission.
                        </li>
                        <li class="bold">※ Under any circumstances or by any means such as written notice, phone call or message whether authorizing the third party to withdraw money or borrow chips from my account, I hereby accept that I shall be fully liable for all the loans and the subsequent repayment. I at the same time abandon the right of defense.</li>
                        <li class="bold">※ In the event of any overdue balance, Your Company has the right to offset the loan by my commission or money in trust without any prior notice until all the loan amount and relevant interest have been fully redeemed.</li>
                        <li>The authorized persons on behalf of me is entitled to sign either on the marker voucher and the depository receipt, to deposit or withdraw the chips or to receive ferry ticket and commission in accordance with the signature style on the authorization form;</li>
                        <li>I accept to take full responsibility in the management of the account;</li>
                        <li>Your statement of my/our account shall be conclusive and binding on me/us;</li>
                        <li>In the event that the account is in deficit condition, I/we shall be jointly and severally be liable to you for the deficit amount;</li>
                        <li>The Company shall have the right to raise up the prosecution on its own discretion, and I undertake all the claims from your company shall not be defended, and all the relevant legal charges and expenses shall be on my own.</li>
                        <li>You reserve your rights to the general terms and conditions on my/our account and I undertake to sign the relevant complimentary document;</li>
                        <li>I have fully understood and comprehended that any overdue balance will be prosecuted judicially or by any other legal approaches. In addition, the overdue liquidated damages will be subjected to FIVE times as the official rate of Macau SAR. Furthermore, I shall be solely responsible for bearing all the legal expenses and attorney's fee and other expenses derived from such prosecution.</li>
                        <li>To ensure the quality of services and to protect the interests of both parties, i allow you to collect all the related documents, sound tracks and videos during the transactions.</li>
                    </ol>

                    <div class="open-form-body-title">
                        Terms and Conditions
                    </div>
                    <ol class="ol type-1">
                        <li>Please note that we reserve the right to confiscate (starting from the commission issuing date) or dispose the fund of a dormant account (starting from the date of disposal) for over one year and charge an appropriate fee, effective from 1st June, 2013.</li>
                        <li>All the personal information provided by the applicant and all sound and video collected by the company shall be only used for confirmation and / or verification of the authenticity of betting transactions and the preceding paragraph. For this, the documents shall be disposed subject to the law of Personal Information Protection Act No.8/2005. Any non-law-based requisition, the company hereto has the right to refuse to disclose the information to the third party, except the staff of the Company hereto, legal counsel and judicial usages. In accordance with the law, the customer may request and review the personal information from the company.</li>
                        <li>All the extra addition appendix, including the declaration by the applicant, terms and conditions, other annex or the declaration letter, shall be deemed as the integral part of this application form with the same binding force.</li>
                        <li>In case of discrepancies between the Chinese and English version, the Chinese version shall apply and prevail.</li>
                    </ol>
                </div>
            </div>
        </template>

        <template #footer>
            <button class="btn btn-p" type="button" @click="print()" v-if="is_create">列印</button>
            <button class="btn btn-p" type="button" @click="save()" v-if="is_create">已簽開戶表</button>
            <button class="btn btn-new4" type="button" @click="hide()">離開</button>
        </template>
    </TCModal>
</template>

<script>
import TCModal from "@/components/tc_components/tc-modal.vue";

const API = {
    getAccountDetail: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/detail`,
    confirmOpenAccountForm: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/application/confirm`,
    getConfirmOpenAccountForm: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/application/view`,
};

export default {
    name: "open_account_form",
    components: {
        TCModal,
    },
    data: function () {
        return {
            UI: {
                title: "開戶表",
                title_create: "確定開戶表",
                title_detail: "開戶表",
            },
            is_create: false,
            account_no: "",
            account_id: "",
            account: {},
            profile: [],
            select_acc_no_index: 0,
            language_map: ["廣東話", "普通話", "英文", "菲律賓語", "韓文"],
            nationality_map:["中國", "香港", "澳門", "韓國", "菲律賓", "越南", "柬埔寨", "台灣", "馬來西亞", "澳洲", "美國", "新加坡", "日本"]
        }
    },
    computed: {
        post_profile () {
            let profile = [];

            if (this.is_create) {
                let same_params = [
                    "referrer_name", 
                    "gender", 
                    "name_suffix", 
                    "name_first",
                    "name_last",
                    "name_first_en",
                    "name_mid_en",
                    "name_last_en",
                    "solar_birthday",
                    "birth_place",
                    "speaking_languages",
                    "occupation",
                    "nationality_id",
                    "social_email",
                    "social_wechat",
                    "social_qq",
                    "social_whatsapp",
                    "social_telegram",
                    "social_weibo",
                    "social_line",
                ]

                if (this.profile.length > 0) {
                    profile = this.profile.map((it, index) => {
                        let obj = {
                            account_profile_id: it.profile_id,
                            parent_account_no: "", // 先傳空的
                            addresses: {
                                country: it.addresses[0].country,
                                province: it.addresses[0].province,
                                city: it.addresses[0].city,
                                no: it.addresses[0].no,
                                rest: it.addresses[0].rest,
                                street: it.addresses[0].street,
                                full_address: it.addresses[0].full_address,
                            },
                        }

                        same_params.forEach(it2 => {
                            obj[it2] = this.profile[index][it2];
                        });

                        obj.telephones = [];
                        obj.telephones[0] = {
                            area_code: it.telephones[0] ? it.telephones[0].area_code : "",
                            telephone: it.telephones[0] ? it.telephones[0].telephone : "",
                            order: it.telephones[0] ? it.telephones[0].order : "",
                            full_telephone: it.telephones[0] ? it.telephones[0].full_telephone : "",
                        }
                        if (it.telephones[1]) {
                            obj.telephones[1] = {
                                area_code: it.telephones[1] ? it.telephones[1].area_code : "",
                                telephone: it.telephones[1] ? it.telephones[1].telephone : "",
                                order: it.telephones[1] ? it.telephones[1].order : "",
                                full_telephone: it.telephones[1] ? it.telephones[1].full_telephone : "",
                            }
                        }

                        if (it.ids[0]) {
                            obj.file_id = {
                                type: "id",
                                serial_no: it.ids[0] ? it.ids[0].serial_no : "",
                                available_date: it.ids[0] ? it.ids[0].available_date : "",
                            }
                        }

                        if (it.passports[0]) {
                            obj.file_passport = {
                                type: it.passports[0] ? "passport" : "",
                                serial_no: it.passports[0] ? it.passports[0].serial_no : "",
                                available_date: it.passports[0] ? it.passports[0].available_date : "",
                            }
                        }

                        if (it.passs[0]) {
                            obj.file_pass = {
                                type: it.passs[0] ? "pass" : "",
                                serial_no: it.passs[0] ? it.passs[0].serial_no : "",
                                available_date: it.passs[0] ? it.passs[0].available_date : "",
                            }
                        }

                        return obj;
                    });
                }
            } else {
                profile = this.profile;
            }

            return profile;
        }
    },
    methods: {
        async edit_record (account_no, id, is_create) {
            this.is_create = is_create;
            this.UI.title = is_create ? this.UI.title_create : this.UI.title_detail;
            this.account_no = account_no;
            this.account_id = id;
            await this.init_profile();
            return this.show();
        },
        async init_profile () {
            if (this.is_create) {
                try {
                    let response = await this.axios.get(API.getAccountDetail, { params: {
                        account_id: this.account_id,
                    }}).then((res) => res);

                    if (response.status == 200) {
                        this.account = response.data.data.record.account;
                        this.profile = response.data.data.record.profile;
                    } else {
                        await SysUI.alert(this.UI.title, response.data.message);
                        return;
                    }
                } catch (error) {
                    console.log("error", error.response);
                    await SysUI.alert(this.UI.title, error.response.data.message);
                    return;
                }
            } else {
                try {
                    let response = await this.axios.get(API.getConfirmOpenAccountForm, { params: {
                        account_id: this.account_id,
                    }}).then((res) => res);

                    if (response.status == 200) {
                        this.profile = response.data.data.profile;
                    } else {
                        await SysUI.alert(this.UI.title, response.data.message);
                        return;
                    }
                } catch (error) {
                    console.log("error", error.response);
                    await SysUI.alert(this.UI.title, error.response.data.message);
                    return;
                }
            }

            this.$forceUpdate();
        },
        show_language (array) {
            if (array) {
                let languate = array.map(it => this.language_map[it - 1]);
                return languate.join("/");
            } else {
                return "";
            }
        },
        show_telephone (index, index2, type) {
            let telephone_data = this.profile[index].telephones;

            if ((index2 + 1) <= telephone_data.length) {
                return telephone_data[index2][type];
            } else {
                return "";
            }
        },
        print () {
            console.log("account", this.account);
            console.log("profile", this.profile);
            console.log("post_profile", this.post_profile);
        },
        async save () {
            SysUI.all_button_disabled(1);

            // if (!(await SysUI.input_pin(true))) {
            //     SysUI.all_button_disabled(0);
            //     return;
            // }

            try {
                let response = await this.axios.post(API.confirmOpenAccountForm, {
                    account_id: this.account_id,
                    profile: this.post_profile
                }).then((res) => res);

                SysUI.all_button_disabled(0);

                if (response.status == 200) {
                    this.hide(1);
                } else {
                    await SysUI.alert(this.UI.title, response.data.message);
                    return;
                }
            } catch (error) {
                SysUI.all_button_disabled(0);

                console.log("error", error.response);
                await SysUI.alert(this.UI.title, error.response.data.message);
                return;
            }
        },
        show () {
            return this.$refs.modal.show();
        },
        hide (need_refresh = 0) {
            this.reset();
            return this.$refs.modal.hide(need_refresh);
        },
        reset () {
            Object.assign(this.$data, this.$options.data());
        }
    }
}
</script>

<style lang="scss" scoped>
.open_account_form {
    .open-form {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 100%;
        padding: 1.5rem;
        overflow-y: auto;
        .open-form-title {
            display: flex;
            align-items: flex-end;
            width: 100%;
            .open-form-title-left {
                width: 33%;
                text-align: left;
            }
            .open-form-title-center {
                width: 34%;
                div {
                    font-size: 2.7rem;
                }
            }
            .open-form-title-right {
                width: 33%;
                height: 100%;
                text-align: right;
            }
        }
        .open-form-body,
        .opem-form-detail {
            display: flex;
            align-items: flex-end;
            flex-wrap: wrap;
            width: 100%;
            .open-form-body-title {
                width: 100%;
                margin-top: 3rem;
                font-size: 2.3rem;
                text-align: left;
            }
            .open-form-telephone {
                display: flex;
                width: 100%;
                margin-left: 1.5rem;
                .open-form-input {
                    margin: 0 .25rem;
                }
                .telephone-area {
                    flex: 1;
                    text-align: center;
                }
                .telephone-number {
                    flex: 8;
                }
            }
            .open-form-telephone:last-child {
                margin-right: 1.5rem;
            }
            .open-form-travel {
                align-items: center;
                .open-form-travel-radio {
                    display: flex;
                    flex-direction: column;
                    margin-right: 1.5rem;
                }
            }
            .open-form-deatil-label {
                font-size: 1.4rem;
            }
            .ol {
                padding-inline-start: 2rem;
                list-style-position: outside;
                li {
                    padding-left: 2rem;
                    font-size: 1.4rem;
                    text-align: left;
                    &.bold {
                        font-weight: bold;
                    }
                }
                &.type-a {
                    list-style-type: lower-alpha;
                }
                &.type-1 {
                    list-style-type: decimal;
                }
            }
        }

        .acc-list-btn {
            height: 3.5rem;
            margin-right: .4rem;
            padding: .7rem 1.5rem;
            border-radius: 5rem;
            font-size: 1.4rem;
            border: 1px solid #006ace;
            color: #006ace;
            background-color: transparent;
        }
        .acc-list-btn.active {
            color: #FFF;
            background-color: #006ace;
        }

        .open-form-group-sm,
        .open-form-group-md,
        .open-form-group-lg,
        .open-form-group-xl {
            display: flex;
            align-items: flex-end;
            padding: 1rem 0;
        }
        .open-form-group-sm {
            width: 33.33%;
        }
        .open-form-group-md {
            width: 50%;
        }
        .open-form-group-lg {
            width: 66.66%;
        }
        .open-form-group-xl {
            width: 100%;
        }
        .open-form-title-group {
            display: flex;
            align-items: flex-end;
            width: 60%;
            .open-form-label {
                width: 5.5rem;
            }
        }
        .open-form-label {
            display: flex;
            align-items: center;
            font-size: 1.4rem;
            text-align: left;
            white-space: nowrap;
        }
        .open-form-input {
            margin: 0 1.5rem;
            width: 100%;
            font-size: 1.4rem;
            border: none;
            border-bottom: 1px solid #22354d;
            background: transparent;
        }
        .mg-right {
            margin-right: .25rem;
        }
        .mg-left {
            margin-left: .25rem;
        }
        .form-check-input {
            margin: 0 .5rem 0.3rem 1.5rem;
        }
    }
}
</style>