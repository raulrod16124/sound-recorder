import { render, screen } from "@testing-library/react";
import React from "react";

import Recording from "./index";

describe("Testing the Recording Component", () => {
  let wrapper;

  // mocks
  let handleOpenConfirmationPrompt = jest.fn();
  let confirmationPromptState = { openDelete: false };
  let qrState = { visibility: false };
  let setQrState = jest.fn();

  const stream = {
    key: "lsdkjflds",
    stream: "sdkfjsdf08sdf",
    name: "2021-06-18 07:37:46",
  };

  beforeEach(() => {
    wrapper = render(
      <Recording
        stream={stream.stream}
        name={stream.name}
        key={stream.key}
        qrState={qrState}
        setQrState={setQrState}
        confirmationPromptState={confirmationPromptState}
        handleOpenConfirmationPrompt={handleOpenConfirmationPrompt}
      />
    );
  });

  it("should render the Recording component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should find the article role", () => {
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("should find the group role", () => {
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("should find the progressbar role", () => {
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should find the button role", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  //   it("should..", () => {
  //     screen.getByRole("red");
  //   });

  //   it("renders without crashing", () => {
  //     const div = document.createElement("div");
  //     render(
  //       <Recording
  //         stream={stream.stream}
  //         name={stream.name}
  //         key={stream.key}
  //         qrState={qrState}
  //         setQrState={setQrState}
  //         confirmationPromptState={confirmationPromptState}
  //         handleOpenConfirmationPrompt={handleOpenConfirmationPrompt}
  //       />
  //     );
  //   });
});
