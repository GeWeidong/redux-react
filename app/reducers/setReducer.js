import * as types from '../actions/actionTypes';

const initialState = {
	titleTheme: false,
	textColor: false
}

let setReducer = (state = initialState, action) => {

	switch(action.type){
		case types.CHANGE_SET_SWITCH:
			return Object.assign({}, state, {
				titleTheme: action.titleTheme,
			})

		case types.CHANGE_SET_TEXT:
			return Object.assign({}, state, {
				textColor: action.textColor
			})

		default:
			return state;
	}
}

export default setReducer