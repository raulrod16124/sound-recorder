import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "@firebase/firestore";

import { db } from "../firebase";

export const getAllRecordings = async () => {
  console.log("Enter to getAllRecordings by user");
  try {
    const recordingsCall = collection(db, "recordings");
    const recordingsSnapshot = await getDocs(recordingsCall);
    const recordingsList = recordingsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return recordingsList;
  } catch (error) {
    console.log(Object.values(error));
    return error;
  }
};

export const createNewRecording = async (newRecording) => {
  // console.log("Enter to createNewRecording");
  // console.log(newRecording);
  try {
    const recordingsCall = collection(db, "recordings");
    return await addDoc(recordingsCall, newRecording);
  } catch (error) {
    // const errorData = JSON.stringify(error);
    // return JSON.parse(errorData).code;
    // console.log(Object.values(error)[0]);
    console.log(error);
    return error;
  }
};

export const updateRecording = async (idRecordingToUpdate, data) => {
  // console.log("Enter to updateRecording");
  // console.log(idRecordingToUpdate);
  // console.log(data);
  try {
    const docRefToUpdate = doc(db, "recordings", idRecordingToUpdate);
    await setDoc(docRefToUpdate, data);
    const recordingUpdated = await getDoc(docRefToUpdate);
    return recordingUpdated;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteRecording = async (idRecordingToDelete) => {
  // console.log("Enter to deleteRecording");
  // console.log(idRecordingToDelete);
  try {
    const docRefToDelete = doc(db, "recordings", idRecordingToDelete);
    // TODO - Refresh the all tasks in the interface correclty
    return await deleteDoc(docRefToDelete);
  } catch (error) {
    console.log(error);
    return error;
  }
};
