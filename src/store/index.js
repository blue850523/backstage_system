import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user_token: null,
		staff_name: null,
		staff_no: null,
		user_permissions: null,
		location_id: null,
	},
	mutations: {
		SET_USER_TOKEN (state, newValue) {
			state.user_token = newValue;
		},
		SET_STAFF_NAME (state, newValue) {
			state.staff_name = newValue;
		},
		SET_STAFF_NO (state, newValue) {
			state.staff_no = newValue;
		},
		SET_USER_PERMISSIONS (state, newValue) {
			state.user_permissions = newValue;
		},
		SET_LOCATION_ID (state, newValue) {
			state.location_id = newValue;
		}
	},
	actions: {
	},
	modules: {
	},
	// 嚴格模式，禁止直接修改state
	strict: true
})
