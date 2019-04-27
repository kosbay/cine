import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';

const AndroidLayoutPlayground = dynamic(
  import('../components/AndroidLayoutPlayground'),
  { ssr: false, loading: () => <Spin /> }
);

class AndroidLayoutPlaygroundContainer extends React.PureComponent {
  static propTypes = {
    makeNextButtonActive: PropTypes.func.isRequired,
    lesson: PropTypes.shape({
      layoutCode: PropTypes.string,
    }).isRequired,
  };

  handleAnswerCorrect = () => this.props.makeNextButtonActive();

  handleLayoutCodeChange = (code, innerCode) => {
    if (innerCode !== 'userLayoutCode') return;
    const {
      lesson: { solutionCode },
    } = this.props;

    if (solutionCode && code) {
      if (solutionCode.replace(/\s/g, '') === code.replace(/\s/g, '')) {
        this.handleAnswerCorrect();
      }
    }
  };

  render() {
    const {
      lesson: { layoutCode, text: description },
    } = this.props;
    return (
      <AndroidLayoutPlayground
        description={description}
        innerKey="userLayoutCode"
        layoutCode={layoutCode}
        onLayoutCodeChange={this.handleLayoutCodeChange}
      />
    );
  }
}

export default AndroidLayoutPlaygroundContainer;
