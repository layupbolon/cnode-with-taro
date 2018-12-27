import request from '../utils/request';
import { randomData } from '../utils';

export function GetTopics(setting) {
    const defaultSetting = {
        pageIndex: 1,
        pageSize: 10,
        tab: 'all'
    };
    let newSetting = Object.assign(defaultSetting, setting);

    let url = '/topics?';
    if (newSetting.pageIndex) {
        url += 'page=' + newSetting.pageIndex;
    }
    if (newSetting.tab) {
        url += '&tab=' + newSetting.tab;
    }
    else {
        url += '&tab=all';
    }
    if (newSetting.pageSize) {
        url += '&limit=' + newSetting.pageSize;
    }
    url += '&mdrender=false&' + randomData();

    return request({url,method: 'GET'});
}

export function GetTopicDetail(id, accesstoken) {
    let url = '/topic/${id}?${randomData()}';
    if (accesstoken) {
        url += `&mdrender=true&accesstoken=${accesstoken}`;
    }
    return request({url,method: 'GET'});
}

export function GetUserData(userName) {
    const url = `/user/${userName}?${randomData()}`;
    return request({url,method: 'GET'});
}

export function Login(accesstoken) {
    const url = '/accesstoken';
    return request({url,method: 'POST',data:{accesstoken}});
}

export function Publish(data) {
    const url = '/topics';
    return request({url,method: 'POST',data});
}

export function replyUp(reply_id, accesstoken) {
    const url = `/reply/${reply_id}/ups`;
    return request({url,method: 'POST',data:{accesstoken}});
}

export function PostReply(data) {
    const { topic_id, ...rest } = data;
    const url = `/topic/${topic_id}/replies`;
    return request({url,method: 'POST',data:rest});
}

export function GetMsg(accesstoken) {
    const url = `/messages?accesstoken=${accesstoken}`;
    return request({url,method: 'GET'});
}
