import React, { Component } from "react";

class NewScan extends Component {
  render() {
    const { title, scanHandler } = this.props;
    return (
      <React.Fragment>
        <div>
          <p className="newscan-title">{title}</p>
        </div>
        <div className="qr-div">
          <div className="qr-screen">qr scanner div here</div>
          {/**Put Scanner Screen*/}
          <div className="qrbtn-div">
            <button type="button" className="scan-btn" onClick={scanHandler}>
              SCAN
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewScan;
