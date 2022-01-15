// TODO - Define a soundtrack model

import { Types } from "./types";

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
      };
    case Types.updateRecording:
      return {
        ...state,
        status: "recording_updated",
      };
    case Types.deleteRecording:
      return {
        ...state,
        status: "recording_deleted",
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
