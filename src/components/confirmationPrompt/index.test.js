import { fireEvent, render, screen } from "@testing-library/react";

import ConfirmationPrompt from ".";

describe("Testing ConfirmationPrompt component on delete action", () => {
  let wrapper;

  //mocks
  const message = "Delete the recording Track001";
  const deleteRecording = jest.fn();
  const editRecordingName = jest.fn();
  const acceptButton = "Delete";
  const confirmationPromptState = {
    error: "",
  };
  const setConfirmationPromptState = jest.fn();

  beforeEach(() => {
    wrapper = render(
      <ConfirmationPrompt
        message={message}
        acceptButton={acceptButton}
        confirmationPromptState={confirmationPromptState}
        deleteRecording={deleteRecording}
        editRecordingName={editRecordingName}
        setConfirmationPromptState={setConfirmationPromptState}
      />
    );
  });

  test("should render the ConfirmationPrompt component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should find the text Delete the recording Track001 in the document", () => {
    expect(
      screen.getByText("Delete the recording Track001")
    ).toBeInTheDocument();
  });

  test("should find the text cancel in the document", () => {
    expect(screen.getByText("cancel")).toBeInTheDocument();
  });

  test("should find the text Delete in the document", () => {
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});

describe("Testing ConfirmationPrompt component on edit action", () => {
  let wrapper;

  //mocks
  const message = "Editing Track002";
  const deleteRecording = jest.fn();
  const editRecordingName = jest.fn();
  const acceptButton = "Update";
  const confirmationPromptState = {
    error: "The name is empty",
  };
  const setConfirmationPromptState = jest.fn();

  beforeEach(() => {
    wrapper = render(
      <ConfirmationPrompt
        message={message}
        acceptButton={acceptButton}
        confirmationPromptState={confirmationPromptState}
        deleteRecording={deleteRecording}
        editRecordingName={editRecordingName}
        setConfirmationPromptState={setConfirmationPromptState}
      />
    );
  });

  test("should render the ConfirmationPrompt component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should find the text Editing Track002 in the document", () => {
    expect(screen.getByText("Editing Track002")).toBeInTheDocument();
  });

  test("should find the text New name in the document", () => {
    expect(screen.getByText("New name")).toBeInTheDocument();
  });

  test("should find textbox role", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("should find the text The name is empty in the document", () => {
    expect(screen.getByText("The name is empty")).toBeInTheDocument();
  });

  test("should find the text cancel in the document", () => {
    expect(screen.getByText("cancel")).toBeInTheDocument();
  });

  test("should find the text Update in the document", () => {
    expect(screen.getByText("Update")).toBeInTheDocument();
  });

  test("should call the setConfirmationPromptState onClick in the cancel button", () => {
    fireEvent.click(screen.getByText(/cancel/i));
    expect(setConfirmationPromptState).toHaveBeenCalledTimes(1);
  });
});
