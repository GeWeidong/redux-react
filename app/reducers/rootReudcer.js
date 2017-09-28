/**
 * Created by ljunb on 16/5/25.
 * 根reducer
 */
import { combineReducers } from 'redux';
import Home from './homeReducer';
import Class from './classReducer';
import ClassDetial from './classDetialReducer';
import setReducer from './setReducer';
import userReducer from './userReducer';

export default rootReducer = combineReducers({
    Home,
    Class,
    ClassDetial,
    setReducer,
    userReducer,
})