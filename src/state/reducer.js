// TODO - Define a recording model

import { Types } from "./types";

/* The initial state is created to manage the store state.
So the frontend listen for every status change in the data cycle
and trigger the relevant action  */

const initialState = {
  status: "initial",
  error: "",
  list: [],
};

export const RecorderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.getAllRecordings:
      return {
        ...state,
        status: "success",
        list: action.payload,
      };
    case Types.createRecording:
      return {
        ...state,
        status: "recording_created",
        list: [...state.list, action.payload],
      };
    case Types.updateRecording:
      const updateList = state.list.map((recording) => {
        if (recording.id === action.payload.id) {
          return action.payload;
        } else {
          return recording;
        }
      });
      return {
        ...state,
        status: "recording_updated",
        list: updateList,
      };
    case Types.deleteRecording:
      const updateStateList = state.list.filter(
        (recording) => recording.id !== action.payload
      );
      return {
        ...state,
        status: "recording_deleted",
        list: updateStateList,
      };
    case Types.failureRecordingCall:
      return {
        ...state,
        status: "failure",
        error: Object.values(action.payload)[0],
      };

    default:
      return state;
  }
};
