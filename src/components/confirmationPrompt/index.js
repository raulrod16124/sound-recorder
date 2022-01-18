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
  // References
  const nameRef = useRef();

  /* The ConfirmationPrompt component is used to manage the edit name feature
  and to confirm a recording delete */

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
              openEdit: false,
              openDelete: false,
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
