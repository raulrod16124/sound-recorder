import "./style.scss";

import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useMediaRecorder from "../../hooks/useMediaRecorder";
import { GetAllRecordings } from "../../state/actions";
import Button from "../../stories/Button";
import Icon from "../../stories/Icons";
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

  const [recordingSelected, setRecordingSelected] = useState(true);

  useEffect(() => {
    switch (RecorderState.status) {
      case "initial":
        setFailureRecordings();
        return dispatch(GetAllRecordings());
      case "success":
        setFailureRecordings();
        setRecordings(RecorderState.list);
        setRecordingSelected(
          RecorderState.list.length > 0 && RecorderState.list[0].id
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

  return (
    <>
      <div className="recording-name-list">
        {recordings && recordings.length > 0 ? (
          recordings.map((recording) => {
            return (
              <div
                className={
                  recording.id === recordingSelected
                    ? "recording-name selected"
                    : "recording-name"
                }
                onClick={() => setRecordingSelected(recording.id)}
              >
                {recordingSelected === recording.id && (
                  <Icon icon="play" size="2rem" />
                )}
                <p className="text">{recording.name}</p>
              </div>
            );
          })
        ) : (
          <p className="empty-list-text">There no recordings</p>
        )}
      </div>
      <Visualizer
        stream={stream}
        isRecording={isRecording}
        barColor={[18, 124, 85]}
      />
      <Button
        primary={buttonActive}
        label={recordingStateText}
        onClick={() => {
          setButtonActive(!buttonActive);
          toggleRecording();
        }}
        className={recordButtonClassesText}
      />
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
