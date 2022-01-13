import "./style.css";

import PropTypes from "prop-types";
import { useMemo } from "react";

import useMediaRecorder from "../../hooks/useMediaRecorder";
import Recording from "../Recording";
import Visualizer from "../Visualizer";

const Recorder = ({ stream }) => {
  // TODO - #17 Delete recordings and setRecordings when redux be implemented
  const { recorder, recordings, setRecordings, isRecording } =
    useMediaRecorder(stream);

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

  // TODO - #18 Move edit function to the RecordingsList component
  const editRecordingName = (e) => {
    let id = e.target.parentNode.parentNode.attributes.id.value;
    let newRecordings = [...recordings];
    let targetItem = recordings.filter((item) => {
      if (item.id === id) {
        return item;
      }
      return false;
    });
    let index = recordings.indexOf(targetItem[0]);
    let newName =
      window.prompt("Enter a new name", targetItem[0].name) ??
      targetItem[0].name; // necessary because this returns null if the user doesn't enter anything
    targetItem[0].name = newName;
    newRecordings.splice(index, 1, targetItem[0]);
    setRecordings(newRecordings);
  };

  // TODO - #18 Move delete function to the RecordingsList component
  const deleteRecording = (e) => {
    let id = e.target.parentNode.attributes.id.value;
    let deleteRecording = window.confirm(
      "Are you sure you want to delete this recording?"
    );
    if (deleteRecording === true) {
      let newRecordings = recordings.filter((item) => {
        if (id !== item.id) {
          return true;
        }
        return false;
      });
      e.target.parentNode.classList.add("vanish");
      setTimeout(() => {
        setRecordings([...newRecordings]);
      }, 900);
    }
  };
  // TODO - #18 Move renderAudio to the RecordingsList component
  const renderAudio = () => {
    let audios = recordings.map((recording, index) => {
      return (
        <Recording
          stream={recording.stream}
          key={recording.id}
          name={recording.name}
          id={recording.id}
          onDeleteHandler={deleteRecording}
          onEditNameHandler={editRecordingName}
        />
      );
    });

    return audios;
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
      <section>{renderAudio()}</section>
    </>
  );
};

Recorder.propTypes = {
  stream: PropTypes.object,
};

export default Recorder;
