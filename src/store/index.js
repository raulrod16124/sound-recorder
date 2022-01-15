import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { RecorderReducer } from "../state/reducer";

const reducers = combineReducers({
  RecorderReducer: RecorderReducer,
});

// TODO - Apply thunk middleware
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
