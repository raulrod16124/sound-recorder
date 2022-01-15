import {
  createNewRecording,
  deleteRecording,
  getAllRecordings,
  updateRecording,
} from "../provider";
import { Types } from "./types";

export const GetAllRecordings = () => {
  return async (dispatch) => {
    const recordingsList = await getAllRecordings();
    if (recordingsList.error) {
      dispatch({
        type: Types.failureRecordingCall,
        payload: recordingsList.error,
      });
    } else {
      dispatch({
        type: Types.getAllRecordings,
        payload: recordingsList,
      });
    }
  };
};

export const CreateRecording = (recording) => {
  return async (dispatch) => {
    const newRecording = await createNewRecording(recording);
    if (newRecording.error) {
      dispatch({
        type: Types.failureRecordingCall,
        payload: newRecording.error,
      });
    } else {
      dispatch({
        type: Types.createRecording,
      });
    }
  };
};

export const UpdateRecording = (recordingId, recording) => {
  return async (dispatch) => {
    const recordingUpdated = await updateRecording(recordingId, recording);
    if (recordingUpdated.error) {
      dispatch({
        type: Types.failureRecordingCall,
        payload: recordingUpdated.error,
      });
    } else {
      dispatch({
        type: Types.updateRecording,
      });
    }
  };
};

export const DeleteRecording = (recordingId) => {
  return async (dispatch) => {
    const recordingDeleted = await deleteRecording(recordingId);
    if (recordingDeleted !== undefined && recordingDeleted.error) {
      dispatch({
        type: Types.failureRecordingCall,
        payload: recordingDeleted.error,
      });
    } else {
      dispatch({
        type: Types.deleteRecording,
      });
    }
  };
};
