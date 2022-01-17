import "./style.scss";

import React, { useRef } from "react";

import Button from "../../stories/Button";

function ConfirmationPrompt({
  message,
  deleteRecording,
  editRecordingName,
  acceptButton,
  confirmationPromptState,
  setConfirmationPromptState,
}) {
  const nameRef = useRef();

  return (
    <div className="confirmation-prompt">
      <p className="message">{message}</p>
      {acceptButton === "Update" && (
        <div className="content-input">
          <label className="label-name">New name</label>
          <input
            ref={nameRef}
            type="text"
            className="edit-input"
            placeholder="Write here the new name"
          />
        </div>
      )}
      {confirmationPromptState.error !== "" && (
        <span className="error-message">{confirmationPromptState.error}</span>
      )}
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
          onClick={() =>
            acceptButton === "Delete"
              ? deleteRecording()
              : editRecordingName(nameRef.current.value)
          }
        />
      </div>
    </div>
  );
}

export default ConfirmationPrompt;
