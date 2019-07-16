import { createStore, combineReducers, applyMiddleware } from 'redux';
import displayReducer from "./reducers/displayReducer";
import validationReducer from "./reducers/validationReducer";
import START_TIMER from 'redux-timer-middleware';

const timer =  START_TIMER;
export default createStore(combineReducers({displayReducer, validationReducer}),{},applyMiddleware(timer));
