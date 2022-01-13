import { Types } from "./types";

export const GetAllSountracks = () => {
  return {
    type: Types.getAllSoundtracks,
  };
};

export const CreateSountracks = (soundtrack) => {
  return {
    type: Types.createSoundtracks,
    payload: soundtrack,
  };
};

export const UpdateSountracks = (soundtrack) => {
  return {
    type: Types.updateSoundtracks,
    payload: soundtrack,
  };
};

export const DeleteSountracks = (soundtrack) => {
  return {
    type: Types.deleteSoundtracks,
    payload: soundtrack,
  };
};
