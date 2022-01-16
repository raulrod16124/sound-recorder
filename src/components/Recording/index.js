import "./style.scss";

import PropTypes from "prop-types";
import { useRef, useState } from "react";

import Button from "../../stories/Button";
import Icon from "../../stories/Icons";
import QR from "../QR";

const Recording = ({ id, stream, onDeleteHandler }) => {
  // TODO - move to a hight level to listen a global click out of the component
  const [qrVisibility, setQrVisibility] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  const [iconsActive, setIconsActive] = useState({
    send: false,
    trash: false,
  });

  let className = require("classnames");
  let sendClass = className("icon-content qr-visibility", {
    active: iconsActive.send,
  });
  let shadowSendClass = className("shadow-icon-content", {
    active: iconsActive.send,
  });
  let trashClass = className("icon-content", {
    active: iconsActive.trash,
  });
  let shadowTrashClass = className("shadow-icon-content", {
    active: iconsActive.trash,
  });

  const handleToggleAudioPlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <article className="recording">
        <div className="content-icons">
          <div className={shadowSendClass}>
            <div
              className={sendClass}
              onClick={() => {
                setQrVisibility(!qrVisibility);
                setIconsActive({ ...iconsActive, send: !iconsActive.send });
              }}
            >
              <Icon
                icon="send"
                size="3rem"
                color={iconsActive.send ? "#373644" : "#28cac0"}
              />
            </div>
          </div>
          <div className={shadowTrashClass}>
            <div
              className={trashClass}
              onClick={(e) => {
                onDeleteHandler(e, id);
                setIconsActive({ ...iconsActive, trash: !iconsActive.trash });
              }}
            >
              <Icon
                icon="trash"
                size="3rem"
                color={iconsActive.trash ? "#373644" : "#28cac0"}
              />
            </div>
          </div>
        </div>

        {/* <audio
          ref={audioRef}
          className="audio"
          controls="controls"
          preload="auto"
          role="application"
        >
          <source src={stream} type="audio/mp3" />
          <source
            src="http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/explosion.ogg"
            type="audio/ogg"
          />
          Sorry, your browser doesn't support recording audio.
        </audio> */}
        <div className="content-audio-visualizer">
          <input type="range" className="audio-bar" />
          <div className="time-content">
            <span className="current-time">00:00</span>
            <span className="audio-time">00:00</span>
          </div>
          <Button
            primary={!isPlaying}
            label={isPlaying ? "Pause" : "Play"}
            onClick={handleToggleAudioPlayPause}
            margin="1rem auto"
            width="30%"
          />
        </div>
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
