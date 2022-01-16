import "./style.scss";

import PropTypes from "prop-types";
import { useState } from "react";

import Icon from "../../stories/Icons";
import QR from "../QR";

const Recording = ({ id, stream, onDeleteHandler }) => {
  // TODO - move to a hight level to listen a global click out of the component
  const [qrVisibility, setQrVisibility] = useState(false);

  const deleteRecording = (e) => {
    onDeleteHandler(e);
  };

  return (
    <>
      <article className="recording">
        <div className="content-icons">
          <div
            className="icon-content qr-visibility"
            onClick={() => setQrVisibility(!qrVisibility)}
          >
            <Icon icon="send" size="3rem" />
          </div>
          <div className="icon-content" onClick={(e) => deleteRecording(e, id)}>
            <Icon icon="trash" size="3rem" />
          </div>
        </div>

        <audio
          className="audio"
          controls="controls"
          src={stream}
          preload="auto"
          role="application"
        >
          Sorry, your browser doesn't support recording audio.
        </audio>
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
