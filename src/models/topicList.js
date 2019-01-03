import * as services from '../services';

const initState = {
	headSelectedIndex: 0,
	topicDatasource: [],
	pageIndex: 1,
	pageSize: 15,
	tab: 'all'
};

export default {
	namespace: 'topicList',
	state: initState,
	reducers: {
		changeState(state, { payload }) {
			return {
				...state,
				...payload
			};
		},
		initState() {
			return initState;
		}
	},

	effects: {
		*getTopicData({ payload }, { call, put, select }) {
			const setting = yield select((state) => ({
				pageIndex: state.topicList.pageIndex,
				pageSize: state.topicList.pageSize,
				tab: state.topicList.tab
			}));
			const topicData = yield call(services.GetTopics, setting);

			let { topicDatasource } = yield select((state) => ({
				topicDatasource: state.topicList.topicDatasource
			}));
			yield put({
				type: 'changeState',
				payload: {
					topicDatasource: topicDatasource.concat(topicData.data)
				}
			});
		},

		*tabChange({ payload }, { put }) {
			yield put({
				type: 'changeState',
				payload: {
					tab: payload.tab
				}
			});
			yield put({
				type: 'getTopicData'
			});
		},

		*getNextPageTopicData({ payload }, { put, select }) {
			const { pageIndex } = yield select((state) => ({
				pageIndex: state.topicList.pageIndex
			}));
			yield put({
				type: 'changeState',
				payload: {
					pageIndex: pageIndex + 1
				}
			});
			yield put({
				type: 'getTopicData'
			});
		}
	}
};
