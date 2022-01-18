import "./styles.scss";

import React from "react";

import Icon from "../../stories/Icons";

function RecordingsList({
  recordings,
  recordingSelected,
  setRecordingSelected,
  handleOpenConfirmationPrompt,
}) {
  /* The RecordingsList component is used to show the recordings name
  and set the recordingSeleted on click in the name and use this recording
  data to edit it, delete it or play it */

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
                <Icon
                  icon="edit"
                  size="2rem"
                  onClick={() =>
                    handleOpenConfirmationPrompt(
                      `Editing ${recordingSelected.name}`,
                      "Update"
                    )
                  }
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
