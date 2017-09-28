

import * as types from './actionTypes';
import Util from '../common/utils'; 
// action创建函数，此处是渲染首页的各种图片
export let home = (tag, offest, limit, isLoadMore, isRefreshing, isLoading) => {
    let URL = 'http://api.huaban.com/fm/wallpaper/pins?limit=';
    if (limit) URL += limit;
    offest ? URL += '&max=' + offest : URL += '&max=';
    tag ? URL += '&tag=' + encode_utf8(tag) : URL += '&tag='
    
    return dispatch => {
        // 分发事件  不修改状态   action是 store 数据的唯一来源。
        dispatch(feachHomeList(isLoadMore, isRefreshing, isLoading));
        return Util.get(URL, (response) => {
            // 请求数据成功后
            dispatch(receiveHomeList(response.pins))
        }, (error) => {
            // 请求失败
            dispatch(receiveHomeList([]));
        });

    }

}

function encode_utf8(s) {
    return encodeURIComponent(s);
}

// 我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。
let feachHomeList = (isLoadMore, isRefreshing, isLoading) => {
    return {
        type: types.FETCH_HOME_LIST,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}

let receiveHomeList = (homeList) => {
    return {
        type: types.RECEIVE_HOME_LIST,
        homeList: homeList,
    }
}


