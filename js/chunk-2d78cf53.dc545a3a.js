(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d78cf53"],{"1b6c":function(e,n,t){"use strict";t("1e25")},"1e25":function(e,n,t){},"29ff":function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"main_content"},[t("Header",{attrs:{tag_list:e.tag_list,select_tag_index:e.select_tag_index},on:{emitTagClick:e.getTagClick,emitCloseTag:e.getCloseTag,emitAddTag:e.getAddTag,emitChangeLocation:e.getChangeLocation}}),t("ColumnLeft",{attrs:{menus:e.menus},on:{emitMenuClick:e.getMenuClick}}),e._l(e.tag_list,(function(n,a){return t("div",{key:a,staticClass:"iframe_content tab_content",class:{active:e.select_tag_index===a},attrs:{id:"tab_"+a}},[t("iframe",{ref:"iframeRef_"+a,refInFor:!0,staticClass:"modal_iframe",attrs:{id:"iframeid-tab_"+a,src:n.href&&n.href+"?iframeKey="+n.id,frameborder:"0"}})])}))],2)},i=[],r=t("1da1"),c=(t("4de4"),t("d3b7"),t("4d63"),t("c607"),t("ac1f"),t("2c3e"),t("25f0"),t("466d"),t("a434"),t("e9c4"),t("96cf"),function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"header_wrap"},[t("div",{staticClass:"header_body container-fluid"},[t("div",{staticClass:"left_area"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.location_id,expression:"location_id"}],staticClass:"form-select header_select",on:{change:[function(n){var t=Array.prototype.filter.call(n.target.options,(function(e){return e.selected})).map((function(e){var n="_value"in e?e._value:e.value;return n}));e.location_id=n.target.multiple?t:t[0]},function(n){return e.change_location_id()}]}},[t("option",{attrs:{value:"1"}},[e._v("貴賓廳1")]),t("option",{attrs:{value:"2"}},[e._v("貴賓廳2")])])]),t("div",{staticClass:"right_area"},[e._m(0),t("div",{staticClass:"user_area"},[t("div",{staticClass:"user_border"},[t("div",{staticClass:"user_head"}),t("div",{staticClass:"staff_info"},[t("div",[e._v(" "+e._s(e.staff_no)+" ")]),t("div",[e._v(" ("+e._s(e.staff_name)+") ")])])])]),t("a",{staticClass:"btn_exit",on:{click:function(n){return e.logout()}}},[t("div",{staticClass:"btn_exit_border"},[t("svg-icon",{attrs:{"icon-class":"exit","class-name":"exit"}}),t("span",[e._v(" 登出 ")])],1)])])]),t("div",{staticClass:"page_tag_list"},[t("div",{staticClass:"page_tabs"},[t("nav",{staticClass:"nav nav-tabs"},e._l(e.tag_list,(function(n,a){return t("a",{key:"tag_"+a,staticClass:"nav-link",class:{active:e.select_tag_index===a},on:{click:function(n){return n.stopPropagation(),e.tag_click(a)}}},[e._v(" "+e._s(n.name)+" "),e.tag_list.length>1?t("span",{staticClass:"close_btn",on:{click:function(n){return n.stopPropagation(),e.close_tag(a)}}},[t("i",{staticClass:"fa fa-times"})]):e._e()])})),0),e.tag_list.length<10?t("a",{staticClass:"add_btn",on:{click:function(n){return e.add_tag()}}},[t("i",{staticClass:"fa fa-plus"})]):e._e()])])])}),s=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"version_area"},[t("div",{staticClass:"version_border"},[e._v(" 版本 0.0.0.1 ")])])}],o=(t("a9e3"),{logout:"".concat("http://dev-tc-laravel.vc-technology.com","/api/auth/logout")}),l={name:"header_wrap",data:function(){return{location_id:"",staff_name:sessionStorage["staff_name"],staff_no:sessionStorage["staff_no"]}},props:{tag_list:{type:Array,default:[]},select_tag_index:{type:Number,default:0}},created:function(){void 0===sessionStorage["location_id"]||null===sessionStorage["location_id"]?(sessionStorage["location_id"]="1",this.$store.commit("SET_LOCATION_ID","1"),this.location_id="1"):(this.$store.commit("SET_LOCATION_ID",sessionStorage["location_id"]),this.location_id=sessionStorage["location_id"])},methods:{change_location_id:function(){this.$store.commit("SET_LOCATION_ID",this.location_id),sessionStorage["location_id"]=this.location_id,this.$emit("emitChangeLocation")},logout:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("test"!==sessionStorage["user_token"]){n.next=3;break}return e.$router.push("/login",(function(){})),n.abrupt("return");case 3:return n.prev=3,n.next=6,e.axios.post(o.logout).then((function(e){return e}));case 6:if(t=n.sent,200!==t.status){n.next=11;break}e.$router.push("/login",(function(){})),n.next=14;break;case 11:return n.next=13,SysUI.alert("登出失敗",t.data.message);case 13:return n.abrupt("return");case 14:n.next=22;break;case 16:return n.prev=16,n.t0=n["catch"](3),console.log("error",n.t0.response),n.next=21,SysUI.alert("登出失敗",n.t0.response.data.message);case 21:return n.abrupt("return");case 22:case"end":return n.stop()}}),n,null,[[3,16]])})))()},tag_click:function(e){this.$emit("emitTagClick",e)},close_tag:function(e){this.$emit("emitCloseTag",e)},add_tag:function(){this.$emit("emitAddTag")}}},u=l,d=(t("4ca0"),t("2877")),f=Object(d["a"])(u,c,s,!1,null,"f7dda02c",null),h=f.exports,g=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"column_left"},[a("div",{staticClass:"header_logo"},[a("a",{on:{click:function(n){return e.reload()}}},[a("img",{attrs:{src:t("cf05"),alt:""}})])]),a("div",{staticClass:"sidebar"},[a("el-menu",{staticClass:"el-menu-vertical-demo"},[e._l(e.menus,(function(n){return[0===n.children.length?a("el-menu-item",{key:"item_"+n.key,attrs:{id:"item_"+n.key,href:n.href,index:""+n.key},on:{click:function(n){return e.menu_click(n)}}},[a("i",{staticClass:"fa",class:n.icon}),e._v(" "+e._s(n.name)+" ")]):a("el-submenu",{key:"item_"+n.key,attrs:{id:"item_"+n.key,index:""+n.key}},[a("template",{slot:"title"},[a("i",{staticClass:"fa",class:n.icon}),a("span",[e._v(e._s(n.name))])]),e._l(n.children,(function(n){return[0===n.children.length?a("el-menu-item",{key:"item_"+n.key,attrs:{id:"item_"+n.key,href:n.href,index:""+n.key},on:{click:function(n){return e.menu_click(n)}}},[a("i",{staticClass:"fa",class:n.icon}),e._v(" "+e._s(n.name)+" ")]):a("el-submenu",{key:"item_"+n.key,attrs:{id:"item_"+n.key,index:""+n.key}},[a("template",{slot:"title"},[a("i",{staticClass:"fa",class:n.icon}),a("span",[e._v(e._s(n.name))])]),e._l(n.children,(function(t){return[0===t.children.length?a("el-menu-item",{key:"item_"+t.key,attrs:{id:"item_"+t.key,href:t.href,index:""+t.key},on:{click:function(n){return e.menu_click(n)}}},[a("i",{staticClass:"fa",class:n.icon}),e._v(" "+e._s(t.name)+" ")]):a("el-submenu",{key:"item_"+t.key,attrs:{id:"item_"+t.key,index:""+t.key}},[a("template",{slot:"title"},[a("i",{staticClass:"fa",class:t.icon}),a("span",[e._v(e._s(t.name))])])],2)]}))],2)]}))],2)]}))],2)],1)])},m=[],k=(t("498a"),t("1276"),{name:"column_left",data:function(){return{}},props:{menus:{type:Array,default:[]}},options:{styleIsolation:"shared"},methods:{reload:function(){location.reload()},menu_click:function(e){var n=e.$vnode.elm;this.$emit("emitMenuClick",n.innerText.trim(),n.getAttribute("href"),n.getAttribute("id").split("item_")[1])}}}),y=k,p=(t("59dd"),Object(d["a"])(y,g,m,!1,null,null,null)),b=p.exports,v=t("9472"),C=t("5c96"),x=t.n(C),S=(t("85be"),{name:"main_content",components:{Header:h,ColumnLeft:b},data:function(){return{permission:[],menus:[],tag_list:[{name:"主頁",href:"",id:""}],select_tag_index:0}},created:function(){this.init_menu_list()},methods:{getMenuClick:function(e,n,t){var a=this;return Object(r["a"])(regeneratorRuntime.mark((function i(){var r;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,a.get_permissions();case 2:if(r=i.sent,"test"===sessionStorage["user_token"]?a.permission=["*"]:a.permission=r,-1===a.permission.indexOf("*")&&-1===a.permission.indexOf(t)){i.next=9;break}a.menuClick(e,n,t),a.init_menu_list(),i.next=12;break;case 9:return i.next=11,SysUI.alert(e,"用戶未擁有權限",!0);case 11:location.reload();case 12:case"end":return i.stop()}}),i)})))()},menuClick:function(e,n,t){var a={name:e,href:n,id:t},i=x.a.Loading.service({background:"rgba(0,0,0,0.4)",text:"載入模組中.."});_.flatten(_.filter(this.$store.state.user_permissions,(function(e){var n=new RegExp("^".concat(t),"g");return e.match(n)})));this.tag_list[this.select_tag_index].href===a.href?document.getElementById("iframeid-tab_".concat(this.select_tag_index)).contentWindow.location.reload(!0):this.tag_list.splice(this.select_tag_index,1,a),this.$forceUpdate(),i.close()},insertPermissionsToIframe:function(){},getTagClick:function(e){this.select_tag_index=e},getCloseTag:function(e){this.tag_list.splice(e,1),this.$forceUpdate()},getAddTag:function(){var e={name:"新分頁",href:""};this.tag_list.push(e),this.select_tag_index=this.tag_list.length-1,this.$forceUpdate()},init_menu_list:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e.permission=e.$store.state.user_permissions,-1!==e.permission.indexOf("*")?e.menus=JSON.parse(JSON.stringify(v)):e.menus=e.set_menu_list(JSON.parse(JSON.stringify(v)),e.permission),e.$forceUpdate();case 3:case"end":return n.stop()}}),n)})))()},get_permissions:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var t,a,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t="".concat("http://dev-tc-laravel.vc-technology.com","/api/auth/permission/list"),n.prev=1,n.next=4,e.axios.get(t).then((function(e){return e}));case 4:return i=n.sent,200==i.status&&(a=i.data.data,sessionStorage["user_permissions"]=i.data.data,e.$store.commit("SET_USER_PERMISSIONS",i.data.data)),n.abrupt("return",a);case 9:return n.prev=9,n.t0=n["catch"](1),console.log(n.t0),n.abrupt("return",a);case 13:case"end":return n.stop()}}),n,null,[[1,9]])})))()},set_menu_list:function(e,n){var t=this;return e.filter((function(e){if(-1!==n.indexOf(e.key))return e.children.length>0?(e.children=t.set_menu_list(e.children,n),e):e}))},getChangeLocation:function(){if(this.tag_list.some((function(e){return e.href.length>0}))){var e=x.a.Loading.service({background:"rgba(0,0,0,0.4)",text:"載入模組中.."}),n=document.getElementsByClassName("modal_iframe");Array.prototype.forEach.call(n,(function(e){e.contentWindow.location.reload(!0)})),e.close()}}}}),w=S,O=(t("1b6c"),Object(d["a"])(w,a,i,!1,null,"4a86e583",null));n["default"]=O.exports},"3a33":function(e,n,t){},"498a":function(e,n,t){"use strict";var a=t("23e7"),i=t("58a8").trim,r=t("c8d2");a({target:"String",proto:!0,forced:r("trim")},{trim:function(){return i(this)}})},"4ca0":function(e,n,t){"use strict";t("3a33")},"59dd":function(e,n,t){"use strict";t("db4c")},9472:function(e){e.exports=JSON.parse('[{"href":"","icon":"fa-user","key":"1","name":"戶口管理","children":[{"href":"/accmanage","icon":"fa-angle-double-right","key":"1_1","name":"戶口管理","children":[]},{"href":"","icon":"fa-angle-double-right","key":"1_2","name":"戶口格仔表","children":[]},{"href":"","icon":"fa-angle-double-right","key":"1_3","name":"戶口文件檔","children":[{"href":"/acc_loan_doc","icon":"fa-angle-double-right","key":"1_3_1","name":"借貸文件","children":[]},{"href":"/acc_internal_doc","icon":"fa-angle-double-right","key":"1_3_2","name":"內部文件","children":[]},{"href":"/acc_real_estate_doc","icon":"fa-angle-double-right","key":"1_3_3","name":"資產資料(不動產)","children":[]},{"href":"/acc_company_doc","icon":"fa-angle-double-right","key":"1_3_4","name":"資產資料(公司)","children":[]}]},{"href":"/order_note","icon":"fa-angle-double-right","key":"1_4","name":"提醒管理","children":[]}]},{"href":"","icon":"fa-user","key":"2","name":"轉碼管理","children":[{"href":"","icon":"fa-angle-double-right","key":"2_1","name":"即時轉碼","children":[]},{"href":"","icon":"fa-angle-double-right","key":"2_2","name":"轉碼記錄","children":[]},{"href":"","icon":"fa-angle-double-right","key":"2_3","name":"轉碼匯總","children":[]},{"href":"","icon":"fa-angle-double-right","key":"2_4","name":"場次記錄","children":[]},{"href":"","icon":"fa-angle-double-right","key":"2_5","name":"轉碼活動設定","children":[]}]},{"href":"","icon":"fa-user","key":"3","name":"圍數管理","children":[{"href":"","icon":"fa-angle-double-right","key":"3_1","name":"截更管理","children":[]},{"href":"","icon":"fa-angle-double-right","key":"3_2","name":"截大數管理","children":[]},{"href":"","icon":"fa-angle-double-right","key":"3_3","name":"籌碼互換","children":[]}]},{"href":"","icon":"fa-user","key":"4","name":"買碼管理","children":[{"href":"","icon":"fa-angle-double-right","key":"4_1","name":"買碼管理","children":[]}]},{"href":"","icon":"fa-user","key":"5","name":"存款管理","children":[{"href":"","icon":"fa-angle-double-right","key":"5_1","name":"存款管理","children":[]},{"href":"","icon":"fa-angle-double-right","key":"5_2","name":"存款匯總","children":[]},{"href":"","icon":"fa-angle-double-right","key":"5_3","name":"存款流水","children":[]},{"href":"","icon":"fa-angle-double-right","key":"5_4","name":"集團存款流水","children":[]}]},{"href":"","icon":"fa-user","key":"6","name":"貸款管理","children":[{"href":"","icon":"fa-angle-double-right","key":"6_1","name":"貸款還款","children":[]},{"href":"","icon":"fa-angle-double-right","key":"6_2","name":"貸款流水","children":[]},{"href":"","icon":"fa-angle-double-right","key":"6_3","name":"貸款匯總","children":[]},{"href":"","icon":"fa-angle-double-right","key":"6_4","name":"利息管理","children":[]},{"href":"","icon":"fa-angle-double-right","key":"6_5","name":"戶口批額設定","children":[]},{"href":"","icon":"fa-angle-double-right","key":"6_6","name":"批額設定流水","children":[]}]},{"href":"","icon":"fa-user","key":"7","name":"飛數管理","children":[{"href":"","icon":"fa-angle-double-right","key":"7_1","name":"飛數記錄","children":[]},{"href":"","icon":"fa-angle-double-right","key":"7_2","name":"飛數匯總","children":[]}]},{"href":"","icon":"fa-user","key":"8","name":"場面數管理","children":[{"href":"","icon":"fa-angle-double-right","key":"8_1","name":"場面數記錄","children":[]},{"href":"","icon":"fa-angle-double-right","key":"8_2","name":"場次記錄","children":[]},{"href":"","icon":"fa-angle-double-right","key":"8_3","name":"場面數匯總","children":[]},{"href":"","icon":"fa-angle-double-right","key":"8_4","name":"場面截數","children":[]}]},{"href":"","icon":"fa-user","key":"9","name":"佣金出糧管理","children":[{"href":"","icon":"fa-angle-double-right","key":"9_1","name":"佣金設定","children":[]},{"href":"","icon":"fa-angle-double-right","key":"9_2","name":"客戶欠數表","children":[]},{"href":"","icon":"fa-angle-double-right","key":"9_3","name":"欠數流水","children":[]},{"href":"","icon":"fa-angle-double-right","key":"9_4","name":"佣金還欠數表","children":[]},{"href":"","icon":"fa-angle-double-right","key":"9_5","name":"出佣單管理","children":[]},{"href":"","icon":"fa-angle-double-right","key":"9_6","name":"津貼管理","children":[]},{"href":"","icon":"fa-angle-double-right","key":"9_7","name":"津貼流水","children":[]}]},{"href":"","icon":"fa-user","key":"10","name":"碼糧管理","children":[{"href":"","icon":"fa-angle-double-right","key":"10_1","name":"即出碼糧","children":[]},{"href":"","icon":"fa-angle-double-right","key":"10_2","name":"即出記錄","children":[]}]},{"href":"","icon":"fa-user","key":"11","name":"賭檯系統","children":[{"href":"","icon":"fa-angle-double-right","key":"11_1","name":"賭房管理","children":[]},{"href":"","icon":"fa-angle-double-right","key":"11_2","name":"賭檯管理","children":[]},{"href":"","icon":"fa-angle-double-right","key":"11_3","name":"上下數記錄","children":[]}]},{"href":"","icon":"fa-user","key":"12","name":"話機管理","children":[{"href":"","icon":"fa-angle-double-right","key":"12_1","name":"通話記錄","children":[]},{"href":"","icon":"fa-angle-double-right","key":"12_2","name":"錄音記錄","children":[]},{"href":"","icon":"fa-angle-double-right","key":"12_3","name":"驗證記錄","children":[]}]},{"href":"","icon":"fa-user","key":"13","name":"系統管理","children":[{"href":"","icon":"fa-angle-double-right","key":"13_1","name":"列印設置","children":[]},{"href":"/sys_staff","icon":"fa-angle-double-right","key":"13_2","name":"職員管理","children":[]},{"href":"/sys_staff_position","icon":"fa-angle-double-right","key":"13_3","name":"職位管理","children":[]},{"href":"/sys_department","icon":"fa-angle-double-right","key":"13_4","name":"部門管理","children":[]}]},{"href":"","icon":"fa-user","key":"14","name":"報表","children":[]}]')},c8d2:function(e,n,t){var a=t("5e77").PROPER,i=t("d039"),r=t("5899"),c="​᠎";e.exports=function(e){return i((function(){return!!r[e]()||c[e]()!==c||a&&r[e].name!==e}))}},cf05:function(e,n,t){e.exports=t.p+"img/logo.82b9c7a5.png"},db4c:function(e,n,t){}}]);
//# sourceMappingURL=chunk-2d78cf53.dc545a3a.js.map