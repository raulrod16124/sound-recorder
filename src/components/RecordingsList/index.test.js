import { render, screen } from "@testing-library/react";

import RecordingsList from ".";

describe("Testing RecordingsList", () => {
  let wrapper;

  //mocks
  let recordings = [
    {
      stream: "blob:https://localhost/9e00aec3-6729-42fb-b5a7-01f50be302fa",
      name: "track001",
      id: `id${window.performance.now().toString()}`,
    },
  ];
  const recordingSelected = {
    stream: "blob:https://localhost/9e00aec3-6729-42fb-b5a7-01f50be302fa",
    name: "track001",
    id: `id${window.performance.now().toString()}`,
  };
  const setRecordingSelected = jest.fn();
  const handleOpenConfirmationPrompt = jest.fn();

  beforeEach(() => {
    wrapper = render(
      <RecordingsList
        recordings={recordings}
        recordingSelected={recordingSelected}
        setRecordingSelected={setRecordingSelected}
        handleOpenConfirmationPrompt={handleOpenConfirmationPrompt}
      />
    );
  });

  test("should render the RecordingsList component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should find the text track001", () => {
    expect(screen.getByText("track001")).toBeInTheDocument();
  });
});

describe("Testing the RecordingsList component when is empty", () => {
  let wrapper;

  //mocks
  let recordings = [];
  const recordingSelected = {};
  const setRecordingSelected = jest.fn();
  const handleOpenConfirmationPrompt = jest.fn();

  beforeEach(() => {
    wrapper = render(
      <RecordingsList
        recordings={recordings}
        recordingSelected={recordingSelected}
        setRecordingSelected={setRecordingSelected}
        handleOpenConfirmationPrompt={handleOpenConfirmationPrompt}
      />
    );
  });

  test("should find the text There no recordings when the list are empty", () => {
    expect(screen.getByText("There no recordings")).toBeInTheDocument();
  });
});
