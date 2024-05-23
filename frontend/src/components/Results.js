import React, { Component } from "react";

class Results extends Component {
  render() {
    const { results } = this.props;

    if (results.error) {
      return <p>Error: {results.error}</p>;
    }

    const { URO, BIL, KET, BLD, PRO, NIT, LEU, GLU, SG, PH } = results.result;

    return (
      <div>
        <h2>Results</h2>
        <ul>
          <li>URO: RGB({URO.join(", ")})</li>
          <li>BIL: RGB({BIL.join(", ")})</li>
          <li>KET: RGB({KET.join(", ")})</li>
          <li>BLD: RGB({BLD.join(", ")})</li>
          <li>PRO: RGB({PRO.join(", ")})</li>
          <li>NIT: RGB({NIT.join(", ")})</li>
          <li>LEU: RGB({LEU.join(", ")})</li>
          <li>GLU: RGB({GLU.join(", ")})</li>
          <li>SG: RGB({SG.join(", ")})</li>
          <li>PH: RGB({PH.join(", ")})</li>
        </ul>
      </div>
    );
  }
}

export default Results;
