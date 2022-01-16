import "./styles.scss";

import React from "react";

import Icon from "../../stories/Icons";

function RecordingsList({
  recordings,
  recordingSelected,
  setRecordingSelected,
}) {
  return (
    <div className="recording-name-list">
      {recordings && recordings.length > 0 ? (
        recordings.map((recording) => {
          return (
            <div
              className={
                recording.id === recordingSelected.id
                  ? "recording-name selected"
                  : "recording-name"
              }
              onClick={() => setRecordingSelected(recording)}
            >
              {recordingSelected.id === recording.id && (
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
  );
}

export default RecordingsList;
