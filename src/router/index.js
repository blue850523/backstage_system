import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


let tempPush = VueRouter.prototype.push;
let tempReplace = VueRouter.prototype.replace;

//改寫push跟replace底層error
VueRouter.prototype.push = function (location, res, rej) {
    if (res && rej) {
        tempPush.call(this, location, res, rej);
    } else {
        tempPush.call(
            this,
            location,
            () => {},
            () => {}
        );
    }
};
VueRouter.prototype.replace = function (location, res, rej) {
    if (res && rej) {
        tempReplace.call(this, location, res, rej);
    } else {
        tempReplace.call(
            this,
            location,
            () => {},
            () => {}
        );
    }
};

const routes = [
    {
        path: "/",
        name: "Main",
        component: () => import("../views/Main.vue"),
        children: [
            {
                path: "login",
                name: "Login",
                component: () => import("../views/Login.vue"),
            },
            {
                path: "content",
                name: "Content",
                component: () => import("../views/Content.vue"),
                children: [
                ],
            },
            {
                path: "test",
                name: "Test",
                component: () => import("../views/Test.vue"),
            },
        ],
    },
	// 戶口管理
	{
		path: "/accmanage",
		name: "Accmanage",
		component: () => import("../views/accmanage/index.vue"),
	},
	// 借貸文件
	{
		path: "/acc_loan_doc",
		name: "AccLoanDoc",
		component: () => import("../views/acc_loan_doc"),
	},
	// 內部文件
	{
		path: "/acc_internal_doc",
		name: "AccInternalDoc",
		component: () => import("../views/acc_internal_doc"),
	},
	// 資產資料(不動產)
	{
		path: "/acc_real_estate_doc",
		name: "AccRealEstateDoc",
		component: () => import("../views/acc_real_estate_doc"),
	},
	// 資產資料(公司)
	{
		path: "/acc_company_doc",
		name: "AccCompanyDoc",
		component: () => import("../views/acc_company_doc"),
	},
    //提醒管理
    {
        path: "/order_note",
        name: "OrderNote",
        component: () => import("../views/order_note/index.vue"),
    },
    //職員管理
    {
        path: "/sys_staff",
        name: "SysStaff",
        component: () => import("../views/sys_staff/index.vue"),
    },
    //職位管理
    {
        path: "/sys_staff_position",
        name: "sys_staff_position",
        component: () => import("../views/sys_staff_position/index.vue"),
    },
    //部門管理
    {
        path: "/sys_department",
        name: "SysDepartment",
        component: () => import("../views/sys_department/index.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
