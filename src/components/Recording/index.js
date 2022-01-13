import "./style.scss";

import PropTypes from "prop-types";

const Recording = ({
  stream,
  name,
  onDeleteHandler,
  onEditNameHandler,
  id,
}) => {
  const deleteRecording = (e) => {
    onDeleteHandler(e);
  };

  const editName = (e) => {
    onEditNameHandler(e);
  };

  // TODO - #19 Create a QR function where do the dispatch
  // TODO - #19 Implement the useSelector to listen the QR API call response
  // TODO - #19 Add the button to trigger the QR function

  // TODO - #19 Add the button to trigger the QR function

  return (
    <article id={id}>
      <audio controls="controls" src={stream} preload="auto" role="application">
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
      <button onClick={deleteRecording} className="delete">
        Delete
      </button>
    </article>
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
