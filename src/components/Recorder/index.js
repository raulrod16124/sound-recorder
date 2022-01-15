import "./style.scss";

import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useMediaRecorder from "../../hooks/useMediaRecorder";
import { GetAllRecordings } from "../../state/actions";
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

  useEffect(() => {
    switch (RecorderState.status) {
      case "initial":
      case "recording_created":
      case "recording_updated":
      case "recording_deleted":
        setFailureRecordings();
        return dispatch(GetAllRecordings());
      case "success":
        setFailureRecordings();
        setRecordings(RecorderState.list);
        return;
      case "failure":
        return setFailureRecordings(RecorderState.error);
      default:
        return setRecordings([]);
    }
  }, [RecorderState.status]);

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

  return (
    <>
      <Visualizer
        stream={stream}
        isRecording={isRecording}
        barColor={[18, 124, 85]}
      />
      <button onClick={toggleRecording} className={recordButtonClassesText}>
        {recordingStateText}
      </button>
      {/* Implement Loading component */}
      {!failureRecordings ? (
        <RecordingsList recordings={recordings} setRecordings={setRecordings} />
      ) : (
        <p>{failureRecordings}</p>
      )}
    </>
  );
};

Recorder.propTypes = {
  stream: PropTypes.object,
};

export default Recorder;
