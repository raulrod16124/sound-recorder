import { combineReducers, createStore } from "redux";

import { RecorderReducer } from "../state/reducer";

const reducers = combineReducers(RecorderReducer);

// TODO - Apply thunk middleware
const store = createStore(reducers);

export default store;
