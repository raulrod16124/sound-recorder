import "./style.scss";

import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
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
import Visualizer from "../Visualizer";

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
    visibility: false,
    message: "",
    acceptButton: "Accept",
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
  // TODO - #16 Refactoring the text according to the UI to implement
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
    // TODO - Check the error on the second click
    if (!isRecording) {
      recorder.start(1000);
    } else {
      recorder.stop();
    }
  };

  const editRecordingName = (id) => {
    console.log(id);
    let targetItem = recordings.filter((item) => item.id === id);
    let newName =
      window.prompt("Enter a new name", targetItem[0].name) ??
      targetItem[0].name; // necessary because this returns null if the user doesn't enter anything
    targetItem[0].name = newName;
    console.log(targetItem);
    dispatch(UpdateRecording(targetItem[0].id, targetItem[0]));
  };

  const deleteRecording = () => {
    let newRecordings = recordings.filter(
      (item) => item.id !== recordingSelected.id
    );
    setTimeout(() => {
      dispatch(DeleteRecording(recordingSelected.id));
      setRecordings(newRecordings);
      setRecordingSelected(recordings.length > 0 ? recordings[0] : "");
      setConfirmationPromptState({
        ...confirmationPromptState,
        visibility: false,
      });
    }, 900);
  };

  const handleOpenConfirmationPrompt = (message, buttonText) => {
    setConfirmationPromptState({
      visibility: true,
      message: message,
      acceptButton: buttonText,
    });
  };

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
      {confirmationPromptState.visibility && (
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
          onEditHandler={editRecordingName}
        />
      ) : (
        <p>{failureRecordings}</p>
      )}
      <div className="recording-section">
        <Visualizer
          stream={stream}
          isRecording={isRecording}
          barColor={[79, 230, 219]}
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
