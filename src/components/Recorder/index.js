import "./style.scss";

import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import useMediaRecorder from "../../hooks/useMediaRecorder";
import RecordingsList from "../RecordingsList";
import Visualizer from "../Visualizer";

const Recorder = ({ stream }) => {
  const { recorder, isRecording } = useMediaRecorder(stream);

  const RecorderState = useSelector((state) => {
    return state.RecorderReducer;
  });

  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    if (RecorderState.status === "success") {
      setRecordings(RecorderState.list);
    }
  }, [RecorderState.list]);

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
      <RecordingsList recordings={recordings} />
    </>
  );
};

Recorder.propTypes = {
  stream: PropTypes.object,
};

export default Recorder;
