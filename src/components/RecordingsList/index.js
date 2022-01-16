import "./styles.scss";

import React, { useState } from "react";

import Icon from "../../stories/Icons";

function RecordingsList({
  recordings,
  recordingSelected,
  setRecordingSelected,
  onEditHandler,
}) {
  return (
    <div className="recording-name-list">
      {recordings && recordings.length > 0 ? (
        recordings.map((recording) => {
          return (
            <div
              key={recording.id}
              className={
                recording.id === recordingSelected.id
                  ? "recording-name selected"
                  : "recording-name"
              }
              onClick={() => setRecordingSelected(recording)}
            >
              <div className="content-text-and-play-icon">
                {recordingSelected.id === recording.id && (
                  <Icon icon="play" size="2rem" />
                )}
                <p className="text">{recording.name}</p>
              </div>
              {recordingSelected.id === recording.id && (
                // TODO - fix the onClick edit trigger
                <Icon
                  icon="edit"
                  size="2rem"
                  onClick={() => onEditHandler(recording.id)}
                />
              )}
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
