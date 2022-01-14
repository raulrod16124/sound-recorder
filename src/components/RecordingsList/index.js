import React from "react";
import { useDispatch } from "react-redux";

import { DeleteSountracks, UpdateSountracks } from "../../state/actions";
import Recording from "../Recording";

function RecordingsList({ recordings }) {
  const dispatch = useDispatch();

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
    dispatch(UpdateSountracks(newRecordings));
  };

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
        dispatch(DeleteSountracks(newRecordings));
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
