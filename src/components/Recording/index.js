import "react-h5-audio-player/src/styles.scss";

import "./style.scss";

import PropTypes from "prop-types";
import AudioPlayer from "react-h5-audio-player";

import Icon from "../../stories/Icons";

const Recording = ({
  name,
  stream,
  handleOpenConfirmationPrompt,
  confirmationPromptState,
  qrState,
  setQrState,
}) => {
  // Class
  let className = require("classnames");
  let sendClass = className("icon-content qr-visibility", {
    active: qrState.visibility,
  });
  let shadowSendClass = className("shadow-icon-content", {
    active: qrState.visibility,
  });
  let trashClass = className("icon-content", {
    active: confirmationPromptState.openDelete,
  });
  let shadowTrashClass = className("shadow-icon-content", {
    active: confirmationPromptState.openDelete,
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
              onClick={() =>
                handleOpenConfirmationPrompt(
                  `Do you want to delete the recording ${name}?`,
                  "Delete"
                )
              }
            >
              <Icon
                icon="trash"
                size="3rem"
                color={
                  confirmationPromptState.openDelete ? "#373644" : "#28cac0"
                }
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
