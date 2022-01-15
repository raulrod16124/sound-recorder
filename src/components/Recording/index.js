import "./style.scss";

import PropTypes from "prop-types";
import { useState } from "react";

import QR from "../QR";

const Recording = ({
  stream,
  name,
  onDeleteHandler,
  onEditNameHandler,
  id,
}) => {
  // TODO - move to a hight level to listen a global click out of the component
  const [qrVisibility, setQrVisibility] = useState(false);

  const deleteRecording = (e) => {
    onDeleteHandler(e);
  };

  const editName = (e) => {
    onEditNameHandler(e);
  };

  return (
    <>
      <article id={id}>
        <audio
          controls="controls"
          src={stream}
          preload="auto"
          role="application"
        >
          Sorry, your browser doesn't support recording audio.
        </audio>
        <p>
          <span className="name" role="presentation">
            {name}
          </span>
          <button
            onClick={editName}
            className="editName"
            title="Click to edit name"
          >
            ✏️
          </button>
        </p>
        <button
          onClick={() => setQrVisibility(!qrVisibility)}
          className="qr-visibility"
        >
          generate QR
        </button>
        <button onClick={deleteRecording} className="delete">
          Delete
        </button>
      </article>
      {qrVisibility && <QR url={stream} />}
    </>
  );
};

Recording.defaultProps = {
  stream: {
    stream: "blob:http://localhost",
    name: "Default recording name",
    id: "id0",
  },
};

Recording.propTypes = {
  stream: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  onDeleteHandler: PropTypes.func,
  onEditNameHandler: PropTypes.func,
};

export default Recording;
