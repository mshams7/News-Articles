import React, { Component } from "react";
import load from "./spinner.gif";

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img style={{ width: "30px" }} src={load} alt="spinner" />
      </div>
    );
  }
}

export default Spinner;
