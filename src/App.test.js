import { render, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import App from "./App";
import { RecorderReducer } from "./state/reducer";

test("renders Sound Recorder title", async () => {
  // render(<App />);
  // const linkElement = screen.getByText(/Sound Recorder/i);
  // expect(linkElement).toBeInTheDocument();
  const component = await renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("Testing App component", () => {
  let wrapper;
  let mockStore;
  beforeEach(() => {
    const reducers = combineReducers({
      RecorderReducer: RecorderReducer,
    });
    mockStore = createStore(reducers, applyMiddleware(thunk));
    wrapper = render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );
  });

  test("should render the App component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Should find the title Web Dictaphone in the document", () => {
    expect(screen.getByText("Web Dictaphone")).toBeInTheDocument();
  });
});
