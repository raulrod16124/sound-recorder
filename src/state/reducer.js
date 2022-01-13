// TODO - Define a soundtrack model

import { Types } from "./types";

const initialState = {
  status: "initial",
  error: "",
  data: [],
};

export const RecorderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.getAllSoundtracks:
      // TODO - #17 Implement type logic and set the state
      console.log(action.payload);
      return state;
    case Types.createSoundtracks:
      // TODO - #17 Implement type logic and set the state
      console.log(action.payload);
      return state;
    case Types.updateSoundtracks:
      // TODO - #17 Implement type logic and set the state
      console.log(action.payload);
      return state;
    case Types.deleteSoundtracks:
      // TODO - #17 Implement type logic and set the state
      console.log(action.payload);
      return state;

    default:
      return state;
  }
};
