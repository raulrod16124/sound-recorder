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

/* The provider take care of send the request to the firestore data base
and do the CRUD of the recordings */

export const getAllRecordings = async () => {
  try {
    const recordingsCall = collection(db, "recordings");
    const recordingsSnapshot = await getDocs(recordingsCall);
    const recordingsList = recordingsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return recordingsList;
  } catch (error) {
    return { error: error };
  }
};

export const createNewRecording = async (newRecording) => {
  try {
    const recordingsCall = collection(db, "recordings");
    const response = await addDoc(recordingsCall, newRecording);
    const docRefRecordingCreated = doc(db, "recordings", response.id);
    return await getDoc(docRefRecordingCreated);
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const updateRecording = async (idRecordingToUpdate, data) => {
  try {
    const docRefToUpdate = doc(db, "recordings", idRecordingToUpdate);
    await setDoc(docRefToUpdate, data);
    return await getDoc(docRefToUpdate);
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const deleteRecording = async (idRecordingToDelete) => {
  try {
    const docRefToDelete = doc(db, "recordings", idRecordingToDelete);
    return await deleteDoc(docRefToDelete);
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};
