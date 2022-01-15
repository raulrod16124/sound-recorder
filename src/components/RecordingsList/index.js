import React from "react";
import { useDispatch } from "react-redux";

import { DeleteRecording, UpdateRecording } from "../../state/actions";
import Recording from "../Recording";

function RecordingsList({ recordings, setRecordings }) {
  const dispatch = useDispatch();

  const editRecordingName = (e) => {
    let id = e.target.parentNode.parentNode.attributes.id.value;
    let targetItem = recordings.filter((item) => item.id === id);
    let newName =
      window.prompt("Enter a new name", targetItem[0].name) ??
      targetItem[0].name; // necessary because this returns null if the user doesn't enter anything
    targetItem[0].name = newName;
    console.log(targetItem);
    dispatch(UpdateRecording(targetItem[0].id, targetItem[0]));
  };

  const deleteRecording = (e) => {
    let id = e.target.parentNode.attributes.id.value;
    // TODO - Change the window.confirm for a confirmation prompt modal
    let deleteRecording = window.confirm(
      "Are you sure you want to delete this recording?"
    );
    if (deleteRecording === true) {
      let newRecordings = recordings.filter((item) => item.id !== id);
      e.target.parentNode.classList.add("vanish");
      setTimeout(() => {
        dispatch(DeleteRecording(id));
        setRecordings(newRecordings);
      }, 900);
    }
  };

  const renderAudio = () => {
    let audios = recordings.map((recording, index) => {
      // TODO - #16 Include the Empty list view
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
    return audios.length > 0 ? audios : <h3>There no recordings yet</h3>;
  };

  return <div className="recordings-list">{renderAudio()}</div>;
}

export default RecordingsList;
