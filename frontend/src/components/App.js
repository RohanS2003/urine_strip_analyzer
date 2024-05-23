import React, { Component } from "react";
import ReactDOM from "react-dom"; // Import ReactDOM instead of render
import AnalyzeImage from "./AnalyzeImage";
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AnalyzeImage />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");

// Adjusted usage of ReactDOM.render
const renderFunction = ReactDOM.createRoot
  ? ReactDOM.createRoot
  : ReactDOM.unstable_createRoot;
const root = renderFunction(appDiv);
root.render(<App />);
