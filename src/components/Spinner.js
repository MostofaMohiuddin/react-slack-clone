import React, { Component } from "react";

import { Dimmer, Loader } from "semantic-ui-react";

export class Spinner extends Component {
  render() {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      </div>
    );
  }
}

export default Spinner;
