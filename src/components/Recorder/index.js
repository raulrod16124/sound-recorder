import "./style.scss";

import PropTypes, { object } from "prop-types";
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
import Recording from "../Recording";
import RecordingsList from "../RecordingsList";
import Visualizer from "../Visualizer";

const Recorder = ({ stream }) => {
  const dispatch = useDispatch();

  const RecorderState = useSelector((state) => {
    return state.RecorderReducer;
  });

  const [recordings, setRecordings] = useState([]);

  const { recorder, isRecording } = useMediaRecorder(stream);

  const [failureRecordings, setFailureRecordings] = useState();

  // States to control the UI rendered
  const [buttonActive, setButtonActive] = useState(true);

  const [recordingSelected, setRecordingSelected] = useState({});

  const [qrVisibility, setQrVisibility] = useState(false);
  const [qrUrl, setQrUrl] = useState(recordingSelected.stream);

  const [qrState, setQrState] = useState({
    visibility: false,
    url: recordingSelected.stream,
  });

  useEffect(() => {
    switch (RecorderState.status) {
      case "initial":
        setFailureRecordings();
        return dispatch(GetAllRecordings());
      case "success":
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

  const deleteRecording = (e, id) => {
    // TODO - Change the window.confirm for a confirmation prompt modal
    let deleteRecording = window.confirm(
      "Are you sure you want to delete this recording?"
    );
    if (deleteRecording === true) {
      let newRecordings = recordings.filter((item) => item.id !== id);
      e.target.parentNode.classList.add("vanish");
      setTimeout(() => {
        dispatch(DeleteRecording(id));
        setRecordings(newRecordings);
        setRecordingSelected(recordings.length > 0 ? recordings[0] : "");
      }, 900);
    }
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
      <Button
        primary={buttonActive}
        label={recordingStateText}
        margin={"2rem auto"}
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
          onDeleteHandler={deleteRecording}
          qrState={qrState}
          setQrState={setQrState}
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
