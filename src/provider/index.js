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
    return await addDoc(recordingsCall, newRecording);
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const updateRecording = async (idRecordingToUpdate, data) => {
  try {
    const docRefToUpdate = doc(db, "recordings", idRecordingToUpdate);
    await setDoc(docRefToUpdate, data);
    const recordingUpdated = await getDoc(docRefToUpdate);
    return recordingUpdated;
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
