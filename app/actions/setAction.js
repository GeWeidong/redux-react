import * as types from './actionTypes';

let setTitle = (value) => {
	return (dispatch, getState) => {
		dispatch(changeValue(value))
	}
}

let setText = (text) => {
	return dispatch => {
		dispatch(changeText(text))
	}
}

// 修改标题主题
let changeValue = (titleTheme) => {
	return {
		type: types.CHANGE_SET_SWITCH,
		titleTheme
	}
}

// 设置详情页内容文字主题
let changeText = (textColor) => {
	return {
		type: types.CHANGE_SET_TEXT,
		textColor
	}
}

export {
	setText,
	setTitle
};