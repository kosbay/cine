import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';

import page from 'hocs/page';
import LearnContainer from 'containers/LearnContainer';

class LearnPage extends React.PureComponent {
  static propTypes = {
    router: PropTypes.shape({
      back: PropTypes.func.isRequired,
      query: PropTypes.shape({
        chapterId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  handleDidChapterFinish = () => {
    const { router: { back } } = this.props;
    back();
  }

  render() {
    const { router: { query: { chapterId } } } = this.props;
    return (
      <LearnContainer
        onDidChapterFinish={this.handleDidChapterFinish}
        chapterId={chapterId}
      />
    );
  }
}

const EnhancedLearnPage = compose(page)(LearnPage);

export default EnhancedLearnPage;
