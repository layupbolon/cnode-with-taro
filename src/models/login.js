import * as services from '../services'

export default {
	namespace: 'login',
	state: {},
	reducers: {
		changeState(state, { payload }) {
			return { ...state, ...payload }
		}
	},
	effects: {
		*login({ payload }, { call }) {
			const result = yield call(services.Login, payload.accesstoken)
			console.log('result: ', result)

			if (result && result.success) {
				result.accesstoken = payload.accesstoken
				localStorage.setItem('User', JSON.stringify(result))
				payload.cb && payload.cb(true, '登录成功')
			} else {
				payload.cb && payload.cb(false, '登录失败')
			}
		},

		// eslint-disable-next-line require-yield
		*logout({ payload }) {
			localStorage.removeItem('User')
			payload.cb && payload.cb()
		}
	}
}
