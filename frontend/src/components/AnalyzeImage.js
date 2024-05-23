import React, { Component } from "react";
import Results from "./Results";
import "./AnalyzeImage.css";

class AnalyzeImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
      results: null,
      analyzing: false,
      error: null,
    };
  }

  handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    this.setState({
      selectedImage: imageFile,
      error: null,
    });
  };

  handleSubmit = async () => {
    const { selectedImage } = this.state;

    if (!selectedImage) {
      return;
    }

    this.setState({
      analyzing: true,
      results: null,
      error: null,
    });

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const results = await response.json();
      this.setState({ results });
    } catch (error) {
      console.error("Error analyzing image:", error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ analyzing: false });
    }
  };

  render() {
    const { selectedImage, analyzing, results, error } = this.state;

    return (
      <div className="urine-strip-analyzer">
        <h1>Urine Strip Color Analyzer</h1>
        <div className="image-upload">
          <input
            type="file"
            accept="image/*"
            onChange={this.handleImageUpload}
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <button onClick={this.handleSubmit} disabled={analyzing}>
          {analyzing ? "Analyzing..." : "Analyze Image"}
        </button>
        {results && <Results results={results} />}
      </div>
    );
  }
}

export default AnalyzeImage;
