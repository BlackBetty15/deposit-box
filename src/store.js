import { createStore, CombinedReducers } from 'redux';
import displayReducer from "./reducers/displayReducer";

export default createStore(displayReducer);
