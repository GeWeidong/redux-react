import * as types from './actionTypes';

let userAction = (user) => {
	return dispatch => {
		dispatch(userInfo(user))
	}
}

let userInfo = (user) => {
	return {
		type: types.USER_INFO,
		user
	}
}

export  {
	userAction
};