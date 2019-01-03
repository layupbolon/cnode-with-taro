import _ from 'lodash';

import * as services from '../services';

export default {
    namespace: 'topicDetail',
    state: {
        dataSource: {},
        replyItems: [],
    },
    reducers: {
        changeState(state, { payload }) {
            return { ...state, ...payload};
        },
        initState() {
            return {
                dataSource: {},
                replyItems: [],
            };
        }
    },

    effects: {
        * getTopicDetailData({ payload }, { call, put }) {
            yield put({ type: 'initState' });

            const { id, accesstoken } = payload;
            const topicData = yield call(services.GetTopicDetail, id, accesstoken);

            yield put({
                type: 'changeState',
                payload: { dataSource: topicData.data }
            });

            if (topicData.data.replies && topicData.data.replies.length > 0) {
                topicData.data.replies.forEach(item => {
                    item.showReplyBox = false;
                });
                yield put({
                    type: 'changeState',
                    payload: { replyItems: topicData.data.replies }
                });
            }
        },

        * replyUp({ payload }, { call, put, select }) {
            const { reply_id, accesstoken } = payload;
            const result = yield call(services.replyUp, reply_id, accesstoken);
            if (result && result.data && result.data.success) {
                let { replyItems } = yield select(state => ({
                    replyItems: state.topicDetail.replyItems
                })
                );

                replyItems.forEach((item) => {
                    if (item.id === reply_id) {
                        if (result.data.action === 'up') {
                            item.is_uped = true;
                            item.ups.push(reply_id);
                        }
                        if (result.data.action === 'down') {
                            item.is_uped = false;
                            item.ups.length = item.ups.length - 1;
                        }
                    }
                });

                yield put({
                    type: 'changeState',
                    payload: { replyItems: replyItems }
                });
            }
        },

        * showReplyBox({ payload }, { put, select }) {
            const { index } = payload;
            let { replyItems } = yield select(state => ({
                replyItems: state.topicDetail.replyItems
            })
            );
            if (replyItems && replyItems.length > 0) {
                replyItems[index].showReplyBox = !replyItems[index].showReplyBox;
            }
            yield put({
                type: 'changeState',
                payload: { replyItems: replyItems }
            });
        },

        * submitReply({ payload }, { call }) {
            const { submitData, cb } = payload;
            const result = yield call(services.PostReply, submitData);
            if (result.data.success) {
                cb && cb();
            }
        }
    },
};
