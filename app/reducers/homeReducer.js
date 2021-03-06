

import * as types from '../actions/actionTypes';

const initialState = {
    HomeList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let homeReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case types.FETCH_HOME_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading
            })
            
        case types.RECEIVE_HOME_LIST:
            // 如果请求成功后，返回状态给组件更新数据
            return Object.assign({}, state, {
                HomeList: state.isLoadMore ? state.HomeList.concat(action.homeList) : action.homeList,

                isRefreshing: false,
                isLoading: false,
            })

        case types.RESET_STATE:
            return Object.assign({},state,{
                HomeList:[],
                isLoading:true,
            })
        default:
            return state;
    }
}

export default homeReducer;
