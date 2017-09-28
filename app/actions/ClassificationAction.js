

import * as types from './actionTypes';
import Util from '../common/utils';

export let ClassAction = (isLoading) => {
    let URL = 'http://api.huaban.com/fm/wallpaper/tags';
    return dispatch => {
        // 发出网络请求
        dispatch(feachClassList(isLoading));
        return Util.get(URL,(response) => {
            // 请求成功的状态
            dispatch(receiveClassList(response));
        },(error) => {
            // 请求失败的情况
            dispatch(receiveClassList([]));
        });
    }
}

let feachClassList = (isLoading) => {
    return {
        type: types.FETCH_CLASS_LIST,
        isLoading: isLoading,
    }
}

let receiveClassList = (classList) => {
    return {
        type: types.RECEIVE_CLASS_LIST,
        classList: classList,
    }
}