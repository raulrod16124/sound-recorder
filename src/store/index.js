import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { RecorderReducer } from "../state/reducer";

/* The combineReducers work to put together more than one reducer that 
is implemented on the app. In this case is used just one. */
const reducers = combineReducers({
  RecorderReducer: RecorderReducer,
});

/* Here the store is created and the middleware are include */
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
