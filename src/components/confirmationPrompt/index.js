import "./style.scss";

import React from "react";

import Button from "../../stories/Button";

function ConfirmationPrompt({
  message,
  deleteRecording,
  editRecordingName,
  acceptButton,
  confirmationPromptState,
  setConfirmationPromptState,
}) {
  return (
    <div className="confirmation-prompt">
      <p className="message">{message}</p>
      <div className="content-buttons">
        <Button
          label="cancel"
          onClick={() =>
            setConfirmationPromptState({
              ...confirmationPromptState,
              visibility: false,
            })
          }
        />
        <Button
          primary
          label={acceptButton}
          onClick={
            acceptButton === "Delete" ? deleteRecording : editRecordingName
          }
        />
      </div>
    </div>
  );
}

export default ConfirmationPrompt;
