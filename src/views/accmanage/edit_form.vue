<template>
    <TCModal class="edit_form" id="edit_form" :title="UI.title" ref="modal" :dialog_width="'1600px'" :modal-body-style="{'min-height': 'fit-content', 'max-height': 'auto', 'overflow': 'auto'}">
        <template #body>
            <div class="step-list-area">
                <ul class="nav nav-pills step-list" role="tablist">
                    <li class="nav-item step-btn" v-for="(it, index) in step_tab_list" :key="it.id" role="presentation">
                        <button 
                            class="nav-link" 
                            :id="`${it.id}-tab`" 
                            data-bs-toggle="pill" 
                            :data-bs-target="`#${it.id}`" 
                            type="button" 
                            :aria-controls="`${it.id}`"
                            role="tab"
                        >
                            {{ index + 1 }}
                            <div class="step-title">{{ it.title }}</div>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="tab-content main-tab-content">
                <!-- 選擇號碼 -->
                <div class="tab-pane fade" id="step1" v-show="is_create">
                    <div class="subTitle justify-content-between">
                        號碼
                    </div>
                    <div class="row gx-0 gy-1">
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">戶口號碼類型</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <select class="form-select" v-model="account.account_no_type">
                                        <option value="1">一般客人</option>
                                        <option value="2">VIP客人 </option>
                                        <option value="3">指定特殊VIP</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">顯示範圍</label>
                                </div>
                                <div class="col-8 filter-acc-no-area">
                                    <input 
                                        class="form-control" 
                                        placeholder="戶口編號" 
                                        v-model="search_area_acc_no_start" 
                                        v-tc-number 
                                        @keyup.enter="search_acc_no_list()" 
                                        @input="search_area_acc_no_start = (search_area_acc_no_start.length > 0 ? (parseInt(search_area_acc_no_start) === 0 ? '' : parseInt(search_area_acc_no_start)).toString() : '')">
                                    <span class="filter-acc-no-line"></span>
                                    <input 
                                        class="form-control" 
                                        placeholder="戶口編號"
                                        v-model="search_area_acc_no_end" 
                                        v-tc-number 
                                        @keyup.enter="search_acc_no_list()" 
                                        @input="search_area_acc_no_end = (search_area_acc_no_end.length > 0 ? (parseInt(search_area_acc_no_end) === 0 ? '' : parseInt(search_area_acc_no_end)).toString() : '')">
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">戶口編號</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="戶口編號"
                                        v-model="search_acc_no" 
                                        v-tc-number 
                                        @keyup.enter="search_acc_no_list()" 
                                        @input="search_acc_no = (search_acc_no.length > 0 ? (parseInt(search_acc_no) === 0 ? '' : parseInt(search_acc_no)).toString() : '')">
                                </div>
                            </div>
                        </div>
                        <div class="col-1 g-0 search-acc-no-btn-area">
                            <button class="btn btn-p" @click="search_acc_no_list()">讀取</button>
                        </div>
                    </div>
                    <div class="acc-no-select-list">
                        <div class="null-title" v-if="acc_no_list.length === 0">請選擇篩選條件!</div>

                        <div class="container-fluid gy-2 p-2">
                            <div class="row g-2">
                                <div class="col-1" v-for="(it, index) in acc_no_list" :key="`acc_no_list_${it}`">
                                    <div :class="(index % 2 === 1) ? 'acc-no-select-item0' : 'acc-no-select-item1'" @click="select_acc_no = it; account.account_no = it;">
                                        <input class="form-check-input" type="radio" :value="it" v-model="select_acc_no">
                                        <div class="acc-no-select-text">{{ it }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row gx-0 gy-1">
                        <div class="col-12 g-0 next-step-btn-area">
                            <button class="btn btn-p next-step-btn" @click="next_step()">下一步</button>
                        </div>
                    </div>
                </div>

                <!-- 填寫資料 -->
                <div class="tab-pane fade" id="step2">
                    <div class="subTitle justify-content-between">
                        戶口
                    </div>
                    <div class="row g-0">
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">戶口基本類型</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <select 
                                        class="form-select" 
                                        v-model="account.account_type" 
                                        @focus="check_change_account_type()"
                                        @change="change_account_type($event)" 
                                        :disabled="is_detail || account_type_disabled">
                                        <option value="1">個人戶口</option>
                                        <option value="2">聯名戶口</option>
                                        <option value="3">公司內部戶口</option>
                                        <option value="4">合作伙伴</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row g-0">
                        <div class="col-4 g-0">
                            <div class="form-group row required">
                                <div class="col-4 nopadding">
                                    <label class="control-label">戶口編號</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="戶口編號"
                                        v-model="account.account_no"
                                        required 
                                        disabled>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">開戶類型</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <select 
                                        class="form-select" 
                                        v-model="account.source_type"
                                        :disabled="is_detail">
                                        <option value="1">網上開戶</option>
                                        <option value="2">現場開戶</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">第一層中介</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <select 
                                        class="form-select" 
                                        v-model="account.is_first_line"
                                        @change="change_is_first_line()"
                                        :disabled="is_detail">
                                        <option value="1">是</option>
                                        <option value="0">否</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0" v-if="account.is_first_line == 1">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">戶組類型</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <select 
                                        class="form-select" 
                                        v-model="account.account_group_type_id"
                                        :disabled="is_detail">
                                        <option value="1">股東線</option>
                                        <option value="2">公司線</option>
                                        <option value="3">合作廳線</option>
                                        <option value="4">其他</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0" v-if="account.is_first_line == 1">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">戶組名稱</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <input 
                                        class="form-control" 
                                        placeholder="戶組名稱"
                                        v-model="account.account_group_name"
                                        :disabled="is_detail">
                                </div>
                            </div>
                        </div>
                        <div class="col-4 g-0" v-if="account.is_first_line == 0">
                            <div class="form-group row" :class="{required: account.is_first_line == 0}">
                                <div class="col-4 nopadding">
                                    <a href="#" class="control-label" @click="is_detail ? '' : account_group_click()" :disabled="is_detail">戶組</a>
                                </div>
                                <div class="col-5 nopadding account-group-area">
                                    <input 
                                        class="form-control"
                                        placeholder="戶組"
                                        v-model="account.parent_account_no"
                                        @change="get_account_info()"
                                        @input="account.parent_account_name = ''; account.parent_account_id = ''"
                                        :required="account.is_first_line == 0"
                                        :disabled="is_detail"
                                        v-tc-number>
                                    <input 
                                        class="form-control" 
                                        placeholder=""
                                        v-model="account.parent_account_name"
                                        disabled>
                                </div>
                            </div>
                        </div>
                        <div class="col-2 g-0" v-if="account.is_first_line == 0 && show_is_shareholder && check_permission('is_shareholder')">
                            <div class="form-group">
                                <label class="control-label">
                                    <input 
                                        class="form-check-input" 
                                        type="checkbox" 
                                        v-model="account.is_shareholder" 
                                        :true-value="1" 
                                        :false-value="0"
                                        :disabled="is_detail">
                                    是否股東
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row g-0" v-show="!is_create">
                        <div class="col-4 g-0">
                            <div class="form-group row">
                                <div class="col-4 nopadding">
                                    <label class="control-label">開戶廳</label>
                                </div>
                                <div class="col-5 nopadding">
                                    <select 
                                        class="form-select" 
                                        v-model="location_id"
                                        :disabled="is_detail">
                                        <option 
                                            v-for="it in location_list"
                                            :key="`location_option_${it.location_id}`"
                                            :value="it.location_id">
                                            {{ it.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="subTitle justify-content-between">
                        個人資料
                    </div>
                    <div class="acc-list-area" v-show="account.account_type == '2'">
                        <button 
                            class="btn acc-list-btn" 
                            :class="{'active': index == select_acc_no_index}" 
                            v-for="(it, index) in profile" 
                            :key="`acc_no_btn_${index}`" 
                            @click="select_acc_no_index = index">
                            <span class="acc-list-delete-btn" v-if="index > 1 && !is_detail" @click="acc_delete_btn_click(index)">
                                <i class="fa fa-minus-circle"></i>
                            </span>
                            戶主 {{ index + 1 }}
                        </button>
                        <button class="add-acc-btn" v-if="profile.length < 5 && !is_detail" @click="acc_add_btn_click()">
                            <i class="fa fa-plus-circle"></i>
                        </button>
                    </div>
                    <div v-for="(it, index) in profile" :key="`acc_list_${index}`" v-show="select_acc_no_index == index">
                        <template>
                            <div class="row g-0">
                                <div class="col-4 g-0">
                                    <div class="form-group row required">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">中文姓氏</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                :class="`name_cn_${index}`" 
                                                placeholder="中文姓氏" 
                                                v-model="it.name_last" 
                                                @input="set_name_full('cn', index); it.name_last = it.name_last.trim()" 
                                                required
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row required">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">中文名字</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                :class="`name_cn_${index}`" 
                                                placeholder="中文名字" 
                                                v-model="it.name_first" 
                                                @input="set_name_full('cn', index); it.name_first = it.name_first.trim()" 
                                                required
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row required">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">中文姓名</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                placeholder="中文姓名" 
                                                v-model="it.name_full" 
                                                disabled>
                                        </div>
                                        <div class="col-3 search-name-btn-area">
                                            <button class="btn btn-p btn-mr4" v-if="is_create" @click="connect_profile('cn', index)">
                                                搜尋
                                            </button>
                                            <button class="btn btn-d" v-if="is_create && connect_profile_by[index] === 1" @click="disconnect_profile('cn', index)">
                                                取消
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row required">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">英文姓氏</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                :class="`name_en_${index}`"
                                                placeholder="英文姓氏" 
                                                v-model="it.name_last_en" 
                                                @input="set_name_full('en', index); it.name_last_en = it.name_last_en.trim().toUpperCase()" 
                                                required
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row required">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">英文名字</label>
                                        </div>
                                        <div class="col-5 nopadding en-first-name-area">
                                            <input 
                                                class="form-control except-error" 
                                                placeholder="英文中間名" 
                                                v-model="it.name_mid_en" 
                                                @input="set_name_full('en', index); it.name_mid_en = it.name_mid_en.trim().toUpperCase()" 
                                                :disabled="is_detail">
                                            <input 
                                                class="form-control" 
                                                :class="`name_en_${index}`"
                                                placeholder="英文名" 
                                                v-model="it.name_first_en" 
                                                @input="set_name_full('en', index); it.name_first_en = it.name_first_en.trim().toUpperCase()" 
                                                required
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row required">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">英文姓名</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                placeholder="英文姓名"
                                                v-model="it.name_full_en"
                                                disabled>
                                        </div>
                                        <div class="col-3 search-name-btn-area">
                                            <button class="btn btn-p btn-mr4" v-if="is_create" @click="connect_profile('en', index)">
                                                搜尋
                                            </button>
                                            <button class="btn btn-d" v-if="is_create && connect_profile_by[index] === 2" @click="disconnect_profile('en', index)">
                                                取消
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">性別</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <select class="form-select" v-model="it.gender" :disabled="is_detail">
                                                <option value="0">男</option>
                                                <option value="1">女</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">稱呼</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <select class="form-select" v-model="it.name_suffix" :disabled="is_detail">
                                                <option value=""></option>
                                                <option value="0">先生</option>
                                                <option value="1">女士</option>
                                                <option value="2">小姐</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">職業</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                placeholder="職業"
                                                v-model="it.occupation"
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">介紹人</label>
                                        </div>
                                        <div class="col-5 nopadding referrer-account-area">
                                            <input 
                                                class="form-control" 
                                                placeholder="介紹人"
                                                v-model="it.referrer_account_no"
                                                @change="get_referrer_info(index)"
                                                @input="it.referrer_name = ''; it.referrer_account_id = ''" 
                                                :disabled="is_detail"
                                                v-tc-number>
                                            <input 
                                                class="form-control" 
                                                placeholder="介紹人姓名"
                                                v-model="it.referrer_name"
                                                :disabled="it.referrer_account_no !== '' || is_detail">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row required">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">國籍</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <select class="form-select" v-model="it.nationality_id" required :disabled="is_detail">
                                                <option value=""></option>
                                                <option value="1">中國</option>
                                                <option value="2">香港</option>
                                                <option value="3">澳門</option>
                                                <option value="4">韓國</option>
                                                <option value="5">菲律賓</option>
                                                <option value="6">越南</option>
                                                <option value="7">柬埔寨</option>
                                                <option value="8">台灣</option>
                                                <option value="9">馬來西亞</option>
                                                <option value="10">澳洲</option>
                                                <option value="11">美國</option>
                                                <option value="12">新加坡</option>
                                                <option value="13">日本</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row required">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">驗證語言</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <select class="form-select" v-model="it.verify_language" required :disabled="is_detail">
                                                <option value=""></option>
                                                <option value="1">國語</option>
                                                <option value="2">粵語</option>
                                                <option value="3">英語</option>
                                                <option value="4">韓語</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row required">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">新曆出生日期</label>
                                        </div>
                                        <div class="col-5 nopadding solar-birthday-area">
                                            <span class="text-d solar-birthday-error" v-if="check_solar_birthday(it.solar_birthday)">要年滿 21 歲才可開新戶口</span>
                                            <DatePicker 
                                                v-model="it.solar_birthday" 
                                                :input-attr="{required: 'true'}"
                                                placeholder="新曆出生日期"
                                                type="date" 
                                                value-type="format"
                                                :disabled="is_detail"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">舊曆出生日期</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <DatePicker 
                                                v-model="it.lunar_birthday" 
                                                placeholder="舊曆出生日期"
                                                type="date" 
                                                value-type="format"
                                                :disabled="is_detail"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">出生地點</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                placeholder="出生地點"
                                                v-model="it.birth_place"
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 g-0">
                                    <div class="form-group row speaking-languages-area">
                                        <div class="col-1 nopadding speaking-languages-title">
                                            <label class="control-label">溝通語言</label>
                                        </div>
                                        <div class="col-7 nopadding speaking-languages-list">
                                            <div class="speaking-languages-item">
                                                <input class="form-check-input" type="checkbox" value="1" :id="`sp_lang_${index}_1`" v-model="it.speaking_languages" :disabled="is_detail">
                                                <label class="control-label" :for="`sp_lang_${index}_1`">廣東話</label>
                                            </div>
                                            <div class="speaking-languages-item">
                                                <input class="form-check-input" type="checkbox" value="2" :id="`sp_lang_${index}_2`" v-model="it.speaking_languages" :disabled="is_detail">
                                                <label class="control-label" :for="`sp_lang_${index}_2`">普通話</label>
                                            </div>
                                            <div class="speaking-languages-item">
                                                <input class="form-check-input" type="checkbox" value="3" :id="`sp_lang_${index}_3`" v-model="it.speaking_languages" :disabled="is_detail">
                                                <label class="control-label" :for="`sp_lang_${index}_3`">英文</label>
                                            </div>
                                            <div class="speaking-languages-item">
                                                <input class="form-check-input" type="checkbox" value="4" :id="`sp_lang_${index}_4`" v-model="it.speaking_languages" :disabled="is_detail">
                                                <label class="control-label" :for="`sp_lang_${index}_4`">菲律賓語</label>
                                            </div>
                                            <div class="speaking-languages-item">
                                                <input class="form-check-input" type="checkbox" value="5" :id="`sp_lang_${index}_5`" v-model="it.speaking_languages" :disabled="is_detail">
                                                <label class="control-label" :for="`sp_lang_${index}_5`">韓文</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="subTitle justify-content-between">
                                聯絡方式
                                <button class="btn btn-new" @click="add_address(index)" v-if="!is_detail">
                                    增加地址
                                </button>
                            </div>
                            <div class="acc-address-area">
                                <button
                                    class="btn acc-address-btn"
                                    :class="{'active': index2 === active_address[index]}"
                                    v-for="(it2, index2) in it.addresses" 
                                    :key="`acc_address_${index}_${index2}`" 
                                    @click="active_address[index] = index2; $forceUpdate()"
                                >
                                    <span class="acc-address-delete-btn" v-if="index2 > 0 && !is_detail" @click.stop="delete_address(index, index2)">
                                        <i class="fa fa-minus-circle"></i>
                                    </span>
                                    地址 {{ index2 + 1 }}
                                </button>
                            </div>
                            <div v-for="(it2, index2) in it.addresses" :key="`acc_address_list_${index}_${index2}`" v-show="index2 === active_address[index]">
                                <div class="row g-0">
                                    <div class="col-4 g-0">
                                        <div class="form-group row">
                                            <div class="col-4 nopadding">
                                                <label class="control-label">國家</label>
                                            </div>
                                            <div class="col-5 nopadding">
                                                <input 
                                                    class="form-control" 
                                                    placeholder="國家"
                                                    v-model="it2.country"
                                                    @input="set_full_address(index, index2)"
                                                    :disabled="is_detail">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4 g-0">
                                        <div class="form-group row">
                                            <div class="col-4 nopadding">
                                                <label class="control-label">省</label>
                                            </div>
                                            <div class="col-5 nopadding">
                                                <input 
                                                    class="form-control" 
                                                    placeholder="省"
                                                    v-model="it2.province"
                                                    @input="set_full_address(index, index2)"
                                                    :disabled="is_detail">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4 g-0">
                                        <div class="form-group row">
                                            <div class="col-4 nopadding">
                                                <label class="control-label">特別行政區/市</label>
                                            </div>
                                            <div class="col-5 nopadding">
                                                <input 
                                                    class="form-control" 
                                                    placeholder="特別行政區/市"
                                                    v-model="it2.city"
                                                    @input="set_full_address(index, index2)"
                                                    :disabled="is_detail">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4 g-0">
                                        <div class="form-group row">
                                            <div class="col-4 nopadding">
                                                <label class="control-label">街名</label>
                                            </div>
                                            <div class="col-5 nopadding">
                                                <input 
                                                    class="form-control" 
                                                    placeholder="街名"
                                                    v-model="it2.street"
                                                    @input="set_full_address(index, index2)"
                                                    :disabled="is_detail">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4 g-0">
                                        <div class="form-group row">
                                            <div class="col-4 nopadding">
                                                <label class="control-label">門牌號碼</label>
                                            </div>
                                            <div class="col-5 nopadding">
                                                <input 
                                                    class="form-control" 
                                                    placeholder="門牌號碼"
                                                    v-model="it2.no"
                                                    @input="set_full_address(index, index2)"
                                                    :disabled="is_detail">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4 g-0">
                                        <div class="form-group row">
                                            <div class="col-4 nopadding">
                                                <label class="control-label">大廈-樓層及單元</label>
                                            </div>
                                            <div class="col-5 nopadding">
                                                <input 
                                                    class="form-control" 
                                                    placeholder="大廈-樓層及單元"
                                                    v-model="it2.rest"
                                                    @input="set_full_address(index, index2)"
                                                    :disabled="is_detail">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 g-0">
                                        <div class="form-group row">
                                            <div class="col-1 nopadding full-address-title">
                                                <label class="control-label">聯絡地址</label>
                                            </div>
                                            <div class="col-4 nopadding">
                                                <input 
                                                    class="form-control" 
                                                    placeholder="聯絡地址"
                                                    v-model="it2.full_address"
                                                    disabled>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="subTitle justify-content-between">
                                聯絡電話
                            </div>
                            <div class="row g-0">
                                <!-- <div class="col-4 row g-0"> -->
                                <div class="col-4 g-0">
                                    <div class="form-group row required">
                                        <div class="col-4 nopadding" :class="{'text-d': is_check_required && it.telephones.length === 0}">
                                            <label class="control-label">聯絡電話</label>
                                        </div>
                                        <div class="col-7 nopadding telephone-input-area">
                                            <select class="form-select except-error" v-model="telephone[index].telephone_area_code" :disabled="is_detail">
                                                <option value="86">+86 中國</option>
                                                <option value="852">+852 香港</option>
                                                <option value="853">+853 澳門</option>
                                                <option value="82">+82 韓國</option>
                                                <option value="63">+63 菲律賓</option>
                                                <option value="84">+84 越南</option>
                                                <option value="855">+855 柬埔寨</option>
                                                <option value="886">+886 台灣</option>
                                                <option value="60">+60 馬來西亞</option>
                                                <option value="61">+61 澳洲</option>
                                                <option value="1">+1 美國</option>
                                                <option value="65">+65 新加坡</option>
                                                <option value="81">+81 日本</option>
                                            </select>
                                            <input 
                                                class="form-control except-error" 
                                                placeholder="聯絡電話"
                                                v-model="telephone[index].telephone_number"
                                                v-tc-number
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">備註</label>
                                        </div>
                                        <div class="col-7 nopadding">
                                            <textarea 
                                                class="form-control telephone-remark" 
                                                rows="2"
                                                v-model="telephone[index].telephone_reamrk"
                                                :disabled="is_detail">
                                            </textarea>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">排列次序</label>
                                        </div>
                                        <div class="col-7 nopadding">
                                            <input 
                                                class="form-control" 
                                                placeholder="排列次序"
                                                maxlength="4"
                                                v-model="telephone[index].telephone_order"
                                                v-tc-number
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                    <div class="telephone-btn-area">
                                        <button class="btn btn-new btn-mr4" @click="add_telephone(index)" v-if="!is_detail">新增</button>
                                        <button class="btn btn-new" @click="reset_telephone(index)" v-if="!is_detail">重置</button>
                                    </div>
                                </div>
                                <div class="col-8 g-0 telephone-list-area">
                                    <div class="row g-0 telephone-list-head">
                                        <div class="col-2 telephone-list-head-title"></div>
                                        <div class="col-2 telephone-list-head-title">排列次序</div>
                                        <div class="col-2 telephone-list-head-title">區碼</div>
                                        <div class="col-2 telephone-list-head-title">聯絡電話</div>
                                        <div class="col-4 telephone-list-head-title">備註</div>
                                    </div>
                                    <div class="telephone-list-body">
                                        <div class="col-12 row telephone-list-item" v-for="(it2, index2) in it.telephones" :key="`acc_telephone_list_${index}_${index2}`">
                                            <div class="col-2 telephone-list-btn-area">
                                                <button class="btn btn-d" @click="delete_telephone(index, index2)" v-if="!is_detail">
                                                    刪除
                                                </button>
                                            </div>
                                            <div class="col-2">
                                                <input 
                                                    class="form-control" 
                                                    placeholder="排列次序"
                                                    maxlength="4"
                                                    v-model="it2.order"
                                                    v-tc-number
                                                    @change="check_telephone_order(index, index2, $event)"
                                                    @focusin="hold_telephone_data = it2.order"
                                                    :disabled="is_detail">
                                            </div>
                                            <div class="col-2">
                                                <select 
                                                    class="form-select" 
                                                    v-model="it2.area_code" 
                                                    @change="check_telephone('area_code', index, index2)"
                                                    @focusin="hold_telephone_data = it2.area_code"
                                                    :disabled="is_detail">
                                                    <option value="86">+86 中國</option>
                                                    <option value="852">+852 香港</option>
                                                    <option value="853">+853 澳門</option>
                                                    <option value="82">+82 韓國</option>
                                                    <option value="63">+63 菲律賓</option>
                                                    <option value="84">+84 越南</option>
                                                    <option value="855">+855 柬埔寨</option>
                                                    <option value="886">+886 台灣</option>
                                                    <option value="60">+60 馬來西亞</option>
                                                    <option value="61">+61 澳洲</option>
                                                    <option value="1">+1 美國</option>
                                                    <option value="65">+65 新加坡</option>
                                                    <option value="81">+81 日本</option>
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <input 
                                                    class="form-control" 
                                                    placeholder="聯絡電話"
                                                    v-model="it2.telephone"
                                                    v-tc-number
                                                    @change="check_telephone('telephone', index, index2)"
                                                    @focusin="hold_telephone_data = it2.telephone"
                                                    :disabled="is_detail">
                                            </div>
                                            <div class="col-4">
                                                <input 
                                                    class="form-control"
                                                    v-model="it2.remark"
                                                    :disabled="is_detail">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="subTitle justify-content-between" v-if="is_create">
                                密碼
                            </div>
                            <div class="row g-0" v-if="is_create">
                                <div class="col-4 g-0">
                                    <div class="form-group row required">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">輸入密碼</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                type="password" 
                                                placeholder="輸入密碼" 
                                                autocomplete="off" 
                                                maxlength="6" 
                                                v-model="it.password"
                                                required>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row required">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">確認密碼</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                type="password" 
                                                placeholder="確認密碼" 
                                                autocomplete="off" 
                                                maxlength="6" 
                                                v-model="it.confirm_password"
                                                required>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="subTitle justify-content-between">
                                社群媒體
                            </div>
                            <div class="row g-0">
                                <div class="col-4 g-0">
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">電郵</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                placeholder="電郵"
                                                v-model="it.social_email"
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">微信號</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                placeholder="微信號"
                                                v-model="it.social_wechat"
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">Whatsapp</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                placeholder="Whatsapp"
                                                v-model="it.social_whatsapp"
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">QQ</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                placeholder="QQ"
                                                v-model="it.social_qq"
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">微博</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                placeholder="微博"
                                                v-model="it.social_weibo"
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">LINE</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                placeholder="LINE"
                                                v-model="it.social_line"
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 g-0">
                                    <div class="form-group row">
                                        <div class="col-4 nopadding">
                                            <label class="control-label">Telegram</label>
                                        </div>
                                        <div class="col-5 nopadding">
                                            <input 
                                                class="form-control" 
                                                placeholder="Telegram"
                                                v-model="it.social_telegram"
                                                :disabled="is_detail">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>

                <!-- 上傳證件 -->
                <div class="tab-pane fade" id="step3">
                    <div class="subTitle justify-content-between" v-show="account.account_type == '2'">
                        選擇戶主
                    </div>

                    <div class="acc-list-area" v-show="account.account_type == '2'">
                        <button 
                            class="btn acc-list-btn" 
                            :class="{'active': index === select_acc_no_index}" 
                            v-for="(it, index) in profile" 
                            :key="`acc_no_btn_image_${index}`" 
                            @click="select_acc_no_index = index">
                            戶主 {{ index + 1 }}
                        </button>
                    </div>
                    <div v-for="(it, index) in profile" :key="`acc_image_list_${index}`" v-show="select_acc_no_index === index">
                        <div class="subTitle justify-content-between">
                            選擇證件類型
                        </div>

                        <div class="acc-image-area">
                            <div class="acc-image-btn-group" v-for="(it2, index2) in image_type_list" :key="`acc_image_btn_group_${index}_${index2}`" >
                                <button 
                                    class="btn acc-image-btn" 
                                    :class="{'active': index2 === active_image_type[index]}" 
                                    @click="active_image_type[index] = index2; $forceUpdate()">
                                    {{ it2.title }}
                                </button>
                                <button 
                                    class="add-acc-image-btn" 
                                    v-if="!is_detail"
                                    v-show="index2 === active_image_type[index]"
                                    @click="add_image(index, it2.type)">
                                    <i class="fa fa-plus-circle"></i>
                                </button>
                            </div>
                        </div>

                        <div v-for="(it2, index2) in image_type_list" :key="`acc_image_area_${index}_${it2.type}`" v-show="index2 === active_image_type[index]">
                            <div class="acc-image-area">
                                <button
                                    class="btn acc-image-btn" 
                                    :class="{'active': index3 === active_image_type_index[index][`${it2.type}`]}"
                                    v-for="(it3, index3) in it[`${it2.type}s`]"
                                    :key="`acc_image_${index}_${it2.type}_${index3}`"
                                    @click="active_image_type_index[index][`${it2.type}`] = index3; $forceUpdate()">
                                    <span class="acc-image-delete-btn" v-if="!is_detail" @click="delete_image(index, it2.type, index3)">
                                        <i class="fa fa-minus-circle"></i>
                                    </span>
                                    {{ it2.title + (index3 + 1) }}
                                </button>
                            </div>

                            <div v-for="(it3, index3) in it[`${it2.type}s`]" :key="`acc_image_info_${index}_${it2.type}_${index3}`" v-show="index3 === active_image_type_index[index][`${it2.type}`]">
                                <div class="subTitle justify-content-between">
                                    上傳證件並檢視
                                </div>
                                <div class="row g-0 justify-content-around">
                                    <div class="col-6 g-0 image-area">
                                        <template v-if="!is_detail">
                                            <button 
                                                class="btn btn-new2 image-upload" 
                                                data-loading-text="Loading..."
                                                @click="select_image(index, it2.type, index3, 'file_path')">
                                                <i class="fa fa-upload"></i>
                                                上傳正面照
                                            </button>
                                            <span class="image-clean-btn" @click="clean_image(index, it2.type, index3, 'file_path')">
                                                <i class="fa fa-minus-circle"></i>
                                            </span>
                                            <div class="image-tips">支援 JPEG, PNG</div>
                                        </template>
                                        <template>
                                            <img 
                                                v-if="it3.file_path_base64 === ''" 
                                                src="@/assets/image/null_image.png">
                                            <img 
                                                v-else 
                                                :src="`data:image/png;base64,${it3.file_path_base64}`">
                                        </template>
                                        <input class="form-control d-none" v-model="it3.file_path" />
                                    </div>
                                    <div class="col-6 g-0 image-area" v-if="[0, 1, 2, 5].indexOf(index2) !== -1">
                                        <template v-if="!is_detail">
                                            <button 
                                                class="btn btn-new2 image-upload" 
                                                data-loading-text="Loading..."
                                                @click="select_image(index, it2.type, index3, 'file_2_path')">
                                                <i class="fa fa-upload"></i>
                                                上傳背面照
                                            </button>
                                            <span class="image-clean-btn" @click="clean_image(index, it2.type, index3, 'file_2_path')">
                                                <i class="fa fa-minus-circle"></i>
                                            </span>
                                            <div class="image-tips">支援 JPEG, PNG</div>
                                        </template>
                                        <template>
                                            <img 
                                                v-if="it3.file_2_path_base64 === ''" 
                                                src="@/assets/image/null_image.png">
                                            <img 
                                                v-else 
                                                :src="`data:image/png;base64,${it3.file_2_path_base64}`">
                                        </template>
                                        <input class="form-control d-none" v-model="it3.file_2_path" />
                                    </div>
                                    <div class="col-5 g-0" v-if="[0, 1, 2, 5].indexOf(index2) !== -1">
                                        <div class="form-group row required image-form-group">
                                            <div class="col-4 nopadding">
                                                <label class="control-label">{{ it2.title + (index2 === 5 ? "證件" : "") }}有效期</label>
                                            </div>
                                            <div class="col-5 nopadding">
                                                <DatePicker 
                                                    placeholder="有效期"
                                                    type="date" 
                                                    value-type="format"
                                                    v-model="it3.available_date"
                                                    :input-attr="{required: 'true'}"
                                                    :disabled="is_detail"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-5 g-0" v-if="[0, 1, 2, 5].indexOf(index2) !== -1">
                                        <div class="form-group row required image-form-group">
                                            <div class="col-4 nopadding">
                                                <label class="control-label">{{ it2.title + (index2 === 5 ? "證件" : "") }}編號</label>
                                            </div>
                                            <div class="col-5 nopadding">
                                                <input 
                                                    class="form-control" 
                                                    placeholder="編號"
                                                    v-model="it3.serial_no"
                                                    required
                                                    :disabled="is_detail">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <button class="btn btn-new4 d-none" type="button" @click="test()">test</button>
            <button class="btn btn-new4" type="button" @click="save()" v-if="!is_detail">{{ is_create ? "提交" : "儲存" }}</button>
            <button class="btn btn-new4" type="button" @click="hide()">離開</button>
        </template>

        <AccountGroupForm ref="account_group_form" />
        <SearchProfileForm ref="search_profile_form" />
    </TCModal>
</template>

<script>
import TCModal from "@/components/tc_components/tc-modal.vue";
import AccountGroupForm from "@/components/common/AccountGroupForm.vue";
import SearchProfileForm from "./search_profile_form.vue";
import moment from 'moment';

const API = {
    getLocationList: `${process.env.VUE_APP_DEV_LARAVEL}/api/common/location/list`,
    getAccountList: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/account-no/list`,
    getAccountInfo: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/get-account-info`,
    searchProfile: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/search-profile-by-name`,
    profileInfo: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/profile-info`,
    uploadImage: `${process.env.VUE_APP_DEV_LARAVEL}/api/common/upload`,
    checkSameName: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/check-same-name`,
    createAccount: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/create`,
    getAccountDetail: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/detail`,
    updateAccount: `${process.env.VUE_APP_DEV_LARAVEL}/api/account-management/account/update`,
};

export default {
    name: "edit_form",
    components: {
        TCModal,
        AccountGroupForm,
        SearchProfileForm
    },
    data: function () {
        return {
            UI: {
                title: "開新戶口",
                title_create: "新開戶口",
                title_edit: "修改戶口",
                title_detail: "戶口詳細",
            },
            permissions: {},
            location_id: null,
            is_create: false,
            is_detail: false,
            step_tab_list: [
                {
                    id: "step1",
                    title: "選擇號碼"
                },
                {
                    id: "step2",
                    title: "填寫資料"
                },
                {
                    id: "step3",
                    title: "上傳證件"
                },
            ],
            image_type_list: [
                {
                    type: "id",
                    title: "身分證", 
                },
                {
                    type: "passport",
                    title: "護照", 
                },
                {
                    type: "pass",
                    title: "通行證", 
                },
                {
                    type: "sign",
                    title: "簽名", 
                },
                {
                    type: "signtemplate",
                    title: "簽名樣式", 
                },
                {
                    type: "other",
                    title: "其他", 
                },
                {
                    type: "avatar",
                    title: "現場照",
                },
            ],
            acc_no_list: [],
            location_list: [],
            select_acc_no: "",
            search_area_acc_no_start: "",
            search_area_acc_no_end: "",
            search_acc_no: "",
            is_check_change_account_type: false,
            account_type_disabled: false,
            show_is_shareholder: false,
            account: {
                account_no_type: "1",
                account_type: "1",
                account_no: "",
                source_type: "1",
                is_first_line: "0",
                account_group_type_id: 1,
                account_group_name: "",
                parent_account_no: "",
                parent_account_name: "",
                parent_account_id: "",
                is_shareholder: 0
            },
            profile: [],
            profile_og: [],
            profile_template: {
                profile_id: "",
                name_last: "",
                name_first: "",
                name_full: "",
                name_last_en: "",
                name_mid_en: "",
                name_first_en: "",
                name_full_en: "",
                gender: "0",
                name_suffix: "",
                nationality_id: "",
                occupation: "",
                referrer_account_no: "",
                referrer_account_id: "",
                referrer_name : "",
                password: "",
                confirm_password: "",
                lunar_birthday: "",
                solar_birthday: "",
                birth_place: "",
                sms_language: "",
                verify_language: "",
                speaking_languages: ["1"],
                social_email: "",
                social_line: "",
                social_telegram: "",
                social_wechat: "",
                social_qq: "",
                social_weibo: "",
                social_whatsapp: "",
                addresses: [
                    {
                        country: "",
                        province: "",
                        city: "",
                        street: "",
                        no: "",
                        rest: "",
                        full_address: "",
                        order: "1",
                    }
                ],
                telephones: [],
                ids: [],
                passports: [],
                passs: [],
                signs: [],
                signtemplates: [],
                others: [],
                avatars: [],
            },
            connect_profile_by: [], // 0無關聯, 1中文名關聯, 2英文名關聯
            address_template: {
                country: "",
                province: "",
                city: "",
                street: "",
                no: "",
                rest: "",
                full_address: "",
                order: "",
            },
            active_address: [],
            telephone: [],
            telephone_template: {
                telephone_area_code: "86",
                telephone_number: "",
                telephone_reamrk: "",
                telephone_order: "",
            },
            telephone_list_template: {
                area_code: "",
                telephone: "",
                full_telephone: "",
                remark: "",
                order: "",
            },
            image_template: {
                file_path: "",
                file_path_base64: "",
                file_2_path: "",
                file_2_path_base64: "",
                serial_no: "",
                available_date: "",
                location: "", // 先傳空的
            },
            hold_telephone_data: "",
            active_image_type: [],
            active_image_type_index: [],
            active_image_type_index_template: {
                id: 0,
                passport: 0,
                pass: 0,
                sign: 0,
                signtemplate: 0,
                other: 0,
                avatar: 0,
            },
            select_acc_no_index: 0,
            is_check_required: false
        }
    },
    methods: {
        async create_record () {
            this.is_create = true;
            this.is_detail = false;
            this.UI.title = this.UI.title_create;
            this.init_step_tab_list();
            this.init_profile();
            await this.get_location_list();
            return this.show();
        },
        async edit_record (id) {
            this.is_create = false;
            this.is_detail = false;
            this.UI.title = this.UI.title_edit;
            this.init_step_tab_list();
            await this.init_profile(id);
            await this.get_location_list();
            return this.show();
        },
        async detail_record (id) {
            this.is_create = false;
            this.is_detail = true;
            this.UI.title = this.UI.title_detail;
            this.init_step_tab_list();
            await this.init_profile(id);
            await this.get_location_list();
            return this.show();
        },
        init_step_tab_list () {
            if (this.is_create) {
                $("#step1-tab").click();
            } else {
                this.step_tab_list.splice(0, 1);
                $("#step2-tab").click();
            }
        },
        async init_profile (id = null) {
            this.acc_add_btn_click();

            if (!this.is_create) {
                try {
                    let response = await this.axios.get(API.getAccountDetail, { params: {
                        account_id: id,
                    }}).then((res) => res);

                    if (response.status == 200) {
                        for (let i = 1; i < response.data.data.record.profile.length; i++) {
                            this.acc_add_btn_click();
                        }
                        this.select_acc_no_index = 0;
                        this.location_id = response.data.data.record.location_id;
                        this.account = response.data.data.record.account;
                        this.profile = response.data.data.record.profile;
                        if (!this.is_detail) {
                            this.profile_og = JSON.parse(JSON.stringify(this.profile));
                        }
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
                this.location_id = sessionStorage["location_id"];
            }

            this.$forceUpdate();
        },
        async get_location_list () {
            try {
                let response = await this.axios.get(API.getLocationList).then((res) => res);

                if (response.status == 200) {
                    this.location_list = response.data.data;
                } else {
                    await SysUI.alert(this.UI.title, "取得廳列表錯誤, 請重新整理");
                    return;
                }
            } catch (error) {
                await SysUI.alert(this.UI.title, "取得廳列表錯誤, 請重新整理");
                return;
            }
        },
        check_permission (type) {
            let permission_map = {
                create: {
                    is_shareholder: "1_1_1_1_1",
                },
                detail: {
                    is_shareholder: "1_1_3_1_4_1"
                },
                edit: {
                    is_shareholder: "1_1_3_1_5_1"
                }
            }

            if (this.is_create) {
                return this.permissions[permission_map.create[type]];
            } else {
                if (this.is_detail) {
                    return this.permissions[permission_map.detail[type]];
                } else {
                    return this.permissions[permission_map.edit[type]];
                }
            }
        },
        async search_acc_no_list () {
            let check = false;

            if (this.search_acc_no !== "" || (this.search_area_acc_no_start !== "" && this.search_area_acc_no_end !== ""))
                check = true;

            if (check) {
                try {
                    let response = await this.axios.get(API.getAccountList, { params: {
                        account_no_type: this.account.account_no_type,
                        account_no: this.search_acc_no,
                        account_no_start: this.search_area_acc_no_start,
                        account_no_end: this.search_area_acc_no_end
                    }}).then((res) => res);

                    if (response.status === 200) {
                        this.acc_no_list = response.data.data.data.map(it => it.toString());
                    } else {
                        this.acc_no_list = [];
                        await SysUI.alert(this.UI.title, response.data.message);
                        return;
                    }
                } catch (error) {
                    console.log("error", error.response);
                    this.acc_no_list = [];
                    await SysUI.alert(this.UI.title, error.response.data.message);
                    return;
                }
            } else {
                await SysUI.alert(this.UI.title, "請輸入完整顯示範圍或戶口編號");
                return;
            }
        },
        next_step () {
            if (this.select_acc_no.length > 0) {
                this.account.account_no = this.select_acc_no;
                $("#step2-tab").click();
            } else {
                SysUI.alert(this.UI.title, "請選擇戶口號碼！");
            }
        },
        async check_change_account_type () {
            if (this.account.account_type == "2") {
                this.account_type_disabled = true;
                if (!this.is_check_change_account_type) {
                    if (!await SysUI.confirm(this.UI.title, "確定修改戶口基本類型？")) {
                        this.account_type_disabled = false;
                        return;
                    }
                }
                
                this.account_type_disabled = false;
                this.is_check_change_account_type = true;
            }
        },
        change_account_type (e) {
            if (this.account.account_type == "2") {
                this.acc_add_btn_click();
            } else {
                this.profile = this.profile.splice(0, 1);
                this.connect_profile_by = this.connect_profile_by.splice(0, 1);
                this.active_address = this.active_address.splice(0, 1);
                this.telephone = this.telephone.splice(0, 1);
                this.active_image_type = this.active_image_type.splice(0, 1);
                this.active_image_type_index = this.active_image_type_index.splice(0, 1);
            }

            this.is_check_change_account_type = false;
            this.select_acc_no_index = 0;
            e.srcElement.blur();
            this.$forceUpdate();
        },
        change_is_first_line () {
            if (this.account.is_first_line == "1") {
                this.account.parent_account_no = "";
                this.account.parent_account_name = "";
                this.account.parent_account_id = "";
                this.account.is_shareholder = 0;
            }
        },
        async account_group_click () {
            let result = await this.$refs.account_group_form.edit_record();

            console.log(result, result);

            if (result) {
                this.account.parent_account_no = result.account_no;
                this.account.parent_account_name = result.name;
                this.account.parent_account_id = result.account_id;
                this.show_is_shareholder = true;
            }
        },
        async get_account_info () {
            // account.parent_account_no
            // account.parent_account_name
            // account.parent_account_id

            if (this.account.parent_account_no !== "") {
                try {
                    let response = await this.axios.get(API.getAccountInfo, { params: {
                        account_no: this.account.parent_account_no
                    }}).then((res) => res);

                    if (response.status === 200) {
                        if (response.data.data.account_id) {
                            this.account.parent_account_no = response.data.data.account_no;
                            this.account.parent_account_name = response.data.data.full_name;
                            this.account.parent_account_id = response.data.data.account_id;
                            this.show_is_shareholder = true;
                            return;
                        }
                    }
                } catch (error) {
                    console.log("error", error.response);
                    this.account.parent_account_no = "";
                    this.account.parent_account_name = "";
                    this.account.parent_account_id = "";
                    await SysUI.alert(this.UI.title, error.response.data.message);
                    return;
                }
            }
        },
        acc_add_btn_click () {
            if (this.profile.length < 5) {
                this.profile.push(JSON.parse(JSON.stringify(this.profile_template)));
                this.connect_profile_by.push(0);
                this.active_address.push(0);
                this.telephone.push(JSON.parse(JSON.stringify(this.telephone_template)));
                this.active_image_type.push(0);
                this.active_image_type_index.push(JSON.parse(JSON.stringify(this.active_image_type_index_template)));

                this.select_acc_no_index = this.profile.length - 1;
                this.$forceUpdate();
            }
        },
        async acc_delete_btn_click (index) {
            if (!await SysUI.confirm("刪除", "確定刪除該戶主？")) {
                return;
            }

            this.select_acc_no_index = 0;
            this.profile.splice(index, 1);
            this.connect_profile_by.splice(index, 1);
            this.active_address.splice(index, 1);
            this.telephone.splice(index, 1);
            this.active_image_type.splice(index, 1);
            this.active_image_type_index.splice(index, 1);
        },
        set_name_full (type, index) {
            if (type === "cn") {
                this.profile[index].name_full = (this.profile[index].name_last + this.profile[index].name_first).trim();
            } else {
                if (this.profile[index].name_last_en === "" && this.profile[index].name_mid_en === "" && this.profile[index].name_first_en === "") {
                    this.profile[index].name_full_en = "";    
                } else {
                    this.profile[index].name_full_en = 
                    (this.profile[index].name_last_en + 
                    (this.profile[index].name_last_en !== "" && (this.profile[index].name_mid_en !== "" || this.profile[index].name_first_en !== "") ? " " : "")+ 
                    this.profile[index].name_mid_en + 
                    (this.profile[index].name_mid_en !== "" && this.profile[index].name_first_en !== "" ? "." : "") + 
                    this.profile[index].name_first_en).trim().toUpperCase();
                }
            }
        },
        reset_profile (index, clean_profile_id = 1) {
            let og_profile_id = this.profile[index].profile_id;

            Object.assign(this.profile[index], this.profile_template);

            if (!clean_profile_id) {
                this.profile[index].profile_id = og_profile_id;
            }
        },
        async connect_profile (type, index) {
            let full_name = type === "cn" ? this.profile[index].name_full : this.profile[index].name_full_en;

            if (full_name.trim() === "") {
                await SysUI.alert(this.UI.title, "請輸入姓名再進行搜尋");
                return;
            }

            let params = type === "cn" ? { name_full: full_name } : { name_full_en: full_name };
            
            try {
                let response = await this.axios.get(API.searchProfile, { params: params }).then((res) => res);

                if (response.status === 200) {
                    if (response.data.data.length > 0) {
                        let profile_data = await this.search_profile_form(response.data.data);
                
                        if (profile_data) {
                            if (profile_data.profile_id) {
                                this.copy_info_by_profile_id(profile_data.profile_id, index, type);
                            }
                        }
                    } else {
                        await SysUI.alert(this.UI.title, "查無關聯戶口");
                        return;    
                    }
                } else {
                    await SysUI.alert(this.UI.title, response.data.message);
                    return;   
                }
            } catch (error) {
                console.log("error", error.response);
                await SysUI.alert(this.UI.title, error.response.data.message);
                return;
            }

            this.$forceUpdate();
        },
        async search_profile_form (record) {
            let result = await this.$refs.search_profile_form.search_record(record);

            return result;
        },
        async disconnect_profile (type, index) {
            if (!await SysUI.confirm("取消", "此操作會解除連結個人資料，確認？")) {
                return;
            }

            this.connect_profile_by[index] = 0;

            if (type === "cn") {
                let og_name_last = this.profile[index].name_last;
                let og_name_first = this.profile[index].name_first;

                this.reset_profile(index);
                this.profile[index].name_last = og_name_last;
                this.profile[index].name_first = og_name_first;
            } else {
                let og_name_last = this.profile[index].name_last_en;
                let og_name_mid_en = this.profile[index].name_mid_en;
                let og_name_first_en = this.profile[index].name_first_en;

                this.reset_profile(index);
                this.profile[index].name_last_en = og_name_last;
                this.profile[index].name_mid_en = og_name_mid_en;
                this.profile[index].name_first_en = og_name_first_en;
            }
            this.set_name_full(type, index);

            this.$forceUpdate();
        },
        async copy_info_by_profile_id (profile_id, index, type) {
            try {
                let response = await this.axios.get(API.profileInfo, { params: {
                    profile_id: profile_id
                }}).then((res) => res);

                if (response.status == 200) {
                    Object.keys(this.profile[index]).forEach(key => {
                        if (response.data.data.profile[key])
                            this.profile[index][key] = response.data.data.profile[key];
                    });

                    this.connect_profile_by[index] = type === "cn" ? 1 : 2;
                } else {
                    await SysUI.alert(this.UI.title, response.data.message);
                    return;
                }
            } catch (error) {
                console.log("error", error.response);
                await SysUI.alert(this.UI.title, error.response.data.message);
                return;
            }

            this.$forceUpdate();
        },
        async get_referrer_info (index) {
            let acc_no = this.profile[index].referrer_account_no;
            
            if (acc_no !== "") {
                try {
                    let response = await this.axios.get(API.getAccountInfo, { params: {
                        account_no: acc_no
                    }}).then((res) => res);

                    if (response.status === 200) {
                        if (response.data.data.account_id) {
                            this.profile[index].referrer_account_no = response.data.data.account_no;
                            this.profile[index].referrer_account_id = response.data.data.account_id;
                            this.profile[index].referrer_name = response.data.data.full_name;
                            return;
                        }
                    }
                } catch (error) {
                    console.log("error", error.response);
                    this.profile[index].referrer_account_no = "";
                    this.profile[index].referrer_account_id = "";
                    this.profile[index].referrer_name = "";
                    await SysUI.alert(this.UI.title, error.response.data.message);
                    return;
                }
            }
        },
        check_solar_birthday (solar_birthday) {
            if (solar_birthday.length > 0 && (moment().diff(solar_birthday, 'years') < 21)) {
                return true;
            } else {
                return false;
            }
        },
        add_address (index) {
            this.profile[index].addresses.push(JSON.parse(JSON.stringify(this.address_template)));
            this.set_address_order();
        },
        delete_address (index, index2) {
            this.profile[index].addresses.splice(index2, 1);
            this.set_address_order();
        },
        set_address_order () {
            this.profile.forEach(it => {
                it.addresses.forEach((it2, index2) => {
                    it2.order = (index2 + 1).toString();
                });
            });
        },
        set_full_address (index, index2) {
            let address_data = this.profile[index].addresses[index2];
            this.profile[index].addresses[index2].full_address = address_data.country + address_data.province + address_data.city + address_data.street + address_data.no + address_data.rest;
        },
        async add_telephone (index) {
            let {telephone_area_code, telephone_number, telephone_reamrk, telephone_order} = this.telephone[index];

            if (telephone_order === "" || parseInt(telephone_order) < 1 || parseInt(telephone_order) > 1000) {
                await SysUI.alert(this.UI.title, "次序僅限於1-1000。");
                return;
            }

            let order_array = this.profile[index].telephones.map(it => it.order);
            if (order_array.indexOf(telephone_order) !== -1) {
                await SysUI.alert(this.UI.title, "電話號碼次序重複，請重新設定。");
                return;
            }

            let full_telephone = telephone_area_code + "-" + telephone_number;
            let full_telephone_array = this.profile[index].telephones.map(it => it.area_code + "-" + it.telephone);
            if (full_telephone_array.indexOf(full_telephone) !== -1) {
                await SysUI.alert(this.UI.title, "已有區碼、電話號碼相同的資料。");
                return;
            }

            let telephone_data = {
                area_code: telephone_area_code,
                telephone: telephone_number,
                full_telephone: telephone_area_code + telephone_number,
                remark: telephone_reamrk,
                order: telephone_order,
            };
            this.profile[index].telephones.push(telephone_data);
            this.reset_telephone(index);
        },
        reset_telephone (index) {
            this.telephone[index] = JSON.parse(JSON.stringify(this.telephone_template));
            this.$forceUpdate();
        },
        delete_telephone (index, index2) {
            this.profile[index].telephones.splice(index2, 1);
            this.$forceUpdate();
        },
        async check_telephone_order (index, index2) {
            let order = this.profile[index].telephones[index2].order;
            let order_array = this.profile[index].telephones.map(it => it.order);

            if (order === "") {
                await SysUI.alert(this.UI.title, "次序僅限於1-1000。");
                this.profile[index].telephones[index2].order = this.hold_telephone_data;
                return;
            }

            if (parseInt(order) < 1 || parseInt(order) > 1000) {
                await SysUI.alert(this.UI.title, "次序僅限於1-1000。");
                this.profile[index].telephones[index2].order = this.hold_telephone_data;
                return;
            }

            if (order_array.filter(it => it === order).length > 1) {
                await SysUI.alert(this.UI.title, "電話號碼次序重複，請重新設定。");
                this.profile[index].telephones[index2].order = this.hold_telephone_data;
                return;
            }
        },
        async check_telephone (type, index, index2) {
            let area_code = this.profile[index].telephones[index2].area_code;
            let telephone = this.profile[index].telephones[index2].telephone;
            let full_telephone = area_code + "-" + telephone;
            let full_telephone_array = this.profile[index].telephones.map(it => it.area_code + "-" + it.telephone);
            
            if (this.profile[index].telephones[index2][`${type}`] === "") {
                await SysUI.alert(this.UI.title, "電話號碼不得為空。");
                this.profile[index].telephones[index2][`${type}`] = this.hold_telephone_data;
                return;
            }

            if (full_telephone_array.filter(it => it === full_telephone).length > 1) {
                await SysUI.alert(this.UI.title, "已有區碼、電話號碼相同的資料。");
                this.profile[index].telephones[index2][`${type}`] = this.hold_telephone_data;
                return;
            }
        },
        add_image (index, type) {
            this.profile[index][`${type}s`].push(JSON.parse(JSON.stringify(this.image_template)));
        },
        async delete_image (index, type, index2) {
            if (!await SysUI.confirm("刪除", "是否確定要刪除？")) {
                return;
            }

            this.profile[index][`${type}s`].splice(index2, 1);
        },
        select_image (index, type, index2, direction) {
            let form_upload = document.createElement("form");
            form_upload.id = "form_upload";
            form_upload.enctype = "multipart/form-data";
            
            let input_file = document.createElement("input");
            input_file.type = "file";
            input_file.name = "image";
            input_file.accept = "image/x-png, image/jpeg";

            form_upload.appendChild(input_file);
            input_file.click();

            input_file.addEventListener("change", () => {
                let file_info = input_file.files[0];
                let file_size = file_info.size;
                let file_type = file_info.type;

                console.log(file_size / 1024 / 1024 + "MB");
                console.log(file_type);

                if (file_type.indexOf("image/") === 0) {
                    this.upload_image(index, type, index2, direction, form_upload)
                } else {
                    SysUI.alert(this.UI.title, "照片僅支援 JPEG, PNG檔。");
                    return;
                }
            });
        },
        async upload_image (index, type, index2, direction, form_upload) {
            let form_data = new FormData(form_upload);

            try {
                let response = await this.axios.post(API.uploadImage, form_data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => res);

                if (response.status == 200) {
                    this.profile[index][`${type}s`][index2][direction] = response.data.data.path;
                    this.profile[index][`${type}s`][index2][`${direction}_base64`] = response.data.data.base64;

                    await SysUI.message(this.UI.title, "上傳成功");
                    return;
                } else {
                    await SysUI.alert(this.UI.title, response.data.message);
                    return;
                }
            } catch (error) {
                console.log("error", error.response);
                await SysUI.alert(this.UI.title, error.response.data.message);
                return;
            }
        },
        async clean_image (index, type, index2, direction) {
            if (!await SysUI.confirm("刪除", "刪除該筆證件照片後將無法回朔, 確定要刪除？")) {
                return;
            }

            this.profile[index][`${type}s`][index2][direction] = "";
            this.profile[index][`${type}s`][index2][`${direction}_base64`] = "";
        },
        async check_same_name () {
            let name_fulls = this.profile.map((it, index) => (!this.is_create && this.profile[index].profile_id.toString.length > 0 && this.profile_og[index].name_full === it.name_full) ? "" : it.name_full);
            let name_full_ens = this.profile.map((it, index) => (!this.is_create && this.profile[index].profile_id.toString.length > 0 && this.profile_og[index].name_full_en === it.name_full_en) ? "" : it.name_full_en);
            let profile_ids = this.profile.map(it => it.profile_id);

            let message = [];

            try {
                let response = await this.axios.post(API.checkSameName, {
                    name_fulls,
                    name_full_ens,
                    profile_ids,
                }).then((res) => res);

                if (response.status === 200) {
                    response.data.data.name_fulls.forEach((it, index) => {
                        if (it === true)
                            message.push(`已有相同中文姓名(戶主${index + 1})`);

                        if (response.data.data.name_full_ens[index] === true)
                            message.push(`已有相同英文姓名(戶主${index + 1})`);
                    });
                } else {
                    await SysUI.alert(this.UI.title, response.data.message);
                    return;
                }
            } catch (error) {
                console.log("error", error.response);
                await SysUI.alert(this.UI.title, error.response.data.message);
                return;
            }

            if (message.length > 0)
			    await SysUI.message("提示", message);
        },
        async validates () {
            let errors = [];

            this.is_check_required = true;

            if (this.account.account_no === "") {
                errors.push("戶口編號");
            }

            if (this.account.is_first_line == "0") {
                if (this.account.parent_account_id === "" || this.account.parent_account_id === null) {
                    errors.push("戶組");
                }
            }

            this.profile.forEach((it, index) => {
                let no = index + 1;

                $(`.name_cn_${index}`).attr("required", true);
                $(`.name_en_${index}`).attr("required", true);

                if (it.name_full === "") {
                    if (it.name_full_en === "") {
                        errors.push(`第${no}個戶主之中文姓氏`);
                        errors.push(`第${no}個戶主之中文名字`);
                        errors.push(`第${no}個戶主之中文姓名`);
                    } else {
                        $(`.name_cn_${index}`).removeAttr("required");
                    }
                } else {
                    if (it.name_last === "") {
                        errors.push(`第${no}個戶主之中文姓氏`);
                    }
                    if (it.name_first === "") {
                        errors.push(`第${no}個戶主之中文名字`);
                    }
                }

                if (it.name_full_en === "") {
                    if (it.name_full === "") {
                        errors.push(`第${no}個戶主之英文姓氏`);
                        errors.push(`第${no}個戶主之英文名字`);
                        errors.push(`第${no}個戶主之英文姓名`);
                    } else {
                        $(`.name_en_${index}`).removeAttr("required");
                    }
                } else {
                    if (it.name_last_en === "") {
                        errors.push(`第${no}個戶主之英文姓氏`);
                    }
                    if (it.name_first_en === "") {
                        errors.push(`第${no}個戶主之英文名字`);
                    }
                }

                if (it.nationality_id === "") {
                    errors.push(`第${no}個戶主之國籍`);
                }

                if (it.nationality_id === "") {
                    errors.push(`第${no}個戶主之驗證語言`);
                }

                if (it.solar_birthday === "") {
                    errors.push(`第${no}個戶主之新曆出生日期`);
                } else {
                    if (this.check_solar_birthday(it.solar_birthday)) {
                        errors.push(`第${no}個戶主之年齡未滿21歲`);
                    }
                }

                if (it.telephones.length === 0) {
                    errors.push(`第${no}個戶主之聯絡電話`);
                }

                // 修改時密碼暫不判斷
                if (this.is_create) {
                    if (it.password === "") {
                        errors.push(`第${no}個戶主之密碼`);
                    } else {
                        if (it.password.length !== 6) {
                            errors.push(`第${no}個戶主之密碼須為6位數字`);
                        }
                    }

                    if (it.confirm_password === "") {
                        errors.push(`第${no}個戶主之確認密碼`);
                    } else {
                        if (it.confirm_password.length !== 6) {
                            errors.push(`第${no}個戶主之確認密碼須為6位數字`);
                        } else {
                            if (it.password !== it.confirm_password) {
                                errors.push(`第${no}個戶主之認密碼不正確`);
                            }
                        }
                    }
                }

                this.image_type_list.forEach((it2, index2) => {
                    if (it[`${it2.type}s`]) {
                        if (it[`${it2.type}s`].length > 0 && [0, 1, 2, 5].indexOf(index2) !== -1) {
                            it[`${it2.type}s`].forEach((it3, index3) => {
                                if (it3.available_date === "") {
                                    errors.push(`第${no}個戶主之第${index3 + 1}張${it2.title}有效期`);
                                }
                                if (it3.serial_no === "") {
                                    errors.push(`第${no}個戶主之第${index3 + 1}張${it2.title}編號`);
                                }
                            });
                        }
                    }
                });
            });

            check_form_is_valid($(this.$el), false);

            if (errors.length > 0) {
                await SysUI.alert("請填寫以下欄位", errors, true);
                return false;
            } else {
                return true;
            }
        },
        // 物件內所有空字串轉成null
        // change_null_string_to_null (obj) {
        //     let return_obj = obj;

        //     for (var key in return_obj) {
        //         if ((typeof return_obj[key] === "object") && !(return_obj[key] instanceof Array)) {
        //             this.change_null_string_to_null(return_obj[key]);
        //         } else {
        //             if (return_obj[key] === "")
        //                 return_obj[key] = null;
        //         }
        //     }

        //     return return_obj;
        // },
        post_profile () {
            let profile = JSON.parse(JSON.stringify(this.profile)).map(it => {
                ["name_suffix", "referrer_account_id", "lunar_birthday"].forEach(it2 => {
                    if (it[it2] === "")
                        it[it2] = null;
                });

                this.image_type_list.forEach(it2 => {
                    if (it[`${it2.type}s`] && it[`${it2.type}s`].length > 0) {
                        it[`${it2.type}s`].forEach(it3 => {
                            delete it3.file_path_base64;
                            delete it3.file_2_path_base64;
                        });
                    }
                });

                return it;
            });

            return profile;
        },
        async save () {
            SysUI.all_button_disabled(1);

            // if (!(await SysUI.input_pin(true))) {
            //     SysUI.all_button_disabled(0);
            //     return;
            // }

            let is_valid = await this.validates();
            if (!is_valid) {
                SysUI.all_button_disabled(0);
                return;
            }

            await SysUI.alert(this.UI.title, "sorry 暫時不能送出 by jay");
            SysUI.all_button_disabled(0);
            return;
            
            await this.check_same_name();

            let loadingInstance = this.$loading({
                background: "rgba(0,0,0,0.4)",
                text: "請求資料中..",
            });

            // let post_profile = this.profile.map(it => this.change_null_string_to_null(it));
            let post_profile = this.post_profile();

            let url = this.is_create ? API.createAccount : API.updateAccount;
            let action = this.is_create ? 'post' : 'patch'

            try {
                let response = await this.axios[action](url, {
                    location_id: this.location_id,
                    account: this.account,
                    profile: post_profile,
                }).then((res) => res);

                SysUI.all_button_disabled(0);
                loadingInstance.close();
                
                if (response.status === 200) {
                    this.hide(1);
                } else {
                    await SysUI.alert(this.UI.title, response.data.message);
                    return;
                }
            } catch (error) {
                SysUI.all_button_disabled(0);
                loadingInstance.close();

                console.log("error", error.response);
                await SysUI.alert(this.UI.title, error.response.data.message);
                return;
            }
        },
        show () {
            return this.$refs.modal.show();
        },
        test () {
            console.log(this.profile);
            console.log(this.post_profile());
        },
        hide (need_refresh = 0) {
            this.reset();
            return this.$refs.modal.hide(need_refresh);
        },
        reset () {
            Object.assign(this.$data, this.$options.data());
            remove_form_has_error($(this.$el));
        }
    }
}
</script>

<style lang="scss" scoped>
.edit_form {
    .step-list-area {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2.5rem;
        .step-list {
            position: relative;
            // width: 50%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .step-btn {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30rem;
                height: 15rem;
                button {
                    width: 5rem;
                    height: 5rem;
                    font-size: 1.8rem;
                    font-weight: bold;
                    border: 2px solid #22354D;
                    border-radius: 50%;
                    color: #22354D;
                    background-color: #FFF;
                    .step-title {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        color: #22354D;
                        width: 100%;
                    }
                }
                button.active {
                    color: #FFF;
                    background-color: #22354D;
                }
            }
        }
        .step-list:before {
            content: "";
            position: absolute;
            width: calc(100% - 30rem);
            height: .2rem;
            background-color: #22354D;
        }
    }
    .main-tab-content {
        padding: 1.5rem;
        max-height: 56vh;
        overflow: auto;
        #step1,
        #step2,
        #step3 {
            .row {
                position: relative;
                .form-group {
                    margin: 1rem 0;
                    .control-label {
                        padding-left: 1.5rem;
                    }
                }
            }
        }
        #step1 {
            .row {
                .filter-acc-no-area {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 1.5rem;
                    input {
                        flex: 5;
                    }
                    .filter-acc-no-line {
                        margin: 0 0.5rem;
                        height: 0.1rem;
                        background: #22354D;
                        flex: 1;
                        text-align: center;
                    }
                }
                .search-acc-no-btn-area {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    button {
                        width: 9rem;
                    }
                }
            }
            .acc-no-select-list {
                height: 30rem;
                font-size: 1.4rem;
                overflow: auto;
                background-color: #F6F6F6;
                .null-title {
                    padding: 2rem;
                    text-align: center;
                    font-weight: bold;
                }
                .acc-no-select-item0, 
                .acc-no-select-item1 {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    padding: 1rem .5rem;
                    cursor: pointer;
                }
                .acc-no-select-item0 {
                    background-color: #E4E4E4;
                }
                .acc-no-select-item1 {
                    background-color: #D0D0D0;
                }
                .form-check-input {
                    margin: 0 .5rem 0 0;
                }
                .acc-no-select-text {
                    margin-top: .2rem;
                }
            }
            .next-step-btn-area {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                margin-top: 1rem;
                button {
                    width: 9rem;
                }
            }
        }

        #step2 {
            .account-group-area,
            .referrer-account-area {
                display: flex;
                input:nth-child(1) {
                    flex: 1;
                    margin-right: .25rem;
                }
                input:nth-child(2) {
                    flex: 3;
                    margin-left: .25rem;
                }
            }
            .search-name-btn-area {
                display: flex;
                align-items: center;
                padding: 0 0 0 .4rem;
            }
            .en-first-name-area {
                display: flex;
                input:nth-child(1) {
                    margin-right: .25rem;
                }
                input:nth-child(2) {
                    margin-left: .25rem;
                }
            }
            .solar-birthday-area {
                position: relative;
                .solar-birthday-error {
                    position: absolute;
                    top: -2rem;
                    right: 0;
                    font-size: 1.3rem;
                }
            }
            .speaking-languages-area {
                .speaking-languages-title {
                    width: 11.1%;
                }
                .speaking-languages-list {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .speaking-languages-item {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        .form-check-input {
                            margin: 0;
                        }
                        .control-label {
                            width: auto;
                            padding-left: 0.5rem;
                        }
                    }
                }
            }
            .full-address-title {
                width: 11.1%;
            }
            .telephone-input-area {
                display: flex;
                select {
                    flex: 2;
                    margin-right: .25rem;
                }
                input {
                    flex: 3;
                    margin-left: .25rem;
                }
            }
            .telephone-remark {
                resize: none;
                height: auto;
            }
            .telephone-btn-area {
                display: flex;
                justify-content: flex-end;
                padding-right: 8.33%;
                .btn {
                    width: 9rem;
                }
            }
            .telephone-list-area {
                .telephone-list-head {
                    margin: 1rem;
                    padding-right: 1.5rem;
                    height: 2rem;
                    .telephone-list-head-title {
                        padding-left: 1rem;
                        font-size: 1.3rem;
                        font-weight: bold;
                        text-align: left;
                    }
                }
                .telephone-list-body {
                    margin: 1rem;
                    height: 16.5rem;
                    overflow-y: scroll;
                    .telephone-list-item {
                        margin: 0 0 1rem 0;
                        .telephone-list-btn-area {
                            display: flex;
                            align-items: center;
                            justify-content: flex-end;
                            .btn {
                                width: 9rem;
                            }
                        }
                    }
                }
            }
        }

        #step3 {
            .image-area {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                padding: 1.5rem;
                .image-clean-btn {
                    position: absolute;
                    right: 30%;
                    top: 1.7rem;
                    font-size: 2rem;
                    color: #F03447;
                    cursor: pointer;
                }
                .image-tips {
                    margin-top: .5rem;
                    font-size: 1.2rem;
                    opacity: 0.6;
                    color: #1e2734;
                }
                img {
                    margin-top: .5rem;
                    width: 35rem;
                    height: auto;
                }
                .image-form-group {
                    max-width: 50.7rem;
                }
            }
        }

        .acc-list-area,
        .acc-address-area,
        .acc-image-area {
            display: flex;
            flex-wrap: wrap;
            margin: 2rem 0;
            padding: 0 1.5rem;
            .acc-image-btn-group {
                position: relative;
            }
            .acc-list-btn,
            .acc-address-btn,
            .acc-image-btn {
                position: relative;
                min-width: 10rem;
                height: 3.5rem;
                margin-right: 4.5rem;
                margin-bottom: 1rem;
                padding: .7rem 2.5rem;
                border-radius: 5rem;
                font-size: 1.4rem;
                border: 1px solid #006ace;
                color: #006ace;
                background-color: transparent;
            }
            .acc-list-btn.active,
            .acc-address-btn.active,
            .acc-image-btn.active {
                color: #FFF;
                background-color: #006ace;
            }
            .acc-list-delete-btn,
            .acc-address-delete-btn,
            .acc-image-delete-btn {
                position: absolute;
                left: 0.5rem;
                top: 0.2rem;
                font-size: 2rem;
                color: #F03447;
            }
            .add-acc-btn {
                margin-bottom: 1rem;
                font-size: 2rem;
                color: #006ace;
                background: none;
                border: none;
            }
            .add-acc-image-btn {
                position: absolute;
                left: 28.5%;
                bottom: -2.05rem;
                padding: 0;
                font-size: 2rem;
                color: #006ace;
                background: none;
                border: none;
            }
        }
    }
}
</style>