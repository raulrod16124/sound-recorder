// TODO - Define a soundtrack model

import { Types } from "./types";

const initialState = {
  status: "initial",
  error: "",
  list: [],
};

export const RecorderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.getAllSoundtracks:
    case Types.updateSoundtracks:
    case Types.deleteSoundtracks:
      return {
        ...state,
        status: "success",
        list: action.payload,
      };
    case Types.createSoundtracks:
      return {
        ...state,
        status: "success",
        list: [...state.list, action.payload],
      };

    default:
      return state;
  }
};
