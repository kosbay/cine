import React from 'react';
import instafeed from 'react-instafeed';

import { InstaFeed } from 'components';

import config from 'config';

class InstaFeedContainer extends React.Component {
  state={
    data: [],
  }

  componentDidMount() {
    this.bindData();
  }

  bindData = async () => {
    const { data } = await instafeed(config.options);
    this.setState({
      data,
    });
  }

  render() {
    return (
      <InstaFeed posts={this.state.data} />
    );
  }
}

export default InstaFeedContainer;
