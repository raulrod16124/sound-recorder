import {
  createNewRecording,
  deleteRecording,
  getAllRecordings,
  updateRecording,
} from "../provider";
import { Types } from "./types";

/* The actions take care of connecting the provider response with
the reducer. In this case, is used the Thunk library trigger the 
services calls, wait for the result and re-dispatch the action to 
the reducer */

export const GetAllRecordings = () => {
  return async (dispatch) => {
    const recordingsList = await getAllRecordings();

    /* The error condition was created to manage the erros from the service */
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
      /* Firestore returns de recordings data as hashmap with 
      the keys named, so is used this structure to return the data
      in the correct format that is used in the front */
      const item = {
        id: Object.values(
          newRecording._document.data.value.mapValue.fields.id
        )[0],
        name: Object.values(
          newRecording._document.data.value.mapValue.fields.name
        )[0],
        stream: Object.values(
          newRecording._document.data.value.mapValue.fields.stream
        )[0],
      };
      dispatch({
        type: Types.createRecording,
        payload: item,
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
      const item = {
        id: Object.values(
          recordingUpdated._document.data.value.mapValue.fields.id
        )[0],
        name: Object.values(
          recordingUpdated._document.data.value.mapValue.fields.name
        )[0],
        stream: Object.values(
          recordingUpdated._document.data.value.mapValue.fields.stream
        )[0],
      };

      dispatch({
        type: Types.updateRecording,
        payload: item,
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
        payload: recordingId,
      });
    }
  };
};
