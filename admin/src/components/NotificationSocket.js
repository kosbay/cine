import React, { Component } from "react";

class NotificationSocket extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
    };
  }

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ?
            <p>
              Your text from socket: {response}
            </p>
          : <p>Loading Socket maybe...</p>}
      </div>
    );
  }
}

export default NotificationSocket;
