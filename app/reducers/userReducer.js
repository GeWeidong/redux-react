
import * as types from '../actions/actionTypes';

const initialState = {
    user: null

};

let userReducer = (state = initialState, action) => {
	
	switch (action.type) {
        case types.USER_INFO:
            return Object.assign({}, state, {
            	user: action.user
            })

        default:
            return state;
    }
}

export default userReducer;
