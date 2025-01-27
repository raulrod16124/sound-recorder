import { object } from "prop-types";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { CreateRecording } from "../state/actions";

/**
 * This media recorder hook keeps all the logic needed to perform an audio recording decoupling it from any component
 * so it can be reused if needed.
 *
 * This way, when it comes to testing you only need to mock this `recorder` hook and its returned values.
 *
 * The hook in use would look like this:
 * const { recording, recordings, setRecordings, isRecording } = useMediaRecorded(stream);
 *
 * The `setRecordings` method is exposed so that we can perform modifications to the list of recordings from the component
 * avoiding to bloat the logic of this hook (tough it could also be a good idea to do so) but we kept it like this for simplicity
 *
 * @param {Object} stream
 * @returns {{
 * recorder: { start: Function, stop: Function },
 * isRecording: boolean,
 * recordings: any[],
 * setRecordings: Function
 * }}
 *
 */
export default function useMediaRecorder(stream) {
  const dispatch = useDispatch();

  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [chunks, setChunks] = useState([]);

  const recorder = useMemo(() => new MediaRecorder(stream), [stream]);

  const handleStart = () => {
    setIsRecording(true);
  };

  const handleStop = () => {
    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    const audioURL = window.URL.createObjectURL(blob);

    /* Once it get the blob and transform to an audiURL are trigger the dispatch
    to create a recording and store into the firestore  */
    dispatch(
      CreateRecording({
        stream: audioURL,
        name: new Date().toISOString().split(".")[0].split("T").join(" "),
        id: `id${window.performance.now().toString()}`,
      })
    );

    setChunks([]);
    setIsRecording(false);
  };

  const handleDataAvailable = (e) => {
    setChunks((currentChunks) => [...currentChunks, e.data]);
  };

  recorder.onstop = handleStop;
  recorder.onstart = handleStart;
  recorder.ondataavailable = handleDataAvailable;

  return {
    recorder,
    recordings,
    setRecordings,
    isRecording,
  };
}
