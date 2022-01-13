import "./App.scss";

import { useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";

import Recorder from "./components/Recorder";
import store from "./store";

function App() {
  const constraints = useMemo(() => {
    return { audio: true };
  }, []);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (stream) {
      return;
    }

    let didCancel = false;

    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (!didCancel) {
          setStream(stream);
        }
      } catch (err) {
        if (!didCancel) {
          setError(err);
        }
      }
    };

    const cancel = () => {
      didCancel = true;

      if (!stream) return;

      if (stream.getAudioTracks) {
        stream.getAudioTracks().map((track) => track.stop());
      }

      if (stream.stop) {
        stream.stop();
      }
    };

    getUserMedia();

    return cancel;
  }, [constraints, stream, error]);

  const recoderRenderer = () => {
    if (stream === null) {
      // TODO - #16 Implement the No perimission view here
      return <button className="record-play">Loading…</button>;
    }
    return <Recorder stream={stream} />;
  };

  return (
    <Provider store={store}>
      <header>
        <h1>Sound Recorder</h1>
      </header>
      <main>{recoderRenderer()}</main>
    </Provider>
  );
}

export default App;
