import React from 'react';
import { Button, Input, message } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';
import { makeGetUserLessonSelector } from 'selectors';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import ValidationUtils from '../utils/ValidationUtils';
import Images from '../theme/Images';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 540px;
`;

const Text = styled.p`
  text-align: center;
`;

const WupaiWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  max-width: 640px;

  & > * > code {
    background: #efefef;
    padding: 2px 4px;
  }

  & > pre {
    background: #161a36;
    color: #fff;
    padding: 16px;
  }
`;

const SendButton = styled(Button)`
  margin: auto;
  margin-top: 16px;
  display: block;
`;

const Coin = styled.img`
  width: 32px;
  height: 32px;
  margin-left: 8px;
`;

const AdminButtonPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

class LinkSubmit extends React.PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    onLinkSubmit: PropTypes.func.isRequired,
    text: PropTypes.node.isRequired,
    lesson: PropTypes.shape({ fileURL: PropTypes.string }).isRequired,
  };

  state = {
    fileURL: this.props.lesson.fileURL,
  };

  handleLinkSubmit = () => {
    const { onLinkSubmit: onLinkSubmitFunc, t } = this.props;
    const { fileURL } = this.state;
    if (!this.validateUrl(fileURL)) {
      message.error(t('linkSubmit.validationError'));
      // eslint-disable-next-line
      console.error('Url not valid');
      return;
    }

    onLinkSubmitFunc(fileURL);
  };

  handleUrlChange = ({ target: { value: fileURL } }) => this.setState({ fileURL });

  validateUrl = url => Boolean(url) && ValidationUtils.validateUrl(url);

  renderSubmitUrl = () => {
    const { text, t } = this.props;
    const { fileURL } = this.state;
    return (
      <React.Fragment>
        <TextContainer
          className="ql-editor"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
        <Input
          value={fileURL}
          onChange={this.handleUrlChange}
          spellCheck="false"
          placeholder={t('linkSubmit.inputPlaceholder')}
        />
        <SendButton onClick={this.handleLinkSubmit}>{t('linkSubmit.linkSendLabel')}</SendButton>
      </React.Fragment>
    );
  };

  renderInReviewMessage = () => {
    const {
      lesson: { fileURL },
      t,
    } = this.props;
    return (
      <Text>
        {t('linkSubmit.linkSentOne')}
        <a href={`http://${fileURL}`}>{` ${t('linkSubmit.linkSentTwo')} `}</a>
        {t('linkSubmit.linkSentThree')}
      </Text>
    );
  };

  renderFinishMessage = () => {
    const {
      lesson: { result: wupai },
      t,
    } = this.props;
    return (
      <React.Fragment>
        <Text>{t('linkSubmit.taskAccepted')}</Text>
        <WupaiWrapper>
          {wupai}
          <Coin src={Images.wupai.gif} alt={t('linkSubmit.coinAltLabel')} />
        </WupaiWrapper>
      </React.Fragment>
    );
  };

  renderRejectMessage = () => {
    const { t } = this.props;
    return <Text>{t('linkSubmit.taskReqected')}</Text>;
  };

  renderFeedback = () => {
    const {
      lesson: { feedback },
    } = this.props;
    return <Text>{feedback}</Text>;
  };

  renderDefaultState = () => this.renderSubmitUrl();

  renderFinishState = () => (
    <React.Fragment>
      {this.renderFinishMessage()}
      {this.renderFeedback()}
    </React.Fragment>
  );

  renderRejectState = () => (
    <React.Fragment>
      {this.renderSubmitUrl()}
      {this.renderRejectMessage()}
      {this.renderFeedback()}
    </React.Fragment>
  );

  renderInReviewState = () => (
    <React.Fragment>
      {this.renderSubmitUrl()}
      {this.renderInReviewMessage()}
    </React.Fragment>
  );

  renderState = () => {
    const {
      lesson: { status },
    } = this.props;
    switch (status) {
      case 'finished':
        return this.renderFinishState();
      case 'rejected':
        return this.renderRejectState();
      case 'inReview':
        return this.renderInReviewState();
      default:
        return this.renderDefaultState();
    }
  };

  changeStatus = (status) => {
    const { onLinkSubmit: onLinkSubmitFunc } = this.props;
    const { fileURL } = this.state;
    onLinkSubmitFunc(fileURL, status);
  };

  render() {
    return (
      <Container>
        <InnerContainer>
          {this.renderState()}
          {this.props.isAdmin && (
            <AdminButtonPanel>
              <Button
                onClick={() => {
                  this.changeStatus('inReview');
                }}
              >
                {' '}
                In review
              </Button>
              <Button
                onClick={() => {
                  this.changeStatus('rejected');
                }}
              >
                {' '}
                Rejected
              </Button>
              <Button
                onClick={() => {
                  this.changeStatus('finished');
                }}
              >
                {' '}
                Finished
              </Button>
            </AdminButtonPanel>
          )}
        </InnerContainer>
      </Container>
    );
  }
}
const makeStateToProps = () => {
  const getLesson = makeGetUserLessonSelector();
  return (state, ownProps) => ({
    lesson: getLesson(state, ownProps),
  });
};

const withState = connect(
  makeStateToProps,
  null
);

const EnchantedLinkSubmit = compose(
  withState,
  withNamespaces()
)(LinkSubmit);

export default EnchantedLinkSubmit;
