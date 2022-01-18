import "./style.scss";

import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { ReactMic } from "react-mic";
import { useDispatch, useSelector } from "react-redux";

import useMediaRecorder from "../../hooks/useMediaRecorder";
import {
  DeleteRecording,
  GetAllRecordings,
  UpdateRecording,
} from "../../state/actions";
import Button from "../../stories/Button";
import QR from "./../QR";
import ConfirmationPrompt from "../confirmationPrompt";
import Recording from "../Recording";
import RecordingsList from "../RecordingsList";

const Recorder = ({ stream }) => {
  const dispatch = useDispatch();

  const RecorderState = useSelector((state) => {
    return state.RecorderReducer;
  });

  const { recorder, isRecording } = useMediaRecorder(stream);
  // States
  const [recordings, setRecordings] = useState([]);
  const [failureRecordings, setFailureRecordings] = useState();
  //  --  States to control the UI rendered
  const [buttonActive, setButtonActive] = useState(true);

  const [recordingSelected, setRecordingSelected] = useState({});

  const [qrState, setQrState] = useState({
    visibility: false,
    url: recordingSelected.stream,
  });

  const [confirmationPromptState, setConfirmationPromptState] = useState({
    openEdit: false,
    openDelete: false,
    message: "",
    acceptButton: "Accept",
    error: "",
  });

  // The UseEffect listen every change on the RecorderReducer status
  useEffect(() => {
    switch (RecorderState.status) {
      case "initial":
        /* In the initial state we will require the list of recordings,
        so here it trigger a getAll action*/
        setFailureRecordings();
        return dispatch(GetAllRecordings());
      case "success":
        /* Once we get the recordings list we set it in a local state
        and is assigned a recording selected */
        setFailureRecordings();
        setRecordings(RecorderState.list);
        setRecordingSelected(
          RecorderState.list.length > 0 && RecorderState.list[0]
        );
        return;
      case "failure":
        return setFailureRecordings(RecorderState.error);
      default:
        return setRecordings(RecorderState.list);
    }
  }, [RecorderState]);

  // Functions
  const defaultRecordClass = "record-play";
  const recordButtonClassesText = useMemo(
    () =>
      isRecording
        ? `${defaultRecordClass} recording-audio`
        : defaultRecordClass,
    [isRecording]
  );
  const recordingStateText = useMemo(
    () => (isRecording ? "Stop" : "Record"),
    [isRecording]
  );

  const toggleRecording = () => {
    if (!isRecording) {
      recorder.start(1000);
    } else {
      recorder.stop();
    }
  };

  /* Function that after to end the confirmation prompt process check if the new name is empty,
  and if is not, then trigger the dispatch to update de recording in the data base. */
  const editRecordingName = (newName) => {
    if (newName !== "") {
      recordingSelected.name = newName;
      dispatch(UpdateRecording(recordingSelected.id, recordingSelected));
      setConfirmationPromptState({
        ...confirmationPromptState,
        openEdit: false,
      });
    } else {
      setConfirmationPromptState({
        ...confirmationPromptState,
        error: "the name is empty",
      });
      setTimeout(() => {
        setConfirmationPromptState({
          ...confirmationPromptState,
          error: "",
        });
      }, 2000);
    }
  };

  /* Function that after to end the confirmation prompt process get the recordingSelected.id
  and delete this reference into the recordings states and trigger the dispatch to delete it 
  in the data base too.*/
  const deleteRecording = () => {
    let newRecordings = recordings.filter(
      (item) => item.id !== recordingSelected.id
    );
    dispatch(DeleteRecording(recordingSelected.id));
    setRecordings(newRecordings);
    setRecordingSelected(recordings.length > 0 ? recordings[0] : "");
    setConfirmationPromptState({
      ...confirmationPromptState,
      openDelete: false,
    });
  };

  /* Function use it to trigger a pop-up where the user have to confirm the action
  delete or edit. */
  const handleOpenConfirmationPrompt = (message, buttonText) => {
    setConfirmationPromptState({
      openEdit: buttonText === "Update",
      openDelete: buttonText === "Delete",
      message: message,
      acceptButton: buttonText,
    });
  };

  /* Function that close the QR pop-up on click in the DOM. */
  const handleQRVisibility = (e) => {
    const qrClassListener = [
      "content-qr",
      "qr-image",
      "icon-content qr-visibility",
      "shadow-icon-content",
      "content-icons",
    ];
    if (
      !qrClassListener.includes(e.target.className) &&
      !e.target.className.baseVal
    ) {
      setQrState({ ...qrState, visibility: false });
    }
  };

  return (
    <div className="recorder" onClick={(e) => handleQRVisibility(e)}>
      {(confirmationPromptState.openEdit ||
        confirmationPromptState.openDelete) && (
        <ConfirmationPrompt
          message={confirmationPromptState.message}
          acceptButton={confirmationPromptState.acceptButton}
          confirmationPromptState={confirmationPromptState}
          setConfirmationPromptState={setConfirmationPromptState}
          deleteRecording={deleteRecording}
          editRecordingName={editRecordingName}
        />
      )}
      {qrState.visibility && <QR url={qrState.url} />}
      {/* Implement Loading component */}
      {!failureRecordings ? (
        <RecordingsList
          recordings={recordings}
          recordingSelected={recordingSelected}
          setRecordingSelected={setRecordingSelected}
          handleOpenConfirmationPrompt={handleOpenConfirmationPrompt}
        />
      ) : (
        <p>{failureRecordings}</p>
      )}
      <div className="recording-section">
        <ReactMic
          record={isRecording}
          className="sound-wave"
          onStop={(e) => console.log(e)}
          strokeColor="#4fe6db"
          backgroundColor="#111010"
        />
      </div>
      {/* TODO - Refactor this button to a Circle Button style */}
      <Button
        primary={buttonActive}
        label={recordingStateText}
        margin={buttonActive ? "2rem 41%" : "2rem 43%"}
        onClick={() => {
          setButtonActive(!buttonActive);
          toggleRecording();
        }}
        className={recordButtonClassesText}
      />
      {recordingSelected ? (
        <Recording
          stream={recordingSelected.stream}
          name={recordingSelected.name}
          id={recordingSelected.id}
          qrState={qrState}
          setQrState={setQrState}
          confirmationPromptState={confirmationPromptState}
          handleOpenConfirmationPrompt={handleOpenConfirmationPrompt}
        />
      ) : (
        <h3 className="no-recording">There no recordings</h3>
      )}
    </div>
  );
};

Recorder.propTypes = {
  stream: PropTypes.object,
};

export default Recorder;
