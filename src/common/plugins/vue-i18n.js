import Vue from "vue";
import VueI18n from "vue-i18n";
import { locale as en } from "@/common/config/i18n/en";
import { locale as zh } from "@/common/config/i18n/zh";
Vue.use(VueI18n);
let messages = {};
messages = { ...messages, en, zh };
// const lang = ((navigator.language || navigator.browserLanguage).toLowerCase()=='zh-CN'&&"zh" )|| "zh";
const lang = sessionStorage["language"] || "zh";
const i18n = new VueI18n({
    locale: lang,
    messages,
});
export default i18n;
