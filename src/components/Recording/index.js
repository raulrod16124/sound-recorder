import "react-h5-audio-player/src/styles.scss";

import "./style.scss";

import PropTypes from "prop-types";
import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";

import Icon from "../../stories/Icons";

const Recording = ({ id, stream, onDeleteHandler, qrState, setQrState }) => {
  // TODO - move to a hight level to listen a global click out of the component

  // States
  const [iconsActive, setIconsActive] = useState({
    send: false,
    trash: false,
  });

  // Class
  let className = require("classnames");
  let sendClass = className("icon-content qr-visibility", {
    active: qrState.visibility,
  });
  let shadowSendClass = className("shadow-icon-content", {
    active: qrState.visibility,
  });
  let trashClass = className("icon-content", {
    active: iconsActive.trash,
  });
  let shadowTrashClass = className("shadow-icon-content", {
    active: iconsActive.trash,
  });

  return (
    <>
      <article className="recording">
        <div className="content-icons">
          <div className={shadowSendClass}>
            <div
              className={sendClass}
              onClick={() => {
                setQrState({ visibility: true, url: stream });
              }}
            >
              <Icon
                icon="send"
                size="3rem"
                color={qrState.visibility ? "#373644" : "#28cac0"}
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
        <AudioPlayer
          className="audio"
          src={stream}
          autoPlayAfterSrcChange={false}
          customAdditionalControls={[]}
          showJumpControls={false}
          customVolumeControls={[]}
        />
      </article>
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
